import React from 'react';
import { useNavigate } from "react-router-dom";
import CodeSnippet from '../../components/CodeSnippet';
import '../../styles/TopicDetailsPage.css';

export default function Projectiles() {
    const navigate = useNavigate();
    return (
        <div className="topic-container mt-4">
            <h2>Projectiles</h2>

            <h4>Horizontal Projection</h4>
            <p>In horizontal projection, the object is projected horizontally, and the motion is influenced only by gravity in the vertical direction. The horizontal velocity remains constant.</p>

            <CodeSnippet
                code={`# Example: Horizontal projection of a projectile
initial_velocity = 10  # m/s (horizontal velocity)
time = 3  # seconds
g = 9.8  # acceleration due to gravity

# Horizontal motion (constant velocity)
horizontal_distance = initial_velocity * time

print(f"Horizontal distance: {horizontal_distance} meters")`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Horizontal distance: 30.0 meters`} language="text" />
            </div>

            <h4>Horizontal and Vertical Components</h4>
            <p>In projectile motion, the motion can be broken into horizontal and vertical components. The horizontal component remains constant, while the vertical component is influenced by gravity.</p>

            <CodeSnippet
                code={`# Example: Horizontal and vertical components of projectile motion
initial_velocity = 20  # m/s (initial velocity)
angle = 45  # Angle of projection in degrees
g = 9.8  # acceleration due to gravity

# Horizontal component (constant velocity)
vx = initial_velocity * np.cos(np.radians(angle))

# Vertical component (affected by gravity)
vy = initial_velocity * np.sin(np.radians(angle))

print(f"Horizontal velocity: {vx} m/s")
print(f"Vertical velocity: {vy} m/s")`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Horizontal velocity: 14.142 m/s\nVertical velocity: 14.142 m/s`} language="text" />
            </div>

            <h4>Projection at Any Angle</h4>
            <p>When a projectile is launched at an angle, both the horizontal and vertical motions must be considered. The horizontal motion is uniform, while the vertical motion is influenced by gravity.</p>

            <CodeSnippet
                code={`# Example: Projectile motion at an angle
initial_velocity = 20  # m/s
angle = 45  # degrees
g = 9.8  # m/s^2

# Horizontal and vertical components
vx = initial_velocity * np.cos(np.radians(angle))
vy = initial_velocity * np.sin(np.radians(angle))

# Time of flight
time_of_flight = 2 * vy / g

# Maximum height
max_height = (vy ** 2) / (2 * g)

# Range of the projectile
range_of_projectile = vx * time_of_flight

print(f"Time of flight: {time_of_flight} seconds")
print(f"Maximum height: {max_height} meters")
print(f"Range of projectile: {range_of_projectile} meters")`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Time of flight: 2.886 seconds
Maximum height: 10.204 meters
Range of projectile: 40.816 meters`} language="text" />
            </div>

            <h4>Projectile Motion Formulae</h4>
            <p>The key formulae for projectile motion are:
                <ul>
                    <li><strong>Horizontal distance:</strong> x = v₀ * t</li>
                    <li><strong>Vertical motion:</strong> y = v₀ * t - (1/2) * g * t²</li>
                    <li><strong>Time of flight:</strong> t = (2 * v₀ * sin(θ)) / g</li>
                    <li><strong>Maximum height:</strong> h = (v₀² * sin²(θ)) / (2 * g)</li>
                    <li><strong>Range:</strong> R = (v₀² * sin(2θ)) / g</li>
                </ul>
            </p>

            <div className="mt-4">
            <button className="me-2 secondary" onClick={() => navigate("/topics")}>Return to Topics</button>
            <button className="me-2 success" onClick={() => navigate("/quiz/43")}>Take Quiz</button>
            </div>
        </div>
    );
}
