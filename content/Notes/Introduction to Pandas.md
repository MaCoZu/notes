---
publish: true
title: Introduction to Pandas
created: 2026-09-19T14:24:03.929Z
modified: 2026-09-27T10:22:36.066Z
tags:
  - "#status/draft"
---

Pandas is an open-source Python library built for data manipulation and analysis. The term ‘Pandas’ derived from Panel Data a three-dimensional dataset used in econometrics.

Pandas integrates seamlessly with Machine Learning and Visualization libraries like NumPy, Scikit-learn, and TensorFlow, Matplotlib, Seaborn, making it the essential starting point in nearly every data workflow.

Pandas is built on top of the NumPy library. While NumPy focuses primarily on fast, homogeneous, unlabeled, numerical array computation. Pandas, while built upon NumPy, adds labels for rows and columns and specializes in high-level data manipulation and analysis of messy, real-world data. The key difference is that NumPy arrays must have all elements of the same type, while DataFrames can accommodate mixed data types across different columns, offering much more flexibility for real data science work.

Pandas works in-memory and is designed for quick, flexible data manipulation—ideal for small to medium datasets. Once the data is loaded in your RAM, you can do iterative data experiments and integrate your cleaned data with the Python ecosystem.

SQL on the other hand talks to relational databases and is optimized for large scale queries and persistent storage. SQL is the stricter, more secure and heavy-weight workhorse for databases. You can do a lot of analysis in SQL, directly communication with vast databases, but once you have the data you need you are better off moving it to pandas for more agile work.

# Data Structures

**Series** is a one-dimensional labeled array, homogeneous data, all values of same data type. We can think of a Series as similar to a single column in a table.

→ Use Series when you require speed and less memory consumption for specific tasks.

A **DataFrame** is a two-dimensional, multiple rows and columns. Each of its columns can hold different data types, meaning it supports heterogeneous data.

→ Use DataFrames for complex and large datasets because they allow for a wider range of operations.

# Load and Inspect

## Loading data

To load data into pandas, you use the one of pandas many `read_*()` functions.

```python
import pandas as pd

# genreal loading pattern, df stands for data frame
df = pd.read_csv(...) 


# CSV
# --------------------------------

# first row as header
pd.read_csv("file.csv", header=0) 

# set column as index
pd.read_csv("file.csv", index_col="order_id")   

# read only first 100 rows
pd.read_csv("file.csv", nrows=100)    

# skip first 2 rows
pd.read_csv("file.csv", skiprows=2) 
 
# specific columns only           
pd.read_csv("file.csv", usecols=["price","quantity"]) 

# define missing values
pd.read_csv("file.csv", na_values=["NA","?"])  
  
# semicolons instead of commas
pd.read_csv("file.csv", sep=";") 
       
                         
# EXCEL
# --------------------------------

# basic read
pd.read_excel("file.xlsx")         

# specific sheet by name              
pd.read_excel("file.xlsx", sheet_name="Sheet1")  

# first sheet by index
pd.read_excel("file.xlsx", sheet_name=0)  

# skip first 2 rows       
pd.read_excel("file.xlsx", skiprows=2) 

# read columns A to D          
pd.read_excel("file.xlsx", usecols="A:D")   

          
# JSON
# --------------------------------

# basic read
pd.read_json("file.json")     

# list of records format                   
pd.read_json("file.json", orient="records")      


# HTML
# --------------------------------

# returns list of all tables
tables = pd.read_html("file.html") 

# first table from a URL              
df = pd.read_html("https://website.com/table")[0]


# SQL
# --------------------------------
import sqlite3
conn = sqlite3.connect("database.db")

# full SQL query
df = pd.read_sql("SELECT * FROM table", conn)  

# read entire table directly  
df = pd.read_sql_table("table_name", conn)      



# Text files
# --------------------------------
pd.read_table("file.txt")                        # tab separated (default)
pd.read_table("file.txt", sep=",")               # comma separated
pd.read_table("file.txt", sep=";")               # semicolon separated
pd.read_table("file.txt", sep="|")               # pipe separated
pd.read_table("file.txt", header=None)           # file has no header row
pd.read_table("file.txt", names=["col1","col2"]) # add column names manually
pd.read_table("file.txt", skiprows=2)            # skip first 2 rows
pd.read_table("file.txt", nrows=100)             # read only 100 rows
pd.read_fwf("file.txt")                          # fixed-width text file


# OTHER FORMATS
# --------------------------------
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

## Attributes

In Pandas, an **attribute** of the DataFrame object, are inherent properties that do not require any input arguments or calculation to return the result. We access them directly without the function-calling parentheses.

Remember methods are function that work with the data given while attributes are basically metadata of your DataFrame.

```python
# Returns the row index (labels/range)
df.index
# Returns the column names
df.columns
# Returns a list containing both the row index and column index
df.axes
# Returns the data type of each column
df.dtypes
# Returns the total number of elements (rows * columns)
df.size
# Returns a tuple representing the dimensionality (number of rows, number of columns)
df.shape
# Returns the number of dimensions (always 2 for DataFrames)
df.ndim
# Returns a boolean indicating if the DataFrame is completely empty
df.empty
# Returns the transposed DataFrame (swaps rows and columns)
df.T
# Returns a NumPy array representation of the underlying data
df.values
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
![[images/Introduction to Pandas - select columns.png|500]]

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

