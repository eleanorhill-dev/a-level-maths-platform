import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../../components/CodeSnippet';
import '../../styles/TopicDetailsPage.css';

export default function TheBinomialExpansion2() {
  return (
    <div className="topic-container mt-4">
      <h2>Binomial Expansion 2</h2>

      <h4>Expanding (1 + x)<sup>n</sup></h4>
      <p>The binomial expansion of <strong>(1 + x)<sup>n</sup></strong> for positive integer <em>n</em> is:</p>
      <ul>
        <li><strong>(1 + x)<sup>n</sup> = 1 + nx + (n(n-1)/2!)x<sup>2</sup> + (n(n-1)(n-2)/3!)x<sup>3</sup> + ...</strong></li>
      </ul>
      <CodeSnippet
        code={`# Expanding (1 + x)^4 using sympy
from sympy import symbols, expand

x = symbols('x')
expression = (1 + x)**4
expanded_expression = expand(expression)

print("Expansion of (1 + x)^4:", expanded_expression)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`Expansion of (1 + x)^4: x**4 + 4*x**3 + 6*x**2 + 4*x + 1`} language="text" />
      </div>

      <h4>Binomial Coefficients</h4>
      <p>The binomial coefficient C(n, r) gives the coefficient of x<sup>r</sup> in the expansion of (1 + x)<sup>n</sup>.</p>
      <CodeSnippet
        code={`# Binomial coefficient C(n, r)
from math import comb

print("C(5, 2):", comb(5, 2))`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`C(5, 2): 10`} language="text" />
      </div>

      <h4>Expanding (a + bx)<sup>n</sup></h4>
      <p>We can expand <strong>(a + bx)<sup>n</sup></strong> using the binomial theorem similarly:</p>
      <CodeSnippet
        code={`# Expanding (2 + 3x)^3 using sympy
from sympy import symbols, expand

x = symbols('x')
expression = (2 + 3*x)**3
expanded_expression = expand(expression)

print("Expansion of (2 + 3x)^3:", expanded_expression)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`Expansion of (2 + 3x)^3: 8 + 36*x + 108*x**2 + 162*x**3`} language="text" />
      </div>

      <h4>Negative or Fractional Powers</h4>
      <p>We can expand binomial expressions like (1 + x)<sup>n</sup> for non-integer <em>n</em> using a series expansion.</p>
      <CodeSnippet
        code={`# Expanding (1 + x)^-1 up to x^4
from sympy import symbols

x = symbols('x')
expr = (1 + x)**-1
expansion = expr.series(x, 0, 5)

print(expansion)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`1 - x + x**2 - x**3 + x**4 + O(x**5)`} language="text" />
      </div>

      <h4>Approximating Values</h4>
      <p>We can use binomial expansion to estimate values like √1.01 by rewriting as (1 + x)<sup>n</sup> with fractional powers.</p>
      <CodeSnippet
        code={`# Approximate sqrt(1.01) using binomial expansion
from sympy import symbols

x = symbols('x')
expr = (1 + x)**0.5
expansion = expr.series(x, 0, 4)
approx = expansion.subs(x, 0.01)

print("Approximation of sqrt(1.01):", approx)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`Approximation of sqrt(1.01): 1.0049875625`} language="text" />
      </div>

      <h4>Using Partial Fractions</h4>
      <p>Partial fractions can be used to simplify rational functions before applying binomial expansion (e.g. to integrate or expand).</p>
      <CodeSnippet
        code={`# Partial fraction decomposition of a rational expression
from sympy import apart, symbols

x = symbols('x')
expr = 1 / (x**2 + 3*x + 2)
partial = apart(expr)

print("Partial fraction form:", partial)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`Partial fraction form: 1/(x + 1) - 1/(x + 2)`} language="text" />
      </div>

      <div className="mt-4">
        <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
        <Button href="/quiz/29" variant="success">Take Quiz</Button>
      </div>
    </div>
  );
}
