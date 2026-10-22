---
publish: true
title: Data Analysis with Pandas
created: 2026-10-12T09:35:06.004Z
modified: 2026-10-22T18:25:15.361Z
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

If something breaks now, you have points to return to. If you stored some interim results, they are now at hand in a special variable.

How many backstops you want to build in is a trade-off between safety and cleanliness. The more points of return the messier your notebook. If you’re making a lot of copies, it is maybe time to start a new notebook and keep your notebooks focused on a few tasks only. Read [this](https://coderpad.io/blog/data-science/mastering-jupyter-notebooks-best-practices-for-data-science/) to learn how to tame notebook chaos.

## Data frame vs. actual file

With original data frame, I mean the raw data loaded in your notebook, which is different from the actual file (CSV or otherwise) holding that data. A copy of the actual file should be stored away securely, to not overwrite it accidentally.

In your notebooks you want to secure your raw data frame mostly to avoid loading it more than once, have a point of return if you messed up, and store interim results.

# Group by

This function can group rows in a column, typically some category like ‘Region’ or ‘Segment’ and aggregate a specified field for each group. Aggregation may be statistical functions (`mean()`, `sum()` …) or the size of the group →  `size()`.

```python
# mean of discount per 'Category'
df.groupby("Category")["Discount"].mean()

# count of rows in the different 'Category' groups
df.groupby("Category").size()
```

If you are missing the aggregation function after grouping you will see a something like this `<pandas.api.typing.DataFrameGroupBy object at 0x7bc71b272340>` which tells you there is a group by object in memory, waiting to the aggregated.

Aggregation summarizes multiple records in the group by the chosen variables and aggregations. It is possible to group by more than one category, effectively creating subgroups. Mind the order of the categories as it will define your breakdown levels.

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

# Pivot Table

Similar to the `groupby()` logic from above with `pivot_table()` you get a cross table with summary figures. Pivot tables come with features like totals at the margins and handling of missing values.

```python
# aggregation function defualts to mean
pd.pivot_table(df, values="Sales", index="Region", margins=True, margins_name="Overall Mean")
```

|              | Sales  |
| ------------ | ------ |
| Region       |        |
| Central      | 215.77 |
| East         | 238.33 |
| South        | 241.80 |
| West         | 226.49 |
| Overall Mean | 229.85 |

The aggregation is the `mean` by default, `values=...` specifies the field to aggregate and `index=...` produces groups of the named category field in the rows. Once you add further categories in the `columns=...` you get a table where the groups in the rows and in the columns are jointly summarized. You will find the joint aggregation figure, of the two categories you are interested in, at the intersection of the corresponding row and column.

```python
pd.pivot_table(df,
               values=["Sales"],
               columns=["Category"],
               index="Region",
               aggfunc=["sum"],
               margins=True,
               margins_name="Total Sales").round(1)
```

![[Data Analysis with Pandas - pivot table.png]]

For example the sum of Sales in the Category ‘Technology’ in the ‘South’ Region is \$148771.9. In the code above the fields `values`, `columns`, `index` and `aggfunc` can take list of attributes producing multi-index pivot tables. But with growing complexity the usefulness of pivot tables diminishes, that is to say: keep it simple.
