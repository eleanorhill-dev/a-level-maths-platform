import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../components/CodeSnippet'; 
import '../styles/TopicDetailsPage.css';

export default function MeasuresOfLocationAndSpread() {
    return (
        <div className="topic-container mt-4">
            <h2>Measures of Location and Spread</h2>

            <h4>Measures of Central Tendency</h4>
            <p>Measures of central tendency describe the center of a data set. The most common are the mean, median, and mode.</p>

            <CodeSnippet
                code={`# Example: Measures of Central Tendency
import statistics

data = [2, 4, 4, 4, 5, 5, 7, 9]

mean = statistics.mean(data)
median = statistics.median(data)
mode = statistics.mode(data)

print("Mean:", mean)
print("Median:", median)
print("Mode:", mode)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Mean: 5.0\nMedian: 4.5\nMode: 4`} language="text" />
            </div>

            <h4>Other Measures of Location</h4>
            <p>Other location measures include percentiles and quartiles, which split the data into equal parts.</p>

            <CodeSnippet
                code={`# Example: Quartiles
import numpy as np

data = [2, 4, 4, 4, 5, 5, 7, 9]

q1 = np.percentile(data, 25)
q2 = np.percentile(data, 50)  # Median
q3 = np.percentile(data, 75)

print("Q1 (25th percentile):", q1)
print("Q2 (Median):", q2)
print("Q3 (75th percentile):", q3)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Q1 (25th percentile): 4.0\nQ2 (Median): 4.5\nQ3 (75th percentile): 5.5`} language="text" />
            </div>

            <h4>Measures of Spread</h4>
            <p>Measures of spread describe how much the data varies. Common examples include the range and interquartile range (IQR).</p>

            <CodeSnippet
                code={`# Example: Range and Interquartile Range (IQR)
range_value = max(data) - min(data)
iqr = q3 - q1

print("Range:", range_value)
print("Interquartile Range (IQR):", iqr)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Range: 7\nInterquartile Range (IQR): 1.5`} language="text" />
            </div>

            <h4>Variance and Standard Deviation</h4>
            <p>Variance measures the average squared deviation from the mean. Standard deviation is the square root of the variance, showing spread in original units.</p>

            <CodeSnippet
                code={`# Example: Variance and Standard Deviation
variance = statistics.variance(data)
stdev = statistics.stdev(data)

print("Variance:", variance)
print("Standard Deviation:", stdev)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Variance: 4.571428571428571\nStandard Deviation: 2.138089935299395`} language="text" />
            </div>

            <h4>Coding</h4>
            <p>Coding simplifies calculations by transforming data. For example, subtracting a constant or dividing by a constant to make calculations easier without changing the spread characteristics.</p>

            <CodeSnippet
                code={`# Example: Coding
# Original data
data = [10, 12, 14, 16, 18]

# Subtract 10 from each value (shift coding)
shifted_data = [x - 10 for x in data]

# Divide each value by 2 (scale coding)
scaled_data = [x / 2 for x in shifted_data]

print("Shifted Data:", shifted_data)
print("Scaled Data:", scaled_data)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Shifted Data: [0, 2, 4, 6, 8]\nScaled Data: [0.0, 1.0, 2.0, 3.0, 4.0]`} language="text" />
            </div>

            <div className="mt-4">
                <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
                <Button href="/quiz/16" variant="success">Take Quiz</Button>
            </div>
        </div>
    );
}
