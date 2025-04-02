import React from 'react';
import { Button } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import CodeSnippet from '../components/CodeSnippet';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function BinomialExpansion() {
    
    return (
        <div className="container mt-4">
            <h2>Binomial Expansion</h2>

            <h4>Pascal's Triangle</h4>
            <p>Pascal's Triangle provides binomial coefficients for expansion:</p>
            <CodeSnippet
                code={`# Generating Pascal's Triangle
n = 5
triangle = []
for i in range(n):
    row = [1]
    if triangle:
        last_row = triangle[-1]
        row.extend([last_row[j] + last_row[j+1] for j in range(len(last_row)-1)])
        row.append(1)
    triangle.append(row)

for row in triangle:
    print(row)`}
                language="python"
            />
            

            
            <p><strong>Output:</strong></p>
            <CodeSnippet code={`[1]
[1, 1]
[1, 2, 1]
[1, 3, 3, 1]
[1, 4, 6, 4, 1]`} language="text" />

            


            <h4>Factorial Notation</h4>
            <p>Factorial notation (n!) is used to calculate binomial coefficients:</p>
            <CodeSnippet
                code={`from math import factorial

n = 5
r = 2
binomial_coeff = factorial(n) // (factorial(r) * factorial(n - r))
print(f"Binomial Coefficient: {binomial_coeff}")`}
                language="python"
            />


            <p><strong>Output:</strong></p>
            <CodeSnippet code={`Binomial Coefficient: 10`} language="text" />



            <h4>The Binomial Expansion</h4>
            <p>The binomial expansion formula expands expressions of the form (a + b)^n:</p>
            <CodeSnippet
                code={`from sympy import symbols, expand

x, y = symbols('x y')
expr = (x + y)**4
print(expand(expr))`}
                language="python"
            />

            
            <p><strong>Output:</strong></p>
            <CodeSnippet code={`x**4 + 4*x**3*y + 6*x**2*y**2 + 4*x*y**3 + y**4`} language="text" />

            <h4>Solving Binomial Problems</h4>
            <p>Apply the binomial expansion to solve specific problems:</p>
            <CodeSnippet
                code={`from sympy import symbols, expand

x = symbols('x')
expr = (2 + x)**3
expanded = expand(expr)
print(expanded)`}
                language="python"
            />


            <p><strong>Output:</strong></p>
            <CodeSnippet code={`x**3 + 6*x**2 + 12*x + 8`} language="text" />

            <h4>Binomial Estimation</h4>
            <p>Binomial estimation approximates expressions using the first few terms:</p>
            <CodeSnippet
                code={`from sympy import symbols, expand

x = symbols('x')
expr = (1 + x)**5
approx = expand(expr).series(x, 0, 3)
print(approx)`}
                language="python"
            />


            <p><strong>Output:</strong></p>
            <CodeSnippet code={`1 + 5*x + 10*x**2 + O(x**3)`} language="text" />

            <div className="mt-4">
                <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
                <Button href="/topics/binomial-expansion/quiz" variant="success">Take Quiz</Button>
            </div>
        </div>
    );
}