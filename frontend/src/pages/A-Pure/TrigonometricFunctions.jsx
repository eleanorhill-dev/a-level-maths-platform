import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../../components/CodeSnippet';
import '../../styles/TopicDetailsPage.css';

export default function TrigonometricFunctions() {
    return (
        <div className="topic-container mt-4">
            <h2>Trigonometric Functions</h2>

            <h4>Secant, Cosecant, and Cotangent</h4>
            <p>These are reciprocal trigonometric functions:</p>
            <ul>
                <li><strong>Secant:</strong> sec(x) = 1 / cos(x)</li>
                <li><strong>Cosecant:</strong> csc(x) = 1 / sin(x)</li>
                <li><strong>Cotangent:</strong> cot(x) = 1 / tan(x)</li>
            </ul>

            <CodeSnippet
                code={`from sympy import symbols, sec, csc, cot

x = symbols('x')

sec_expr = 1 / sec(x)
csc_expr = 1 / csc(x)
cot_expr = 1 / cot(x)

print("Sec(x) in terms of cosine:", sec_expr)
print("Cosec(x) in terms of sine:", csc_expr)
print("Cot(x) in terms of tan:", cot_expr)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet
                    code={`Sec(x) in terms of cosine: 1/sec(x)
Cosec(x) in terms of sine: 1/csc(x)
Cot(x) in terms of tan: 1/cot(x)`}
                    language="text"
                />
            </div>

            <h4>Graphs of sec(x), cosec(x), and cot(x)</h4>
            <p>These graphs have vertical asymptotes where their base functions equal zero.</p>
            <CodeSnippet
                code={`import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-2*np.pi, 2*np.pi, 1000)
plt.figure(figsize=(12, 6))

plt.subplot(1, 3, 1)
plt.plot(x, 1/np.cos(x), color='blue')
plt.title('Graph of sec(x)')
plt.ylim(-10, 10)
plt.grid(True)

plt.subplot(1, 3, 2)
plt.plot(x, 1/np.sin(x), color='green')
plt.title('Graph of cosec(x)')
plt.ylim(-10, 10)
plt.grid(True)

plt.subplot(1, 3, 3)
plt.plot(x, 1/np.tan(x), color='red')
plt.title('Graph of cot(x)')
plt.ylim(-10, 10)
plt.grid(True)

plt.tight_layout()
plt.show()`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <p><img src="/images/trigonometricfunctions1.png" alt="Secant, Cosecant, Cotangent"></img></p>
            </div>

            <h4>Using sec(x), cosec(x), and cot(x)</h4>
            <p>These identities help simplify trigonometric expressions:</p>
            <CodeSnippet
                code={`from sympy import sec, csc, cot, simplify, symbols

x = symbols('x')
expr1 = sec(x)**2 - 1
expr2 = csc(x)**2 - 1

print("sec^2(x) - 1 =", simplify(expr1))
print("cosec^2(x) - 1 =", simplify(expr2))`}
                language="python"
            />
            <div className="CodeSnippet-output">
                <CodeSnippet
                    code={`sec^2(x) - 1 = tan(x)**2\ncosec^2(x) - 1 = cot(x)**2`}
                    language="text"
                />
            </div>

            <h4>Trigonometric Identities</h4>
            <ul>
                <li>sin²(x) + cos²(x) = 1</li>
                <li>1 + tan²(x) = sec²(x)</li>
                <li>1 + cot²(x) = csc²(x)</li>
            </ul>
            <CodeSnippet
                code={`from sympy import sin, cos, tan, simplify, symbols

x = symbols('x')
print("sin^2(x) + cos^2(x) =", simplify(sin(x)**2 + cos(x)**2))
print("1 + tan^2(x) =", simplify(1 + tan(x)**2))`}
                language="python"
            />
            <div className="CodeSnippet-output">
                <CodeSnippet
                    code={`sin^2(x) + cos^2(x) = 1\n1 + tan^2(x) = sec(x)**2`}
                    language="text"
                />
            </div>

            <h4>Inverse Trigonometric Functions</h4>
            <p>These functions give the angle when a ratio is known:</p>
            <CodeSnippet
                code={`from sympy import asin, acos, atan

x = 0.5
print("asin(0.5):", asin(x))
print("acos(0.5):", acos(x))
print("atan(0.5):", atan(x))`}
                language="python"
            />
            <div className="CodeSnippet-output">
                <CodeSnippet
                    code={`asin(0.5): pi/6\nacos(0.5): pi/3\natan(0.5): atan(0.5)`}
                    language="text"
                />
            </div>

            <div className="mt-4">
                <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
                <Button href="/quiz/31" variant="success">Take Quiz</Button>
            </div>
        </div>
    );
}
