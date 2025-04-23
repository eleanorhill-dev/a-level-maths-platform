import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../components/CodeSnippet';

export default function ExponentialsAndLogarithms() {
    return (
        <div className="container mt-4">
            <h2>Exponentials and Logarithms</h2>

            <h4>Exponential Functions</h4>
            <p>Functions of the form f(x) = a^x, where a is a constant, are called exponential functions.</p>
            <CodeSnippet
                code={`import numpy as np
import matplotlib.pyplot as plt

# Exponential function f(x) = 2^x
x_vals = np.linspace(-2, 2, 100)
y_vals = 2**x_vals  # Changing e^x to 2^x

plt.plot(x_vals, y_vals, label='f(x) = 2^x')
plt.title("Exponential Function y = 2^x")
plt.xlabel("x")
plt.ylabel("f(x)")
plt.grid(True)
plt.legend()
plt.show()`}
                language="python"
            />

            <p><strong>Output:</strong></p>
            <p><img src="/images/exponentials1.png" alt="Exponential Function Graph"></img></p>

            <h4>y = e^x</h4>
            <p>The function y = e^x is the simplest exponential function where the base is Euler's number (e).</p>
            <CodeSnippet
                code={`# y = e^x Graph
y_vals = np.exp(x_vals)

plt.plot(x_vals, y_vals, label='y = e^x', color='orange')
plt.title("Graph of y = e^x")
plt.xlabel("x")
plt.ylabel("y")
plt.grid(True)
plt.legend()
plt.show()`}
                language="python"
            />

            <p><strong>Output:</strong></p>
            <p><img src="/images/exponentials2.png" alt="y = e^x Graph"></img></p>

            <h4>Exponential Modelling</h4>
            <p>Exponential functions can be used to model growth or decay, such as population growth, radioactive decay, and compound interest.</p>
            <CodeSnippet
                code={`# Exponential Growth Model f(t) = A * e^(kt)
A = 1000  # Initial amount
k = 0.05  # Growth rate
t_vals = np.linspace(0, 250, 100)
y_vals_growth = A * np.exp(k * t_vals)

plt.plot(t_vals, y_vals_growth, label="Exponential Growth")
plt.title("Exponential Growth Model")
plt.xlabel("Time (t)")
plt.ylabel("Amount")
plt.grid(True)
plt.legend()
plt.show()`}
                language="python"
            />

            <p><strong>Output:</strong></p>
            <p><img src="/images/exponentials3.png" alt="Exponential Growth Graph"></img></p>

            <h4>Logarithms</h4>
            <p>Logarithms are the inverse functions of exponentials. The logarithm of a number is the exponent to which the base must be raised to produce that number.</p>
            <CodeSnippet
                code={`# Logarithm of x with base e (natural logarithm)
x_vals = np.linspace(0.1, 10, 100)
y_vals_log = np.log(x_vals)  # Natural log (base e)

plt.plot(x_vals, y_vals_log, label="y = ln(x)")
plt.title("Natural Logarithm y = ln(x)")
plt.xlabel("x")
plt.ylabel("y")
plt.grid(True)
plt.legend()
plt.show()`}
                language="python"
            />

            <p><strong>Output:</strong></p>
            <p><img src="/images/logarithms1.png" alt="Logarithm Graph"></img></p>

            <h4>Laws of Logarithms</h4>
            <p>The laws of logarithms include the product, quotient, and power rules.</p>
            <CodeSnippet
                code={`import sympy as sp

# Define symbols
x = sp.symbols('x')

# Product rule: log(a * b) = log(a) + log(b)
a = x
b = x + 1
product_rule = sp.log(a * b) - (sp.log(a) + sp.log(b))
print("Product Rule:", product_rule)

# Quotient rule: log(a / b) = log(a) - log(b)
quotient_rule = sp.log(a / b) - (sp.log(a) - sp.log(b))
print("Quotient Rule:", quotient_rule)

# Power rule: log(a^b) = b * log(a)
power_rule = sp.log(a**2) - (2 * sp.log(a))
print("Power Rule:", power_rule)`}
                language="python"
            />

            <p><strong>Output:</strong></p>
            <CodeSnippet code={`Product Rule: -log(x) + log(x*(x + 1)) - log(x + 1)
Quotient Rule: -log(x) + log(x/(x + 1)) + log(x + 1)
Power Rule: -2*log(x) + log(x**2)`} language="text" />

            

            <h4>Solving Equations Using Logarithms</h4>
            <p>Logarithms are often used to solve equations involving exponential growth or decay.</p>
            <CodeSnippet
                code={`# Solve an equation with logarithms: e^x = 5
equation = sp.Eq(sp.exp(x), 5)
solution = sp.solve(equation, x)
print("Solution to e^x = 5:", solution)`}
                language="python"
            />

            <p><strong>Output:</strong></p>
            <CodeSnippet
                code={`Solution to e^x = 5: [log(5)]`}
                language="python"
            />

            <h4>Working with Natural Logarithms</h4>
            <p>The natural logarithm (ln) is a logarithm with base e. It is frequently used in calculus and natural sciences.</p>
            <CodeSnippet
                code={`# Calculate the natural logarithm of a number
ln_val = np.log(5)
print("Natural logarithm of 5:", ln_val)`}
                language="python"
            />

            <p><strong>Output:</strong></p>
            <CodeSnippet
                code={`Natural logarithm of 5: 1.6094379124341003`}
                language="python"
            />

            <h4>Logarithms and Non-linear Data</h4>
            <p>Logarithms can be used to linearize non-linear data for easier analysis, such as in exponential decay or growth models.</p>
            <CodeSnippet
                code={`# Logarithmic transformation of non-linear data
non_linear_data = np.array([1, 2, 4, 8, 16])
log_transformed_data = np.log(non_linear_data)

plt.plot(non_linear_data, label='Original Data', marker='o')
plt.plot(log_transformed_data, label='Log Transformed Data', marker='x')
plt.title("Logarithmic Transformation of Non-linear Data")
plt.xlabel("Index")
plt.ylabel("Value")
plt.grid(True)
plt.legend()
plt.show()`}
                language="python"
            />

            <p><strong>Output:</strong></p>
            <p><img src="/images/logarithms2.png" alt="Logarithmic Transformation"></img></p>

            <div className="mt-4">
                <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
                <Button href="/quiz/14" variant="success">Take Quiz</Button>
            </div>
        </div>
    );
}
