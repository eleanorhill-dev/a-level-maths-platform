import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../components/CodeSnippet';

export default function GraphsAndTransformations() {
    return (
        <div className="container mt-4">
            <h2>Graphs and Transformations</h2>

            <h4>Cubic Graphs</h4>
            <p>Cubic graphs are of the form y = ax³ + bx² + cx + d. They have a characteristic S-shaped curve.</p>

            <CodeSnippet
                code={`# Plotting a cubic graph
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-10, 10, 400)
y = x**3 - 3*x**2 + 2

plt.plot(x, y, label='y = x^3 - 3x^2 + 2')
plt.axhline(0, color='black',linewidth=0.8)
plt.axvline(0, color='black',linewidth=0.8)
plt.grid(True)
plt.legend()
plt.show()`}
                language="python"
            />
            
            <p><strong>Output:</strong></p>
            <p><img src="/images/cubicgraph.png" alt="Cubic Graph"></img></p>


            <h4>Quartic Graphs</h4>
            <p>Quartic graphs are of the form y = ax⁴ + bx³ + cx² + dx + e. They exhibit more complex curves with up to three turning points.</p>

            <CodeSnippet
                code={`# Plotting a quartic graph
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-10, 10, 400)
y = x**2 - 3*x**4 + 9*x**2 - 12*x

plt.plot(x, y, label='y = x^2 - 3x^4 + 9x^2 - 12x')
plt.axhline(0, color='black',linewidth=0.8)
plt.axvline(0, color='black',linewidth=0.8)
plt.grid(True)
plt.legend()
plt.show()`}
                language="python"
            />

            
            <p><strong>Output:</strong></p>
            <p><img src="/images/quarticgraph.png" alt="Quartic Graph"></img></p>


            <h4>Reciprocal Graphs</h4>
            <p>Reciprocal graphs represent functions of the form y = k/x and exhibit asymptotes at x = 0 and y = 0.</p>

            <CodeSnippet
                code={`# Plotting a reciprocal graph
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-10, 10, 400)
y = 1/x

plt.plot(x, y, label='y = 1/x')
plt.axhline(0, color='black',linewidth=0.8)
plt.axvline(0, color='black',linewidth=0.8)
plt.grid(True)
plt.legend()
plt.show()`}
                language="python"
            />

            <p><strong>Output:</strong></p>
            <p><img src="/images/reciprocalgraph.png" alt="Reciprocal Graph"></img></p>


            <h4>Points of Intersection</h4>
            <p>Points of intersection occur where two graphs meet. Solve equations simultaneously to find these points.</p>

            <CodeSnippet
                code={`# Finding points of intersection
from sympy import symbols, Eq, solve

x, y = symbols('x y')

# Equations
eq1 = Eq(y, x**2)
eq2 = Eq(y, 2*x + 3)

solutions = solve((eq1, eq2), (x, y))
print("Solutions:", solutions)`}
                language="python"
            />

            <p><strong>Output:</strong></p>
            <CodeSnippet code={`Solutions: [(-1, 1), (3, 9)]`} language="text" />


            <h4>Graph Transformations</h4>
            <p>Transformations include translations, reflections, stretches, and compressions. Use f(x), f(x + a), a f(x), and f(-x).</p>

            <CodeSnippet
                code={`# Plotting graph transformations
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-10, 10, 400)
y = x**2

plt.plot(x, y, label='y = x^2')
plt.plot(x, y + 30, label='y = x^2 + 30')
plt.plot(x, 2 * y, label='y = 2x^2')
plt.axhline(0, color='black',linewidth=0.8)
plt.axvline(0, color='black',linewidth=0.8)
plt.grid(True)
plt.legend()
plt.show()`}
                language="python"
            />

            <p><strong>Output:</strong></p>
            <p><img src="/images/graphtransformations.png" alt="Transformations Graph"></img></p>


            <div className="mt-4">
                <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
                <Button href="/quiz/4" variant="success">Take Quiz</Button>
            </div>
        </div>
    );
}
