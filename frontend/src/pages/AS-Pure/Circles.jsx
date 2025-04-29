import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../../components/CodeSnippet';
import '../../styles/TopicDetailsPage.css';

export default function Circles() {
    return (
        <div className="topic-container mt-4">
            <h2>Circles</h2>

            <h4>Midpoints and Perpendicular Bisectors</h4>
            <p>Given two points (x₁, y₁) and (x₂, y₂), the midpoint is calculated using:</p>
            <CodeSnippet
                code={`import matplotlib.pyplot as plt
import numpy as np

# Midpoint Calculation and Graph
x1, y1 = 1, 3
x2, y2 = 5, 7
midpoint = ((x1 + x2) / 2, (y1 + y2) / 2)

plt.plot([x1, x2], [y1, y2], marker='o')
plt.plot(midpoint[0], midpoint[1], marker='o', color='red', label='Midpoint')
plt.grid(True)
plt.legend()
plt.show()`}
                language="python"
            />

            
            <div className="CodeSnippet-output">
                <p><img src="/images/circles1.png" alt="Circle Graph"></img></p>
            </div>


            <h4>Equation of a Circle</h4>
            <p>The equation of a circle with center (h, k) and radius r is:</p>
            <p><strong>(x - h)² + (y - k)² = r²</strong></p>
            <CodeSnippet
                code={`import matplotlib.pyplot as plt
import numpy as np

# Circle Equation and Graph
h, k, r = 3, 2, 5
angle = np.linspace(0, 2 * np.pi, 100)
x = h + r * np.cos(angle)
y = k + r * np.sin(angle)

plt.plot(x, y)
plt.plot(h, k, marker='o', color='red', label='Center')
plt.grid(True)
plt.legend()
plt.show()`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <p><img src="/images/circles2.png" alt="Circle Graph"></img></p>
            </div>

            <h4>Intersections of Straight Lines and Circles</h4>
            <p>To find intersection points, substitute the line equation into the circle’s equation and solve:</p>
            <CodeSnippet
                code={`import matplotlib.pyplot as plt
import numpy as np
from sympy import symbols, Eq, solve

# Line and Circle Intersection with Graph
x, y = symbols('x y')

# Circle equation: (x - 3)^2 + (y - 2)^2 = 25
circle_eq = Eq((x - 3)**2 + (y - 2)**2, 25)

# Line equation: y = 2 * x + 1
line_eq = Eq(y, 2 * x + 1)

# Substitute and solve
subbed_eq = circle_eq.subs(y, 2 * x + 1)
solutions = solve(subbed_eq, x)
points = [(x_val, 2 * x_val + 1) for x_val in solutions]

# Plot
angle = np.linspace(0, 2 * np.pi, 100)
xc = 3 + 5 * np.cos(angle)
yc = 2 + 5 * np.sin(angle)

plt.plot(xc, yc, label='Circle')
plt.plot([-10, 10], [2 * -10 + 1, 2 * 10 + 1], label='Line')
plt.scatter(*zip(*points), color='red', label='Intersections')
plt.grid(True)
plt.legend()
plt.show()

print("Intersection Points:", points)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <p><img src="/images/circles3.png" alt="Circle Graph"></img></p>
            </div>

            <h4>Use Tangent and Chord Properties</h4>
            <p>For a circle, a tangent touches the circle at exactly one point, while a chord intersects the circle at two points.</p>
            <CodeSnippet
                code={`import matplotlib.pyplot as plt
import numpy as np

# Circle Equation (center at (0,0), radius 5)
angle = np.linspace(0, 2 * np.pi, 100)
x = 5 * np.cos(angle)
y = 5 * np.sin(angle)

# Tangent at point (3, 4)
x_tangent = 3
y_tangent = 4

# The slope of the tangent line at (x_tangent, y_tangent) is the derivative of y with respect to x at that point
# For a circle with equation x^2 + y^2 = r^2, the derivative of y with respect to x is -x/y
tangent_slope = -x_tangent / y_tangent

# Equation of the tangent line: y - y_tangent = slope * (x - x_tangent)
# Rearranged to: y = slope * (x - x_tangent) + y_tangent
tangent_x = np.linspace(-5, 5, 100)
tangent_y = tangent_slope * (tangent_x - x_tangent) + y_tangent

# Plotting
plt.plot(x, y, label='Circle')
plt.plot(tangent_x, tangent_y, color='red', label='Tangent at (3, 4)')
plt.plot([-3, 5], [-4, 0], color='green', label='Chord')
plt.scatter([x_tangent], [y_tangent], color='red', zorder=5)  # Tangent point
plt.grid(True)
plt.legend()
plt.axis('equal')  # To keep the aspect ratio square
plt.show()`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <p><img src="/images/circles4.png" alt="Circle Graph"></img></p>
            </div>

            <h4>Circles and Triangles</h4>
            <p>Using circle properties to solve triangle problems, e.g., using the circumcircle or inscribed circle.</p>
            <CodeSnippet
                code={`import matplotlib.pyplot as plt
import numpy as np

# Circle and Triangle
angle = np.linspace(0, 2 * np.pi, 100)
x = 0 + 5 * np.cos(angle)
y = 0 + 5 * np.sin(angle)

plt.plot(x, y, label='Circle')
plt.plot([0, 4, -4, 0], [5, -3, -3, 5], marker='o', label='Triangle')
plt.grid(True)
plt.legend()
plt.show()`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <p><img src="/images/circles5.png" alt="Circle Graph"></img></p>
            </div>

            <div className="mt-4">
                <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
                <Button href="/quiz/6" variant="success">Take Quiz</Button>
            </div>
        </div>
    );
}