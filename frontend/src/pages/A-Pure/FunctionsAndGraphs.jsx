import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../../components/CodeSnippet';
import '../../styles/TopicDetailsPage.css';

export default function FunctionsAndGraphs() {
    return (
        <div className="topic-container mt-4">
            <h2>Functions and Graphs</h2>

            <h4>The Modulus Function</h4>
            <p>The modulus function gives the absolute value of a number or expression: <em>|x|</em> returns <em>x</em> if <em>x ≥ 0</em>, and <em>−x</em> if <em>x &lt; 0</em>.</p>
            <CodeSnippet
                code={`from sympy import symbols, Abs

x = symbols('x')
abs_function = Abs(x - 3)

print(abs_function)`}
                language="python"
            />
            <div className="CodeSnippet-output">
                <CodeSnippet code={`|x - 3|`} language="text" />
            </div>

            <h4>Functions and Mappings</h4>
            <p>A function is a mapping from one set of values (inputs) to another (outputs). Each input has exactly one output.</p>
            <CodeSnippet
                code={`# Example: Define a function and map input values
def f(x):
    return 2*x + 1

values = [f(x) for x in range(-2, 3)]
print(values)`}
                language="python"
            />
            <div className="CodeSnippet-output">
                <CodeSnippet code={`[-3, -1, 1, 3, 5]`} language="text" />
            </div>

            <h4>Composite Functions</h4>
            <p>Composite functions apply one function to the result of another: <em>(f ∘ g)(x) = f(g(x))</em>. For example, if <em>f(x) = x²</em> and <em>g(x) = x + 1</em>, then <em>f(g(x)) = (x + 1)²</em>.</p>
            <CodeSnippet
                code={`from sympy import symbols, Function, simplify

x = symbols('x')

# Define g(x) = x + 1
g_x = x + 1

# Let f(x) = x^2
# Define f(g(x)) = g(x)^2
f_x = g_x**2

print(f_x)`
                }
                language="python"
            />
            <div className="CodeSnippet-output">
                <CodeSnippet code={`(x + 1)**2`} language="text" />
            </div>

            <h4>Inverse Functions</h4>
            <p>The inverse of a function "undoes" the effect of the function. If <em>f(x) = 2x + 3</em>, then <em>f⁻¹(x) = (x - 3)/2</em>.</p>
            <CodeSnippet
                code={`from sympy import symbols, solve, Eq

x, y = symbols('x y')
f_expr = 2*x + 3

# Solve y = 2x + 3 for x
inverse = solve(Eq(y, f_expr), x)
print(inverse)`}
                language="python"
            />
            <div className="CodeSnippet-output">
                <CodeSnippet code={`[y/2 - 3/2]`} language="text" />
            </div>

            <h4>y = |f(x)| and y = f(|x|)</h4>
            <p>These transformations involve absolute values:</p>
            <ul>
            <li><strong>y = |f(x)|</strong> reflects all negative parts of the graph above the x-axis.</li>
            <li><strong>y = f(|x|)</strong> makes the graph symmetrical about the y-axis by mirroring the right side to the left.</li>
            </ul>

            <CodeSnippet
            code={`import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(-5, 5, 400)
f_x = x**3 - 6*x + 3

# Apply transformations
y_abs_fx = np.abs(f_x)
y_f_absx = (np.abs(x))**3 - 6*(np.abs(x)) + 3

# Plotting
plt.figure(figsize=(10, 4))

# Plot the original graph y = f(x)
plt.subplot(1, 3, 1)
plt.plot(x, f_x, label='y = f(x)', color='red')
plt.title('y = f(x)')
plt.axhline(0, color='black', lw=0.5)
plt.grid(True)
plt.legend()

# Plot the graph y = |f(x)|
plt.subplot(1, 3, 2)
plt.plot(x, y_abs_fx, label='y = |f(x)|')
plt.title('y = |f(x)|')
plt.axhline(0, color='black', lw=0.5)
plt.grid(True)
plt.legend()

# Plot the graph y = f(|x|)
plt.subplot(1, 3, 3)
plt.plot(x, y_f_absx, label='y = f(|x|)', color='orange')
plt.title('y = f(|x|)')
plt.axhline(0, color='black', lw=0.5)
plt.grid(True)
plt.legend()

plt.tight_layout()
plt.show()`
                }
                language="python"
                />
            
            <div className="CodeSnippet-output">
                <p><img src="/images/functionsandgraphs1.png" alt="Plotting y = |f(x)| and y = f(|x|)"></img></p>
            </div>


            <h4>Combining Transformations</h4>
            <p>Transformations can include translations, stretches, and reflections. For example, <em>f(x) → f(x - 2) + 3</em> translates right by 2 and up by 3.</p>
            <CodeSnippet
                code={`# Translate f(x) = 2(x - 1)^2 by 2 right and 3 up
from sympy import symbols

x = symbols('x')
f = 2*(x - 1)**2

transformed = f.subs(x, x - 2) + 3

print(transformed)`}
                language="python"
            />
            <div className="CodeSnippet-output">
                <CodeSnippet code={`2*(x - 3)**2 + 3`} language="text" />
            </div>

            <h4>Solving Modulus Problems</h4>
            <p>To solve equations like <em>|x - 1| = 3</em>, consider both cases: <em>x - 1 = 3</em> and <em>x - 1 = -3</em>.</p>
            <CodeSnippet
                code={`from sympy import symbols, Abs
from sympy.solvers.inequalities import solve_univariate_inequality

x = symbols('x')
inequality = Abs(x - 3) < 5

solution = solve_univariate_inequality(inequality, x)

print("Solution:", solution)`
                }
                language="python"
                />

            <div className="CodeSnippet-output">
            <CodeSnippet code={`Solution: (-2 < x) & (x < 8)`} language="text" />
            </div>

            <div className="mt-4">
                <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
                <Button href="/quiz/27" variant="success">Take Quiz</Button>
            </div>
        </div>
    );
}
