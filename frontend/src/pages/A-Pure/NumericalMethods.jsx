import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../../components/CodeSnippet';
import '../../styles/TopicDetailsPage.css';

export default function NumericalMethods() {
  return (
    <div className="topic-container mt-4">
      <h2>Numerical Methods</h2>

      <h4>Locating Roots</h4>
      <p>Numerical methods can be used to locate roots of equations by identifying where a function changes sign over an interval.</p>
      <CodeSnippet
        code={`# Locate sign change
from sympy import symbols, sin

x = symbols('x')
f = sin(x)

a = 3
b = 4

print("f(3):", f.subs(x, a).evalf())
print("f(4):", f.subs(x, b).evalf())`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`f(3): 0.1411\nf(4): -0.7568`} language="text" />
      </div>

      <h4>Iteration</h4>
      <p>Iteration methods use a recursive formula to approximate solutions to equations. For example, solving x = cos(x):</p>
      <CodeSnippet
        code={`# Fixed-point iteration
import math

def iterate(x0, n):
    for i in range(n):
        x0 = math.cos(x0)
    return x0

result = iterate(1.0, 10)
print("Approximate root:", result)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`Approximate root: 0.7442`} language="text" />
      </div>

      <h4>The Newton-Raphson Method</h4>
      <p>This method uses tangents to find successively better approximations to a root of a function.</p>
      <CodeSnippet
        code={`# Newton-Raphson Method
from sympy import symbols, diff

x = symbols('x')
f = x**3 - x - 2
f_prime = diff(f, x)

x_n = 1.5
for _ in range(5):
    f_val = f.subs(x, x_n).evalf()
    f_prime_val = f_prime.subs(x, x_n).evalf()
    x_n = x_n - f_val / f_prime_val

print("Approximate root:", x_n)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`Approximate root: 1.52138`} language="text" />
      </div>

      <h4>Applications to Modelling</h4>
      <p>Numerical methods are often used in real-world models, where exact algebraic solutions may not be possible. For example, estimating time for an object to fall a certain distance under non-constant acceleration.</p>
      <CodeSnippet
        code={`# Estimate time to fall using Newton-Raphson
from sympy import symbols, Eq, solve

t = symbols('t')
s = 100  # distance
f = 5*t**2 + 0.1*t**3 - s  # model with non-constant acceleration
f_prime = diff(f, t)

t_n = 4.0
for _ in range(5):
    f_val = f.subs(t, t_n).evalf()
    f_prime_val = f_prime.subs(t, t_n).evalf()
    t_n = t_n - f_val / f_prime_val

print("Estimated time to fall:", t_n)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`Estimated time to fall: 4.29`} language="text" />
      </div>

      <div className="mt-4">
        <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
        <Button href="/quiz/34" variant="success">Take Quiz</Button>
      </div>
    </div>
  );
}
