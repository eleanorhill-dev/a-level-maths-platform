import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../components/CodeSnippet';
import '../styles/TopicDetailsPage.css';


export default function BinomialExpansion() {
    
    return (
        <div className="topic-container mt-4">
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
            

            
            <div className="CodeSnippet-output">
                <CodeSnippet code={`[1]
[1, 1]
[1, 2, 1]
[1, 3, 3, 1]
[1, 4, 6, 4, 1]`} language="text" />
            </div>
            


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


            <div className="CodeSnippet-output">
                <CodeSnippet code={`Binomial Coefficient: 10`} language="text" />
            </div>



            <h4>The Binomial Expansion</h4>
            <p>The binomial expansion formula expands expressions of the form (a + b)^n:</p>
            <CodeSnippet
                code={`from sympy import symbols, expand

x, y = symbols('x y')
expr = (x + y)**4
print(expand(expr))`}
                language="python"
            />

            
            <div className="CodeSnippet-output">
                <CodeSnippet code={`x**4 + 4*x**3*y + 6*x**2*y**2 + 4*x*y**3 + y**4`} language="text" />
            </div>


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


            <div className="CodeSnippet-output">
                <CodeSnippet code={`x**3 + 6*x**2 + 12*x + 8`} language="text" />
            </div>

            <h4>Binomial Estimation</h4>
            <p>Binomial estimation approximates expressions using the first few terms:</p>
            <p>In the example below, the series() function from sympy is used to approximate expressions as a power series in terms of x, near x = 0. The series (x, 0, 3) tells Python: "Give me the expansion up to x², and include the next order term to show what's left".</p>
            <CodeSnippet
                code={`from sympy import symbols, expand

x = symbols('x')
expr = (1 + x)**5
approx = expand(expr).series(x, 0, 3)
print(approx)`}
                language="python"
            />


            <div className="CodeSnippet-output">
                <CodeSnippet code={`1 + 5*x + 10*x**2 + O(x**3)`} language="text" />
            </div>

            <div className="mt-4">
                <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
                <Button href="/quiz/8" variant="success">Take Quiz</Button>
            </div>
        </div>
    );
}