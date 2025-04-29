import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../../components/CodeSnippet';
import '../../styles/TopicDetailsPage.css';

export default function SequencesAndSeries() {
  return (
    <div className="topic-container mt-4">
      <h2>Sequences and Series</h2>

      <h4>Arithmetic Sequences</h4>
      <p>An arithmetic sequence is a sequence where each term increases or decreases by a fixed amount called the common difference.</p>
      <CodeSnippet
        code={`# Arithmetic sequence: u_n = a + (n - 1)d
a = 3  # first term
d = 4  # common difference
n = 10

u_n = a + (n - 1) * d
print("10th term of arithmetic sequence:", u_n)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`10th term of arithmetic sequence: 39`} language="text" />
      </div>

      <h4>Arithmetic Series</h4>
      <p>The sum of the first <em>n</em> terms of an arithmetic sequence is given by: <strong>S<sub>n</sub> = n/2 × (2a + (n-1)d)</strong>.</p>
      <CodeSnippet
        code={`# Sum of first n terms of an arithmetic sequence
n = 10
S_n = n / 2 * (2 * a + (n - 1) * d)
print("Sum of first 10 terms:", S_n)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`Sum of first 10 terms: 210.0`} language="text" />
      </div>

      <h4>Geometric Sequences</h4>
      <p>A geometric sequence has a constant ratio between successive terms. The nth term is: <strong>u<sub>n</sub> = ar<sup>n-1</sup></strong>.</p>
      <CodeSnippet
        code={`# Geometric sequence
a = 2   # first term
r = 3   # common ratio
n = 5

u_n = a * r**(n - 1)
print("5th term of geometric sequence:", u_n)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`5th term of geometric sequence: 162`} language="text" />
      </div>

      <h4>Geometric Series</h4>
      <p>The sum of the first <em>n</em> terms of a geometric sequence is: <strong>S<sub>n</sub> = a(1 - r<sup>n</sup>) / (1 - r)</strong> (for r ≠ 1).</p>
      <CodeSnippet
        code={`# Sum of first n terms of geometric sequence
S_n = a * (1 - r**n) / (1 - r)
print("Sum of first 5 terms:", S_n)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`Sum of first 5 terms: 242`} language="text" />
      </div>

      <h4>Sum to Infinity</h4>
      <p>When <strong>|r| &lt; 1</strong>, an infinite geometric series has a finite sum: <strong>S = a / (1 - r)</strong>.</p>
      <CodeSnippet
        code={`# Sum to infinity
a = 5
r = 0.5

S_inf = a / (1 - r)
print("Sum to infinity:", S_inf)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`Sum to infinity: 10.0`} language="text" />
      </div>

      <h4>Sigma Notation</h4>
      <p>Sigma (∑) notation is a way to represent the sum of a sequence. For example: <strong>∑<sub>k=1</sub><sup>4</sup> (2k)</strong> represents 2+4+6+8.</p>
      <CodeSnippet
        code={`# Sigma notation using Python
total = sum(2 * k for k in range(1, 5))
print("Sum using sigma notation:", total)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`Sum using sigma notation: 20`} language="text" />
      </div>

      <h4>Recurrence Relations</h4>
      <p>A recurrence relation defines each term using previous ones. For example: <strong>u<sub>n+1</sub> = 2u<sub>n</sub> + 1</strong>, u₁ = 1.</p>
      <CodeSnippet
        code={`# Recurrence relation: u_{n+1} = 2u_n + 1
u = 1
terms = [u]
for _ in range(5):
    u = 2 * u + 1
    terms.append(u)

print("First 6 terms:", terms)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`First 6 terms: [1, 3, 7, 15, 31, 63]`} language="text" />
      </div>

      <h4>Modelling with Series</h4>
      <p>Series can be used to model real-world problems like population growth, depreciation, or repeated processes like bouncing balls.</p>
      <CodeSnippet
        code={`# Modelling depreciation: value = a * r^n
initial_value = 1000
depreciation_rate = 0.9
years = 5

value = initial_value * depreciation_rate ** years
print("Value after 5 years:", value)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`Value after 5 years: 590.49`} language="text" />
      </div>

      <div className="mt-4">
        <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
        <Button href="/quiz/28" variant="success">Take Quiz</Button>
      </div>
    </div>
  );
}
