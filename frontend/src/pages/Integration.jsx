import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../components/CodeSnippet';
import '../styles/TopicDetailsPage.css';

export default function Integration() {
    return (
        <div className="topic-container mt-4">
            <h2>Integration</h2>

            <h4>Integrating xⁿ</h4>
            <p>For the integral of xⁿ, we apply the power rule:</p>
            <CodeSnippet
                code={`import numpy as np
import matplotlib.pyplot as plt
import sympy as sp

# Define symbol
x = sp.symbols('x')

# Define the function
n = 3  # Change this to any value
f = x**n

# Integrate
integral = sp.integrate(f, x)
print(integral)

# Plotting the function and its integral
x_vals = np.linspace(-5, 5, 100)
y_vals = x_vals**n
y_integral = (x_vals**(n+1)) / (n+1)

plt.plot(x_vals, y_vals, label=f'x^{n}')
plt.plot(x_vals, y_integral, label=f'Integral of x^{n}', linestyle='--')
plt.grid(True)
plt.legend()
plt.show()` }
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`x**4/4`} language="text" />
                <p><img src="/images/integration1.png" alt="Integration"></img></p>
            </div>


            <h4>Finding Functions</h4>
            <p>To find the original function from its derivative, we integrate the derivative.</p>
            <CodeSnippet
                code={`# If we know f'(x) = 2x, find f(x)
derivative = 2*x
function = sp.integrate(derivative, x)
print(function)

# Plotting the derivative and its integral
y_vals = 2*x_vals
y_integral = x_vals**2

plt.plot(x_vals, y_vals, label="f'(x) = 2x")
plt.plot(x_vals, y_integral, label="f(x) = x^2 (integral)", linestyle='--')
plt.grid(True)
plt.legend()
plt.show()` }
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`x**2`} language="text" />
                <p><img src="/images/integration2.png" alt="Integration"></img></p>
            </div>

            <h4>Definite Integrals</h4>
            <p>You can calculate an integral between two limits. This is called a definite integral. A definite integral usually produces a value whereas an indefinite integral always produces a function.</p>
            <CodeSnippet
                code={`# Definite integral of x^2 from 0 to 2
definite_integral = sp.integrate(x**2, (x, 0, 2))
print(definite_integral)` }
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`8/3`} language="text" />
            </div>

            <h4>Areas Under Curves</h4>
            <p>The area under the curve is found using a definite integral. For example, the area under f(x) = x^2 from 0 to 2 is:</p>
            <CodeSnippet
                code={`import numpy as np
import matplotlib.pyplot as plt
import sympy as sp

# Define symbol
x = sp.symbols('x')

# Define the cubic function f(x) = x^3
f_cubic = x**3

# Calculate the definite integral of x^3 from 0 to 2
area_under_curve_cubic = sp.integrate(f_cubic, (x, 0, 2))
print(f"Area under the cubic curve is: {area_under_curve_cubic}")

# Plotting the cubic function and shaded area under the curve
x_vals = np.linspace(0, 2, 100)  # x values from 0 to 2
y_vals_cubic = x_vals**3  # y values for the cubic function

# Plot the cubic function
plt.plot(x_vals, y_vals_cubic, label='x^3')

# Shade the area under the curve from 0 to 2
plt.fill_between(x_vals, y_vals_cubic, color='lightblue', alpha=0.5)

# Add grid and legend
plt.grid(True)
plt.legend()
plt.title("Area Under the Curve of f(x) = x^3 from 0 to 2")
plt.xlabel("x")
plt.ylabel("f(x)")

# Show the plot
plt.show()` }
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Area under the cubic curve is: 4`} language="text" />
                <p><img src="/images/integration3.png" alt="Integration"></img></p>
            </div>


            <h4>Areas Under the X-Axis</h4>
            <p>To find areas under the x-axis, we can use the absolute value of the function or integrate over a range where the function is below the x-axis.</p>
            <CodeSnippet
                code={`import numpy as np
import matplotlib.pyplot as plt
import sympy as sp

# Define symbol
x = sp.symbols('x')

# Define the cubic function f(x) = x^3
f_cubic = x**3

# Calculate the definite integral of x^3 from -2 to 0 (area under the x-axis)
area_under_x_axis = sp.integrate(abs(f_cubic), (x, -2, 0))
print(f"Area under the curve (absolute value) from -2 to 0 is: {area_under_x_axis}")

# Plotting the cubic function and shaded area under the curve
x_vals = np.linspace(-2, 0, 100)  # x values from -2 to 0
y_vals_cubic = x_vals**3  # y values for the cubic function

# Plot the cubic function
plt.plot(x_vals, y_vals_cubic, label='x^3')

# Shade the area under the curve from -2 to 0
plt.fill_between(x_vals, y_vals_cubic, color='lightcoral', alpha=0.5)

# Add grid and legend
plt.grid(True)
plt.legend()
plt.title("Area Under the Curve of f(x) = x^3 from -2 to 0 (under the x-axis)")
plt.xlabel("x")
plt.ylabel("f(x)")

# Show the plot
plt.show()` }
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Area under the curve (absolute value) from -2 to 0 is: 4`} language="text" />
                <p><img src="/images/integration4.png" alt="Integration"></img></p>
            </div>

            <h4>Areas Between Curves and Lines</h4>
            <p>To calculate the area between curves and lines, integrate the difference between the functions over a given range.</p>
            <CodeSnippet
                code={`# Area between x^2 and x from 0 to 2
area_between_curves = sp.integrate(x**2 - x, (x, 0, 2))
print(f"Area between the curve and line is: {area_between_curves}")

# Plotting the functions and the area between them
y_vals1 = x_vals**2
y_vals2 = x_vals
plt.plot(x_vals, y_vals1, label="x^2")
plt.plot(x_vals, y_vals2, label="x")
plt.fill_between(x_vals, y_vals1, y_vals2, where=(y_vals1 >= y_vals2), color='lightgreen', alpha=0.5)
plt.grid(True)
plt.legend()
plt.show()` }
                language="python"
            />
            
    
            <div className="CodeSnippet-output">
                <CodeSnippet code={`Area between the curve and line is: 2/3`} language="text" />
                <p><img src="/images/integration5.png" alt="Integration"></img></p>
            </div>


            <div className="mt-4">
                <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
                <Button href="/quiz/13" variant="success">Take Quiz</Button>
            </div>
        </div>
    );
}
