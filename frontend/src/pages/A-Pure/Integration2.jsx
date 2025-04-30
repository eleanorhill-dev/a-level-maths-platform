import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../../components/CodeSnippet';
import '../../styles/TopicDetailsPage.css';

export default function Integration2() {
  return (
    <div className="topic-container mt-4">
      <h2>Integration</h2>

      <h4>Integrating Standard Functions</h4>
      <p>We start by integrating standard functions like xⁿ, sin(x), cos(x), and eˣ.</p>
      <CodeSnippet
        code={`# Integrate standard functions
from sympy import symbols, integrate, sin, cos, exp

x = symbols('x')
print(integrate(x**2, x))
print(integrate(sin(x), x))
print(integrate(cos(x), x))
print(integrate(exp(x), x))`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`x**3/3\n-cos(x)\nsin(x)\nexp(x)`} language="text" />
      </div>

      <h4>Integrating f(ax + b)</h4>
      <p>Use substitution to integrate functions of the form f(ax + b).</p>
      <CodeSnippet
        code={`# Integrate f(ax + b)
print(integrate(sin(3*x + 1), x))`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`-cos(3*x + 1)/3`} language="text" />
      </div>

      <h4>Using Trigonometric Identities</h4>
      <p>Use identities to simplify integrals.</p>
      <CodeSnippet
        code={`# Use identity to integrate sin^2(x)
from sympy import simplify
expr = 1 - cos(2*x)
print(integrate(expr / 2, x))`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`x/2 - sin(2*x)/4`} language="text" />
      </div>

      <h4>Reverse Chain Rule</h4>
      <p>Identify inner function derivatives to reverse the chain rule.</p>
      <CodeSnippet
        code={`# Integrate using reverse chain rule
print(integrate(2*x * (x**2 + 1)**3, x))`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`(x**2 + 1)**4 / 4`} language="text" />
      </div>

      <h4>Integration by Substitution</h4>
      <p>Use substitution when a function matches a derivative structure.</p>
      <CodeSnippet
        code={`# Substitution example
from sympy.abc import u
u = symbols('u')
expr = integrate(u**2, u).subs(u, x + 1)
print(expr)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`(x + 1)**3 / 3`} language="text" />
      </div>

      <h4>Integration by Parts</h4>
      <p>Use the formula ∫u dv = uv - ∫v du.</p>
      <CodeSnippet
        code={`# Integration by parts
from sympy import integrate, symbols
x = symbols('x')

answer = x*exp(x) - integrate(exp(x))
print(answer)

# or simply:
print(integrate(x * exp(x), x)) # The integrate function does it automatically`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`x*exp(x) - exp(x)`} language="text" />
      </div>

      <h4>Partial Fractions</h4>
      <p>Decompose rational expressions to integrate term by term.</p>
      <CodeSnippet
        code={`# Partial fractions
from sympy import apart
expr = apart((2*x + 3)/(x**2 + 3*x))
print(integrate(expr, x))`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`log(x**2 + 3*x)`} language="text" />
      </div>

      <h4>Finding Areas</h4>
      <p>Definite integrals represent area under a curve.</p>
      <CodeSnippet
        code={`# Area under a curve between x=0 and x=2
print(integrate(x**2, (x, 0, 2)))`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`8/3`} language="text" />
      </div>

      <h4>The Trapezium Rule</h4>
      <p>Numerically approximate area under a curve.</p>
      <CodeSnippet
        code={`# Trapezium Rule
import numpy as np
x = np.linspace(0, 1, 5)
y = x**2
h = x[1] - x[0]
area = (h/2) * (y[0] + 2*sum(y[1:-1]) + y[-1])
print("Approximate area:", area)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`Approximate area: 0.34375`} language="text" />
      </div>

      <h4>Solving Differential Equations</h4>
      <p>Use integration to solve first-order differential equations.</p>
      <CodeSnippet
        code={`# Solve dy/dx = 2x
from sympy import Function, dsolve, Eq
x = symbols('x')
y = Function('y')
eq = Eq(y(x).diff(x), 2*x)
sol = dsolve(eq, y(x))
print(sol)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`y(x) = x**2 + C1`} language="text" />
      </div>

      <h4>Modelling with Differential Equations</h4>
      <p>Model exponential growth/decay using differential equations.</p>
      <CodeSnippet
        code={`# Exponential decay model
from sympy import Function, symbols, Eq, dsolve
x = symbols('x')
y = Function('y')
eq = Eq(y(x).diff(x), -2 * y(x))
sol = dsolve(eq, y(x))
print(sol)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`y(x) = C1*exp(-2*x)`} language="text" />
      </div>

      <div className="mt-4">
        <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
        <Button href="/quiz/35" variant="success">Take Quiz</Button>
      </div>
    </div>
  );
}
