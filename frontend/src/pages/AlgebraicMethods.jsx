import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../components/CodeSnippet';

export default function AlgebraicMethods() {
    return (
        <div className="container mt-4">
            <h2>Algebraic Methods</h2>

            <h4>Algebraic Fractions</h4>
            <p>To manipulate algebraic fractions, factorize numerators and denominators where possible and simplify:</p>
            <CodeSnippet
                code={`from sympy import symbols, factor

x = symbols('x')
expr = (x**2 - 1) / (x**2 - x - 2)
print(factor(expr))`}
                language="python"
            />

            
            <p><strong>Output:</strong></p>
            <CodeSnippet code={`(x - 1)/(x - 2)`} language="text" />


            <h4>Dividing Polynomials</h4>
            <p>Polynomial division involves dividing the terms step by step:</p>
            <CodeSnippet
                code={`from sympy import symbols, div

x = symbols('x')
num = x**3 - 3*x**2 + 4
denom = x - 1
quotient, remainder = div(num, denom)
print("Quotient:", quotient)
print("Remainder:", remainder)`}
                language="python"
            />

        
            <p><strong>Output:</strong></p>
            <CodeSnippet code={`Quotient: x**2 - 2*x - 2
Remainder: 2`} language="text" />


            <h4>The Factor Theorem</h4>
            <p>The factor theorem states that (x - a) is a factor of f(x) if f(a) = 0:</p>
            <CodeSnippet
                code={`from sympy import symbols, Eq, solve

x = symbols('x')
expr = x**3 - 6*x**2 + 11*x - 6
solution = solve(expr)
print("Factors are:", solution)`}
                language="python"
            />

            <p><strong>Output:</strong></p>
            <CodeSnippet code={`Factors are: [1, 2, 3]`} language="text" />

            <h4>Mathematical Proof</h4>
            <p>Proofs can be structured using direct, contradiction, or induction methods:</p>
            <CodeSnippet
                code={`# Proof by induction example
from sympy import symbols, Eq

n = symbols('n')
expr = n * (n + 1) / 2
base_case = expr.subs(n, 1)
induction_step = expr.subs(n, n + 1)
print("Base Case:", base_case)
print("Induction Step:", induction_step)`}
                language="python"
            />

            
            <p><strong>Output:</strong></p>
            <CodeSnippet code={`Base Case: 1
Induction Step: (n + 1)*(n + 2)/2`} language="text" />

            <h4>Methods of Proof</h4>
            <p>Use various proof techniques such as exhaustion, contradiction, and counterexample:</p>
            <CodeSnippet
                code={`# Proof by Exhaustion
values = range(1, 5)
assert all(x**2 >= 0 for x in values)

# Proof by Contradiction
from sympy import symbols, Eq, solve
x = symbols('x')
expr = x**2 + 1
try:
    solve(Eq(expr, 0))
except:
    print("No real solution, contradiction proven")

# Proof by Counterexample
assert not all(x % 2 == 0 for x in [2, 4, 6, 7])  # 7 is odd`}
                language="python"
            />

            
            <p><strong>Output:</strong></p>
            <CodeSnippet code={`# No output is printed, as all assertions pass successfully.`} language="text" />

            <div className="mt-4">
                <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
                <Button href="/topics/algebraic-methods/quiz" variant="success">Take Quiz</Button>
            </div>
        </div>
    );
}