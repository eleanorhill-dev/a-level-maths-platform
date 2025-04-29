import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../../components/CodeSnippet';
import '../../styles/TopicDetailsPage.css';

export default function Radians() {
  return (
    <div className="topic-container mt-4">
      <h2>Radians</h2>

      <h4>Radian Measure</h4>
      <p>
        Radians are a unit of angular measure where the angle is measured based on the radius of a circle.
        <br />
        1 radian is the angle subtended by an arc whose length is equal to the radius. The relationship between radians and degrees is:
      </p>
      <ul>
        <li><strong>Degrees to Radians:</strong> <em>radians = degrees × (π / 180)</em></li>
        <li><strong>Radians to Degrees:</strong> <em>degrees = radians × (180 / π)</em></li>
      </ul>

      <CodeSnippet
        code={`# Converting Degrees to Radians
import math

# Convert 90 degrees to radians
degrees = 90
radians = degrees * (math.pi / 180)

print(f"90 degrees in radians is: {radians}")`}
        language="python"
      />

      <div className="CodeSnippet-output">
        <CodeSnippet code={`90 degrees in radians is: 1.5707963267948966`} language="text" />
      </div>

      <h4>Arc Length</h4>
      <p>
        The length of an arc subtended by an angle θ (in radians) in a circle with radius r is given by:
        <br />
        <em>Arc Length = r × θ</em>
      </p>
      <CodeSnippet
        code={`# Arc Length Formula
r = 5  # radius of the circle
theta = math.pi / 4  # angle in radians (45 degrees)

arc_length = r * theta
print(f"Arc length for 45° (π/4 rad) is: {arc_length}")`}
        language="python"
      />

      <div className="CodeSnippet-output">
        <CodeSnippet code={`Arc length for 45° (π/4 rad) is: 3.9269908169872414`} language="text" />
      </div>

      <h4>Areas of Sectors and Segments</h4>
      <p>
        The area of a sector is given by:
        <br />
        <em>Area of Sector = 0.5 × r² × θ</em>
        <br />
        The area of a segment is the area of the sector minus the area of the triangle formed by the radius and the chord.
      </p>
      <CodeSnippet
        code={`# Area of Sector
r = 6  # radius of the circle
theta = math.pi / 3  # angle in radians

sector_area = 0.5 * r**2 * theta
print(f"Area of sector: {sector_area}")`}
        language="python"
      />

      <div className="CodeSnippet-output">
        <CodeSnippet code={`Area of sector: 18.84955592153876`} language="text" />
      </div>

      <h4>Solving Trigonometric Equations</h4>
      <p>
        To solve trigonometric equations using radians, we can use basic trigonometric identities. For example:
        <br />
        <em>sin(θ) = 0.5</em> and solving for θ in the interval [0, 2π].
      </p>
      <CodeSnippet
        code={`# Solving Trigonometric Equations
import sympy as sp

theta = sp.symbols('theta')
eq = sp.sin(theta) - 0.5

solutions = sp.solveset(eq, theta, domain=sp.Interval(0, 2*math.pi))
print(f"Solutions: {solutions}" )`}
        language="python"
      />

      <div className="CodeSnippet-output">
        <CodeSnippet code={`Solutions: {pi/6, 5*pi/6}`} language="text" />
      </div>

      <h4>Small Angle Approximations</h4>
      <p>
        Small angle approximations are used when the angle θ is small enough that <em>sin(θ) ≈ θ</em> and <em>cos(θ) ≈ 1 - (θ² / 2)</em> when θ is in radians.
      </p>
      <CodeSnippet
        code={`# Small Angle Approximation
theta = 0.1  # small angle in radians

sin_approx = theta
cos_approx = 1 - (theta**2) / 2

print(f"Small angle approximation for sin({theta}) is: {sin_approx}")
print(f"Small angle approximation for cos({theta}) is: {cos_approx}")`}
        language="python"
      />

      <div className="CodeSnippet-output">
        <CodeSnippet code={`Small angle approximation for sin(0.1) is: 0.1
Small angle approximation for cos(0.1) is: 0.995`} language="text" />
      </div>

      <h4>Graph of sin(θ) vs θ</h4>
      <CodeSnippet
        code={`import numpy as np
import matplotlib.pyplot as plt

theta = np.linspace(0, 2 * np.pi, 1000)  # Array of angles from 0 to 2π
sin_values = np.sin(theta)

plt.figure(figsize=(8, 6))
plt.plot(theta, sin_values, label="sin(θ)", color='blue')
plt.title('Graph of sin(θ) vs θ (in radians)')
plt.xlabel('θ (radians)')
plt.ylabel('sin(θ)')
plt.grid(True)
plt.legend()
plt.show()`}
        language="python"
      />

      <div className="CodeSnippet-output">
        <p><img src="/images/radians1.png" alt="Graph of sin(θ) vs θ"></img></p>
      </div>


      <h4>Graph of cos(θ) vs θ</h4>
      <CodeSnippet
        code={`import numpy as np
import matplotlib.pyplot as plt

theta = np.linspace(0, 2 * np.pi, 1000)  # Array of angles from 0 to 2π
cos_values = np.cos(theta)

plt.figure(figsize=(8, 6))
plt.plot(theta, cos_values, label="cos(θ)", color='green')
plt.title('Graph of cos(θ) vs θ (in radians)')
plt.xlabel('θ (radians)')
plt.ylabel('cos(θ)')
plt.grid(True)
plt.legend()
plt.show()`}
        language="python"
      />

      <div className="CodeSnippet-output">
        <p><img src="/images/radians2.png" alt="Graph of cos(θ) vs θ"></img></p>
      </div>


      <div className="mt-4">
        <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
        <Button href="/quiz/30" variant="success">Take Quiz</Button>
      </div>
    </div>
  );
}
