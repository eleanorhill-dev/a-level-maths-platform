import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../../components/CodeSnippet';
import '../../styles/TopicDetailsPage.css';

export default function ApplicationsOfForces() {
    return (
        <div className="topic-container mt-4">
            <h2>Applications of Forces</h2>

            <h4>Static Particles</h4>
            <p>Static particles are objects that are at rest and are subject to forces, but these forces balance out to produce no acceleration. The forces are in equilibrium.</p>

            <CodeSnippet
                code={`# Example: Static particle in equilibrium
F1 = 10  # N
F2 = 10  # N

# Two forces balancing each other
if F1 == F2:
    print("The particle is in equilibrium.")`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`The particle is in equilibrium.`} language="text" />
            </div>

            <h4>Modelling with Statics</h4>
            <p>In statics, we model objects that are in equilibrium, meaning the sum of the forces and the sum of the moments are zero.</p>

            <CodeSnippet
                code={`# Example: Modelling a particle in equilibrium using forces
import numpy as np

# Forces in x and y directions
Fx = 20  # N
Fy = 30  # N

# The sum of forces in each direction should be zero for equilibrium
if Fx == 0 and Fy == 0:
    print("The system is in equilibrium.")`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`# No output because the system is not in equilibrium.`} language="text" />
            </div>

            <h4>Friction and Static Particles</h4>
            <p>Friction is the force that resists the relative motion of two objects in contact. When a particle is at rest, friction acts to prevent it from moving.</p>

            <CodeSnippet
                code={`# Example: Static friction preventing motion
force_applied = 5  # N
friction_max = 10  # N (maximum static friction)

if force_applied <= friction_max:
    print("The particle remains at rest.")
else:
    print("The particle moves.")`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`The particle remains at rest.`} language="text" />
            </div>

            <h4>Static Rigid Bodies</h4>
            <p>A rigid body is an object with a definite shape that does not deform under forces. In statics, we model rigid bodies where the sum of forces and moments is zero.</p>

            <CodeSnippet
                code={`# Example: Static rigid body in equilibrium
# Forces acting on a rigid body
force1 = 15  # N
force2 = 15  # N
distance = 5  # meters (distance between forces)

# For equilibrium, the sum of moments must be zero
moment1 = force1 * distance
moment2 = force2 * distance

if moment1 == moment2:
    print("The rigid body is in equilibrium.")`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`The rigid body is in equilibrium.`} language="text" />
            </div>

            <h4>Dynamics and Inclined Planes</h4>
            <p>When a body is on an inclined plane, the forces acting on it can be resolved into components parallel and perpendicular to the surface.</p>

            <CodeSnippet
                code={`# Example: Dynamics on an inclined plane
m = 10  # kg
theta = 30  # degrees (angle of inclination)
g = 9.8  # m/s^2 (gravity)

# Resolving forces
Fg = m * g
Fg_perpendicular = Fg * np.cos(np.radians(theta))
Fg_parallel = Fg * np.sin(np.radians(theta))

print(f"Perpendicular force: {Fg_perpendicular} N")
print(f"Parallel force: {Fg_parallel} N")`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Perpendicular force: 84.9 N\nParallel force: 49.0 N`} language="text" />
            </div>

            <h4>Connected Particles</h4>
            <p>In problems involving connected particles, forces act across the connection (such as a string or a rod), and the particles share the same acceleration.</p>

            <CodeSnippet
                code={`# Example: Connected particles on a smooth surface
m1 = 3  # kg
m2 = 5  # kg
F = 20  # N (force applied to the system)

# Total mass
M = m1 + m2

# Acceleration of the system
a = F / M

# Tension in the string
T = m1 * a

print(f"Acceleration: {a} m/s²")
print(f"Tension: {T} N")`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Acceleration: 2.5 m/s²
Tension: 7.5 N`} language="text" />
            </div>

            <div className="mt-4">
                <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
                <Button href="/quiz/44" variant="success">Take Quiz</Button>
            </div>
        </div>
    );
}
