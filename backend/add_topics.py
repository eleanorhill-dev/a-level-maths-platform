from app import create_app, db
from models import Topic

app = create_app()

topics = [
    {
        "name": "Algebra and Functions",

        "description": """<p>In this topic, we will explore various concepts in algebra and functions using Python programming. By the end of this tutorial, you will learn how to perform operations like solving equations, manipulating expressions, and working with functions efficiently in Python.</p>""",

        "content": """<h4>Understanding Algebraic Expressions</h4>
        <p>An algebraic expression is a combination of variables, constants, and arithmetic operators. For example, the expression <strong>2x + 3</strong> can be evaluated if we know the value of <em>x</em>.</p>
        <p>The general form of a linear expression is:</p>
        <p><em>ax + b</em>, where <em>a</em> and <em>b</em> are constants and <em>x</em> is the variable.</p>

        <pre><code class="language-python">
        # Define a variable x and evaluate the expression 2x + 3
        x = 5
        expression = 2 * x + 3
        print("The value of 2x + 3 when x = 5 is:", expression)
        </code></pre>

        <h4>Solving Linear Equations</h4>
        <p>A linear equation has the form:</p>
        <p><em>ax + b = 0</em>. To solve this, we isolate <em>x</em>:</p>
        <p>The solution is <em>x = -b / a</em>.</p>

        <pre><code class="language-python">
        # Solving the equation 2x + 3 = 0
        a = 2
        b = 3
        x = -b / a
        print("Solution for the equation 2x + 3 = 0 is:", x)
        </code></pre>

        <h4>Solving Quadratic Equations</h4>
        <p>A quadratic equation has the form:</p>
        <p><em>ax² + bx + c = 0</em>. The general solution is given by the quadratic formula:</p>
        <p><strong>x = (-b ± √(b² - 4ac)) / 2a</strong></p>
        <p>This formula finds the roots of the quadratic equation.</p>

        <pre><code class="language-python">
        import math

        a = 1
        b = -3
        c = 2

        # Calculate discriminant
        discriminant = b**2 - 4*a*c
        if discriminant >= 0:
            root1 = (-b + math.sqrt(discriminant)) / (2 * a)
            root2 = (-b - math.sqrt(discriminant)) / (2 * a)
            print("Roots:", root1, root2)
        else:
            print("No real roots")
        </code></pre>

        <h4>Simplifying Algebraic Expressions</h4>
        <p>We can use the sympy library to simplify expressions.</p>
        <p>For example, to expand and simplify the expression <em>(x + 2)(x - 3)</em>, we can use:</p>
        <p><strong>Expand((x + 2)(x - 3)) = x² - x - 6</strong></p>

        <pre><code class="language-python">
        from sympy import symbols, expand, simplify

        x = symbols('x')
        expression = (x + 2) * (x - 3)
        expanded = expand(expression)
        simplified = simplify(expanded)

        print("Expanded form:", expanded)
        print("Simplified form:", simplified)
        </code></pre>

        <h4>Functions in Python</h4>
        <p>A function is a block of code that performs a specific task. For example:</p>
        <p>Let's define a function to calculate the square of a number:</p>
        <p><strong>f(x) = x²</strong></p>

        <pre><code class="language-python">
        # Define a function to calculate the square of a number
        def square(x):
            return x ** 2

        print("Square of 4:", square(4))
        </code></pre>

        <h4>Plotting Functions with Matplotlib</h4>
        <p>We can visualize functions using the matplotlib library. Let's plot the function <strong>y = x²</strong>:</p>

        <pre><code class="language-python">
        import matplotlib.pyplot as plt
        import numpy as np

        x = np.linspace(-10, 10, 100)
        y = x ** 2

        plt.plot(x, y)
        plt.title("Graph of y = x²")
        plt.xlabel("x")
        plt.ylabel("y")
        plt.grid()
        plt.show()
        </code></pre>

        <h4>Working with Rational Functions</h4>
        <p>A rational function is the ratio of two polynomials. For example:</p>
        <p><strong>f(x) = (x² + 1) / (x - 2)</strong></p>

        <pre><code class="language-python">
        # Define a rational function
        def rational_function(x):
            return (x**2 + 1) / (x - 2)

        # Plotting the function
        x_vals = np.linspace(3, 10, 100)
        y_vals = rational_function(x_vals)

        plt.plot(x_vals, y_vals)
        plt.title("Graph of f(x) = (x² + 1) / (x - 2)")
        plt.xlabel("x")
        plt.ylabel("f(x)")
        plt.grid()
        plt.show()
        </code></pre>

        <h3>Summary</h3>
        <p>In this topic, we covered:</p>
        <ul>
            <li>Evaluating and simplifying algebraic expressions</li>
            <li>Solving linear and quadratic equations using Python</li>
            <li>Using the quadratic formula and understanding discriminants</li>
            <li>Expanding and simplifying algebraic expressions using sympy</li>
            <li>Defining and using functions in Python</li>
            <li>Visualizing mathematical functions with graphs using Matplotlib</li>
            <li>Working with rational functions</li>
        </ul>
        """
    },
    '''{
        "name": "Coordinate Geometry",
        "description": """ """,
        "content": """ """
    },
    {
        "name": "Sequences and Series",
        "description": """ """,
        "content": """ """
    },
    {
        "name": "Trigonometry",
        "description": """ """,
        "content": """ """
    },
    {
        "name": "Exponentials and Logarithms",
        "description": """ """,
        "content": """ """
    },
    {
        "name": "Differentiation",
        "description": """ """,
        "content": """ """
    },
    {
        "name": "Integration",
        "description": """ """,
        "content": """ """
    },
    {
        "name": "Vectors",
        "description": """ """,
        "content": """ """
    },
    {
        "name": "Proof",
        "description": """ """,
        "content": """ """
    },
    {
        "name": "Numerical Methods",
        "description": """ """,
        "content": """ """
    },
    {
        "name": "Data Collection",
        "description": """ """,
        "content": """ """
    },
    {
        "name": "Data Presentation and Interpretation",
        "description": """ """,
        "content": """ """
    },
    {
        "name": "Probability",
        "description": """ """,
        "content": """ """
    },
    {
        "name": "Statistical Distributions",
        "description": """ """,
        "content": """ """
    },
    {
        "name": "Hypothesis Testing",
        "description": """ """,
        "content": """ """
    },
    {
        "name": "Kinematics",
        "description": """ """,
        "content": """ """
    },
    {
        "name": "Forces and Newton's Laws",
        "description": """ """,
        "content": """ """
    },
    {
        "name": "Moments",
        "description": """ """,
        "content": """ """
    },
    {
        "name": "Work, Energy, and Power",
        "description": """ """,
        "content": """ """
    },'''
]

with app.app_context():
    if Topic.query.count() == 0:
        for topic in topics:
            new_topic = Topic(
                name=topic["name"],
                description=topic["description"],
                content=topic["content"]
            )
            db.session.add(new_topic)

        db.session.commit()
        print("Topics added successfully!")
    else:
        for topic in topics:
            existing_topic = Topic.query.filter_by(name=topic["name"]).first()
            if not existing_topic:
                new_topic = Topic(
                    name=topic["name"],
                    description=topic["description"],
                    content=topic["content"]
                )
                db.session.add(new_topic)

        db.session.commit()
        print("Non-duplicate topics added successfully!")

