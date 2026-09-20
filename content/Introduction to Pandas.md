---
publish: true
title: Introduction to Pandas
created: 2026-09-19T14:24:03.929Z
modified: 2026-09-20T08:10:54.898Z
tags:
  - draft
---

Pandas is an open-source Python library built for data manipulation and analysis. The term ‘Pandas’ derived from Panel Data a three-dimensional dataset used in econometrics.

Pandas integrates seamlessly with Machine Learning and Visualization libraries like NumPy, Scikit-learn, and TensorFlow, Matplotlib, Seaborn, making it the essential starting point in nearly every data workflow.

Pandas works in-memory and is designed for quick, flexible data manipulation—ideal for small to medium datasets. Once the data is loaded in your RAM, you can do iterative data experiments and integrate your cleaned data with the Python ecosystem.

SQL on the other hand talks to relational databases and is optimized for large scale queries and persistent storage. SQL is the stricter, more secure and heavy-weight workhorse for databases. You can do a lot of analysis in SQL, directly communication with vast databases, but once you have the data you need you are better off moving it to pandas for more agile work.

# Load and Inspect

## Loading data

To load data into pandas, you use the one of pandas many `read_*()` functions.

```python
import pandas as pd

df = pd.read_csv(...) # genreal loading pattern, df stands for data frame

# CSV
pd.read_csv("file.csv", header=0)                # first row as header
pd.read_csv("file.csv", index_col="order_id")    # set column as index
pd.read_csv("file.csv", nrows=100)               # read only first 100 rows
pd.read_csv("file.csv", skiprows=2)              # skip first 2 rows
pd.read_csv("file.csv", usecols=["price","quantity"])  # specific columns only
pd.read_csv("file.csv", na_values=["NA","?"])    # define missing values
pd.read_csv("file.csv", sep=";")                 # semicolons instead of commas

# EXCEL
pd.read_excel("file.xlsx")                       # basic read
pd.read_excel("file.xlsx", sheet_name="Sheet1")  # specific sheet by name
pd.read_excel("file.xlsx", sheet_name=0)         # first sheet by index
pd.read_excel("file.xlsx", skiprows=2)           # skip first 2 rows
pd.read_excel("file.xlsx", usecols="A:D")        # read columns A to D

# JSON
pd.read_json("file.json")                        # basic read
pd.read_json("file.json", orient="records")      # list of records format

# HTML
tables = pd.read_html("file.html")                          # returns list of all tables
df = pd.read_html("https://website.com/table")[0]       # first table from a URL

# SQL
import sqlite3
conn = sqlite3.connect("database.db")
df = pd.read_sql("SELECT * FROM table", conn)    # full SQL query
df = pd.read_sql_table("table_name", conn)       # read entire table directly

# Text files
pd.read_table("file.txt")                      # tab separated (default)
pd.read_table("file.txt", sep=",")             # comma separated
pd.read_table("file.txt", sep=";")             # semicolon separated
pd.read_table("file.txt", sep="|")             # pipe separated
pd.read_table("file.txt", header=None)         # file has no header row
pd.read_table("file.txt", names=["col1","col2"])  # add column names manually
pd.read_table("file.txt", skiprows=2)          # skip first 2 rows
pd.read_table("file.txt", nrows=100)           # read only 100 rows
pd.read_fwf("file.txt")                        # fixed-width text file

# OTHER FORMATS
pd.read_clipboard() # Clipboard — copy any table, then run this
pd.read_parquet("file.parquet") # Parquet — the preferred format for big data (very fast)
pd.read_xml("file.xml") # XML
```

## CSV (Comma-Separated Values)

CSV is maybe the most common file type you will encounter and load.

CSV stores tabular data as plain text where the values of a record are separated by a comma (delimiter) and each record is a line. On the next line a new record begins.

```txt
Gender,Height(cm),Weight(kg)
M,170,69
W,171,64
M,167,52
M,168,68
M,177,78
M,184,78
W,158,47
M,168,62
...
```

If the separator is not a comma for whatever reason you can change it with the parameter `sep=";"` (see above). Possible separators are semicolon `;`, comma `,`, tab `\t`, pipe `|`. But you can also define [custom separators](https://stackoverflow.com/questions/41235111/customizing-the-separator-in-pandas-read-csv).

## Copy from clipboard

One of the niftier tricks is the `pd.read_clipboard()` function. Many pages holding interesting data want to log in, provide information or go through cumbersome downloading. You can skip all this by copying the data with `Ctrl+C` and copy in a pandas code field with the function.

```python
# paste here
pd.read_clipboard()
```

## Inspection

To get a first glance of your data try the following functions.

```python
df = pd.read_csv("./dataset.csv")

# statistical summary for all numeric columns
df.describe()  

# column names, data types, number of non-null values, and memory usage
df.info() 

# first 5 records - change to any number of records 
df.head(10)

# last 5 records - change to any number of records
df.tail(20)
```

## sample()

Returns n randomly selected rows. Ideal for getting a representative look at a large dataset where the first or last rows might not be representative.

```python
df.sample(27)  # 27 random records
```

## value\_counts()

Returns the **frequency of each unique value in a column**. Invaluable for understanding the distribution of categorical data at a glance.

```python
# How many men and women are in the dataset
df['Gender'].value_counts()
```

# Selections

You may select only by column, row or both, and there are different ways of doing it.

## Select Columns

Columns are often the features of your data frame, representing one dimension of the data. By selecting some columns you loose dimensions and gain focus. This is also called `slicing` the data.
![](Introduction to Pandas - select columns.png)

```python
df['Gender'] # select one column

# the same as above, but with 'dot notation', 
# only works if column name has no whitespace 
# and is not a function name
df.gender 

# selecting more than one column - mind the double brackets
df[['Gender', 'Height(cm)']]

```

If you have many columns `filter()` comes to help.

```python
# alternative with extra functionality
df.filter(["sex", "grade_language_t1"])
df.filter(items=["sex", "grade"]) # select columns

# regex filtering
df.filter(regex="^grade", axis=1) # select columns with "grade" at the start of their name
df.filter(regex="t2$", axis=1) # select columns with "t2" at the end

# fuzzy filtering
df.filter(regex="^grade") # all columns that start with 'grade'
df.filter(like="math", axis=1) # select columns with "math" in their name
```

If you would like to see all available columns use `df.columns`

## Select Rows

Selecting rows in pandas is trickier as the index frequently gets mixed up. Pandas puts an index to the rows which is not necessarily the index you intended to have.

You can still select rows by index with

```python
df.iloc[0] # first rwo
df.iloc[3:5] # rows 3 and 4 - not row 5 (exclusive)
```

### set\_index()

If you want the right index from the start, define your index while loading:

```python
df = pd.read_csv("file.csv", index_col="order_id")    # set column as index
```

Or set index to a column label subsequently:

```python
df.set_index("order_id")
```

Once you defined the index you can select by label with:

```python
df.loc['oid_1000'] # index is a string now

# confusingly, if order_id is number 
# we can select without quotation marks
# which makes mistaking it for positonal index more likely
df.loc[1000]    
```

…. to be continued …

## Sources

10 minutes to pandas
https://pandas.pydata.org/docs/user\_guide/10min.html#min

Mhadi, Hussein (2026, Feb 26). _Mastering Pandas-Part 1: Reading, Sorting & Displaying Data_. Medium. https://blog.gopenai.com/mastering-pandas-part-1-reading-sorting-displaying-data-4de39bb4c9c4?gi=5ceb1ef9361f\&source=user\_profile\_page---------1-------------70b422af101d----------------------
