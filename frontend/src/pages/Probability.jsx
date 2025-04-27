import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../components/CodeSnippet'; 
import '../styles/TopicDetailsPage.css';

export default function Probability() {
    return (
        <div className="topic-container mt-4">
            <h2>Probability</h2>

            <h4>Calculating Probabilities</h4>
            <p>Probability measures the likelihood of an event occurring. It is calculated as the number of successful outcomes divided by the total number of possible outcomes.</p>

            <CodeSnippet
                code={`# Example: Calculating Basic Probability
successful_outcomes = 3
total_outcomes = 8

probability = successful_outcomes / total_outcomes

print("Probability:", probability)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Probability: 0.375`} language="text" />
            </div>

            <h4>Venn Diagrams</h4>
            <p>Venn diagrams show relationships between different sets. They are useful for calculating probabilities involving unions and intersections of events.</p>

            <CodeSnippet
                code={`# Example: Venn Diagram Probabilities
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

# A union B
union = A.union(B)

# A intersection B
intersection = A.intersection(B)

print("P(A ∪ B):", len(union)/6)
print("P(A ∩ B):", len(intersection)/6)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`P(A ∪ B): 1.0\nP(A ∩ B): 0.3333333333333333`} language="text" />
            </div>




            <h4>Mutually Exclusive and Independent Events</h4>
            <p>Mutually exclusive events cannot happen at the same time. Independent events do not affect each other's probabilities.</p>
            <p>Probability Rules:</p>
            <ul>
                <li><strong>Mutually Exclusive:</strong> P(A or B) = P(A) + P(B)</li>
                <li><strong>Independent:</strong> P(A and B) = P(A) x P(B)</li>
            </ul>

            <CodeSnippet
                code={`# Example: Mutually Exclusive vs Independent
# Mutually Exclusive Example (Cannot roll a 2 and a 5 at the same time on one die roll)
# Independent Example (Flipping a coin and rolling a die are independent events)

p_A = 1/6  # Rolling a 2
p_B = 1/6  # Rolling a 5

mutually_exclusive = p_A + p_B
independent = p_A * p_B

print("P(A or B) [Mutually Exclusive]:", mutually_exclusive)
print("P(A and B) [Independent]:", independent)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`P(A or B) [Mutually Exclusive]: 0.3333333333333333\nP(A and B) [Independent]: 0.027777777777777776`} language="text" />
            </div>

            <h4>Tree Diagrams</h4>
            <p>Tree diagrams visually represent all possible outcomes of a probability experiment. They help to calculate combined probabilities for sequences of events.</p>

            <CodeSnippet
                code={`# Example: Tree Diagram for Tossing a Coin Twice
# Each branch represents a possible outcome

# Probabilities
p_heads = 0.5
p_tails = 0.5

# Probability of two heads
two_heads = p_heads * p_heads

# Probability of one head and one tail (either order)
head_then_tail = p_heads * p_tails
tail_then_head = p_tails * p_heads

one_head_one_tail = head_then_tail + tail_then_head

print("P(Two Heads):", two_heads)
print("P(One Head and One Tail):", one_head_one_tail)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`P(Two Heads): 0.25\nP(One Head and One Tail): 0.5`} language="text" />
            </div>

            <div className="mt-4">
                <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
                <Button href="/quiz/19" variant="success">Take Quiz</Button>
            </div>
        </div>
    );
}
