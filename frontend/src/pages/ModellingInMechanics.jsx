import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../components/CodeSnippet';
import '../styles/TopicDetailsPage.css';

export default function ModellingInMechanics() {
    return (
        <div className="topic-container mt-4">
            <h2>Modelling in Mechanics</h2>

            <h4>Constructing a Model</h4>
            <p>In mechanics, constructing a model involves simplifying a real-world situation to make it mathematically manageable, while keeping essential characteristics.</p>

            <CodeSnippet
                code={`# Example: Basic Model for a Falling Object
# Ignore air resistance, assume constant acceleration due to gravity

g = 9.8  # acceleration due to gravity (m/s^2)
u = 0    # initial velocity (m/s)
t = 5    # time in seconds

# Final velocity after 5 seconds
v = u + g * t
print("Final velocity:", v, "m/s")`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Final velocity: 49.0 m/s`} language="text" />
            </div>

            <h4>Modelling Assumptions</h4>
            <p>Modelling assumptions help simplify problems. Typical assumptions include ignoring air resistance, treating objects as particles, or assuming uniform gravitational fields.</p>

            <CodeSnippet
                code={`# Example: List of common modelling assumptions
assumptions = [
    "Particle model: Object size is negligible",
    "Inextensible string: Tension is constant",
    "Smooth surface: No friction",
    "Light object: Mass is negligible"
]

for item in assumptions:
    print("-", item)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`- Particle model: Object size is negligible\n- Inextensible string: Tension is constant\n- Smooth surface: No friction\n- Light object: Mass is negligible`} language="text" />
            </div>

            <h4>Quantities and Units</h4>
            <p>In mechanics, quantities such as displacement, velocity, acceleration, and force must be measured in consistent SI units (e.g., meters, seconds, kilograms, newtons).</p>

            <CodeSnippet
                code={`# Example: Basic Quantities
quantities = {
    "Displacement": "meter (m)",
    "Time": "second (s)",
    "Mass": "kilogram (kg)",
    "Force": "newton (N)"
}

for quantity, unit in quantities.items():
    print(f"{quantity}: {unit}")`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Displacement: meter (m)\nTime: second (s)\nMass: kilogram (kg)\nForce: newton (N)`} language="text" />
            </div>

            <h4>Working with Vectors</h4>
            <p>Vectors are used to represent quantities that have both magnitude and direction, such as displacement, velocity, and force.</p>

            <CodeSnippet
                code={`# Example: Basic Vector Operations
import numpy as np

# Define vectors
A = np.array([3, 4])
B = np.array([1, 2])

# Vector addition
C = A + B

# Magnitude of vector A
magnitude_A = np.linalg.norm(A)

print("Vector A + B:", C)
print("Magnitude of A:", magnitude_A)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Vector A + B: [4 6]\nMagnitude of A: 5.0`} language="text" />
            </div>

            <div className="mt-4">
                <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
                <Button href="/quiz/22" variant="success">Take Quiz</Button>
            </div>
        </div>
    );
}
