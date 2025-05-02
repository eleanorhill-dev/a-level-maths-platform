import React from 'react';
import { useNavigate } from "react-router-dom";
import CodeSnippet from '../../components/CodeSnippet';
import '../../styles/TopicDetailsPage.css';

export default function ConditionalProbability() {
    const navigate = useNavigate();
    return (
        <div className="topic-container mt-4">
            <h2>Conditional Probability</h2>

            <h4>Set Notation</h4>
            <p>Set notation is used to represent events in probability theory. The universal set is denoted by <em>U</em>, while subsets of the set are denoted by other letters. The union and intersection of events are represented by <em>∪</em> and <em>∩</em>, respectively.</p>

            <CodeSnippet
                code={`# Set notation example: Union and intersection of events
A = {1, 2, 3}
B = {3, 4, 5}

# Union (A ∪ B): Elements in either A or B
union = A.union(B)

# Intersection (A ∩ B): Elements in both A and B
intersection = A.intersection(B)

print(f"Union of A and B: {union}")
print(f"Intersection of A and B: {intersection}")`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Union of A and B: {1, 2, 3, 4, 5}\nIntersection of A and B: {3}`} language="text" />
            </div>

            <h4>Conditional Probability</h4>
            <p>Conditional probability is the probability of an event occurring given that another event has already occurred. The formula for conditional probability is <em>P(A|B) = P(A ∩ B) / P(B)</em>.</p>

            <CodeSnippet
                code={`# Conditional probability example
P_A_and_B = 0.12  # P(A ∩ B)
P_B = 0.3         # P(B)

P_A_given_B = P_A_and_B / P_B
print(f"P(A|B) = {P_A_given_B}")`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`P(A|B) = 0.4`} language="text" />
            </div>

            <h4>Conditional Probabilities in Venn Diagrams</h4>
            <p>Even without diagrams, we can calculate probabilities using known values from a Venn-type situation. For example:</p>
            <p>Suppose in a class of 100 students:</p>
            <ul>
                <li>60 study Maths (M)</li>
                <li>30 study Physics (P)</li>
                <li>20 study both</li>
            </ul>
            <p>We can use these values to calculate probabilities, such as the probability a student studies Physics given they study Maths.</p>

            <CodeSnippet
                code={`# Using basic probability counts
total = 100
maths = 60
physics = 30
both = 20

# P(P ∩ M)
intersection = both / total

# P(M)
p_maths = maths / total

# P(P | M) = P(P ∩ M) / P(M)
p_given_m = intersection / p_maths

print("P(P ∩ M):", intersection)
print("P(M):", p_maths)
print("P(P | M):", p_given_m)`}
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`P(P ∩ M): 0.2\nP(M): 0.6\nP(P | M): 0.333...`} language="text" />
            </div>

            <h4>Probability Formulae</h4>
            <p>Probability formulae include the addition and multiplication rules. The addition rule states that <em>P(A ∪ B) = P(A) + P(B) - P(A ∩ B)</em>, and the multiplication rule states that <em>P(A ∩ B) = P(A) * P(B|A)</em>.</p>

            <CodeSnippet
                code={`# Probability formulae example
P_A = 0.5  # P(A)
P_B = 0.4  # P(B)
P_A_and_B = 0.2  # P(A ∩ B)

# Addition Rule: P(A ∪ B)
P_A_or_B = P_A + P_B - P_A_and_B
print(f"P(A ∪ B) = {P_A_or_B}")

# Multiplication Rule: P(A ∩ B)
P_A_given_B = P_A_and_B / P_B
P_A_and_B_check = P_A_given_B * P_B
print(f"P(A ∩ B) using multiplication rule = {P_A_and_B_check}")`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`P(A ∪ B) = 0.7\nP(A ∩ B) using multiplication rule = 0.2`} language="text" />
            </div>

            <h4>Tree Diagrams</h4>
            <p>Tree diagrams are a way to list all possible outcomes of a sequence of events and calculate combined probabilities. For example, consider the probability of drawing two balls from a bag without replacement.</p>

            <CodeSnippet
                code={`# Example: Tree diagram logic for drawing balls from a bag
# Bag contains 3 red balls and 2 blue balls

# Total balls: 5
# First draw probabilities
P_red_first = 3 / 5
P_blue_first = 2 / 5

# If first ball is red, second draw:
P_red_then_red = P_red_first * (2 / 4)
P_red_then_blue = P_red_first * (2 / 4)

# If first ball is blue, second draw:
P_blue_then_red = P_blue_first * (3 / 4)
P_blue_then_blue = P_blue_first * (1 / 4)

print("P(Red then Red):", round(P_red_then_red, 3))
print("P(Red then Blue):", round(P_red_then_blue, 3))
print("P(Blue then Red):", round(P_blue_then_red, 3))
print("P(Blue then Blue):", round(P_blue_then_blue, 3))`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`P(Red then Red): 0.3
P(Red then Blue): 0.3
P(Blue then Red): 0.3
P(Blue then Blue): 0.1`} language="text" />
            </div>

            <div className="mt-4">
            <button className="me-2 secondary" onClick={() => navigate("/topics")}>Return to Topics</button>
            <button className="me-2 success" onClick={() => navigate("/quiz/39")}>Take Quiz</button>
            </div>
        </div>
    );
}
