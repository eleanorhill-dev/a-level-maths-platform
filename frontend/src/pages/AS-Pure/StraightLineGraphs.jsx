import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../../components/CodeSnippet';
import '../../styles/TopicDetailsPage.css';

export default function StraightLineGraphs() {
    return (
        <div className="topic-container mt-4">
            <h2>Straight Line Graphs</h2>

            <h4>y = mx + c</h4>
            <p>The equation y = mx + c represents a straight line where m is the gradient and c is the y-intercept.</p>

            <CodeSnippet
                code={`# Plotting y = mx + c
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-10, 10, 400)
y = 2 * x + 3

plt.plot(x, y, label='y = 2x + 3')
plt.axhline(0, color='black',linewidth=0.8)
plt.axvline(0, color='black',linewidth=0.8)
plt.grid(True)
plt.legend()
plt.show()`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <p><img src="/images/straightlinegraphs1.png" alt="Straight Line Graph"></img></p>
            </div>

            <h4>Equations of Straight Lines</h4>
            <p>The equation of a straight line can also be written as ax + by + c = 0. It can be rearranged to y = mx + c.</p>

            <CodeSnippet
                code={`# Converting ax + by + c = 0 to y = mx + c
from sympy import symbols, Eq, solve

x, y = symbols('x y')
line_eq = Eq(3 * x - 2 * y + 6, 0)
rearranged_eq = solve(line_eq, y)

print("Equation in y = mx + c form:", rearranged_eq[0])`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Equation in y = mx + c form: 3*x/2 + 3`} language="text" />
            </div>


            <h4>Parallel and Perpendicular Lines</h4>
            <p>Parallel lines have the same gradient (m). Perpendicular lines have gradients that multiply to -1.</p>

            <CodeSnippet
                code={`# Checking parallel and perpendicular lines
from sympy import symbols, Eq, solve

x, y = symbols('x y')
line1 = Eq(2 * x + 3, y)
line2 = Eq(-0.5 * x + 1, y)

# Slopes check
parallel = line1.rhs.diff(x) == line2.rhs.diff(x)
perpendicular = line1.rhs.diff(x) * line2.rhs.diff(x) == -1

print("Parallel:", parallel)
print("Perpendicular:", perpendicular)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Parallel: False
Perpendicular: True`} 
                language="text" />
            </div>

            <CodeSnippet
                code={`# Plotting parallel and perpendicular lines
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-10, 10, 400)
y1 = 2 * x - 8
y2 = 2 * x + 3
y3 = -0.5 * x + 1

plt.plot(x, y1, label='y1 = 2x - 8')
plt.plot(x, y2, label='y2 = 2x + 3 (Parallel to y1)')
plt.plot(x, y3, label='y3 = -0.5x + 1 (Perpendicular to y1)')
plt.axhline(0, color='black',linewidth=0.8)
plt.axvline(0, color='black',linewidth=0.8)
plt.grid(True)
plt.legend()
plt.show()`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <p><img src="/images/straightlinegraphs2.png" alt="Straight Line Graph"></img></p>
            </div>



            <h4>Length and Area</h4>
            <p>The distance between two points and the area of a triangle can be calculated using coordinates.</p>

            <CodeSnippet
                code={`# Calculating distance and area
import math

x1, y1 = 1, 2
x2, y2 = 4, 6

# Distance formula
distance = math.sqrt((x2 - x1)**2 + (y2 - y1)**2)

# Area of triangle with vertices (0,0), (x1, y1), (x2, y2)
area = 0.5 * abs(x1 * y2 - x2 * y1)

print("Distance between points:", distance)
print("Area of triangle:", area)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Distance between points: 5.0
Area of triangle: 1.0`} 
                language="text" />
            </div>


            <h4>Modelling with Straight Lines</h4>
            <p>Straight-line graphs are useful for modeling linear relationships in real-life scenarios.</p>

            <CodeSnippet
                code={`# Linear regression example
import numpy as np
import matplotlib.pyplot as plt

x = np.array([1, 2, 3, 4, 5])
y = np.array([2, 4, 5, 4, 5])

# Best fit line
m, c = np.polyfit(x, y, 1)
plt.scatter(x, y)
plt.plot(x, m * x + c, color='red', label='Best Fit Line')
plt.legend()
plt.show()`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <p><img src="/images/straightlinegraphs3.png" alt="Straight Line Graph"></img></p>
            </div>


            <div className="mt-4">
                <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
                <Button href="/quiz/5" variant="success">Take Quiz</Button>
            </div>
        </div>
    );
}
