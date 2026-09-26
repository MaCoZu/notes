---
publish: true
title: AB testing
created: 2026-09-21T16:17:59.931Z
modified: 2026-09-26T14:53:11.437Z
tags:
  - topic/data
  - status/review
---

## A/B Testing

A/B testing, also known as split testing, is a statistical method used to compare two different alternatives (A and B).

Mathematically, A/B testing is no different from a hypothesis test, but applied to digital product marketing, and UX design.

In hypotheses testing one usually has a control group and a treatment group to observe. In A/B testing users of a service or visitors of a website are randomly divided and served different alternatives (A and B) of a product. The test determines which variant has the better efficacy in terms of marketing metrics.

Depending on the data collected discrete or continuous metrics can be tested.

**Binomial Metrics**

- [Click-through rate](https://en.wikipedia.org/wiki/Click-through_rate) – if a user is shown an advertisement, do they click on it?
- [Conversion rate](https://en.wikipedia.org/wiki/Conversion_rate_optimization) – if a user is shown an advertisement, do they convert into customers?
- [Bounce rate](https://en.wikipedia.org/wiki/Bounce_rate) – The proportion of visitors who enter the site and leave after viewing only a single page.

**Continuous Metrics**

- [Average revenue per user](https://en.wikipedia.org/wiki/Average_revenue_per_user) – how much revenue does a user generate in a month?
- [Average session duration](https://en.wikipedia.org/wiki/Session_\(web_analytics\)) – for how long does a user stay on a website in a session?
- [Average order value](https://www.optimizely.com/optimization-glossary/average-order-value/) – what is the total value of the order of a user?

## Example: Click-through Rates

Suppose you want to compare two different versions of the “Add to Cart” button (A and B) on your website, to see which results in a higher user interaction or click-through rate (CTR).

You randomly divide your visitors into two groups:

- Group **A** sees version A of the button.
- Group **B** sees version B of the button.

After a specified period, you compare the percentage of visitors who clicked on the button, the Click-through Rate.

$$
\begin{aligned}
CTR &= \frac{\text{Number of Clicks}}{\text{Number of Visitors}} \times 100
\end{aligned}
$$

But simply comparing percentage wouldn’t be meaningful, because any observed difference between the two samples could be due to random sampling noise. To assess the **statistical significance** of our findings we resort to hypothesis testing.

## Hypotheses testing:

In hypothesis testing the null hypothesis ($H_0$) assumes that there is no significant difference between the two groups, while the alternative hypothesis ($H_1$) assumes that there is a significant difference.

$$
\begin{align}
H_0: CTR_A = CTR_B \\
H_1: CTR_A \neq CTR_B
\end{align}
$$

### Test Statistic:

We can use the two-sample Z-test to compare the two proportions. Note that we do not use percentages in the formula but **decimal proportions**.

The test statistic (Z) is calculated as:

$$
\begin{aligned}
Z &= \frac{p_A - p_B}{{\sqrt{\hat{p}(1 - \hat{p}) \left(\frac{1}{n_A} + \frac{1}{n_B}\right)}}}
\end{aligned}
$$

where:
$p_A$ = $CTR_A$ or percentage of visitors who clicked the button for Group A
$p_B$ = $CTR_B$,
$n_A$ = Number of visitors in Group A,
$n_B$ = Number of visitors in Group B.
$\hat{p}$ = Pooled proportion

$$
\begin{aligned}
\hat{p} &= \frac{\text{Total Clicks (Group A + Group B)}}{\text{Total Visitors (Group A + Group B)}} = \frac{x_A + x_B}{n_A + n_B}
\end{aligned}
$$

Let’s understand the Z-score formula as it is an important concept in statistics.

The $\text{Numerator} = p_A - p_B$ compares the independent sample proportions, if $p_A - p_B=0$ there is no observed difference between the two.

$H_0: p_A = p_B = p$ is at the same time the assumption and viewpoint of any hypothesis test. And by extension we assume there is only one true underlying conversion rate $p$ from the exact same single pool users. While any difference observed between $p_A$ and $p_B$ is by chance only.

Since $H_0$ assumes $p_A$ and $p_B$ are actually equal to a single value $p$, our best possible estimate of that single true $p$ comes from **combining (pooling) all your data together**:

$$
\begin{aligned}
\hat{p} &= \frac{\text{Total Clicks (Group A + Group B)}}{\text{Total Visitors (Group A + Group B)}} = \frac{x_A + x_B}{n_A + n_B}
\end{aligned}
$$

If the difference is $|p_A - p_B|>0$ the assessment of a significant effect depends on the denominator which functions as a scaling unit, it is also called standard error of the difference.

$$
\begin{aligned}
Z &= \frac{\text{Observed Signal}}{\text{Background Noise}} = \frac{\text{Difference in Sample Proportions}}{\text{Pooled Standard Error}}=\frac{p_A - p_B}{{\sqrt{\hat{p}(1 - \hat{p}) \left(\frac{1}{n_A} + \frac{1}{n_B}\right)}}}
\end{aligned}
$$

The Numerator ($p_A - p_B$): Uses your **separate sample estimates** to capture the observed signal/difference in your real-world data.

The Denominator: Uses the **single pooled estimate** to set the benchmark for how much noise would occur if $H_0$ were true.

The variance term $\hat{p}(1 - \hat{p})$ represents the variance of success ($\hat{p}$) and failure ($1-\hat{p}$) is a binomial distribution, it measures the randomness, which is highest if failure and success have the same chance ($\hat{p}=1-\hat{p}=0.5$) of occurring.

```
Variance p(1-p)

0.25   |          *           (Peak Randomness at p = 0.5)
       |        *   *
0.16   |      *       *
       |    *           *
  0    +---*-------------*---- Probability (p)
          0.0     0.5   1.0
```

Dividing $\hat{p}(1 - \hat{p})$ by the respective sample sizes ($n_A$ and $n_B$) shrinks the standard error as observations increase. The intuition is straightforward: larger sample sizes yield higher precision and reduce background noise.

Under the rules of probability, when combining two independent random variables, their individual variances add up because uncertainty accumulates from both samples:

$$
\begin{aligned}
\text{Pooled Variance} &= \frac{\hat{p}(1 - \hat{p})}{n_A} + \frac{\hat{p}(1 - \hat{p})}{n_B} = \hat{p}(1 - \hat{p}) \left(\frac{1}{n_A} + \frac{1}{n_B}\right)
\end{aligned}
$$

Finally, taking the square root converts this accumulated variance back into standard units, yielding the **Pooled Standard Error**:

$$
\begin{aligned}
\text{SE}_{\text{pooled}} &= \sqrt{\hat{p}(1 - \hat{p}) \left(\frac{1}{n_A} + \frac{1}{n_B}\right)}
\end{aligned}
$$

Once you divide the numerator ($p_A - p_B$) by this pooled denominator, the output is a dimensionless $Z$-value:

$$
\begin{aligned}
Z &= \frac{p_A - p_B}{\sqrt{\hat{p}(1 - \hat{p}) \left(\frac{1}{n_A} + \frac{1}{n_B}\right)}}
\end{aligned}
$$

This $Z$-statistic tells you exactly how many standard errors the observed signal ($p_A - p_B$) is away from 0 (the Null Hypothesis expectation).

## Critical Region and P-value:

We can compare the test statistic $(Z)$ to the critical value from the standard normal distribution $(Z_{α/2})$ at the chosen significance level $(α)$.

Alternatively, we can calculate the p-value associated with the test statistic and compare it to the significance level.

If the test statistic falls into the critical region $(|Z| > Z_{\alpha/2})$ or if the p-value is less than the significance level $(α)$, we reject the null hypothesis and conclude that there is a significant difference in the click-through rates between the two groups.

If the test statistic does not fall into the critical region $(|Z| \leq Z_{\alpha/2})$ or if the p-value is greater than the significance level $(α)$, we fail to reject the null hypothesis, and we cannot conclude that there is a significant difference in the click-through rates between the two groups.

## Python Implementation

```python
import numpy as np
from scipy import stats

def ab_test_two_proportion_ztest(clicks_A, n_A, clicks_B, n_B, alpha=0.05):
    """
    Performs a two-sample pooled Z-test for two independent proportions (e.g., CTR).
    """
    # 1. Sample Proportions (Decimals)
    p_A = clicks_A / n_A
    p_B = clicks_B / n_B

    # 2. Pooled Proportion under H0 (p_A = p_B)
    p_pooled = (clicks_A + clicks_B) / (n_A + n_B)

    # 3. Pooled Standard Error (Denominator)
    se_pooled = np.sqrt(p_pooled * (1 - p_pooled) * ((1 / n_A) + (1 / n_B)))

    # 4. Calculate Z-Statistic
    z_stat = (p_A - p_B) / se_pooled

    # 5. Calculate Two-Tailed P-Value
    p_value = 2 * (1 - stats.norm.cdf(abs(z_stat)))

    # 6. Critical Value (Z_alpha/2)
    z_critical = stats.norm.ppf(1 - alpha / 2)

    # Print Results Summary
    print("=" * 55)
    print("A/B TEST TWO-SAMPLE PROPORTION Z-TEST RESULTS")
    print("=" * 55)
    print(f"Group A (Control):     CTR = {p_A:.4f} ({p_A*100:.2f}%) | n = {n_A}")
    print(f"Group B (Treatment):   CTR = {p_B:.4f} ({p_B*100:.2f}%) | n = {n_B}")
    print(f"Observed Signal (pA - pB): {p_A - p_B:.4f}")
    print(f"Pooled Standard Error:     {se_pooled:.4f}")
    print("-" * 55)
    print(f"Calculated Z-Statistic:    {z_stat:.4f}")
    print(f"Critical Z-Value (α={alpha}): ±{z_critical:.4f}")
    print(f"P-Value:                  {p_value:.4e}")
    print("-" * 55)

    if abs(z_stat) > z_critical:
        print("Decision: REJECT H₀")
        print("Conclusion: There is a statistically significant difference between CTR_A and CTR_B.")
    else:
        print("Decision: FAIL TO REJECT H₀")
        print("Conclusion: The difference between CTR_A and CTR_B is not statistically significant.")
    print("=" * 55)

# Example Usage:
# Group A: 120 clicks out of 1,000 visitors (CTR = 12.0%)
# Group B: 155 clicks out of 1,000 visitors (CTR = 15.5%)
ab_test_two_proportion_ztest(clicks_A=120, n_A=1000, clicks_B=155, n_B=1000, alpha=0.05)
```
