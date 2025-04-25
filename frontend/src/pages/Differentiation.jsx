import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../components/CodeSnippet';
import '../styles/TopicDetailsPage.css';

export default function Differentiation() {
    return (
        <div className="topic-container mt-4">
            <h2>Differentiation</h2>

            <h4>Gradients of Curves</h4>
            <p>The gradient of a curve at a point is the slope of the tangent to the curve at that point. We can compute it by finding the derivative of the function.</p>
            <CodeSnippet
                code={`import numpy as np
import matplotlib.pyplot as plt

# Define the function and its derivative
def f(x):
    return x**2

def f_prime(x):
    return 2*x

# Plotting the function and its tangent at x = 2
x_vals = np.linspace(-10, 10, 100)
y_vals = f(x_vals)
tangent_x = 2
tangent_y = f(tangent_x)
tangent_slope = f_prime(tangent_x)

# Equation of the tangent line: y - tangent_y = tangent_slope * (x - tangent_x)
tangent_line = tangent_slope * (x_vals - tangent_x) + tangent_y

# Plot
plt.plot(x_vals, y_vals, label='f(x) = x^2')
plt.plot(x_vals, tangent_line, label='Tangent at x=2', linestyle='--')
plt.scatter(tangent_x, tangent_y, color='red')
plt.grid(True)
plt.legend()
plt.show()`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <p><img src="/images/differentiation1.png" alt="Gradient of curve"></img></p>
            </div>

            <h4>Finding the Derivative</h4>
            <p>The derivative of a function gives us the rate of change of the function at any point. We can calculate the derivative using rules like the power rule, product rule, etc.</p>
            <CodeSnippet
                code={`import sympy as sp

# Define the function and variable
x = sp.symbols('x')
f = x**3 + 5*x**2 + 2*x + 1

# Find the derivative
f_prime = sp.diff(f, x)

# Output the derivative
print("Derivative:", f_prime)`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Derivative: 3*x**2 + 10*x + 2`} language="text" />
            </div>


            <h4>Differentiating x^n</h4>
            <p>To differentiate a function like x^n, we apply the power rule: d/dx(x^n) = n*x^(n-1).</p>
            <CodeSnippet
                code={`import sympy as sp

# Define the variable and function
x = sp.symbols('x')
f = x**4

# Differentiate the function
f_prime = sp.diff(f, x)

# Output the result
print("Derivative:", f_prime)`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Derivative: 4*x**3`} language="text" />
            </div>


            <h4>Differentiating Quadratics</h4>
            <p>For quadratic functions, the derivative is found by applying the power rule to each term.</p>
            <CodeSnippet
                code={`import sympy as sp

# Define the quadratic function
x = sp.symbols('x')
f = 3*x**2 + 4*x + 1

# Find the derivative
f_prime = sp.diff(f, x)

# Output the result
print("Derivative:", f_prime)`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Derivative: 6*x + 4`} language="text" />
            </div>


            <h4>Differentiating Functions with Two or More Terms</h4>
            <p>To differentiate functions with multiple terms, apply the derivative to each term separately.</p>
            <CodeSnippet
                code={`import sympy as sp

# Define the function with multiple terms
x = sp.symbols('x')
f = x**3 + 2*x**2 + 5*x + 4

# Differentiate
f_prime = sp.diff(f, x)

# Output the derivative
print("Derivative:", f_prime)`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Derivative: 3*x**2 + 4*x + 5`} language="text" />
            </div>


            <h4>Gradients, Tangent, and Normal</h4>
            <p>The gradient of a curve at a point is the slope of the tangent. The normal line is perpendicular to the tangent, and its slope is the negative reciprocal of the tangent's slope.</p>
            <CodeSnippet
                code={`import numpy as np
import matplotlib.pyplot as plt

# Define the function and its derivative
def f(x):
    return x**2

def f_prime(x):
    return 2*x

# Point of interest
x0 = 2
y0 = f(x0)
slope_tangent = f_prime(x0)
slope_normal = -1 / slope_tangent  # Negative reciprocal of the tangent's slope

# Equation of tangent: y - y0 = slope_tangent * (x - x0)
tangent_x_vals = np.linspace(-5, 5, 100)
tangent_y_vals = slope_tangent * (tangent_x_vals - x0) + y0

# Equation of normal: y - y0 = slope_normal * (x - x0)
normal_y_vals = slope_normal * (tangent_x_vals - x0) + y0

# Plotting the curve, tangent, and normal
x_vals = np.linspace(-5, 5, 10)
y_vals = f(x_vals)

plt.plot(x_vals, y_vals, label='f(x) = x^2')
plt.plot(tangent_x_vals, tangent_y_vals, label='Tangent at x=2', linestyle='--')
plt.plot(tangent_x_vals, normal_y_vals, label='Normal at x=2', linestyle='-.')
plt.scatter(x0, y0, color='red')

# Set equal scaling for both axes
plt.axis('equal')

plt.grid(True)
plt.legend()
plt.show()
`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <p><img src="/images/differentiation2.png" alt="Tangent and Normal"></img></p>
            </div>

            <h4>Increasing and Decreasing Functions</h4>
            <p>To determine where a function is increasing or decreasing, examine the sign of its derivative. If the derivative is positive, the function is increasing; if negative, the function is decreasing.</p>
            <CodeSnippet
                code={`import numpy as np
import matplotlib.pyplot as plt

# Define the function and its derivative
def f(x):
    return x**3 - 3*x + 1

def f_prime(x):
    return 3*x**2 - 3

# Plotting the function and its derivative
x_vals = np.linspace(-3, 3, 100)
y_vals = f(x_vals)
y_prime_vals = f_prime(x_vals)

plt.plot(x_vals, y_vals, label='f(x) = x^3 - 3*x + 1')
plt.plot(x_vals, y_prime_vals, label="f'(x)", linestyle='--')
plt.axhline(0, color='black',linewidth=0.5)
plt.grid(True)
plt.legend()
plt.show()`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <p><img src="/images/differentiation3.png" alt="Increasing and Decreasing"></img></p>
            </div>

            <p>In the graph above, we can see that the function is decreasing on the interval [-3,0] and increasing on the interval [0,3].</p>

            <div className="mt-4">
                <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
                <Button href="/quiz/12" variant="success">Take Quiz</Button>
            </div>
        </div>
    );
}
