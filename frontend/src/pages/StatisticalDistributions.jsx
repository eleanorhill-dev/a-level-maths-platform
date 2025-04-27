import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../components/CodeSnippet'; 
import '../styles/TopicDetailsPage.css';

export default function StatisticalDistributions() {
    return (
        <div className="topic-container mt-4">
            <h2>Statistical Distributions</h2>

            <h4>Probability Distributions</h4>
            <p>A probability distribution describes how the values of a random variable are distributed. It tells us the likelihood of different outcomes.</p>

            <CodeSnippet
                code={`# Example: Probability Distribution (Discrete)
import numpy as np
import matplotlib.pyplot as plt

# Define possible outcomes and their probabilities
outcomes = [1, 2, 3, 4, 5, 6]
probabilities = [1/6, 1/6, 1/6, 1/6, 1/6, 1/6]

# Create bar plot for the distribution
plt.bar(outcomes, probabilities)
plt.title("Probability Distribution for a Fair Die")
plt.xlabel("Outcomes")
plt.ylabel("Probability")
plt.show()`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <p><img src="/images/statisticaldistributions1.png" alt="Bar Plot"></img></p>
            </div>

            <h4>The Binomial Distribution</h4>
            <p>The binomial distribution is used to model the number of successes in a fixed number of independent trials, each with the same probability of success.</p>

            <CodeSnippet
                code={`# Example: Binomial Distribution
import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import binom

# Parameters: number of trials (n) and probability of success (p)
n = 10  # trials
p = 0.5  # success probability

# Binomial distribution for different numbers of successes
x = np.arange(0, n+1)
pmf = binom.pmf(x, n, p)

# Plotting the Binomial distribution
plt.bar(x, pmf)
plt.title(f"Binomial Distribution (n={n}, p={p})")
plt.xlabel("Number of Successes")
plt.ylabel("Probability Mass Function (PMF)")
plt.show()`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <p><img src="/images/statisticaldistributions2.png" alt="Binomial Distribution"></img></p>
            </div>

            <h4>Cumulative Probabilities</h4>
            <p>Cumulative probability refers to the probability that a random variable takes a value less than or equal to a specific value. The cumulative distribution function (CDF) is often used to calculate this.</p>

            <CodeSnippet
                code={`# Example: Cumulative Probability
import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import binom

# Parameters: number of trials (n) and probability of success (p)
n = 10  # trials
p = 0.5  # success probability

# Cumulative distribution for the binomial distribution
x = np.arange(0, n+1)
cdf = binom.cdf(x, n, p)

# Plotting the CDF
plt.plot(x, cdf, marker='o')
plt.title(f"Cumulative Probability (n={n}, p={p})")
plt.xlabel("Number of Successes")
plt.ylabel("Cumulative Probability")
plt.show()`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <p><img src="/images/statisticaldistributions3.png" alt="Cumulative Probability"></img></p>
            </div>

            <div className="mt-4">
                <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
                <Button href="/quiz/20" variant="success">Take Quiz</Button>
            </div>
        </div>
    );
}
