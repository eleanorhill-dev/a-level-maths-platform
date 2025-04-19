import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../components/CodeSnippet';

export default function EquationsAndInequalities() {
    return (
        <div className="container mt-4">
            <h2>Equations and Inequalities</h2>

            <h4>Linear Simultaneous Equations</h4>
            <p>Linear simultaneous equations involve solving two or more linear equations at the same time. Methods include substitution and elimination.</p>
            <p>The code snippet below shows how to find the result of the following simultaneous equations:</p>
            <p>2x + 3y = 6</p>
            <p>4x - y = 5</p>

            <CodeSnippet
                code={`# Solving linear simultaneous equations using sympy
from sympy import symbols, solve

x, y = symbols('x, y')

# Make the equations equal to zero before putting them into the solve() function
solve((2*x + 3*y - 6, 4*x - y - 5), (x, y))`}
                language="python"
            />

            <p><strong>Output:</strong></p>
            <CodeSnippet code={`{x: 3/2, y: 1}`} language="text" />

            <h4>Quadratic Simultaneous Equations</h4>
            <p>Quadratic simultaneous equations involve one linear and one quadratic equation. These can be solved using substitution.</p>
            <p>The code snippet below shows how to find the result of the following simultaneous equations:</p>
            <p>y = x² + 1</p>
            <p>y = 2x + 3</p>

            <CodeSnippet
                code={`# Solving quadratic simultaneous equations
from sympy import symbols, solve

x, y = symbols('x, y')

# Make the equations equal to zero before putting them into the solve() function
solve((x**2 - y + 1, 2*x - y + 3), (x, y))`}
                language="python"
            />

            <p><strong>Output:</strong></p>
            <CodeSnippet code={`[(1 - sqrt(3), 5 - 2*sqrt(3)), (1 + sqrt(3), 2*sqrt(3) + 5)]`} language="text" />

            <h4>Simultaneous Equations on Graphs</h4>
            <p>The result of solving linear simultaneous equations gives a point (x, y) which is the intersection between the two lines when plotted graphically (as demonstrated below).</p>
            <p>Similarly, if you plot quadratic simultaneous equations, there would be two intersection points on the graph since one of the lines is a parabola.</p>

            <CodeSnippet
                code={`# Plotting simultaneous equations on a graph
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-10, 10, 400)
y1 = (6 - 2 * x) / 3
y2 = (4 * x - 5)

# Plot the lines on the graph
plt.plot(x, y1, label='2x + 3y = 6')
plt.plot(x, y2, label='4x - y = 5')

# Label the x and y axis
plt.xlabel('x')
plt.ylabel('y')

plt.legend()
plt.grid(True)
plt.show()`}
                language="python"
            />

            <p><strong>Output:</strong></p>
            <p><img src="/images/simultaneousequations1.png" alt="Simultaneous Equation Graph"></img></p>


            <h4>Linear Inequalities</h4>
            <p>Linear inequalities are similar to linear equations but use inequality symbols instead of the equal sign.</p>
            <p>The code snippet below shows how you can use Python to solve the inequality:</p>
            <p>x + 3 {'>'} 2</p>

            <CodeSnippet
                code={`# Solving linear inequalities
from sympy import symbols, solve

x, y = symbols('x, y')

solve(x + 3 > 2, x)`}
                language="python"
            />

            <p><strong>Output:</strong></p>
            <CodeSnippet code={`-1 < x ∧ x < ∞`} language="text" />

            <h4>Quadratic Inequalities</h4>
            <p>Quadratic inequalities can be solved by finding critical points and testing intervals.</p>
            <p>The code snippet below shows how you can use Python to solve the inequality:</p>
            <p>x² - 3x - 4 ≤ 0</p>

            <CodeSnippet
                code={`# Solving quadratic inequalities
from sympy import symbols, solve

x, y = symbols('x, y')

solve(x**2 - 3*x - 4 <= 0, x)`}
                language="python"
            />

            <p><strong>Output:</strong></p>
            <CodeSnippet code={`-1 ≤ x ∧ x ≤ 4`} language="text" />

            <h4>Regions</h4>
            <p>Regions in inequalities are represented graphically to show all possible solutions. The region satisfying the inequality is shaded.</p>

            <CodeSnippet
                code={`# Plotting regions for linear inequalities
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-10, 10, 400)
y = (6 - 2 * x) / 3

plt.plot(x, y, label='2x + 3y <= 6')
plt.fill_between(x, y, -10, where=(y >= -10), color='lightblue', alpha=0.5)
plt.xlabel('x')
plt.ylabel('y')
plt.legend()
plt.grid(True)
plt.show()`}
                language="python"
            />

            <p><strong>Output:</strong></p>
            <p><img src="/images/regions1.png" alt="Regions Graph"></img></p>


            <h3>Summary</h3>
            <p>In this topic, we covered:</p>
            <ul>
                <li>Linear and quadratic simultaneous equations</li>
                <li>Solving simultaneous equations graphically</li>
                <li>Working with linear and quadratic inequalities</li>
                <li>Understanding regions on graphs</li>
            </ul>

            <div className="mt-4">
                <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
                <Button href="/quiz/3" variant="success">Take Quiz</Button>
            </div>
        </div>
    );
}
