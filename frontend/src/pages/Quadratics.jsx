import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../components/CodeSnippet'; 
import '../styles/TopicDetailsPage.css';

export default function Quadratics() {
    return (
        <div className="topic-container mt-4">
            <h2>Quadratics</h2>
            
            <h4>Solving Quadratic Equations</h4>
            <p>Quadratic equations are equations of the form <em>ax² + bx + c = 0</em>. We can solve these using the quadratic formula:</p>
            <p><strong>Quadratic Formula:</strong> <em>x = (-b ± √(b² - 4ac)) / 2a</em></p>
            
            <CodeSnippet
                code={`# Example: Solving a quadratic equation
import math

a = 1
b = -3
c = 2

# Quadratic formula
discriminant = b**2 - 4*a*c
root1 = (-b + math.sqrt(discriminant)) / (2*a)
root2 = (-b - math.sqrt(discriminant)) / (2*a)

print("Root 1:", root1)
print("Root 2:", root2)`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Root 1: 2.0\nRoot 2: 1.0`} language="text" />
            </div>

            <h4>Completing the Square</h4>
            <p>Completing the square is a method of solving quadratic equations or transforming them into vertex form. It involves rewriting the equation in the form <em>(x - p)² = q</em>.</p>
            
            <CodeSnippet
                code={`# Example: Completing the square for x^2 - 6x + 5
from sympy import symbols, Eq, solve

x = symbols('x')
equation = Eq(x**2 - 6*x + 5, 0)

# Completing the square
completed_square = Eq((x - 3)**2 - 4, 0)

solutions = solve(completed_square, x)

print("Solutions:", solutions)`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Solutions: [4, 2]`} language="text" />
            </div>

            <h4>Functions</h4>
            <p>Quadratic functions are of the form <em>f(x) = ax² + bx + c</em>. They graph as parabolas, and their properties (such as vertex and axis of symmetry) can be determined by manipulating the equation.</p>
            
            <CodeSnippet
                code={`# Example: Graphing a quadratic function f(x) = x^2 - 4x + 3
import numpy as np
import matplotlib.pyplot as plt

# Define the function
def f(x):
    return x**2 - 4*x + 3

# Generate x values
x_vals = np.linspace(-2, 6, 400)
# Pass x values into the function to produce y values
y_vals = f(x_vals)

# Plot the graph
plt.plot(x_vals, y_vals)
plt.xlabel('x')
plt.ylabel('f(x)')
plt.title('Graph of f(x) = x² - 4x + 3')
plt.grid(True)
plt.show()`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <p><img src="/images/quadraticgraph1.png" alt="Quadratic Graph"></img></p>
            </div>

            <h4>Quadratic Graphs</h4>
            <p>The graph of a quadratic function is a parabola. The vertex form of the quadratic equation is <em>f(x) = a(x - h)² + k</em>, where <em>(h, k)</em> is the vertex of the parabola.</p>
            
            <CodeSnippet
                code={`# Example: Graphing a quadratic in vertex form f(x) = 2(x - 1)^2 + 3
import numpy as np
import matplotlib.pyplot as plt

def f_vertex(x):
    return 2*(x - 1)**2 + 3

# Generate x values
x_vals = np.linspace(-1, 3, 400)
# Pass x values into the function to produce y values
y_vals = f_vertex(x_vals)

# Plot the graph
plt.plot(x_vals, y_vals)
plt.xlabel('x')
plt.ylabel('f(x)')
plt.title('Graph of f(x) = 2(x - 1)² + 3')
plt.grid(True)
plt.show()`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <p><img src="/images/quadraticgraph2.png" alt="Quadratic Graph"></img></p>
            </div>


            <h4>The Discriminant</h4>
            <p>The discriminant, <em>Δ = b² - 4ac</em>, determines the nature of the roots of the quadratic equation. It can be:</p>
            <ul>
                <li><strong>Positive:</strong> Two real roots</li>
                <li><strong>Zero:</strong> One real root (repeated)</li>
                <li><strong>Negative:</strong> No real roots (complex roots)</li>
            </ul>
            
            <CodeSnippet
                code={`# Example: Determining the nature of the roots using the discriminant
a = 1
b = -3
c = 2

discriminant = b**2 - 4*a*c

if discriminant > 0:
    result = "Two real roots"
elif discriminant == 0:
    result = "One real root"
else:
    result = "No real roots"

print("Discriminant Result:", result)`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Discriminant Result: Two real roots`} language="text" />
            </div>

            <h4>Modelling with Quadratics</h4>
            <p>Quadratic equations can be used to model real-world problems, such as projectile motion or the area of a rectangle. For example, the equation of a projectile's height over time can be modeled by a quadratic function.</p>
            
            <CodeSnippet
                code={`# Example: Modelling projectile motion with a quadratic

import numpy as np
import matplotlib.pyplot as plt

# Height of a projectile at time t: h(t) = -5t^2 + 20t + 30
def height(t):
    return -5*t**2 + 20*t + 30

# Generate time values
t_vals = np.linspace(0, 4, 100)
h_vals = height(t_vals)

# Plot the graph
plt.plot(t_vals, h_vals)
plt.xlabel('Time (s)')
plt.ylabel('Height (m)')
plt.title('Projectile Motion')
plt.grid(True)
plt.show()`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <p><img src="/images/quadraticgraph3.png" alt="Quadratic Graph"></img></p>
            </div>


            <div className="mt-4">
                <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
                <Button href="/quiz/2" variant="success">Take Quiz</Button>
            </div>
        </div>
    );
}
