import React from 'react';
import { useNavigate } from "react-router-dom";
import CodeSnippet from '../../components/CodeSnippet';
import '../../styles/TopicDetailsPage.css';

export default function FurtherKinematics() {
    const navigate = useNavigate();
    return (
        <div className="topic-container mt-4">
            <h2>Further Kinematics</h2>

            <h4>Vectors in Kinematics</h4>
            <p>In kinematics, vectors represent quantities such as displacement, velocity, and acceleration. These quantities are important for understanding motion in multiple directions.</p>

            <CodeSnippet
                code={`# Example: Vectors in kinematics (displacement, velocity, and acceleration)
import numpy as np

# Define displacement, velocity, and acceleration vectors
displacement = np.array([5, 10])  # in meters
velocity = np.array([2, 3])  # in m/s
acceleration = np.array([0, -9.8])  # in m/s² (gravity)

print("Displacement:", displacement)
print("Velocity:", velocity)
print("Acceleration:", acceleration)`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Displacement: [ 5 10]\nVelocity: [2 3]\nAcceleration: [ 0 -9.8]`} language="text" />
            </div>

            <h4>Vector Methods with Projectiles</h4>
            <p>Projectile motion can be broken into horizontal and vertical components, both of which can be modeled as vectors. The horizontal component of velocity remains constant, while the vertical component is influenced by gravity.</p>

            <CodeSnippet
                code={`# Example: Vector methods with projectiles
initial_velocity = np.array([10, 15])  # velocity in m/s (x, y)
g = np.array([0, -9.8])  # gravitational acceleration in m/s²

# Time of flight
time_of_flight = 2 * initial_velocity[1] / -g[1]

# Calculate final velocity using time of flight
final_velocity = initial_velocity + g * time_of_flight
print("Final velocity:", final_velocity)`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Final velocity: [10.  -15.]`} language="text" />
            </div>

            <h4>Variable Acceleration in One Dimension</h4>
            <p>In cases of variable acceleration, the acceleration changes over time. We can model this by integrating the acceleration to find velocity and displacement over time.</p>

            <CodeSnippet
                code={`# Example: Variable acceleration in one dimension
from scipy.integrate import quad

# Define acceleration as a function of time
def acceleration(t):
    return 2 * t  # acceleration increases with time

# Integrating acceleration to find velocity (integral of acceleration)
velocity, _ = quad(acceleration, 0, 5)
print("Velocity at t=5:", velocity)

# Integrating velocity to find displacement
displacement, _ = quad(lambda t: velocity, 0, 5)
print("Displacement at t=5:", displacement)`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Velocity at t=5: 25.0\nDisplacement at t=5: 125.0`} language="text" />
            </div>

            <h4>Differentiating Vectors</h4>
            <p>To differentiate vectors in kinematics, we find the rate of change of the displacement vector with respect to time, which gives us the velocity vector.</p>

            <CodeSnippet
                code={`# Example: Differentiating a position vector to find velocity
# Position vector as a function of time
def position(t):
    return np.array([2*t, 3*t**2])

# Differentiate position vector to get velocity vector
def velocity(t):
    return np.array([2, 6*t])

# Find velocity at t = 3
velocity_at_3 = velocity(3)
print("Velocity at t=3:", velocity_at_3)`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Velocity at t=3: [2 18]`} language="text" />
            </div>

            <h4>Integrating Vectors</h4>
            <p>To integrate vectors, we find the position vector by integrating the velocity vector with respect to time.</p>

            <CodeSnippet
                code={`# Example: Integrating a velocity vector to find position
# Velocity vector as a function of time
def velocity_func(t):
    return np.array([2, 4*t])

# Integrating velocity to get position
def position_func(t):
    return np.array([2*t, 2*t**2])

# Find position at t = 3
position_at_3 = position_func(3)
print("Position at t=3:", position_at_3)`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Position at t=3: [6 18]`} language="text" />
            </div>

            <div className="mt-4">
            <button className="me-2 secondary" onClick={() => navigate("/topics")}>Return to Topics</button>
            <button className="me-2 success" onClick={() => navigate("/quiz/45")}>Take Quiz</button>
            </div>
        </div>
    );
}
