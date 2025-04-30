import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../../components/CodeSnippet';
import '../../styles/TopicDetailsPage.css';

export default function Differentiation2() {
  return (
    <div className="topic-container mt-4">
      <h2>Differentiation</h2>

      <h4>Differentiating sin(x) and cos(x)</h4>
      <p>The derivatives of sin(x) and cos(x) are fundamental in calculus. Here's how you can differentiate them:</p>
      <CodeSnippet
        code={`from sympy import symbols, diff, sin, cos

x = symbols('x')
sin_x = sin(x)
cos_x = cos(x)

derivative_sin = diff(sin_x, x)
derivative_cos = diff(cos_x, x)

print("Derivative of sin(x):", derivative_sin)
print("Derivative of cos(x):", derivative_cos)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`Derivative of sin(x): cos(x)\nDerivative of cos(x): -sin(x)`} language="text" />
      </div>

      <h4>Differentiating Exponentials and Logarithms</h4>
      <p>The derivatives of exponential and logarithmic functions are crucial for handling growth and decay problems:</p>
      <CodeSnippet
        code={`from sympy import exp, log

exp_x = exp(x)
log_x = log(x)

derivative_exp = diff(exp_x, x)
derivative_log = diff(log_x, x)

print("Derivative of exp(x):", derivative_exp)
print("Derivative of log(x):", derivative_log)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`Derivative of exp(x): exp(x)\nDerivative of log(x): 1/x`} language="text" />
      </div>

      <h4>The Chain Rule</h4>
      <p>The chain rule is used when differentiating composite functions. For example, if we have the function f(g(x)) = sin(x^2), we need to differentiate both the outer and inner functions:</p>
      <CodeSnippet
        code={`from sympy import sin

g_x = x**2
f_g_x = sin(g_x)

chain_rule = diff(f_g_x, x)
print("Derivative using the chain rule:", chain_rule)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`Derivative using the chain rule: 2*x*cos(x**2)`} language="text" />
      </div>

      <h4>The Product Rule</h4>
      <p>The product rule is used when differentiating products of two functions. In function notation, the product rule is:</p>
      <p><strong>If f(x) = g(x)h(x), then f'(x) = g(x)h'(x) + h(x)g'(x)</strong></p>
      <CodeSnippet
        code={`u = x**2
v = sin(x)

product_rule = (u*diff(v, x)) + (v*diff(u, x))

# or simply:
product_rule = diff(u*v, x) # the diff() function applies the product rule automatically

# Both give the same result
print("Product Rule Result: ", product_rule)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`Product Rule Result: 2*x*sin(x) + x**2*cos(x)`} language="text" />
      </div>

      <h4>The Quotient Rule</h4>
      <p>The quotient rule is used for differentiating the quotient of two functions. In function notation, the quotient rule is:</p>
      <p><strong>If f(x) = g(x) / h(x), then f'(x) = (h(x)g'(x) - g(x)h'(x)) / (h(x))²</strong></p>
      <CodeSnippet
        code={`u = x**2
v = cos(x)

quotient_rule = (v*diff(u, x) - u*diff(v, x)) / v**2

# or simply: 
quotient_rule = diff(u/v, x) # The diff() function applies the quotient rule automatically

# Both methods give the same result
print("Quotient Rule Result:", quotient_rule)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`Quotient Rule Result: (2*x*cos(x) + x**2*sin(x)) / cos(x)**2`} language="text" />
      </div>

      <h4>Differentiating Trigonometric Functions</h4>
      <p>For trigonometric functions, their derivatives are essential in many calculus problems:</p>
      <CodeSnippet
        code={`from sympy import sec, csc, cot

derivative_sec = diff(sec(x), x)
derivative_cosec = diff(csc(x), x)
derivative_cot = diff(cot(x), x)

print("Derivative of sec(x):", derivative_sec)
print("Derivative of cosec(x):", derivative_cosec)
print("Derivative of cot(x):", derivative_cot)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`Derivative of sec(x): tan(x)*sec(x)
Derivative of cosec(x): -cot(x)*csc(x)
Derivative of cot(x): -cot(x)**2 - 1`} language="text" />
      </div>

      <h4>Parametric Differentiation</h4>
      <p>When differentiating parametric equations, you differentiate both x(t) and y(t) with respect to t:</p>
      <CodeSnippet
        code={`from sympy import symbols, diff

t = symbols('t')
x = t**2
y = t**3

dy_dt = diff(y, t)
dx_dt = diff(x, t)
dy_dx = dy_dt / dx_dt

print("dy/dx for parametric equations:", dy_dx)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`dy/dx for parametric equations: 3*t/2`} language="text" />
      </div>

      <h4>Implicit Differentiation</h4>
      <p>Implicit differentiation is used when dealing with equations that are not explicitly solved for y:</p>
      <CodeSnippet
        code={`from sympy import symbols, Eq, diff, Function

x = symbols('x')
y = Function('y')(x)  # y is a function of x

eq = Eq(x**2 + y**2, 1)  # Circle: x² + y² = 1

# Differentiate both sides of the equation implicitly
lhs_diff = diff(eq.lhs, x)
rhs_diff = diff(eq.rhs, x)

print("Implicit derivative:", lhs_diff, "=", rhs_diff)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`Implicit derivative: 2*x + 2*y(x)*Derivative(y(x), x) = 0`} language="text" />
      </div>

      <h4>Using Second Derivatives</h4>
      <p>The second derivative gives information about the concavity of the function:</p>
      <CodeSnippet
        code={`f_x = x**3 + 3*x**2 + 2*x
second_derivative = diff(f_x, x, 2)
print("Second derivative:", second_derivative)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`Second derivative: 6*x + 6`} language="text" />
      </div>

      <h4>Rates of Change</h4>
      <p>In physics, rates of change are often represented by derivatives, such as velocity:</p>
      <CodeSnippet
        code={`position = x**2 + 3*x + 2
velocity = diff(position, x)
print("Velocity (rate of change):", velocity)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`Velocity (rate of change): 2*x + 3`} language="text" />
      </div>

      <div className="mt-4">
        <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
        <Button href="/quiz/33" variant="success">Take Quiz</Button>
      </div>
    </div>
  );
}
