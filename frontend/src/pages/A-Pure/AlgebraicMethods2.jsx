import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../../components/CodeSnippet';
import '../../styles/TopicDetailsPage.css';

export default function AlgebraicMethods() {
    return (
        <div className="topic-container mt-4">
            <h2>Algebraic Methods</h2>

            <h4>Algebraic Fractions</h4>
            <p>Simplifying algebraic fractions involves cancelling common factors.</p>

            <CodeSnippet
                code={`# Simplify (x^2 - 9)/(x^2 - x - 6)
from sympy import symbols, simplify

x = symbols('x')
expr = (x**2 - 9)/(x**2 - x - 6)
simplified_expr = simplify(expr)
print(simplified_expr)`}
                language="python"
            />
            <div className="CodeSnippet-output">
                <CodeSnippet code={`(x + 3)/(x + 2)`} language="text" />
            </div>

            <h4>Partial Fractions</h4>
            <p>Partial fractions break down complex rational expressions into simpler fractions.</p>

            <CodeSnippet
                code={`# Express (2x + 3)/(x^2 - x - 6) as partial fractions
from sympy import apart

expr = (2*x + 3)/(x**2 - x - 6)
partial = apart(expr)
print(partial)`}
                language="python"
            />
            <div className="CodeSnippet-output">
                <CodeSnippet code={`1/(5*(x + 2)) + 9/(5*(x - 3))`} language="text" />
            </div>

            <h4>Repeated Factors</h4>
            <p>For denominators with repeated linear factors, include terms for each power.</p>

            <CodeSnippet
                code={`# Example: (3x^2 + 5x + 2)/(x*(x+1)^2)
expr = (3*x**2 + 5*x + 2)/(x*(x + 1)**2)
partial = apart(expr)
print(partial)`}
                language="python"
            />
            <div className="CodeSnippet-output">
                <CodeSnippet code={`1/(x + 1) + 2/x`} language="text" />
            </div>

            <h4>Algebraic Division</h4>
            <p>Used to divide polynomials, similar to long division.</p>

            <CodeSnippet
                code={`# Divide x^3 + 2x^2 - x + 3 by x - 1
from sympy import div

numerator = x**3 + 2*x**2 - x + 3
denominator = x - 1
quotient, remainder = div(numerator, denominator, domain='QQ')
print("Quotient:", quotient)
print("Remainder:", remainder)`}
                language="python"
            />
            <div className="CodeSnippet-output">
                <CodeSnippet code={`Quotient: x**2 + 3*x + 2\nRemainder: 5`} language="text" />
            </div>

            <div className="mt-4">
                <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
                <Button href="/quiz/26" variant="success">Take Quiz</Button>
            </div>
        </div>
    );
}
