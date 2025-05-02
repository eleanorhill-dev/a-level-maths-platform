import React from 'react';
import { useNavigate } from "react-router-dom";
import CodeSnippet from '../../components/CodeSnippet';
import '../../styles/TopicDetailsPage.css';

export default function ParametricEquations() {
  const navigate = useNavigate();
  return (
    <div className="topic-container mt-4">
      <h2>Parametric Equations</h2>

      <h4>Parametric Equations</h4>
      <p>Parametric equations express coordinates as functions of a parameter, usually t. For example:</p>
      <CodeSnippet
        code={`# Define parametric equations
from sympy import symbols

t = symbols('t')
x = 2 * t + 1
y = 3 * t - 2

print("x(t):", x)
print("y(t):", y)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`x(t): 2*t + 1\ny(t): 3*t - 2`} language="text" />
      </div>

      <h4>Using Trigonometric Identities</h4>
      <p>Parametric equations can be converted into Cartesian form using trigonometric identities. For example, using x = cos(t), y = sin(t), you can form the identity x² + y² = 1.</p>
      <CodeSnippet
        code={`# Convert parametric equations to Cartesian
from sympy import cos, sin, simplify

t = symbols('t')
x = cos(t)
y = sin(t)

identity = simplify(x**2 + y**2)

print("Identity:", identity)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`Identity: 1`} language="text" />
      </div>

      <h4>Curve Sketching</h4>
      <p>You can sketch the curve by plotting values of x(t) and y(t) for a range of t. Here's a code snippet you can use to graph the parametric curve x = cos(t), y = sin(t):</p>
      <CodeSnippet
        code={`# Plotting parametric curve
import matplotlib.pyplot as plt
import numpy as np

t = np.linspace(0, 2 * np.pi, 400)
x = np.cos(t)
y = np.sin(t)

plt.plot(x, y)
plt.xlabel("x")
plt.ylabel("y")
plt.title("Parametric Curve: x = cos(t), y = sin(t)")
plt.axis("equal")
plt.grid(True)
plt.show()`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <p><img src="/images/parametricequations1.png" alt="Parametric curve of x = cos(t), y = sin(t)"></img></p>
      </div>

      <h4>Points of Intersection</h4>
      <p>To find intersections between two parametric curves, equate their x and y expressions and solve for t.</p>
      <CodeSnippet
        code={`# Solve for intersection
from sympy import Eq, solve

t, s = symbols('t s')
x1 = 2*t + 1
y1 = 3*t + 2

x2 = 4*s - 1
y2 = 3*s + 5

eq1 = Eq(x1, x2)
eq2 = Eq(y1, y2)

sol = solve((eq1, eq2), (t, s))
print("Intersection at:", sol)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`Intersection at: {s: 2, t: 3}`} language="text" />
      </div>

      <h4>Modelling with Parametric Equations</h4>
      <p>Parametric equations are often used in mechanics to model motion. For instance, horizontal and vertical motion under gravity can be described as:</p>
      <CodeSnippet
        code={`# Projectile motion model
from sympy import symbols

t = symbols('t')
x = 10 * t  # horizontal motion
y = 20 * t - 5 * t**2  # vertical motion under gravity

print("x(t):", x)
print("y(t):", y)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`x(t): 10*t\ny(t): 20*t - 5*t**2`} language="text" />
      </div>

      <div className="mt-4">
      <button className="me-2 secondary" onClick={() => navigate("/topics")}>Return to Topics</button>
      <button className="me-2 success" onClick={() => navigate("/quiz/33")}>Take Quiz</button>
      </div>
    </div>
  );
}
