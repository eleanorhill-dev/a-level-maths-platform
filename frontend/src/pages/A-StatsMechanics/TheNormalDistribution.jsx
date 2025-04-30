import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../../components/CodeSnippet';
import '../../styles/TopicDetailsPage.css';

export default function TheNormalDistribution() {
    return (
        <div className="topic-container mt-4">
            <h2>The Normal Distribution</h2>

            <h4>The Normal Distribution</h4>
            <p>The normal distribution is a symmetric, bell-shaped probability distribution. It is defined by its mean (μ) and standard deviation (σ).</p>

            <CodeSnippet
                code={`# Example: Plotting a normal distribution
import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import norm

mu = 0  # Mean
sigma = 1  # Standard deviation

x = np.linspace(-5, 5, 100)
y = norm.pdf(x, mu, sigma)

plt.plot(x, y, label="Normal Distribution")
plt.title("Normal Distribution (Mean=0, SD=1)")
plt.xlabel("x")
plt.ylabel("Probability Density")
plt.legend()
plt.show()`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <p><img src="/images/normaldistribution1.png" alt="Exponential Model"></img></p>
            </div>

            <h4>Finding Probabilities for Normal Distributions</h4>
            <p>To find probabilities for a normal distribution, we use the cumulative distribution function (CDF). The CDF gives the probability that a random variable is less than or equal to a specific value.</p>

            <CodeSnippet
                code={`# Example: Finding the probability for a normal distribution
P = norm.cdf(1, mu, sigma)  # P(X <= 1)
print(f"Probability P(X <= 1): {P}")`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Probability P(X <= 1): 0.841344`} language="text" />
            </div>

            <h4>The Inverse Normal Distribution Function</h4>
            <p>The inverse normal distribution function (also called the quantile function) is used to find the value corresponding to a given probability.</p>

            <CodeSnippet
                code={`# Example: Inverse normal distribution function
P_value = 0.841344  # The probability
x_value = norm.ppf(P_value, mu, sigma)  # Inverse CDF
print(f"Inverse normal value for P={P_value}: {x_value}")`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Inverse normal value for P=0.841344: 1.0`} language="text" />
            </div>

            <h4>The Standard Normal Distribution</h4>
            <p>The standard normal distribution has a mean of 0 and a standard deviation of 1. It is a special case of the normal distribution.</p>

            <CodeSnippet
                code={`# Example: Standard normal distribution
P_standard = norm.cdf(1)  # Standard normal distribution with mean 0, SD 1
print(f"Probability for standard normal distribution P(X <= 1): {P_standard}")`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Probability for standard normal distribution P(X <= 1): 0.841344`} language="text" />
            </div>

            <h4>Finding μ and σ</h4>
            <p>We can calculate the mean (μ) and standard deviation (σ) from a sample of data. For a normal distribution, these values are important to define the shape of the curve.</p>

            <CodeSnippet
                code={`# Example: Finding mean and standard deviation from data
data = [5, 7, 8, 6, 5, 7, 9, 6, 7]
mu_est = np.mean(data)  # Mean
sigma_est = np.std(data)  # Standard deviation

print(f"Estimated Mean: {mu_est}")
print(f"Estimated Standard Deviation: {sigma_est}")`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Estimated Mean: 6.666...
Estimated Standard Deviation: 1.247219`} language="text" />
            </div>

            <h4>Approximating a Binomial Distribution</h4>
            <p>A binomial distribution can be approximated by a normal distribution when the number of trials is large, and the probability of success is not too close to 0 or 1. This approximation uses the mean and standard deviation of the binomial distribution.</p>

            <CodeSnippet
                code={`# Example: Approximating a binomial distribution with a normal distribution
n = 100  # Number of trials
p = 0.5  # Probability of success
mu_binomial = n * p
sigma_binomial = np.sqrt(n * p * (1 - p))

# Approximate using normal distribution
P_binomial = norm.cdf(55, mu_binomial, sigma_binomial) - norm.cdf(45, mu_binomial, sigma_binomial)
print(f"Probability for binomial distribution (approx.): {P_binomial}")`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Probability for binomial distribution (approx.): 0.682689`} language="text" />
            </div>

            <h4>Hypothesis Testing with the Normal Distribution</h4>
            <p>In hypothesis testing, we often use the normal distribution to test whether a sample mean is significantly different from a hypothesized value. This involves calculating the z-score and comparing it to a critical value.</p>

            <CodeSnippet
                code={`# Example: Hypothesis testing using normal distribution
sample_mean = 52
mu_0 = 50  # Hypothesized population mean
sigma = 10  # Standard deviation
n = 30  # Sample size

# Calculate the z-score
z_score = (sample_mean - mu_0) / (sigma / np.sqrt(n))

# Critical value for 95% confidence (one-tailed)
critical_value = norm.ppf(0.95)

print(f"Z-score: {z_score}")
print(f"Critical value: {critical_value}")`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Z-score: 1.0954\nCritical value: 1.644853`} language="text" />
            </div>

            <div className="mt-4">
                <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
                <Button href="/quiz/40" variant="success">Take Quiz</Button>
            </div>
        </div>
    );
}
