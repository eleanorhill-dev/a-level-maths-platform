import React from 'react';
import { useNavigate } from "react-router-dom";
import CodeSnippet from '../../components/CodeSnippet'; 
import '../../styles/TopicDetailsPage.css';

export default function Correlation() {
    const navigate = useNavigate();
    return (
        <div className="topic-container mt-4">
            <h2>Correlation</h2>

            <h4>Correlation</h4>
            <p>Correlation measures the strength and direction of the relationship between two variables. The correlation coefficient <em>r</em> ranges from -1 to 1.</p>

            <CodeSnippet
                code={`# Example: Calculating Correlation
import numpy as np

x = [1, 2, 3, 4, 5]
y = [2, 4, 5, 4, 5]

correlation = np.corrcoef(x, y)[0, 1]

print("Correlation Coefficient:", correlation)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Correlation Coefficient: 0.7745966692414834`} language="text" />
            </div>

            <h4>Linear Regression</h4>
            <p>Linear regression finds the best-fitting straight line (line of best fit) through a set of points. The equation is usually written as <em>y = a + bx</em>.</p>

            <CodeSnippet
                code={`# Example: Linear Regression
import numpy as np
from scipy.stats import linregress

x = [1, 2, 3, 4, 5]
y = [2, 4, 5, 4, 5]

slope, intercept, r_value, p_value, std_err = linregress(x, y)

print("Regression Line: y =", round(intercept, 2), "+", round(slope, 2), "x")
print("Correlation Coefficient (r):", r_value)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Regression Line: y = 2.2 + 0.6 x\nCorrelation Coefficient (r): 0.7745966692414834`} language="text" />
            </div>

            <div className="mt-4">
            <button className="me-2 secondary" onClick={() => navigate("/topics")}>Return to Topics</button>
            <button className="me-2 success" onClick={() => navigate("/quiz/18")}>Take Quiz</button>
            </div>
        </div>
    );
}
