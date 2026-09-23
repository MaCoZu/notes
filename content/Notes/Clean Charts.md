---
publish: true
title: Clean Charts
description: Choosing the right charts and cleaning them.
created: 2026-03-31
modified: 2026-09-23T19:04:49.754Z
tags:
  - design
---

### Tables vs. Graphs:

_Tables_ are ideal to look up individual values. The ‘tabular’ format of rows and columns facilitates tracing the information.

_Graphs_ however reveal the shape of the data, which can not easily be gleaned by looking at a table.

![[images/table_vs_graph.png]]

### Quantitative vs. Categorical Data

_Quantitative data_ is numerical information that can be measured or counted.

_Qualitative data_ is descriptive information about characteristics that are difficult to describe numerically. These qualities may be represented by a name, symbol, or a number code.

Quantitative and qualitative data are often used together to get a full picture of a population. For example in a survey information about occupation (quality) and income (quantity) complement each other.

_Qualitative data_ can still be categorized by its [level of measurement](https://en.wikipedia.org/wiki/Level_of_measurement).

- _Nominal data_ → are categories without order, like colors or names. They are differentiated by their name (nominally) and analysis is limited to recording the types and frequency.
- _Ordinal data_ → has a natural order or ranking (unsatisfied, neutral, satisfied). But the difference between these ranks is either not measurable, unequal or meaningless.
- _Interval data_ → consists of quantitative data but collected into equal intervals like $[10°C-20°C], [20°C-30°C]$. Interval data can be ranked and the difference between data points is measurable. But intervals lack a true zero point, in the case of degrees $0°C$ does not mean the absence of temperature. Also, a multiplication or division is not meaningful, $20°C\,(68°F)$ is not twice as much as $10°C\,(50°F)$, because the ratio changes depending on the scale.

### Displaying Data

Numbers become meaningful when compared to related numbers. One of the most effective ways to compare quantitative data is to juxtapose two dimensions on a Cartesian coordinate system, or x-y plane. This works well because the eye immediately grasps the line length and 2D position, while areas like boxes of different sizes or slices of a pie are harder to differentiate.

For example, the larger circle has 16 times the area of the smaller circle. Most viewers will underestimate the difference. Curved edges and the lack of a baseline lead to a consistent underestimation of the actual percentages (Cleveland & McGill, 1984).

![[images/Clean Charts - circle size.png]]

Certain relationships lend themselves to specific chart types better than others.

**Bar charts** have many applications: they first and foremost encourage focus and comparison of individual values. The length of the bar encodes the values in a highly readable way, as long as the bars start at zero.

Bars are a means of encoding percentages, while they avoid the visual distortion pie charts produce. A stacked bar chart shows part-of-the-whole as individual segments of a single bar. Bars that represent frequencies of a single random variable are called histograms and show the distribution of the variable over the range of possible values.

Bars organized around a zero axis (aka Butterfly chart) effectively show deviations from a target, such as the break-even point in business or net debt/income.

![[images/Clean Charts - Bars.png]]

**Points** emphasize individual values, rather than the shape of those values. They can encode values along two quantitative scales simultaneously (correlation) in a scatter plot, and may also replace bars if the scale does not include zero.

**Lines** show the progression of data over time and are therefore ideal for time series data, displaying the shape, trends, and patterns. Plotting two lines side by side yields a comparison of two series over time. Lines may complement histograms with a continuous frequency polygon or add a regression line to a scatter plot.

**Small multiples** show many similar charts of different data in a very small space, so that they can be seen and compared all at once. By keeping the scale consistent across all the miniature charts, the condensed information is still very readable.

**Box plots** show the distribution of data, similar to histograms, with the additional features like the median, quantiles, and whiskers, all helping the user see the skew and outliers of the distribution more clearly.

### Remove Distraction and “Chart Junk”

Anything that does not contribute to the meaning of the data distracts communication. Remove things like bright colors and fancy backgrounds. Subdue grid lines and labels to

It is a good basic practice to use relatively soft colors in graphs, such as lowly saturated, natural colors found in nature, reserving the use of bright, dark, and highly saturated colors for those occasions when you need to make something stand out.

Use only 5 to 10 major tick marks on an axis to avoid clutter.

Hide distracting data series, while keeping the accessible on demand, use filters/slicers to allow users to focus or zoom out.

### Readability

- _Highlight_ specific data with contrasting borders, thicker lines, or larger point sizes. Guide the eye to the important stuff.
- _Label lines directly_ at their endpoints instead of using a distant legend.
- Position variables you want to compare next to each other in the layout.
- _Include notes directly_ on the graph to describe specific events or provide instructions on how to interpret complex views.
- _Arrange legend labels_ in the same order as the data bars/lines they represent.
- On very large graphs, place _scales on both sides_ to help the eye identify values accurately.
- Let your _axis scale to extend slightly below the lowest and above the highest value_. Give some breathing room.
- For scales involving positive and negative numbers, _position the axis line at zero_, as clear visual marker.

Source: [Few, S. (2005). Effectively Communicating Numbers: Selecting the Best Means and Manner of Display, Perceptual Edge.](https://perceptualedge.com/articles/Whitepapers/Communicating_Numbers.pdf)
