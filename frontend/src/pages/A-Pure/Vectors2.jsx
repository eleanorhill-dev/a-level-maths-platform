import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../../components/CodeSnippet';
import '../../styles/TopicDetailsPage.css';

export default function Vectors2() {
  return (
    <div className="topic-container mt-4">
      <h2>Vectors</h2>

      <h4>3D Coordinates</h4>
      <p>Points in three dimensions are written as (x, y, z). For example, the point A(2, -1, 3) has coordinates 2 along x, -1 along y, and 3 along z.</p>
      <CodeSnippet
        code={`# Define a 3D point
A = (2, -1, 3)
print("Point A:", A)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`Point A: (2, -1, 3)`} language="text" />
      </div>

      <h4>Vectors in 3D</h4>
      <p>Vectors in 3D are written using i, j, and k components. Here's how to define and work with 3D vectors in SymPy:</p>
      <CodeSnippet
        code={`from sympy import Matrix

A = Matrix([2, -1, 3])
B = Matrix([4, 2, 1])

AB = B - A
print("Vector AB:", AB)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`Vector AB: Matrix([[2], [3], [-2]])`} language="text" />
      </div>

      <h4>Solving Geometric Problems</h4>
      <p>You can use vectors to find distances, angles, and prove collinearity or perpendicularity.</p>
      <CodeSnippet
        code={`from sympy import acos, pi

A = Matrix([1, 2, 3])
B = Matrix([4, 0, 1])

AB = B - A
magnitude = AB.norm()
print("|AB|:", magnitude)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`|AB|: sqrt(17)`} language="text" />
      </div>

      <h4>Applications to Mechanics</h4>
      <p>Vectors can be used to represent forces in mechanics. Here's how to add two force vectors:</p>
      <CodeSnippet
        code={`F1 = Matrix([3, 4, 0])
F2 = Matrix([1, -2, 5])

Resultant = F1 + F2
print("Resultant Force:", Resultant)`}
        language="python"
      />
      <div className="CodeSnippet-output">
        <CodeSnippet code={`Resultant Force: Matrix([[4], [2], [5]])`} language="text" />
      </div>

      <div className="mt-4">
        <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
        <Button href="/quiz/37" variant="success">Take Quiz</Button>
      </div>
    </div>
  );
}