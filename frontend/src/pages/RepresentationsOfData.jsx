import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../components/CodeSnippet'; 
import '../styles/TopicDetailsPage.css';

export default function RepresentationsOfData() {
    return (
        <div className="topic-container mt-4">
            <h2>Representations of Data</h2>

            <h4>Outliers</h4>
            <p>Outliers are extreme values that differ significantly from the rest of the data. A common method to detect them is using the IQR (interquartile range).</p>

            <CodeSnippet
                code={`# Example: Identifying Outliers
import numpy as np

data = [1, 2, 2, 3, 4, 5, 6, 7, 50]

q1 = np.percentile(data, 25)
q3 = np.percentile(data, 75)
iqr = q3 - q1

lower_bound = q1 - 1.5 * iqr
upper_bound = q3 + 1.5 * iqr

outliers = [x for x in data if x < lower_bound or x > upper_bound]

print("Outliers:", outliers)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Outliers: [50]`} language="text" />
            </div>

            <h4>Box Plots</h4>
            <p>Box plots visually display the minimum, lower quartile, median, upper quartile, and maximum values. They help in spotting outliers and comparing distributions.</p>

            <CodeSnippet
                code={`# Example: Creating a Box Plot
import matplotlib.pyplot as plt

data = [1, 2, 2, 3, 4, 5, 6, 7, 50]

plt.boxplot(data, vert=False)
plt.title("Box Plot")
plt.show()`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <p><img src="/images/representationsofdata1.png" alt="Box Plot"></img></p>
            </div>

            <h4>Cumulative Frequency</h4>
            <p>Cumulative frequency tables and graphs show the running total of frequencies. They are useful for estimating medians and percentiles.</p>

            <CodeSnippet
                code={`# Example: Cumulative Frequency Plot
import numpy as np
import matplotlib.pyplot as plt

data = [2, 3, 5, 7, 8, 10, 12, 13, 15]
freq = [1, 2, 2, 1, 1, 2, 1, 1, 1]

cum_freq = np.cumsum(freq)

plt.plot(data, cum_freq, drawstyle='steps-post')
plt.title("Cumulative Frequency Graph")
plt.xlabel("Value")
plt.ylabel("Cumulative Frequency")
plt.show()`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <p><img src="/images/representationsofdata2.png" alt="Cumulative Frequency Graph"></img></p>
            </div>

            <h4>Histograms</h4>
            <p>Histograms are used to represent grouped continuous data. The area of each bar is proportional to the frequency of the group.</p>

            <CodeSnippet
                code={`# Example: Histogram
import matplotlib.pyplot as plt

data = [2, 3, 5, 7, 8, 10, 12, 13, 15]

plt.hist(data, bins=[0,5,10,15], edgecolor='black', color='brown')
plt.title("Histogram")
plt.xlabel("Value Range")
plt.ylabel("Frequency")
plt.show()`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <p><img src="/images/representationsofdata3.png" alt="Histogram"></img></p>
            </div>

            <h4>Comparing Data</h4>
            <p>When comparing data sets, you can look at measures of central tendency (like mean/median) and measures of spread (like IQR or standard deviation) to understand differences in location and consistency.</p>

            <CodeSnippet
                code={`# Example: Comparing Two Data Sets
import statistics

data1 = [2, 4, 6, 8, 10]
data2 = [1, 3, 5, 7, 20]

mean1 = statistics.mean(data1)
mean2 = statistics.mean(data2)

stdev1 = statistics.stdev(data1)
stdev2 = statistics.stdev(data2)

print("Data Set 1 - Mean:", mean1, "Standard Deviation:", stdev1)
print("Data Set 2 - Mean:", mean2, "Standard Deviation:", stdev2)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Data Set 1 - Mean: 6 Standard Deviation: 3.1622776601683795\nData Set 2 - Mean: 7.2 Standard Deviation: 7.496665925596525`} language="text" />
            </div>

            <div className="mt-4">
                <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
                <Button href="/quiz/17" variant="success">Take Quiz</Button>
            </div>
        </div>
    );
}
