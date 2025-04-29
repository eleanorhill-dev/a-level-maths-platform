import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../../components/CodeSnippet';
import '../../styles/TopicDetailsPage.css';

export default function HypothesisTesting() {
    return (
        <div className="topic-container mt-4">
            <h2>Hypothesis Testing</h2>

            <h4>Hypothesis Testing</h4>
            <p>Hypothesis testing is a method used to determine whether there is enough evidence to reject a null hypothesis (H₀) in favor of an alternative hypothesis (H₁).</p>

            <CodeSnippet
                code={`# Example: Simple Hypothesis Test
# Null Hypothesis: mean = 50
# Sample mean = 53, standard deviation = 10, sample size = 30

import scipy.stats as stats
import numpy as np

sample_mean = 53
population_mean = 50
std_dev = 10
n = 30

# Calculate test statistic (z-score)
z = (sample_mean - population_mean) / (std_dev / np.sqrt(n))
print("Test Statistic (z):", z)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Test Statistic (z): 1.643`} language="text" />
            </div>

            <h4>Finding Critical Values</h4>
            <p>Critical values are threshold values that define regions where the null hypothesis is rejected. They depend on the chosen significance level (commonly 5% or 1%).</p>

            <CodeSnippet
                code={`# Example: Finding Critical Value for 5% significance level (one-tailed)
critical_value = stats.norm.ppf(0.95)  # 95% to the left
print("Critical Value (5% significance, one-tailed):", critical_value)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Critical Value (5% significance, one-tailed): 1.6448536269514722`} language="text" />
            </div>

            <h4>One-Tailed Tests</h4>
            <p>In a one-tailed test, the alternative hypothesis predicts the direction of the effect (e.g., greater than or less than).</p>

            <CodeSnippet
                code={`# Example: One-Tailed Test
if z > critical_value:
    print("Reject H₀: There is enough evidence to support H₁")
else:
    print("Fail to reject H₀: Not enough evidence to support H₁")`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`# Result depends on calculated z and critical value.
                
# In the above examples, the output would be:
Fail to reject H₀: Not enough evidence to support H₁`} language="text" />
            </div>

            <h4>Two-Tailed Tests</h4>
            <p>In a two-tailed test, the alternative hypothesis tests for deviations in both directions (either significantly greater or significantly less).</p>

            <CodeSnippet
                code={`# Example: Two-Tailed Test
# For 5% significance, split between two tails (2.5% each)
lower_critical = stats.norm.ppf(0.025)
upper_critical = stats.norm.ppf(0.975)

print("Lower Critical Value:", lower_critical)
print("Upper Critical Value:", upper_critical)

# Decision rule
if z < lower_critical or z > upper_critical:
    print("Reject H₀: There is enough evidence to support H₁")
else:
    print("Fail to reject H₀: Not enough evidence to support H₁")`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Lower Critical Value: -1.96\nUpper Critical Value: 1.96

# In the above examples, the output would be:
Fail to reject H₀: Not enough evidence to support H₁`} language="text" />
            </div>

            <div className="mt-4">
                <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
                <Button href="/quiz/21" variant="success">Take Quiz</Button>
            </div>
        </div>
    );
}
