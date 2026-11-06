---
publish: true
title: Normal Distribution
created: 2026-05-02T14:06:27.799Z
modified: 2026-11-06T12:51:36.007Z
---

# Normal Distribution

Many data derived from nature or psychology tend to approximate a normal distribution. Furthermore, most parametric statistical tests, such as the t-test for comparing means or Pearson’s correlation coefficient for examining relationships between variables, assume that the data follow a normal distribution. When this assumption is not met, researchers must resort to non-parametric tests, which, although useful, are statistically less powerful and limit the accuracy of conclusions.

The **normal distribution** $\mathcal{N}(\mu, \sigma^2)$ is a continuous, symmetric bell-shaped probability density function:
$f(x) = \frac{1}{\sigma \sqrt{2\pi}} e^{- \frac{1}{2}\left( \frac{x - \mu}{\sigma} \right) ^{2}} \quad ,x \in \mathbb{R}$
It is fully defined by two parameters: $\mu$ (mean, location) and $\sigma > 0$ (standard deviation, scale).

It is symmetric around $\mu$, unimodal, and asymptotically approaches zero without bound.

The **empirical rule** states:

- 68% of probability mass within $\mu \pm \sigma$
- 95% within $\mu \pm 2\sigma$
- 99.7% within $\mu \pm 3\sigma$

Different normal distributions share shape properties but differ by shifts/scales. $\mathcal{N}(\mu_1, \sigma^2)$ and $\mathcal{N}(\mu_2, \sigma^2)$ differ only by horizontal shift $\mu_1 - \mu_2$​.

Scaling $\sigma$ stretches/compresses without changing symmetry.

# Standard Normal Distribution

The **standard normal distribution** (or **z-distribution**) is a continuous probability distribution with mean 0 and standard deviation 1, defined by its probability density function:
$f(x) = \frac{1}{1 \sqrt{2\pi}} e^{- \frac{1}{2}\left( \frac{x - 0}{1} \right) ^{2}} \quad = \quad \frac{1}{\sqrt{2\pi}} e^{-\frac{x^{2}}{2}}\frac{1}{\sqrt{2\pi}} e^{-\frac{z^2}{2}}ϕ(z)$

Any normal distribution $\mathcal{N}(\mu, \sigma^2)$ is a linear transformation of the standard normal.

A **z-score** standardizes any normal random variable to the **standard normal** $\mathcal{N}(0,1)$: $Z = \frac{X - \mu}{\sigma}$

Standardization strips away the local units (centimeters, points, dollars) and converts everything into a universal language of distance: “standard deviations away from the mean”.

The z-score then tells you how many standard deviations away from the mean a specific data point is.

1. For data: $z_i=\frac{x_i−\bar{x}}{s}$.
2. Prob: $P(X≤x)=Φ\left( \frac{x−μ}{\sigma} \right)$.
3. Quantile: $x=μ+z⋅σ$, where $z=Φ−1(p)$.

E.g., $P(−1.96≤Z≤1.96)=0.95$.

This procedure allows for the calculation of the probability of an observation occurring relative to the mean, expressed in units of standard deviation. In this way, it is possible to determine the proportion of observations that fall within one, two, or three standard deviations from the mean.

If you didn’t standardize, every single time you wanted to calculate a probability, a confidence interval, or a power analysis, a mathematician would have to solve a brutal calculus integral containing unique parameters for μ and σ.

When you build a 95% Confidence Interval, you are using the standard normal distribution.
$\text{CI} = \bar{x} \pm z \times \text{SE}$
The critical value, typically 1.96, is a coordinate in standard normal space. It tells you: “Go out exactly 1.96 standard errors in both directions from the center, and you will capture 95% of the probability mass.”

Because we standardized the sampling distribution into standard error units, we don't need a custom 95% rule for wages, a custom rule for test scores, and a custom rule for blood pressure. The number **1.96** works universally across every field of science, because every well-behaved sampling distribution, once standardized, collapses onto the exact same standard normal curve via the Central Limit Theorem.

# Connection to the Central Limit Theorem (CLT)

The CLT states that the **sampling distribution of the sample mean** approaches a normal distribution as the sample size $n$ increases, regardless of the population distribution (as long as it has finite mean and variance). Formally, for independent identically distributed random variables $X_1, \dots, X_n$ with mean $\mu$ and variance $\sigma^2$,
$\sqrt{n} \left( \bar{X}_n - \mu \right) \xrightarrow{d} \mathcal{N}(0, \sigma^2)$

This makes the normal distribution the **default assumption** for sample averages and sums in large samples.

# Importance for statistics

The CLT justifies using normal-based methods on non-normal data when $n$ is large ($n > 30$ usually works). It enables confidence intervals, hypothesis tests, and p-values even for skewed populations. Without it, most inferential stats would fail on real-world data.

# How to work with it

- **Standardize**: $z = \frac{x - \mu}{\sigma}$​ to use standard normal tables or functions.
- **Probabilities**: Use `scipy.stats.norm.cdf(z)` for P($Z \leq z$).
- **Quantiles**: `scipy.stats.norm.ppf(p)` for the z-score where $P(Z \leq z) = p$(e.g., 1.96 for 95%).
- **Sample**: `numpy.random.normal(mu, sigma, size)`.

For example, 95% of data lies within $\mu \pm 1.96\sigma$

# Key Assumptions

- Continuous support ($-\infty, \infty$)
- Independence of observations for inference
- Additive, independent errors $\epsilon_i \sim \mathcal{N}(0, \sigma^2)$ in regression $Y = f(X) + \epsilon$

Violations (e.g., heavy tails) invalidate tests/intervals.

# Features Making It Useful

- **Closed-form math**: Easy CDF, quantiles, sums.
- **Maximum entropy**: Most uncertain given mean/variance.
- **Stability under linear ops**: Sums/products stay normal.
- **CLT convergence**: Sample means → $\mathcal{N}(\mu, \sigma^2/n)$ for $n$ large, justifying normality for averages/tests regardless of population.

These enable t-tests, ANOVA, regression despite non-normal data (via CLT).
