import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../components/CodeSnippet';


export default function TrigonometricIdentitiesAndEquations() {
    
    return (
        <div className="container mt-4">
            <h2>Trigonometric Identities and Equations</h2>

            <h4>Unit Circle</h4>
            <p>You can use a unit circle with its centre at the origin, O to help you understand the trigonometric ratios. For a point P(x,y) on a unit circle such that OP makes an angle θ with the positive x-axis:</p>
            <ul>
                <li><p><strong>cos(θ) = x = x-coordinate of P</strong></p></li>
                <li><p><strong>sin(θ) = y = y-coordinate of P</strong></p></li>
                <li><p><strong>tan(θ) = y/x = gradient of OP</strong></p></li>
            </ul>
            <p>To plot y = sin(θ), read off the y-coordinates as P moves around the circle. To plot y = cos(θ), read off the x-coordinates as P moves around the circle.</p>

            <p>Below is some code to plot a unit circle:</p>
            <CodeSnippet
                code={`import matplotlib.pyplot as plt
import numpy as np

# Plot settings
plt.figure(figsize=(6, 6))
ax = plt.gca()

# Circle parameters
radius = 1
t = np.linspace(0, 2 * np.pi, 100)
x = radius * np.cos(t)
y = radius * np.sin(t)

# Point P on the circle
theta = np.pi / 4  # 45 degrees
px = radius * np.cos(theta)
py = radius * np.sin(theta)

# Plot circle
ax.plot(x, y, label="Unit Circle", color="blue")
ax.plot([0, px], [0, py], label="Radius (r)", color="black")
ax.plot([px, px], [0, py], linestyle="dotted", color="red")  # Vertical line

# Labels and formatting
ax.annotate(r'$\theta$', xy=(px/2, py/2), fontsize=14)
ax.annotate("P(x, y)", xy=(px, py), xytext=(px + 0.5, py), fontsize=12)
ax.set_xlim(-1.5, 1.5)
ax.set_ylim(-1.5, 1.5)
ax.axhline(0, color='black')
ax.axvline(0, color='black')
ax.set_aspect('equal', 'box')
ax.legend()
ax.grid(True)

plt.show()`}
                language="python"
            />

            
            <p><strong>Output:</strong></p>
            <p><img src="/images/castdiagram.png" alt="Cast Diagram"></img></p>


            <h4>Exact Values of Trigonometrical Ratios</h4>
            <p>Calculating exact values for common angles (30°, 45°, 60°) is made easy with python:</p>
            <CodeSnippet
                code={`from sympy import sin, cos, pi

print(sin(pi/6))
print(cos(pi/3))
print(sin(pi/4)) `}
                language="python"
            />

            <p><strong>Output:</strong></p>
            <CodeSnippet code={`1/2
1/2
sqrt(2)/2`} language="text" />


            <h4>Trigonometric Identities</h4>
            <p>You can use the definitions of sin, cos, and tan, together with Pythagoras' theorem to find two useful identities. The unit circle has equation x² + y² = 1. Since cos(θ) = x and sin(θ) = y, it follows that cos²(θ) + sin²(θ) = 1.</p>
            <CodeSnippet
                code={`from sympy import symbols, sin, cos, simplify

x = symbols('x')
identity = sin(x)**2 + cos(x)**2
print(simplify(identity))`}
                language="python"
            />

            <p><strong>Output:</strong></p>
            <CodeSnippet code={`1`} language="text" />


            <div className="mt-4">
                <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
                <Button href="/quiz/10" variant="success">Take Quiz</Button>
            </div>
        </div>
    );
}