### `iloc` — Position-Based Indexing

You can still select rows by index with

```python
df.iloc[0] # first rwo
df.iloc[3:5] # rows 3 and 4 - not row 5 (exclusive)
```

`iloc`: extract data based on the integer positions of rows and columns, starting at zero, and its slicing is exclusive of the endpoint.

### set\_index()

If you want your custom index from the start, define your index while loading:

```python
df = pd.read_csv("file.csv", index_col="order_id")    # set column as index
```

Or set index to a column label subsequently:

```python
df.set_index("order_id")
```

### `loc` — Label-Based Indexing

Once you defined the index you can select by label with:

```python
df.loc['oid_1000'] # index is a string now
```

`loc` selects data based on the explicit labels of rows and columns, and its slicing is inclusive of the endpoint.

One thing to look out for is that labels, that are at the same time numbers, can be called without quotation marks, which makes mistaking them for positional indices more likely.

```python
df.loc[1000]
```

### `loc` & `iloc` Distinctions

![[images/Introduction to Pandas - loc vs iloc.png|500]]

## Selecting Scalars `at` & `iat`

The `at` and `iat` functions are designed for high-speed access to a single scalar value. They skip the overhead involved in general selection processes, making them the preferred choice when accessing or setting a single cell, the performance difference becomes significant at scale.

```python
# at[] — by label
df.at[0, "price"]              # get value at row 0, column "price"
df.at[0, "price"] = 999        # set value at row 0, column "price"

# iat[] — by position
df.iat[0, 3]                   # get value at row 0, column position 3
df.iat[0, 3] = 999             # set value at row 0, column position 3
```

The `i` in `iloc` and `iat` stands for index.

# Sorting

## sort\_values()

The most commonly used sorting function. Reorders the DataFrame by the values in one or more columns. By default it sorts ascending; pass `ascending=False` to flip it.

```rb
# Ascending order (default)
df.sort_values('2022 Population')
# Descending order
df.sort_values('2022 Population', ascending=False)
# Sort by multiple columns: Continent A→Z, then Population largest first
df.sort_values(['Continent', '2022 Population'], ascending=[True, False])
```

## sort\_index()

Sorts by the DataFrame’s index rather than column values. This becomes important after filtering, merging, or shuffling rows, which can leave the index disordered.

```rb
df.sort_index()                # sort index ascending
df.sort_index(ascending=False) # sort index descending
```

## nlargest()

Returns the top N rows with the largest values in a specified column. More efficient and more readable than combining `sort_values()` with `head()`.

```rb
# Top 3 most populated countries
df.nlargest(3, '2022 Population')
```

## nsmallest()

Returns the top N rows with the smallest values in a specified column.

```rb
# 3 smallest countries by area
df.nsmallest(3, 'Area (km2)')
```

## rank()

Assigns a rank to each row based on a column’s values, without changing the row order. Useful for adding a ranking column to your existing DataFrame.

```rb
# Add a population rank column (1 = largest)
df['Population Rank'] = df['2022 Population'].rank(ascending=False)
```

# Data Types

Dtypes → check column data types
df.dtypes
Convert to datetime → fix dates
pd.to\_datetime(df\["date"])
Convert to numeric → clean numbers
pd.to\_numeric(df\["amount"], errors="coerce")
Astype category → optimize memory
df\["city"].astype("category")
Rename columns → consistency
df.rename(columns={"Order Date":"order\_date"})
Sort values → inspect extremes
df.sort\_values("amount")
Unique values → detect IDs
df.nunique()

# Missing Values

```python
# is null → missing check 
df.isna().any()

# count of nulls per column
df.isna().sum()

# null percentage → severity 
df.isna().mean()*100

# completely remove rows or columns containing nulls
df.dropna()

# simple impute, fill missing values with replacements 
df.fillna(0)

# numeric fix → fill with median, mean etc.  
df["amount"].fillna(df["amount"].median())

# forward fill → time series 
df.fillna(method="ffill")
```

# Duplicates and Quality Checks

