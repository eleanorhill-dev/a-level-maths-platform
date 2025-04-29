import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../../components/CodeSnippet';
import '../../styles/TopicDetailsPage.css';



export default function TrigonometricRatios() {

    return (
        <div className="topic-container mt-4">
            <h2>Trigonometric Ratios</h2>

            <h4>The Cosine Rule</h4>
            <p>The cosine rule can be used to work out missing sides or angles in triangles. This version of the cosine rule is used to find a missing side if you know two sides and the angle between them:</p>
            <p><strong>c² = a² + b² - 2ab * cos(C)</strong></p>
            <p>To work out an angle if you know all three sides, you can rearrange the above equation:</p>
            <p><strong>cos(A) = ( b² + a² - c² ) / 2ab</strong></p>
            <CodeSnippet
                code={`import matplotlib.pyplot as plt\nimport numpy as np\n# Cosine Rule Example: Calculate the side c in a triangle\na = 7\nb = 5\nC = np.radians(60)  # Angle C in radians\n# Applying the Cosine Rule\nc = np.sqrt(a**2 + b**2 - 2*a*b*np.cos(C))\n# Plotting the triangle\ntriangle_x = [0, b, c]\ntriangle_y = [0, 0, np.sqrt(a**2 - b**2)]\nplt.plot([0, b], [0, 0], label="Side b", color='blue')\nplt.plot([b, c], [0, np.sqrt(a**2 - b**2)], label="Side c", color='green')\nplt.plot([c, 0], [np.sqrt(a**2 - b**2), 0], label="Side a", color='red')\nplt.fill(triangle_x, triangle_y, color='lightgray', alpha=0.5)\nplt.legend()\nplt.grid(True)\nplt.title(f"Cosine Rule: c = {c:.2f}")\nplt.show()`}
                language="python"
            />
            
            <div className="CodeSnippet-output">
                <p><img src="/images/cosinerule.png" alt="Cosine Rule Graph"></img></p>
            </div>

            <h4>The Sine Rule</h4>
            <p>The sine rule can be used to work out missing angles or sides in triangles. This version of the sine rule is used to find the length of a missing side:</p>
            <p><strong>a/sin(A) = b/sin(B) = c/sin(C)</strong></p>
            <p>To find a missing angle, you can use this version of the sine rule:</p>
            <p><strong>sin(A)/a = sin(B)/b = sin(C)/c</strong></p>           
            <CodeSnippet
                code={`import matplotlib.pyplot as plt\nimport numpy as np\n# Sine Rule Example: Calculate angle B in a triangle\na = 8\nb = 6\nA = np.radians(30)  # Angle A in radians\n# Applying the Sine Rule\nB = np.degrees(np.arcsin(b * np.sin(A) / a))\n# Plotting the triangle\ntriangle_x = [0, b, 0]\ntriangle_y = [0, 0, np.sqrt(a**2 - b**2)]\nplt.plot([0, b], [0, 0], label="Side b", color='blue')\nplt.plot([b, 0], [0, np.sqrt(a**2 - b**2)], label="Side a", color='green')\nplt.plot([0, 0], [0, np.sqrt(a**2 - b**2)], label="Side c", color='red')\nplt.fill(triangle_x, triangle_y, color='lightgray', alpha=0.5)\nplt.legend()\nplt.grid(True)\nplt.title(f"Sine Rule: Angle B = {B:.2f}°")\nplt.show()`}
                language="python"
            />
            
            <div className="CodeSnippet-output">
                <p><img src="/images/sinerule.png" alt="Sine Rule Graph"></img></p>
            </div>

            <h4>Areas of Triangles</h4>
            <p>The area of a triangle can be calculated using the formula:</p>
            <p><strong>Area = 1/2 * a * b * sin(C)</strong></p>
            <CodeSnippet
                code={`import matplotlib.pyplot as plt\nimport numpy as np\n# Triangle Area Example: Using the formula 1/2ab*sin(C)\na = 8\nb = 6\nC = np.radians(45)\n# Calculate Area\narea = 0.5 * a * b * np.sin(C)\n# Plotting the triangle\ntriangle_x = [0, b, 0]\ntriangle_y = [0, 0, np.sqrt(a**2 - b**2)]\nplt.plot([0, b], [0, 0], label="Side b", color='blue')\nplt.plot([b, 0], [0, np.sqrt(a**2 - b**2)], label="Side a", color='green')\nplt.plot([0, 0], [0, np.sqrt(a**2 - b**2)], label="Side c", color='red')\nplt.fill(triangle_x, triangle_y, color='lightgray', alpha=0.5)\nplt.legend()\nplt.grid(True)\nplt.title(f"Area = {area:.2f} square units")\nplt.show()`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <p><img src="/images/trianglearea.png" alt="Triangle Area Graph"></img></p>
            </div>

            <h4>Solving Triangle Problems</h4>
            <p>You can solve a triangle using either the Sine or Cosine rule depending on the given information.</p>
            <CodeSnippet
                code={`import sympy as sp\n# Solve a triangle using the Sine Rule\na = 8\nb = 6\nA = sp.rad(30)\n# Use Sine Rule to find angle B\nB = sp.asin(b * sp.sin(A) / a)\n# Calculate angle C (since angles in a triangle sum to 180°)\nC = sp.pi - A - B\nprint(f"Angle B: {sp.deg(B):.2f}°")\nprint(f"Angle C: {sp.deg(C):.2f}°")`}
                language="python"
            />


            <div className="CodeSnippet-output">
                <CodeSnippet code={`Angle B: 22.02°
Angle C: 127.98°`} language="text" />
            </div>


            <h4>Graphs of Sine, Cosine, and Tangent</h4>
            <p>This graph demonstrates the periodic behavior of the sine, cosine, and tangent functions:</p>
            <CodeSnippet
                code={`import matplotlib.pyplot as plt\nimport numpy as np\n# Generating x values (in radians)\nx = np.linspace(-2 * np.pi, 2 * np.pi, 400)\n# Calculating y values for sine, cosine, and tangent\ny_sin = np.sin(x)\ny_cos = np.cos(x)\ny_tan = np.tan(x)\n# Plotting\nplt.figure(figsize=(10, 6))\nplt.plot(x, y_sin, label='sin(x)', color='blue')\nplt.plot(x, y_cos, label='cos(x)', color='green')\nplt.plot(x, y_tan, label='tan(x)', color='red')\n# Limit y-axis for tangent graph to avoid too large values\nplt.ylim(-10, 10)\n# Adding labels and legend\nplt.title("Graphs of Sine, Cosine, and Tangent")\nplt.xlabel("x (radians)")\nplt.ylabel("y")\nplt.axhline(0, color='black',linewidth=1)\nplt.axvline(0, color='black',linewidth=1)\nplt.legend()\nplt.grid(True)\nplt.show()`}
                language="python"
            />

            
            <div className="CodeSnippet-output">
                <p><img src="/images/sinecosinetangent.png" alt="Sine Cosine Tangent Graph"></img></p>
            </div>



            <h4>Transforming Trigonometric Graphs</h4>
            <p>This section shows how different transformations affect trigonometric graphs:</p>
            <CodeSnippet
                code={`import matplotlib.pyplot as plt\nimport numpy as np\n# Generate x values\nx = np.linspace(-2 * np.pi, 2 * np.pi, 400)\n# Sine function transformations\ny_sin1 = np.sin(x)\ny_sin2 = 2 * np.sin(x)\ny_sin3 = np.sin(2 * x)\ny_sin4 = np.sin(x - np.pi/4)\n# Plotting\nplt.figure(figsize=(10, 6))\nplt.plot(x, y_sin1, label='y = sin(x)', color='blue')\nplt.plot(x, y_sin2, label='y = 2sin(x)', color='green')\nplt.plot(x, y_sin3, label='y = sin(2x)', color='red')\nplt.plot(x, y_sin4, label='y = sin(x - π/4)', color='purple')\n# Adding labels and legend\nplt.title("Transforming Trigonometric Graphs")\nplt.xlabel("x (radians)")\nplt.ylabel("y")\nplt.axhline(0, color='black',linewidth=1)\nplt.axvline(0, color='black',linewidth=1)\nplt.legend()\nplt.grid(True)\nplt.show()`}
                language="python"
            />

            
            <div className="CodeSnippet-output">
                <p><img src="/images/trigtransformation.png" alt="Trig Transformation Graph"></img></p>
            </div>


            <div className="mt-4">
                <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
                <Button href="/quiz/9" variant="success">Take Quiz</Button>
            </div>
        </div>
    );
}
