import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../../components/CodeSnippet';
import '../../styles/TopicDetailsPage.css';

export default function Vectors() {
    return (
        <div className="topic-container mt-4">
            <h2>Vectors</h2>

            <h4>Vectors</h4>
            <p>A vector is a quantity with both magnitude and direction, represented using coordinates or unit vectors.</p>
            <CodeSnippet
                code={`import numpy as np

# Define vector A and B
vector_a = np.array([3, 4])
vector_b = np.array([-2, 5])

print("Vector A:", vector_a)
print("Vector B:", vector_b)`}
                language="python"
            />

            
            <div className="CodeSnippet-output">
                <CodeSnippet code={`Vector A: [3 4]
Vector B: [-2  5]`} language="text" />
            </div>


            <h4>Representing Vectors</h4>
            <p>Graphically represent vectors using matplotlib.</p>
            <CodeSnippet
                code={`import matplotlib.pyplot as plt
import numpy as np

vector_a = np.array([3, 4])
vector_b = np.array([-2, 5])

plt.quiver(0, 0, vector_a[0], vector_a[1], angles='xy', scale_units='xy', scale=1, color='blue', label='Vector A')
plt.quiver(0, 0, vector_b[0], vector_b[1], angles='xy', scale_units='xy', scale=1, color='green', label='Vector B')

plt.xlim(-10, 10)
plt.ylim(-10, 10)
plt.axhline(0, color='black')
plt.axvline(0, color='black')
plt.legend()
plt.grid(True)
plt.show()`}
                language="python"
            />

            
            <div className="CodeSnippet-output">
                <p><img src="/images/vectors1.png" alt="Vectors Graph"></img></p>
            </div>


            <h4>Magnitude and Direction</h4>
            <p dangerouslySetInnerHTML={{ __html: 'Given a vector ( vec{a} = (x, y) ), its magnitude is ( |vec{a}| = sqrt{x² + y²} ), where ( vec{a} ) is defined as (x, y).' }}></p>
            <CodeSnippet
                code={`import numpy as np

vector_a = np.array([3, 4])
vector_b = np.array([-2, 5])

magnitude_a = np.linalg.norm(vector_a)
magnitude_b = np.linalg.norm(vector_b)

print("Magnitude of Vector A:", magnitude_a)
print("Magnitude of Vector B:", magnitude_b)`}
                language="python"
            />


            
            <div className="CodeSnippet-output">
                <CodeSnippet code={`Magnitude of Vector A: 5.0
Magnitude of Vector B: 5.385164807134504`} language="text" />
            </div>


            <h4>Solving Geometric Problems</h4>
            <p>Vectors can be used to solve geometric problems by calculating distances, angles, and positions.</p>
            <CodeSnippet
                code={`import numpy as np

vector_a = np.array([3, 4])
vector_b = np.array([-2, 5])

# Dot Product and Angle Calculation
dot_product = np.dot(vector_a, vector_b)
angle_rad = np.arccos(dot_product / (np.linalg.norm(vector_a) * np.linalg.norm(vector_b)))
angle_deg = np.degrees(angle_rad)

print("Dot Product:", dot_product)
print("Angle between Vectors (degrees):", angle_deg)`}
                language="python"
            />

            
            <div className="CodeSnippet-output">
                <CodeSnippet code={`Dot Product: 14
Angle between Vectors (degrees): 58.67130713219583`} language="text" />
            </div>


            <h4>Modelling with Vectors</h4>
            <p>Vectors are used in physics and engineering for modelling forces, velocity, and acceleration.</p>
            <CodeSnippet
                code={`import numpy as np

force_vector = np.array([10, 15])
velocity_vector = np.array([5, 8])

resultant = force_vector + velocity_vector

print("Resultant Vector (Force + Velocity):", resultant)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Resultant Vector (Force + Velocity): [15 23]`} language="text" />
            </div>

            <div className="mt-4">
                <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
                <Button href="/quiz/11" variant="success">Take Quiz</Button>
            </div>
        </div>
    );
}
