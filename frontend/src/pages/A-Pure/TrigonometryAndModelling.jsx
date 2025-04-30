import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../../components/CodeSnippet';
import '../../styles/TopicDetailsPage.css';

export default function TrigonometryAndModelling() {
    return (
        <div className="topic-container mt-4">
            <h2>Trigonometry and Modelling</h2>

            <h4>Addition Formulae</h4>
            <p>The addition formulae are:</p>
            <ul>
                <li><strong>sin(A ± B) = sin A cos B ± cos A sin B</strong></li>
                <li><strong>cos(A ± B) = cos A cos B ∓ sin A sin B</strong></li>
            </ul>
            <CodeSnippet
                code={`from sympy import sin, cos, symbols, simplify, expand_trig

A, B = symbols('A B')
expr = sin(A + B)
expanded = expand_trig(expr)
print("Expanded sin(A + B):", expanded)`}
                language="python"
            />
            <div className="CodeSnippet-output">
                <CodeSnippet code={`Expanded sin(A + B): sin(A)*cos(B) + cos(A)*sin(B)`} language="text" />
            </div>

            <h4>Using the Angle Addition Formulae</h4>
            <p>You can use the formulae to find exact values for angles like sin(75°):</p>
            <CodeSnippet
                code={`from sympy import sin, cos, pi

# Convert to radians and apply sin(45° + 30°)
angle = sin(pi/4 + pi/6).evalf()
print("sin(75°) =", angle)`}
                language="python"
            />
            <div className="CodeSnippet-output">
                <CodeSnippet code={`sin(75°) = 0.9659258263`} language="text" />
            </div>

            <h4>Double Angle Formulae</h4>
            <p>The double angle identities include:</p>
            <ul>
                <li><strong>sin(2A) = 2 sin A cos A</strong></li>
                <li><strong>cos(2A) = cos²A − sin²A</strong></li>
            </ul>
            <CodeSnippet
                code={`from sympy import expand_trig

A = symbols('A')
double_angle = expand_trig(sin(2*A))
print("sin(2A):", double_angle)`}
                language="python"
            />
            <div className="CodeSnippet-output">
                <CodeSnippet code={`sin(2A): 2*sin(A)*cos(A)`} language="text" />
            </div>

            <h4>Solving Trigonometric Equations</h4>
            <p>Solving trig equations involves isolating the trig function and using inverse trig operations.</p>
            <CodeSnippet
                code={`from sympy import Eq, solve, sin

x = symbols('x')
eq = Eq(sin(x), 0.5)
solutions = solve(eq, x)
print("Solutions to sin(x) = 0.5:", solutions)`}
                language="python"
            />
            <div className="CodeSnippet-output">
                <CodeSnippet code={`Solutions to sin(x) = 0.5: [pi/6, 5*pi/6]`} language="text" />
            </div>

            <h4>Simplifying a cos x ± b sin x</h4>
            <p>Expressions like <em>a cos x ± b sin x</em> can be written as <em>R cos(x ± α)</em> or <em>R sin(x ± α)</em>.</p>
            <CodeSnippet
                code={`from sympy import sin, cos, symbols, sqrt, atan2

x = symbols('x')
a, b = 3, 4
R = sqrt(a**2 + b**2)
alpha = atan2(b, a)
print("R:", R)
print("α (in radians):", alpha)`}
                language="python"
            />
            <div className="CodeSnippet-output">
                <CodeSnippet code={`R: 5\nα (in radians): 0.927295218001612`} language="text" />
            </div>

            <h4>Proving Trigonometric Identities</h4>
            <p>Use algebraic manipulation and trig identities to simplify one side of the identity until it matches the other.</p>
            <CodeSnippet
                code={`from sympy import simplify, tan

x = symbols('x')
identity = tan(x)**2 + 1
simplified = simplify(identity)
print("Simplified:", simplified)`}
                language="python"
            />
            <div className="CodeSnippet-output">
                <CodeSnippet code={`Simplified: 1/cos(x)**2`} language="text" />
            </div>

            <h4>Modelling with Trigonometric Functions</h4>
            <p>Trigonometric functions are used to model periodic phenomena like sound waves or tides.</p>
            <CodeSnippet
                code={`# Example: f(t) = 3 cos(2πt / 12) models 12-hour cycles
from sympy import cos, pi, symbols

t = symbols('t')
model = 3 * cos(2*pi*t / 12)
print("Model function:", model)`}
                language="python"
            />
            <div className="CodeSnippet-output">
                <CodeSnippet code={`Model function: 3*cos(pi*t/6)`} language="text" />
            </div>

            <div className="mt-4">
                <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
                <Button href="/quiz/32" variant="success">Take Quiz</Button>
            </div>
        </div>
    );
}
