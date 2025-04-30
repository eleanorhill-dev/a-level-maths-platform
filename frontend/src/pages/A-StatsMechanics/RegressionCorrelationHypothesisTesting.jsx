import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../../components/CodeSnippet';
import '../../styles/TopicDetailsPage.css';

export default function RegressionCorrelationHypothesisTesting() {
    return (
        <div className="topic-container mt-4">
            <h2>Regression, Correlation, and Hypothesis Testing</h2>

            <h4>Exponential Models</h4>
            <p>Exponential models are used to represent processes that grow or decay at a constant rate. The general form of an exponential function is <em>y = a * exp(bx)</em>, where <em>a</em> and <em>b</em> are constants.</p>

            <CodeSnippet
                code={`import numpy as np
import matplotlib.pyplot as plt
from scipy.optimize import curve_fit

# Exponential model: y = a * exp(bx)
def exponential(x, a, b):
    return a * np.exp(b * x)

# Sample data (e.g., population growth)
x_data = np.array([0, 1, 2, 3, 4])
y_data = np.array([2, 4.1, 8.3, 16.5, 33.2])

# Fit the exponential model to data
params, covariance = curve_fit(exponential, x_data, y_data)

# Plot the data and the fitted curve
plt.scatter(x_data, y_data, label='Data')
plt.plot(x_data, exponential(x_data, *params), label='Fitted Exponential Model', color='red')
plt.xlabel('x')
plt.ylabel('y')
plt.legend()
plt.show()`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <p><img src="/images/regression1.png" alt="Exponential Model"></img></p>
            </div>

            <h4>Measuring Correlation</h4>
            <p>Pearson's correlation coefficient measures the linear relationship between two variables. The closer the value is to 1 or -1, the stronger the relationship.</p>

            <CodeSnippet
                code={`import numpy as np
from scipy.stats import pearsonr

# Sample data
x = np.array([1, 2, 3, 4, 5])
y = np.array([2, 4, 6, 8, 10])

# Calculate Pearson's correlation coefficient
corr, _ = pearsonr(x, y)

print(f"Pearson's correlation coefficient: {corr}")`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Pearson's correlation coefficient: 1.0`} language="text" />
            </div>

            <h4>Hypothesis Testing for Zero Correlation</h4>
            <p>Hypothesis testing for zero correlation helps determine if there is no significant linear relationship between two variables. The null hypothesis states that the correlation is zero.</p>

            <CodeSnippet
                code={`import numpy as np
from scipy.stats import pearsonr

# Sample data with no correlation
x = np.array([1, 2, 3, 4, 5])
y = np.array([1, 3, 5, 7, 9])

# Calculate Pearson's correlation and p-value
corr, p_value = pearsonr(x, y)

# Hypothesis testing
if p_value < 0.05:
    print("Reject null hypothesis: There is a significant correlation.")
else:
    print("Fail to reject null hypothesis: No significant correlation.")`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Reject null hypothesis: There is a significant correlation.`} language="text" />
            </div>

            <div className="mt-4">
                <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
                <Button href="/quiz/38" variant="success">Take Quiz</Button>
            </div>
        </div>
    );
}
