import React from 'react';
import { useNavigate } from "react-router-dom";
import CodeSnippet from '../../components/CodeSnippet';
import '../../styles/TopicDetailsPage.css';

export default function VariableAcceleration() {
    const navigate = useNavigate();
    return (
        <div className="topic-container mt-4">
            <h2>Variable Acceleration</h2>

            <h4>Functions of Time</h4>
            <p>When acceleration, velocity, or displacement are functions of time, we can describe motion with equations involving <em>t</em>.</p>

            <CodeSnippet
                code={`# Example: Position as a function of time
from sympy import symbols

t = symbols('t')
s = 3*t**2 + 2*t + 1  # displacement in meters

print("Displacement function:", s)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Displacement function: 3*t**2 + 2*t + 1`} language="text" />
            </div>


            <h4>Using Differentiation</h4>
            <p>Velocity is the derivative of displacement with respect to time, and acceleration is the derivative of velocity.</p>

            <CodeSnippet
                code={`# Example: Finding velocity and acceleration
from sympy import diff

v = diff(s, t)  # velocity
a = diff(v, t)  # acceleration

print("Velocity function:", v)
print("Acceleration function:", a)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Velocity function: 6*t + 2\nAcceleration function: 6`} language="text" />
            </div>

            <h4>Maxima and Minima Problems</h4>
            <p>Critical points where velocity is zero often indicate turning points (maximum or minimum displacement).</p>

            <CodeSnippet
                code={`# Example: Finding turning points
from sympy import solve

critical_times = solve(v, t)
print("Critical time(s):", critical_times)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Critical time(s): [-1/3]`} language="text" />
            </div>

            <h4>Using Integration</h4>
            <p>We can integrate acceleration to find velocity, and integrate velocity to find displacement, adding constants of integration if necessary.</p>

            <CodeSnippet
                code={`# Example: Finding velocity from acceleration
from sympy import integrate

a_function = 4*t
v_function = integrate(a_function, t)

print("Velocity function (before constant added):", v_function)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Velocity function (before constant): 2*t**2`} language="text" />
            </div>

            <h4>Constant Acceleration Formulae</h4>
            <p>When acceleration is constant, we can use the suvat equations:</p>
            <ul>
                <li><em>v = u + at</em></li>
                <li><em>s = ut + ½at²</em></li>
                <li><em>v² = u² + 2as</em></li>
                <li><em>s = ((u + v)/2)t</em></li>
            </ul>

            <CodeSnippet
                code={`# Example: Using SUVAT
u = 5  # initial velocity in m/s
a = 2  # acceleration in m/s²
t = 3  # time in seconds

v = u + a*t
s = u*t + 0.5*a*t**2

print("Final velocity:", v, "m/s")
print("Displacement:", s, "m")`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Final velocity: 11 m/s\nDisplacement: 24 m`} language="text" />
            </div>

            <div className="mt-4">
            <button className="me-2 secondary" onClick={() => navigate("/topics")}>Return to Topics</button>
            <button className="me-2 success" onClick={() => navigate("/quiz/25")}>Take Quiz</button>
            </div>
        </div>
    );
}
