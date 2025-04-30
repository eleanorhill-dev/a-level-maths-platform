import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../../components/CodeSnippet';
import '../../styles/TopicDetailsPage.css';

export default function ForcesAndFriction() {
    return (
        <div className="topic-container mt-4">
            <h2>Forces and Friction</h2>

            <h4>Resolving Forces</h4>
            <p>Forces can be resolved into components, usually along perpendicular directions. For example, a force acting at an angle can be resolved into horizontal and vertical components.</p>

            <CodeSnippet
                code={`# Example: Resolving a force into components
import numpy as np

F = 10  # Force in N
theta = 30  # Angle in degrees

Fx = F * np.cos(np.radians(theta))  # Horizontal component
Fy = F * np.sin(np.radians(theta))  # Vertical component

print(f"Horizontal component: {Fx} N")
print(f"Vertical component: {Fy} N")`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Horizontal component: 8.660 N\nVertical component: 5.0 N`} language="text" />
            </div>

            <h4>Inclined Planes</h4>
            <p>When an object is on an inclined plane, the force of gravity can be resolved into two components: one parallel to the surface (causing motion) and one perpendicular to the surface (causing the normal force).</p>

            <CodeSnippet
                code={`# Example: Forces on an inclined plane
m = 5  # Mass in kg
g = 9.8  # Acceleration due to gravity in m/s^2
theta = 30  # Angle of incline in degrees

# Force parallel to the surface
F_parallel = m * g * np.sin(np.radians(theta))

# Force perpendicular to the surface
F_perpendicular = m * g * np.cos(np.radians(theta))

print(f"Parallel Force: {F_parallel} N")
print(f"Perpendicular Force: {F_perpendicular} N")`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Parallel Force: 24.5 N\nPerpendicular Force: 42.5 N`} language="text" />
            </div>

            <h4>Friction</h4>
            <p>Friction is the force that resists motion between two surfaces in contact. It depends on the normal force and the coefficient of friction between the surfaces.</p>

            <CodeSnippet
                code={`# Example: Calculating frictional force
mu = 0.3  # Coefficient of friction
normal_force = 50  # Normal force in N

friction = mu * normal_force
print(f"Frictional Force: {friction} N")`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Frictional Force: 15.0 N`} language="text" />
            </div>

            <div className="mt-4">
                <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
                <Button href="/quiz/42" variant="success">Take Quiz</Button>
            </div>
        </div>
    );
}
