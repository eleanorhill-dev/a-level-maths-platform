import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../../components/CodeSnippet';
import '../../styles/TopicDetailsPage.css';

export default function TheBinomialExpansion2() {
  return (
    <div className="topic-container mt-4">
      <h2>Binomial Expansion 2</h2>

      <h4>Expanding (1 + x)<sup>n</sup></h4>
      <p>The binomial expansion of <strong>(1 + x)<sup>n</sup></strong> can be written as a series:</p>
      <ul>
        <li><strong>(1 + x)<sup>n</sup> = 1 + nx + (n(n-1)/2!)x<sup>2</sup> + (n(n-1)(n-2)/3!)x<sup>3</sup> + ...</strong></li>
      </ul>
      <CodeSnippet
        code={`# Expanding (1 + x)^n using sympy
from sympy import symbols, expand

x, n = symbols('x n')
expression = (1 + x)**n
expanded_expression = expand(expression)

print("Expansion of (1 + x)^n:", expanded_expression)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`Expansion of (1 + x)^n: 1 + x**n`} language="text" />
      </div>

      <h4>Expanding (a + bx)<sup>n</sup></h4>
      <p>We can expand <strong>(a + bx)<sup>n</sup></strong> using the binomial theorem, applying it similarly as the previous expansion:</p>
      <CodeSnippet
        code={`# Expanding (a + bx)^n using sympy
from sympy import symbols, expand

a, b, x, n = symbols('a b x n')
expression = (a + b*x)**n
expanded_expression = expand(expression)

print("Expansion of (a + bx)^n:", expanded_expression)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`Expansion of (a + bx)^n: a**n + n*a**(n-1)*b*x + ...`} language="text" />
      </div>

      <h4>Using Partial Fractions</h4>
      <p>Partial fraction decomposition is a method of breaking down a rational function into simpler fractions. It’s often used in integrals and in simplifying rational expressions.</p>
      <CodeSnippet
        code={`# Example: Partial Fraction decomposition
from sympy import apart

expr = 1 / (x**2 + 3*x + 2)
partial_fraction = apart(expr)

print("Partial Fraction decomposition:", partial_fraction)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`Partial Fraction decomposition: 1/(x + 1) - 1/(x + 2)`} language="text" />
      </div>

      <div className="mt-4">
        <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
        <Button href="/quiz/29" variant="success">Take Quiz</Button>
      </div>
    </div>
  );
}
