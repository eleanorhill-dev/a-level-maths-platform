import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../components/CodeSnippet'; 
import '../styles/TopicDetailsPage.css';

export default function DataCollection() {
    return (
        <div className="topic-container mt-4">
            <h2>Data Collection</h2>

            <h4>Populations and Samples</h4>
            <p>A population includes all the individuals or items under consideration, while a sample is a subset selected from the population. Samples are often used when it is impractical to study the entire population.</p>

            <CodeSnippet
                code={`# Example: Population vs Sample
population = ['Person1', 'Person2', 'Person3', 'Person4', 'Person5']
sample = population[:3]  # Taking a sample of 3 people

print("Population:", population)
print("Sample:", sample)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Population: ['Person1', 'Person2', 'Person3', 'Person4', 'Person5']\nSample: ['Person1', 'Person2', 'Person3']`} language="text" />
            </div>

            <h4>Sampling</h4>
            <p>Sampling is the process of selecting a subset of a population to estimate characteristics of the whole group. Good sampling methods aim to be random and unbiased.</p>

            <CodeSnippet
                code={`# Example: Random Sampling
import random

population = list(range(1, 101))  # Population of 100
sample = random.sample(population, 10)  # Randomly select 10 items

print("Random Sample:", sample)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Random Sample: [random list of 10 numbers between 1 and 100]`} language="text" />
            </div>

            
            <h4>Non-Random Sampling</h4>
            <p>Non-random sampling methods include:</p>
            <ul>
                <li><strong>Convenience Sampling:</strong> Selecting individuals who are easiest to reach.</li>
                <li><strong>Quota Sampling:</strong> Ensuring the sample meets certain quotas for subgroups (e.g., gender, age).</li>
                <li><strong>Judgmental (or Purposive) Sampling:</strong> Selecting individuals based on the researcher's judgment about who will be most useful or representative.</li>
            </ul>
            <p>These methods can introduce bias into results.</p>

            <CodeSnippet
                code={`# Example: Convenience Sampling
population = ['Student1', 'Student2', 'Student3', 'Student4']
convenience_sample = ['Student1', 'Student2']  # First available students

print("Convenience Sample:", convenience_sample)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Convenience Sample: ['Student1', 'Student2']`} language="text" />
            </div>

            <CodeSnippet
                code={`# Example: Quota Sampling
population = [
    {'name': 'Person1', 'gender': 'Male'},
    {'name': 'Person2', 'gender': 'Female'},
    {'name': 'Person3', 'gender': 'Female'},
    {'name': 'Person4', 'gender': 'Male'}
]

# Suppose we want 1 male and 1 female
quota_sample = [population[0], population[1]]

print("Quota Sample:", quota_sample)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Quota Sample: [{'name': 'Person1', 'gender': 'Male'}, {'name': 'Person2', 'gender': 'Female'}]`} language="text" />
            </div>

            <CodeSnippet
                code={`# Example: Judgmental Sampling
population = [
    {'name': 'Alice', 'experience': 5},
    {'name': 'Bob', 'experience': 1},
    {'name': 'Charlie', 'experience': 10}
]

# Choosing participants based on high experience
judgmental_sample = [population[0], population[2]]  # Alice and Charlie

print("Judgmental Sample:", judgmental_sample)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Judgmental Sample: [{'name': 'Alice', 'experience': 5}, {'name': 'Charlie', 'experience': 10}]`} language="text" />
            </div>

            <h4>Types of Data</h4>
            <p>Data can be classified as qualitative (descriptive) or quantitative (numerical). Quantitative data can be further divided into discrete (countable) and continuous (measurable) data.</p>

            <CodeSnippet
                code={`# Example: Types of Data
qualitative_data = ['Red', 'Blue', 'Green']
quantitative_discrete = [1, 2, 3, 4]  # Number of pets
quantitative_continuous = [1.75, 2.0, 2.25]  # Heights in meters

print("Qualitative Data:", qualitative_data)
print("Quantitative Discrete:", quantitative_discrete)
print("Quantitative Continuous:", quantitative_continuous)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Qualitative Data: ['Red', 'Blue', 'Green']\nQuantitative Discrete: [1, 2, 3, 4]\nQuantitative Continuous: [1.75, 2.0, 2.25]`} language="text" />
            </div>

            <h4>The Large Data Set</h4>
            <p>In statistics, a Large Data Set (LDS) refers to real-world data used for exploration and analysis. It often includes missing values and anomalies, helping develop practical skills for handling real data.</p>

            <CodeSnippet
                code={`# Example: Working with a Large Data Set
import pandas as pd

# Example DataFrame simulating a large data set
data = {
    'Temperature': [22.1, 23.4, None, 25.0, 21.8],
    'Rainfall': [0.0, 5.2, 3.1, None, 0.0]
}

df = pd.DataFrame(data)

print("Data Frame with Missing Values:")
print(df)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Data Frame with Missing Values:\n   Temperature  Rainfall\n0        22.1       0.0\n1        23.4       5.2\n2         NaN       3.1\n3        25.0       NaN\n4        21.8       0.0`} language="text" />
            </div>

            <div className="mt-4">
                <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
                <Button href="/quiz/15" variant="success">Take Quiz</Button>
            </div>
        </div>
    );
}
