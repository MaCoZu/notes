---
title: Typography Lab
---

# Typography Lab

Use this page to test the visual rhythm of your site without rebuilding the full documentation set.

## Heading Two

This is a normal paragraph with **bold text**, *italic text*, and a [link]. Try changing the font, size, line height, and measure in `quartz/styles/custom.scss`.

> A short quotation is useful for testing indentation, contrast, and line length.

### Heading Three

- An ordinary list item
- A second item with a little more text to test wrapping

1. First numbered item
2. Second numbered item

```ts
const typography = "deliberate";
console.log(typography);
```

```python
df = pd.read_csv()
```

| Element | What to inspect |
| --- | --- |
| Body text | Line height and reading width |
| Headings | Scale and spacing |
| Code | Font and contrast |

## Math

Inline math like $x^2 + y^2 = z^2$ here and then back to normal-running text to compare against
the stand-alone blocks below.

A single centered display equation:

$$
\int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt{\pi}
$$

Fractions and stacked limits:

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a} \qquad
\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}
$$

Aligned system of equations:

$$
\begin{aligned}
a &= b + c \\
d &= e + f
\end{aligned}
$$

A piecewise definition with cases:

$$
f(x) = \begin{cases}
x^2, & x \ge 0 \\
-x^2, & x < 0
\end{cases}
$$

A matrix:

$$
\begin{pmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9
\end{pmatrix}
$$

A longer formula that may overflow its measure — test the horizontal scroll and line wrapping:

$$
\mathcal{L}\{f(t)\} = \int_{0}^{\infty} e^{-st} f(t)\,dt
\qquad\Longleftrightarrow\qquad
f(t) = \frac{1}{2\pi i} \int_{\sigma - i\infty}^{\sigma + i\infty} e^{st} F(s)\,ds
$$

## Aligned equations

Both inline `$x = 1$` and display `$$y = 2$$` forms are supported. For multi-line
equations, both `align` and `aligned` render (the plugin normalises `align` to KaTeX's
`aligned` behind the scenes):

$$
\begin{align}
a &= b + c \\
d &= e + f
\end{align}
$$