```python
# find duplicates → detect repeats
df.duplicated()

# count duplicates → data quality 
df.duplicated().sum()

# drop duplicates → clean data 
df.drop_duplicates()

# subset duplicates → key-based 
df.duplicated(subset=["id","date"])

# memory usage → dataset size 
df.memory_usage(deep=True)

# sample rows → random check
df.sample(5)

# value counts → category spread 
df["status"].value_counts() 
```

# Descriptive Statistics

```python
# mean → average value 
df["amount"].mean()

# median → central value 
df["amount"].median()

# std dev → variation 
df["amount"].std()

# quantiles → distribution cut 
df["amount"].quantile([0.25,0.5,0.75])

# skew → distribution shape 
df["amount"].skew()

# kurtosis → tail heaviness 
df["amount"].kurt()

# mode → most frequent 
df["status"].mode()
```

# Correlation

```python
# correlation matrix → relationships 
df.select_dtypes("number").corr()

# target correlation → drivers 
df.corr()["amount"]

# covariance → joint variation
df.cov()

# scatter plot → relation view 
plt.scatter(df["x"], df["y"])

# pairplot → multi-feature view 
sns.pairplot(df)

# heatmap → correlation visual 
sns.heatmap(df.corr())

# line fit → trend check
np.polyfit(x, y, 1)
```

# Grouping

```python
# Group mean → segment average 
df.groupby("city")["amount"].mean()

# Group sum → totals 
df.groupby("city")["amount"].sum()

Multiple agg → deeper insight 
df.groupby("city") 
["amount"].agg(["mean","median","count"])

# Pivot table → summary view
pd.pivot_table(df, values="amount", index="city")

# Crosstab → category vs category 
pd.crosstab(df["city"], df["status"])

# Rank within group → comparison 
df.groupby("city")["amount"].rank()

# Top N per group → leaders 
df.sort_values("amount").groupby("city").tail(3)
```

# Visualizations

```python

# Histogram → distribution 
df["amount"].hist()

# Boxplot → outliers 
df.boxplot(column="amount")

# Bar plot → category counts 
df["city"].value_counts().plot.bar()

# Line plot → trends 
df.plot.line(x="date", y="amount")

# Countplot → frequency 
sns.countplot(x="status", data=df)

# Violin plot → density 
sns.violinplot(x="status", y="amount", data=df)

# Save plot → reuse 
plt.savefig("plot.png")
```

# Performance Hacks

## Method Chaining

```python
# The "Messy" Way  
df_clean = df.dropna()  
df_filtered = df_clean[df_clean['age'] > 25]  
df_sorted = df_filtered.sort_values('salary')

# The "Chain" Way  
df_final = (  
    df  
    .dropna()  
    .query("age > 25")  
    .sort_values('salary')  
    .reset_index(drop=True)  
)
```

## Downcasting

Data types like `object` or `float64` are often the default. These are flexible but heavy. Switching to smaller or more suitable types can reduce memory usage and improve performance.

```python
df = pd.DataFrame({
    "rank": [1, 2, 3, 4, 5],
    "country": ["France", "Germany", "France", "Angola", "France"]
    "score": [99.5, 85.0, 72.0, 100.0, 40.0]
})

# Downcast integer and float columns
df["user_id"] = df["user_id"].astype("int32")
df["score"] = df["score"].astype("float32")
```

String columns with repeated values benefit from 'category' type, it can reduce memory usage massively and makes operations like filtering and grouping noticeably faster.

```python
# check memory usage before  
print(df["country"].memory_usage(deep=True))

# casting repeated strings to category   
df["country"] = df["country"].astype("category")

# check memory usage after downcasting 
print(df["country"].memory_usage(deep=True))
```

## `usecols` and `dtype`

Pandas guesses your data types, and scans the entire file for this purpose. This can result in long loading times. Speed up the process by selecting only the columns of interest from the start and define the data types directly.

```python
df = pd.read_csv(
    "sales_data.csv",
    
    # select cols to use
    usecols= ["order_id", "customer_id", "item_type"]
    
    # infer most efficient data type
    dtype={
        "order_id": "int32",
        "customer_id": "int32",
        "item_type": "category"
    }
)
```

…. to be continued …

# Sources

[10 minutes to pandas](https://pandas.pydata.org/docs/user_guide/10min.html#min)

[Mhadi, Hussein (2026, Feb 26). _Mastering Pandas-Part 1: Reading, Sorting & Displaying Data_. Medium.](https://blog.gopenai.com/mastering-pandas-part-1-reading-sorting-displaying-data-4de39bb4c9c4?gi=5ceb1ef9361f\&source=user_profile_page---------1-------------70b422af101d----------------------)

https://towardsdatascience.com/7-pandas-performance-tricks-every-data-scientist-should-know/
