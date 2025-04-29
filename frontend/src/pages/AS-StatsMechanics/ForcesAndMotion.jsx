import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../../components/CodeSnippet';
import '../../styles/TopicDetailsPage.css';

export default function ForcesAndMotion() {
    return (
        <div className="topic-container mt-4">
            <h2>Forces and Motion</h2>

            <h4>Force Diagrams</h4>
            <p>Force diagrams (also called free-body diagrams) show all the forces acting on an object. Arrows represent forces, and their directions show the direction of each force.</p>

            <CodeSnippet
                code={`# Example: Drawing a simple free-body diagram
# (Not actual graphical output, just describing forces)

forces = {
    "Weight": "Downwards (mg)",
    "Normal Reaction": "Upwards",
    "Friction": "Opposite to motion",
    "Applied Force": "In direction of motion"
}

for name, direction in forces.items():
    print(f"{name}: {direction}")`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Weight: Downwards (mg)
Normal Reaction: Upwards
Friction: Opposite to motion
Applied Force: In direction of motion`} language="text" />
            </div>

            <h4>Forces as Vectors</h4>
            <p>Forces can be represented as vectors, broken into components when acting at angles.</p>

            <CodeSnippet
                code={`# Example: Resolving a force into components
import numpy as np

F = 10  # force magnitude in N
theta = 30  # angle in degrees

Fx = F * np.cos(np.radians(theta))
Fy = F * np.sin(np.radians(theta))

print("Horizontal component:", Fx)
print("Vertical component:", Fy)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Horizontal component: 8.660...\nVertical component: 5.0`} language="text" />
            </div>

            <h4>Forces and Acceleration</h4>
            <p>Newton's Second Law states that <em>F = ma</em>: the resultant force is equal to mass times acceleration.</p>

            <CodeSnippet
                code={`# Example: Calculating acceleration
m = 5  # mass in kg
F = 20  # resultant force in N

a = F / m
print("Acceleration:", a, "m/s²")`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Acceleration: 4.0 m/s²`} language="text" />
            </div>

            <h4>Motion in 2 Dimensions</h4>
            <p>When motion happens in two dimensions, we analyze each axis separately using vector components.</p>

            <CodeSnippet
                code={`# Example: Calculating 2D motion
initial_velocity = np.array([3, 4])  # velocity in m/s (x, y)
acceleration = np.array([0, -9.8])   # gravity only acts vertically
time = 2  # seconds

final_velocity = initial_velocity + acceleration * time

print("Final velocity (x, y):", final_velocity)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Final velocity (x, y): [  3. -15.6]`} language="text" />
            </div>

            <h4>Connected Particles</h4>
            <p>In problems with connected particles (e.g., by a string), the tension is the same throughout (assuming a light inextensible string), and particles share acceleration.</p>

            <CodeSnippet
                code={`# Example: Connected particles on a smooth surface
m1 = 2  # kg
m2 = 3  # kg
F = 10  # N (force pulling the system)

# Total mass
M = m1 + m2

# Acceleration of the system
a = F / M

# Tension in the string
T = m1 * a

print("Acceleration:", a, "m/s²")
print("Tension:", T, "N")`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Acceleration: 2.0 m/s²\nTension: 4.0 N`} language="text" />
            </div>

            <h4>Pulleys</h4>
            <p>In pulley systems (especially smooth and light pulleys), we model the tension to be the same on both sides. Pulley problems usually involve one object going up while the other goes down.</p>

            <CodeSnippet
                code={`# Example: Pulley system with two masses
m1 = 2  # kg (going up)
m2 = 5  # kg (going down)
g = 9.8  # gravity

# Net force
net_force = m2 * g - m1 * g

# Total mass
M = m1 + m2

# Acceleration
a = net_force / M

print("Acceleration of the system:", a, "m/s²")`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Acceleration of the system: 4.2 m/s²`} language="text" />
            </div>

            <div className="mt-4">
                <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
                <Button href="/quiz/24" variant="success">Take Quiz</Button>
            </div>
        </div>
    );
}
