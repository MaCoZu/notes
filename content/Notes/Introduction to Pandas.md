---
publish: true
title: Introduction to Pandas
created: 2026-10-07T12:55:51.729Z
modified: 2026-10-10T14:02:05.819Z
tags:
  - status/draft
---

> I will use the superstore dataset for my examples, to follow along you can [download the dataset](https://drive.google.com/uc?export=download\&id=1GWHKPdxVuqroKoKoB49zOEyfyLAwbzcc), or open the dataset in Google Colab directly. →  [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/MaCoZu/Python/blob/main/NOTEBOOKS/pandas/00_intro_to_pandas_groupactivity.ipynb)

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

**Axis** indicates the dimension on data structures.

The axis is a parameter in many functions to specify if you work along rows (horizontally) or along columns (vertically).

In pandas, `axis = 0` refers to **rows** and `axis = 1` refers to **columns**.

![[Introduction to Pandas - Axis.png]]

- `axis=0` ↓: Operates along the **0**-th dimension (rows).
- `axis=1` →: Operates along the **1**-st dimension (columns).

```python
# this will drop the first ROW 
df.drop(0, axis=0)

# this will drop the first COLUMN
df.drop(0, axis=1)
```

The notion of vertical `axis=0` for rows and horizontal `axis=1` for columns usually [confuses people](https://stackoverflow.com/questions/22149584/what-does-axis-in-pandas-mean). Because you read the content of a row horizontally and the entries of a column vertically, which is the inverse of how you read their respective axis labels.

The functions work along the direction of the labels and not the contents. If it helps you can write `axis=index` for `axis=0` (row-wise / vertical) and `axis=columns` (column-wise / horizontal) for `ax1s=1`.

# Load and Inspect

# Loading data

To load data into pandas, you use the one of pandas many `read_*()` functions.

> [!code]- Click to see all the Pandas read functions
>
> ```python
> # CSV
> # --------------------------------
> # first row as header
> pd.read_csv("file.csv", header=0) 
>
> # set column as index
> pd.read_csv("file.csv", index_col="order_id")   
>
> # read only first 100 rows
> pd.read_csv("file.csv", nrows=100)    
>
> # skip first 2 rows
> pd.read_csv("file.csv", skiprows=2) 
>
> # specific columns only          
> pd.read_csv("file.csv", usecols=["price","quantity"]) 
>
> # define missing values
> pd.read_csv("file.csv", na_values=["NA","?"])  
>
> # semicolons instead of commas
> pd.read_csv("file.csv", sep=";") 
>
>
> # EXCEL
> # --------------------------------
> # basic read
> pd.read_excel("file.xlsx")         
>
> # specific sheet by name             
> pd.read_excel("file.xlsx", sheet_name="Sheet1")  
>
> # first sheet by index
> pd.read_excel("file.xlsx", sheet_name=0)  
>
> # skip first 2 rows      
> pd.read_excel("file.xlsx", skiprows=2) 
>
> # read columns A to D         
> pd.read_excel("file.xlsx", usecols="A:D")   
>
>
> # JSON
> # --------------------------------
> # basic read
> pd.read_json("file.json")     
>
> # list of records format                   
> pd.read_json("file.json", orient="records")      
>
>
> # HTML
> # --------------------------------
> # returns list of all tables
> tables = pd.read_html("file.html") 
>
> # first table from a URL             
> df = pd.read_html("[https://website.com/table](https://website.com/table)")[0]
>
>
> # SQL
> # --------------------------------
> import sqlite3
> conn = sqlite3.connect("database.db")
>
> # full SQL query
> df = pd.read_sql("SELECT * FROM table", conn)  
>
> # read entire table directly  
> df = pd.read_sql_table("table_name", conn)      
>
>
> # Text files
> # --------------------------------
> pd.read_table("file.txt")                         # tab separated (default)
> pd.read_table("file.txt", sep=",")                # comma separated
> pd.read_table("file.txt", sep=";")                # semicolon separated
> pd.read_table("file.txt", sep="|")                # pipe separated
> pd.read_table("file.txt", header=None)            # file has no header row
> pd.read_table("file.txt", names=["col1","col2"])  # add column names manually
> pd.read_table("file.txt", skiprows=2)             # skip first 2 rows
> pd.read_table("file.txt", nrows=100)              # read only 100 rows
> pd.read_fwf("file.txt")                           # fixed-width text file
>
>
> # OTHER FORMATS
> # --------------------------------
> pd.read_clipboard()                # Clipboard — copy any table, then run this
> pd.read_parquet("file.parquet")    # Parquet — the preferred format for big data (very fast)
> pd.read_xml("file.xml")            # XML
> ```

# CSV (Comma-Separated Values)

CSV is maybe the most common file type you will encounter.

CSV stores tabular data as plain text where the values of a record are separated by a comma (delimiter) and each row in your text file indicates separate record. In statistics a record would be called an observation, and the values in one row are the concrete manifestations of attributes (variables) for this observation.

```txt
'Order ID', 'Order Date', 'Category', 'Sales'
CA-2013-152156, 09-11-2013, Furniture, 261.9600 
CA-2013-152156, 09-11-2013, Furniture, 731.9400 
CA-2013-138688, 13-06-2013, Office Supplies, 14.6200 
US-2012-108966, 11-10-2012, Furniture, 957.5775 
US-2012-108966, 11-10-2012, Office Supplies, 22.3680
...
```

If the separator in your file is not a comma for whatever reason you can change it with the parameter `sep=";"` (see above). Possible separators are semicolon `;`, comma `,`, tab `\t`, pipe `|`. But you can also define [custom separators](https://stackoverflow.com/questions/41235111/customizing-the-separator-in-pandas-read-csv).

# Reading Files & Character Encoding Issues

You may run into a `UnicodeDecodeError` when reading external CSV files, triggered by non-standard character encodings (such as Western European, accented characters, or legacy Windows exports). Passing explicit `encoding` parameters like `encoding="latin1"` (or `"ISO-8859-1"`, `"cp1252"`) resolves these errors.

```python
# Handling non-UTF-8 encodings (e.g., legacy files, accented text)
df_loaded = pd.read_csv("superstore.csv", encoding="latin1") # or encoding="ISO-8859-1" / "cp1252
```

# Loading with

As indicated above you can load your data smart, by configuring parameters right from the start. This saves work, RAM, and provides you with workable dataset directly.

```python
# Load with specifying date columns, define index, custom delimiters, and select rows and columns
df_custom = pd.read_csv(
    "superstore.csv",
    encoding='latin1',
    nrows=100, # read only first 100 rows
    index_col="Order ID", # set column as index
    parse_dates=["Order Date"], # convert string to a datetime
    date_format="%d-%m-%Y", # specify date format
    usecols=['Order ID', 'Order Date', 'Category', 'Sales'] # specific columns only
)
```

# Datetime

The `pd.to_datetime()` function converts strings into a proper datetime object, unlocking a host of time-related possibilities. Often, you have to provide a format code for the function to understand how the string translates into a date. To suppress exceptions and set invalid string formats to `NaT` (Not-a-Time), you can add the parameter `errors="coerce"`.

```python
import pandas as pd

# Convert string dates to datetime objects
df["Order Date"] = pd.to_datetime(df["Order Date"], format="%d-%m-%Y", errors="coerce")
```

Here are a few essential things you can do with dates using the `.dt` accessor and standard filtering:

```python
# 1. Extract date components into new columns
df["Year"] = df["Order Date"].dt.year
df["Month"] = df["Order Date"].dt.month
df["DayName"] = df["Order Date"].dt.day_name()  # e.g., Monday, Tuesday

# 2. Filter data by a specific date range
recent_orders = df[df["Order Date"] >= "2024-01-01"]

# 3. Sort your dataframe chronologically
df_sorted = df.sort_values(by="Order Date", ascending=False)
```

# Copy from clipboard

One of the niftier tricks is the `pd.read_clipboard()` function. Many pages holding interesting data want you to log in, provide information or go through cumbersome download procedures. You can skip all this nonsense by selecting and copying the data with `Ctrl+C` and paste `Crtl+V` in a pandas code field where this function receives your data.

```python
# paste here
pd.read_clipboard()
```

# Inspection

To get a first glance of your data try the following functions.

```python
df = pd.read_csv("superstore.csv")

# column names, data types, number of non-null values, and memory usage
df.info()

# statistical summary for all numeric columns
df.describe()

# first 5 records - change to any number of records
df.head(10)

# last 5 records - change to any number of records
df.tail(20)
```

# Attributes

In Pandas, an **attribute** of the DataFrame object, are inherent properties that do not require any input arguments or calculation to return the result. We access them directly without the function-calling parentheses.

While functions work with the data attributes hold metadata of your DataFrame.

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

# Descriptive Statistics

You’ve checked the metadata (attributes) and seen some summary statistics with `describe()`. Next you may want to investigate some columns (variables) in depth with descriptive statistics and pandas has a lot of [functions](https://pandas.pydata.org/pandas-docs/stable/user_guide/basics.html#descriptive-statistics) for this, here is a just few of them:

```python
# Frequency counts for categorical variables
df["Category"].value_counts()

# Specific percentile / quantile metrics on financial metrics
df["Sales"].quantile(0.90)

# Scalar aggregations across specific metrics
df["Sales"].sum()

# maximum
df["Sales"].max()

# standard deviation
df["Sales"].std()

# randomly select rows
df.sample(27)
```

# Index Management

Pandas sets an index which identifies each row. It starts with $0$ and is used to access rows. But you may want to change the index to something more meaningful than the arbitrary default index. Any variable that [uniquely identifies](https://en.wikipedia.org/wiki/Unique_identifier) your rows is a good index candidate. If there is no such unambiguous identifier, you can create one by combining variables into one, for example: last\_name + first\_name + birth\_date.

The labels can be integers, strings, or any other hashable type. In the superstore data set `Order ID` is a fine identifier. Once set each row can be selected by its new informative index.

```python
# set index to "Order ID" column
df_indexed = df.set_index("Order ID")

# select one row by its index
df_indexed.loc["US-2012-108966"]

# sort the df by its index
df_indexed.sort_index(ascending=False)

# resetting the index turns Order ID into a normal column again
df_reset = df_indexed.reset_index()
```

# Renaming & Reordering Columns

Data comes in funny forms and may want to change the order of your variables for better maintenance and legibility.

```python
# see all column names
df.columns

# Renaming specific columns using a dictionary mapping
df_renamed = df.rename(columns={
    "Sales": "Sales_USD",
    "Profit": "Net_Profit_USD",
    "Discount": "Discount_Rate"
})

df_renamed.columns
```

To change the order of your columns, you have to do a selection of columns (will come to this next). Only the columns named in the list of your selected column will appear in the reordered data frame. Beware of the double square brackets. The easiest way to select and reorder columns is to first print all your columns with `df.columns` and copy-paste the text, which you can quickly edit to your liking in the code editor, shifting the order or deleting columns you don’t need.

```python
# print and copy-paste existing columns to edit
df.columns

# Reordering columns explicitly via list selection
desired_order = ["Order ID", "Order Date", "Customer Name", "Region", "Category", "Sales", "Profit"]
df_reordered = df[desired_order]

# double brackets are needed if you select more than one column
df_reordered[["Order ID", "Order Date"]]
```

# Select Columns

Columns are often the features of your data frame, representing one dimension of the data. By selecting some columns you loose dimensions but gain focus. This is also called `slicing` the data.
![[images/Introduction to Pandas - select columns.png|500]]

When selecting more than one column double brackets are necessary. The inner bracket defines a list of columns to choose while the outer brackets tells pandas to select the contents of that list.

```python
# select one column
df["Region"] 


# the same as above, but with 'dot notation',
# only works if column name has no whitespace
# and is not a function name
df.Region


# selecting more than one column - mind the double brackets
df[['Region', 'Sales']]

```

## filter()

`filter()` allows you to select columns according to some specified search parameters. The `filter()` is applied to the names of the columns or labels of the index, depending on the axis specified.

The `items`, `like`, and `regex` parameters are mutually exclusive, meaning you can only use one at a time.

```python
# filter can be used to select columns by name or by a pattern in the column names

# select columns with filter
df.filter(items=["Category", "Sales"])

# equivalent to above selection  
df[["Category", "Sales"]] 

# you can filter the columns name for a sub-string
df.filter(like="ID")
df.filter(like="Date")

# regex pattern to select columns starting with "Order"
df.filter(regex="^Order.*")

# or look for column names with a hyphen in them
df.filter(regex=".*-.*")
```

# Select Rows

You can select rows by their position with `iloc()` or their label – if there is one – with `.loc()`. We discussed how to set an index above, once the rows have an index, the row index is the label you can choose rows by.

```python
# select row by index
df.iloc[0]

#select by row label
df_indexed.loc["CA-2013-152156"]
```

- `.loc()` selects by label (what's printed on the screen), while
- `.iloc()` selects by integer position (0-indexed location, like standard Python lists)

Confusions about index and position arise because:

- A label can also be an integer which makes it sometimes hard to distinguish from a positional index. You can choose an integer _label_ like an integer position with `df.loc[0]` which looks almost like `df.iloc[0]`, but beware the first is a label and the second an integer position.
- A label looks like a number but actually is a string. You would be tempted to select it with `df.iloc[0]` while it is a string that needs quote marks and the `.loc()` function. → `df.loc["0"]`

## Slicing

You can get a slice of your data cutting the dataset at distinct points.

- Position based slicing `df.iloc[start: end]` is exclusive, meaning the last position is not included in the selection
- Label-based slicing `df.loc[start: end]` includes the endpoint.

```python
# rows 3 and 4 - not row 5
df.iloc[3:5] 

# Label-based row slicing (inclusive of both start and end labels)
df_indexed.loc["CA-2023-100000":"CA-2023-100005"]
```

## `loc` & `iloc` Distinctions

![[images/Introduction to Pandas - loc vs iloc.png|700]]

# Selecting Rows & Columns

Selecting rows and columns can be done at the same time.

```python
# selecting one row and 4 columns / features
df_indexed.loc["CA-2023-100000", ["Customer Name", "Category", "Sales", "Profit"]]


# Label-based row & column slicing (inclusive of both start and end labels)
df_indexed.loc["CA-2023-100000":"CA-2023-100005", "Category":"Profit"]
```

# Selecting Scalars `at[]` & `iat[]`

The `at[]` and `iat[]` accessors are designed for high-speed access to a single values. They skip the overhead involved in general selection processes, making them the preferred choice when accessing or setting a single cell, the performance difference becomes significant at scale.

```python
# at[] — by label
df.at[0, "Sales"]              # get value at row 0, column "Sales"
df.at[0, "Sales"] = 999        # set value at row 0, column "Sales"

# iat[] — by position
df.iat[0, 3]                   # get value at row 0, column position 3
df.iat[0, 3] = 999             # set value at row 0, column position 3
```

# Boolean Indexing & Advanced Filtering

To answer questions about your data you certainly want to select rows and columns according to some condition. You do that with comparison logic, logical operators, string methods, set membership, and conditional selection methods (`mask`, `where`, `query`).

```python
# boolean filter: Orders with Sales greater than $500
high_sales_mask = df["Sales"] > 500.0
df[high_sales_mask]

# combine logical conditions and answer more specific questions
complex_filter = (df["Region"] == "South") & (df["Profit"] > 1500) & ~ (df["Segment"]== "Corporate")
df[complex_filter]
```

## isin()

In a DataFrame you can select only those rows certain values in one column with `isin()`. You can negate the condition with `~`.

```python
# only rows with Region == "East" OR Region == "West"
east_west = df["Region"].isin(["East", "West"])
df[east_west]

not_east_west = ~df["Region"].isin(["East", "West"])
df[not_east_west]
```

## string accessor:  `str()`

Instead of just search for certain strings in the DataFrame one can also access and process the strings itself.

```python
# look for Products with the substring 'tool' in its string
subcat_mask = df["Product Name"].str.contains("tool") 
df[subcat_mask]

# search for all Cities that start with 'New ...'
berlin_mask = df["City"].str.startswith("New")
df[berlin_mask]

# access `df.columns` and clean your column names 
df.columns.str.strip().str.lower().str.replace(" ", "_")
```

## `query()`

Works like boolean indexing but in SQL fashion. You can write your query or condition inside quotation almost as in SQL. This saves you the annoying `df[…]` statements and parenthese wrapping for multiple conditions.

```python
# String expression filtering with .query() like in SQL 
df.query("Category == 'Technology' and Sales > 300.0 and Discount == 0.0")

# the above replaces this
df[(df["Category"]=='Technology') & (df["Sales"]>300) & (df["Discount"] == 0.0)]
```
