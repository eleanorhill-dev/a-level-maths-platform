import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../components/CodeSnippet';

export default function EquationsAndInequalities() {
    return (
        <div className="container mt-4">
            <h2>Equations and Inequalities</h2>

            <h4>Linear Simultaneous Equations</h4>
            <p>Linear simultaneous equations involve solving two or more linear equations at the same time. Methods include substitution and elimination.</p>

            <CodeSnippet
                code={`# Solving linear simultaneous equations using sympy
from sympy import symbols, Eq, solve

x, y = symbols('x y')

# Equations
eq1 = Eq(2*x + 3*y, 6)
eq2 = Eq(4*x - y, 5)

solutions = solve((eq1, eq2), (x, y))
print("Solutions:", solutions)`}
                language="python"
            />

            <p><strong>Output:</strong></p>
            <CodeSnippet code={`Solutions: {x: 1, y: 1.3333333333333333}`} language="text" />

            <h4>Quadratic Simultaneous Equations</h4>
            <p>Quadratic simultaneous equations involve one linear and one quadratic equation. These can be solved using substitution.</p>

            <CodeSnippet
                code={`# Solving quadratic simultaneous equations
from sympy import symbols, Eq, solve

x, y = symbols('x y')

# Equations
eq1 = Eq(y, x**2 + 1)
eq2 = Eq(y, 2*x + 3)

solutions = solve((eq1, eq2), (x, y))
print("Solutions:", solutions)`}
                language="python"
            />

            <p><strong>Output:</strong></p>
            <CodeSnippet code={`Solutions: [(1, 5), (-3, -3)]`} language="text" />

            <h4>Simultaneous Equations on Graphs</h4>
            <p>Simultaneous equations can be represented graphically by plotting each equation and finding points of intersection.</p>

            <CodeSnippet
                code={`# Plotting simultaneous equations on a graph
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-10, 10, 400)
y1 = (6 - 2 * x) / 3
y2 = (4 * x - 5)

plt.plot(x, y1, label='2x + 3y = 6')
plt.plot(x, y2, label='4x - y = 5')
plt.xlabel('x')
plt.ylabel('y')
plt.axhline(0, color='black',linewidth=0.8)
plt.axvline(0, color='black',linewidth=0.8)
plt.legend()
plt.grid(True)
plt.show()`}
                language="python"
            />

            <p><strong>Output:</strong></p>
            <p><img src="/images/simultaneousequations1.png" alt="Simultaneous Equation Graph"></img></p>


            <h4>Linear Inequalities</h4>
            <p>Linear inequalities are similar to linear equations but use inequality symbols instead of the equal sign.</p>

            <CodeSnippet
                code={`# Solving linear inequalities
from sympy import symbols, solve_univariate_inequality

x = symbols('x')

# Inequality
inequality = x + 3 > 2
solution = solve_univariate_inequality(inequality, x)
print("Solution:", solution)`}
                language="python"
            />

            <p><strong>Output:</strong></p>
            <CodeSnippet code={`Solution: x > -1`} language="text" />

            <h4>Quadratic Inequalities</h4>
            <p>Quadratic inequalities can be solved by finding critical points and testing intervals.</p>

            <CodeSnippet
                code={`# Solving quadratic inequalities
from sympy import symbols, solve_univariate_inequality, Eq

x = symbols('x')

inequality = x**2 - 3*x - 4 <= 0
solution = solve_univariate_inequality(inequality, x)
print("Solution:", solution)`}
                language="python"
            />

            <p><strong>Output:</strong></p>
            <CodeSnippet code={`Solution: (-1 <= x) & (x <= 4)`} language="text" />

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
plt.axhline(0, color='black',linewidth=0.8)
plt.axvline(0, color='black',linewidth=0.8)
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
                <Button href="/topics/equations-and-inequalities/quiz" variant="success">Take Quiz</Button>
            </div>
        </div>
    );
}
