---
publish: true
title: Data Analysis with Pandas
created: 2026-10-24T17:15:51.123Z
modified: 2026-10-31T10:08:41.977Z
tags:
  - status/draft
---

In a previous article we introduced Pandas and ended with boolean indexing and queries. This guide will pick up from there and focus on Pandas capabilities that make your data speak.

Again we will use the superstore dataset, to follow along you can [download the dataset](https://drive.google.com/uc?export=download\&id=1GWHKPdxVuqroKoKoB49zOEyfyLAwbzcc), or open it in Google Colab directly. →  [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/MaCoZu/Python/blob/main/NOTEBOOKS/pandas/00_intro_to_pandas_groupactivity.ipynb)

# Handling DataFrames

When you load a CSV or similar data into pandas the first time, it will often be the raw uncleaned tabular data you're going to analyze. In your analysis you transform and reorganize the data to your needs. It is a good idea to store interim results in dedicated tables and build in some fallback points, as something always goes wrong.

First understand that once you assigned data to a variable e.g.  `df = pd.read_csv("data.csv")` that variable is occupied. If you assign something else to same variable `df` old data stored in `df` is overwritten.

```python
# assign data to variable 'df'
df = pd.read_csv("data.csv") 

# reuse variable 'df', overwrite 'data.csv' with 'data2.csv' 
df = pd.read_csv("data2.csv", encoding='latin1')

# assign altered data to 'df', overwrite the old data
df = pd.read_csv("data.csv", encoding='latin1')

# using the variable for something else
df = 2+5
```

Let’s say you worked on `df` and deep in the analysis you some strange transformation that messed up your data. Now you have to load the data again from the beginning and run all cells up to the point where things have gone adrift.

A better way is to build in backstops before making major transformations or after certain milestones. Make copies of the data for experiments and only after making sure your transformations works you remove the excess copies of your data and consolidate the steps.

```python
df = pd.read_csv("data.csv") 

# a subset DataFrame
df_reduced = df[['Sales', 'Quantity', 'Discount', 'Profit']]

# copy orignal df, do stuff on the copy copy
df_2 = df

# confirm that your transformation works before applying it on the original data
df_2['Discount %'] = df_2['Discount'] * 100

# intermediate analysis
df_sales_by_cat = df.groupby("Category")[["Sales"]].mean()
```

If something breaks now, you have points to return to. If you stored some interim results, they are at hand in a special variable.

How many backstops you want to build in is a trade-off between safety and cleanliness. The more points of return the messier your notebook. If you make a lot of copies, it is maybe time to start a new notebook and keep your it focused on a few tasks only. Read on [here](https://coderpad.io/blog/data-science/mastering-jupyter-notebooks-best-practices-for-data-science/) for tips to tame notebook chaos.

## Data frame vs. actual file

The data frame in your notebook is different from the actual physical file (CSV or otherwise) holding that data. You should have a secure copy of it, preferably in a different directory, to avoid overwriting the raw data.

The above precautions, of making copies of your data inside your notebook, are meant to protect against rerunning your analysis or loading the file repeatedly.

# Group by

This function can group rows by a category. Typically, you will group by something like ‘Region’, which will lump together all the records with the same value in the column ‘Region’. Since the group alone is just a collection of rows, you need to apply an aggregation function to the groups summarizing them based on a specified field. The aggregation may be statistical functions (`mean()`, `sum()` …) applied to a numerical filed like ‘Profit’ or the size of the groups can be counted with `size()`.

```python
# mean of discount per 'Category'
df.groupby("Category")["Discount"].mean()

# count of rows in the different 'Category' groups
df.groupby("Category").size()
```

If you are missing the aggregation function after grouping you will see something like this `<pandas.api.typing.DataFrameGroupBy object at 0x7bc71b272340>` it tells you there is a group by object in memory, waiting to the aggregated.

It is possible to group by more than one category, effectively creating subgroups. Mind the order of the categories as it will define your breakdown levels.

```python
df.groupby(["Segment", "Region"])["Sales"].mean()
```

| Segment     | Region  |        |
| ----------- | ------- | ------ |
| Consumer    | Central | 207.94 |
|             | East    | 238.87 |
|             | South   | 233.39 |
|             | West    | 217.03 |
| Corpoarte   | Central | 234.76 |
|             | East    | 228.51 |
|             | South   | 238.99 |
|             | West    | 235.26 |
| Home Office | Central | 208.24 |
|             | East    | 253.91 |
|             | South   | 272.99 |
|             | West    | 239.44 |

You may aggregate more than one field …

```python
# aggereagte more than one field here "Sales", "Profit" and "Discount"
df.groupby("Category")[["Sales", "Profit", "Discount"]].mean()
```

|                 | Sales  | Profit | Discount |
| --------------- | ------ | ------ | -------- |
| Category        |        |        |          |
| Furniture       | 349.83 | 8.69   | 0.17     |
| Office Supplies | 119.32 | 20.32  | 0.15     |
| Technology      | 452.70 | 78.75  | 0.13     |

… and / or calculate different aggregations with the `agg()` method.

```python
# use different aggregations at once
df.groupby("Category")["Sales"].agg(["count", "mean", "median", "std"])
```

|                 | count | mean   | median | std     |
| --------------- | ----- | ------ | ------ | ------- |
| Category        |       |        |        |         |
| Furniture       | 2121  | 349.83 | 182.22 | 503.17  |
| Office Supplies | 6026  | 119.32 | 27.41  | 382.18  |
| Technology      | 1847  | 452.70 | 166.16 | 1108.65 |

Pulling it all together `groupby()` can create complex summary tables like this:

```python
df.groupby(["Region", "Category"]).agg({
    "Sales": ["sum", "mean"],
    "Profit": ["sum", "min", "max", "std"],
    "Quantity": "sum"
})
```

# Cross table

The  `crosstab()` method is built specifically for **categorical frequency distributions (contingency tables)**. It shows the interrelation of between two variables, at the cross-section of rows and columns. Each cell contains the count (or percentage) of observations that fall into both categories simultaneously. It provides a picture of the interrelation between two variables and possible interactions between them.

With the parameter `margins=True` totals of rows and columns are displayed. Combined with `normalize=...` which either calculates the row-wise `normalize='index'`, column-wise `normalize='columns'` or global percentages, certain aspects of the relations can be highlighted.

Setting `margins=True` shows row-wise (sub)totals. If we look at percentage values (normalized), the values at the right margin give us the share each row has over all rows and the margin at the bottom displays the share of 100% for each column.

```python
pd.crosstab(
    index=df_clean['Category'],  
    columns=df_clean['Segment'], 
    normalize=True , 
    margins=True).round(2)
```

![[images/Data Analysis with Pandas - crosstab.png]]

In the example the Category ‘Furniture’ has a share of 21% of all Categories (along the index), and the Segment ‘Consumer’ takes up 52% among all Segments (columns). This can be read in the respective margins.

At the intersection of Office Supplies (index) and Consumer segment (column) you will find that, 31% of all products belong to this joint group.

Using the `values=` and `aggfunc=` parameters crosstab can not just do a frequency count but also aggregate other numerical fields (`values`) for example Sales and additionally use different summary functions.

```python
pd.crosstab(
    index=[df_clean['Category'], df_clean['Segment']],
    columns=df_clean['Region'],
    values=df_clean["Sales"],
    aggfunc='sum',
    normalize="columns")
```

![[images/Data Analysis with Pandas - crosstab2.png]]

# Pivot Table

Similar to `crosstab()` pivot tables creates 2D summary matrices showing the joint distribution of two variables. Here the focus is on a specified value, other than the frequency, that is being summarized for the cross-sections of index and columns.

The default aggregation is the `mean`, while `values=...` specifies the field to aggregate. With `index=...` and `columns=...` you define the variable for the rows and columns.

```python
df.pivot_table(
        index='Category',
        columns='Segment',
        values='Sales',
        ).round()
```

![[images/Data Analysis with Pandas - pivot table-2.png]]

Pivot tables come with the margin features, which we know from crosstab and a paremter for handling missing values.

```python
df.pivot_table(
    index='Category',
    columns='Segment',
    values='Sales',
    aggfunc='sum',
    margins=True,
    dropna=True,
    ).round(1)
```

![[images/Data Analysis with Pandas - pivot table 2.png]]

For example the sum of Sales in the Category ‘Technology’ in the ‘Home Office’ Segement is \$183304.

Pivot tables can be extended in the all dimensions. Index, columns, values, and aggregation functions take more than one value. But with growing complexity the usefulness of pivot tables diminishes.

# xs() - select a cross-section

We have seen three variants to make data frames with multiple indices (MultiIndex). Selecting data at a particular level of the MultiIndex can be done with `xs()` which fetches a cross-section from the original data frame corresponding to the selected index levels.

Let’s say you created this complex MultiIndex:

```python
multiindex = df.groupby(["Region", "Category"]).agg({
    "Sales": ["sum", "mean"],
    "Profit": ["sum", "min", "max"],
    "Quantity": "sum"
})

multiindex
```

![[Data Analysis with Pandas - MultiIndex.png]]

But you’re only interested in the ‘South’ region. So you only want the three Categories under `South`. The `xs()` method by default — if no parameters are defined — looks into the first level `level=0` of the indices (`axis=0`), that is the outermost of the indices, here \`Region.

Therefore, `xs('South')`, searches for `South` in the index and returns only the rows belonging to this region, omitting the other regions.

```python
# defaults to axis=0, level=0
multiindex.xs("South") 
```

![[Data Analysis with Pandas - MultiIndex South.png]]

To choose a value from second level of the columns, specify the corresponding parameters.

The axis containing column labels is `axis=1`. To choose only one of the summary statistics on the second level of the column indices define label: `'sum'`, axis and level to choose from: `axis=1` and `level=1`.

Notice that the label of the selected level is omitted.

```python
# selects all 'sum' columns (axis=1) on the second level (level=1)
multiindex.xs("sum", axis=1, level=1) 
```

![[Data Analysis with Pandas - MultiIndex axis=1 level=1.png]]
