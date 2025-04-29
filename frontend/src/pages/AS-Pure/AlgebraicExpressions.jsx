import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../../components/CodeSnippet'; 
import '../../styles/TopicDetailsPage.css';


export default function AlgebraicExpressions() {
    return (
        <div className="topic-container mt-4">
            <h2>Algebraic Expressions</h2>
            <h4>Index Laws</h4>
            <p>The index laws (also known as exponent rules) are important for simplifying expressions with exponents. Here are the key rules:</p>
            <ul>
                <li><strong>Product Rule:</strong> <em>a<sup>m</sup> × a<sup>n</sup> = a<sup>m+n</sup></em></li>
                <li><strong>Quotient Rule:</strong> <em>a<sup>m</sup> ÷ a<sup>n</sup> = a<sup>m-n</sup></em></li>
                <li><strong>Power of a Power:</strong> <em>(a<sup>m</sup>)<sup>n</sup> = a<sup>m×n</sup></em></li>
                <li><strong>Zero Exponent:</strong> <em>a<sup>0</sup> = 1</em> (where <em>a</em> is non-zero)</li>
                <li><strong>Negative Exponent:</strong> <em>a<sup>-n</sup> = 1/a<sup>n</sup></em></li>
            </ul>

            <CodeSnippet
                code={`# Example of Index Laws
a = 2
b = 3

# Product Rule: 2^3 * 2^2 = 2^(3+2) = 2^5
product_rule = a**3 * a**2

# Quotient Rule: 2^5 / 2^3 = 2^(5-3) = 2^2
quotient_rule = a**5 / a**3

print("Product Rule result:", product_rule)
print("Quotient Rule result:", quotient_rule)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Product Rule result: 32\nQuotient Rule result: 4`} language="text" />
            </div>

            <h4>Expanding Brackets</h4>
            <p>Expanding brackets involves distributing each term in one bracket across the terms in another bracket. The distributive property is applied here.</p>
            
            <CodeSnippet
                code={`# Example: Expanding (x + 2)(x + 3)
from sympy import symbols, expand

x = symbols('x')
expression = (x + 2) * (x + 3)
expanded_expression = expand(expression)

print("Expanded Expression:", expanded_expression)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Expanded Expression: x**2 + 5*x + 6`} language="text" />
            </div>

            <h4>Factorising</h4>
            <p>Factorising involves rewriting an expression as a product of factors. For example, the expression <em>x<sup>2</sup> + 5x + 6</em> can be factorised.</p>
            
            <CodeSnippet
                code={`# Example: Factorising x^2 + 5x + 6
from sympy import factor

factorised_expression = factor(x**2 + 5*x + 6)

print("Factorised Expression:", factorised_expression)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Factorised Expression: (x + 2)*(x + 3)`} language="text" />
            </div>

            <h4>Negative and Fractional Indices</h4>
            <p>Negative and fractional indices are another way of expressing powers and roots:</p>
            <ul>
                <li><strong>Negative Index:</strong> <em>a<sup>-n</sup> = 1 / a<sup>n</sup></em></li>
                <li><strong>Fractional Index:</strong> <em>a<sup>1/n</sup> = the <em>n<sup>th</sup></em> root of a</em></li>
            </ul>

            <CodeSnippet
                code={`# Example of Negative and Fractional Indices
a = 2

negative_index = a**-2
fractional_index = a**(1/2)

print("Negative Index result:", negative_index)
print("Fractional Index result:", fractional_index)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Negative Index result: 0.25\nFractional Index result: 1.4142135623730951`} language="text" />
            </div>

            <h4>Surds</h4>
            <p>A surd is an expression involving a square root, cube root, etc., that cannot be simplified to a rational number. Simplifying surds involves factoring the number under the root to extract perfect squares or cubes when possible.</p>
            
            <CodeSnippet
                code={`# Example of Simplifying Surds
from sympy import sqrt

surd_expression = sqrt(50)

simplified_surd = surd_expression.simplify()

print("Simplified Surd:", simplified_surd)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Simplified Surd: 5*sqrt(2)`} language="text" />
            </div>

            <h4>Rationalising Denominators</h4>
            <p>Rationalising the denominator involves eliminating square roots (or other irrational numbers) from the denominator by multiplying both the numerator and denominator by the appropriate value.</p>
            
            <CodeSnippet
                code={`# Example of Rationalising Denominator
from sympy import sqrt, Rational

expr = Rational(1, sqrt(2))

rationalised_expr = expr * (sqrt(2)/sqrt(2))

print("Rationalised Expression:", rationalised_expr)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Rationalised Expression: sqrt(2)/2`} language="text" />
            </div>

            <div className="mt-4">
                <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
                <Button href="/quiz/1" variant="success">Take Quiz</Button>
            </div>
        </div>
    );
}
