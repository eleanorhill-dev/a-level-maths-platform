import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../components/CodeSnippet';
import '../styles/TopicDetailsPage.css';

export default function ConstantAcceleration() {
    return (
        <div className="topic-container mt-4">
            <h2>Constant Acceleration</h2>

            <h4>Displacement-Time Graphs</h4>
            <p>In a displacement-time graph, the gradient (slope) represents the velocity. A straight line indicates constant velocity, while a curved line indicates acceleration.</p>

            <CodeSnippet
                code={`# Example: Plotting a displacement-time graph
import matplotlib.pyplot as plt
import numpy as np

time = np.linspace(0, 5, 100)
displacement = 3 * time  # Constant velocity of 3 m/s

plt.plot(time, displacement)
plt.title("Displacement-Time Graph")
plt.xlabel("Time (s)")
plt.ylabel("Displacement (m)")
plt.grid(True)
plt.show()`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <p><img src="/images/constantacceleration1.png" alt="Displacement-Time"></img></p>
            </div>

            <h4>Velocity-Time Graphs</h4>
            <p>In a velocity-time graph, the gradient represents acceleration and the area under the graph represents displacement.</p>

            <CodeSnippet
                code={`# Example: Plotting a velocity-time graph
time = np.linspace(0, 5, 100)
velocity = 2 * time  # Constant acceleration of 2 m/s²

plt.plot(time, velocity)
plt.title("Velocity-Time Graph")
plt.xlabel("Time (s)")
plt.ylabel("Velocity (m/s)")
plt.grid(True)
plt.show()`}
                language="python"
            />

                <div className="CodeSnippet-output">
                    <p><img src="/images/constantacceleration2.png" alt="Velocity-Time"></img></p>
                </div>

            <h4>Constant Acceleration Formulae 1</h4>
            <p>The equations of motion under constant acceleration include:</p>
            <ul>
                <li><em>v = u + at</em></li>
                <li><em>s = ut + ½at²</em></li>
                <li><em>v² = u² + 2as</em></li>
            </ul>

            <CodeSnippet
                code={`# Example: Using equations of motion
u = 0  # initial velocity (m/s)
a = 2  # acceleration (m/s²)
t = 5  # time (s)

v = u + a * t
s = u * t + 0.5 * a * t**2

print("Final velocity:", v, "m/s")
print("Displacement:", s, "m")`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Final velocity: 10 m/s\nDisplacement: 25.0 m`} language="text" />
            </div>

            <h4>Constant Acceleration Formulae 2</h4>
            <p>Other rearrangements of the formulae include:</p>
            <ul>
                <li><em>s = ((u + v) / 2) × t</em></li>
                <li><em>s = vt - ½at²</em></li>
            </ul>

            <CodeSnippet
                code={`# Example: Using an alternative formula
v = 10  # final velocity (m/s)

s = ((u + v) / 2) * t

print("Displacement using alternative formula:", s, "m")`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Displacement using alternative formula: 25.0 m`} language="text" />
            </div>

            <h4>Vertical Motion Under Gravity</h4>
            <p>Vertical motion problems often involve taking acceleration due to gravity as <em>g = 9.8 m/s²</em> downwards. Upward motion is typically treated as negative acceleration.</p>

            <CodeSnippet
                code={`# Example: Vertical motion under gravity
g = 9.8  # acceleration due to gravity (m/s²)
u = 20   # initial upwards velocity (m/s)
t = 2    # time in seconds

# Velocity after 2 seconds
v = u - g * t

# Displacement after 2 seconds
s = u * t - 0.5 * g * t**2

print("Velocity after 2 seconds:", v, "m/s")
print("Displacement after 2 seconds:", s, "m")`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Velocity after 2 seconds: 0.4 m/s\nDisplacement after 2 seconds: 20.4 m`} language="text" />
            </div>

            <div className="mt-4">
                <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
                <Button href="/quiz/23" variant="success">Take Quiz</Button>
            </div>
        </div>
    );
}
