import React from 'react';
import { Button } from 'react-bootstrap';
import CodeSnippet from '../../components/CodeSnippet';
import '../../styles/TopicDetailsPage.css';

export default function Moments() {
    return (
        <div className="topic-container mt-4">
            <h2>Moments</h2>

            <h4>Moments</h4>
            <p>A moment is the turning effect of a force about a point. It is calculated as the force multiplied by the perpendicular distance from the pivot point to the line of action of the force.</p>

            <CodeSnippet
                code={`# Example: Calculating a moment
force = 10  # Force in Newtons (N)
distance = 2  # Distance from the pivot in meters (m)

moment = force * distance
print(f"Moment: {moment} N·m")`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Moment: 20 N·m`} language="text" />
            </div>

            <h4>Resultant Moments</h4>
            <p>The resultant moment is the sum of all moments acting on an object about a given point. If forces are acting in opposite directions, the moments are subtracted.</p>

            <CodeSnippet
                code={`# Example: Calculating resultant moments
force1 = 10  # Force in N
distance1 = 2  # Distance from pivot in m
moment1 = force1 * distance1

force2 = 5  # Force in N (acting in the opposite direction)
distance2 = 1  # Distance from pivot in m
moment2 = force2 * distance2

resultant_moment = moment1 - moment2  # Subtracting moments in opposite directions
print(f"Resultant Moment: {resultant_moment} N·m")`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Resultant Moment: 15 N·m`} language="text" />
            </div>

            <h4>Equilibrium</h4>
            <p>An object is in rotational equilibrium when the sum of all moments acting on it is zero. This means that the clockwise moments balance the anticlockwise moments.</p>

            <CodeSnippet
                code={`# Example: Checking for equilibrium
force1 = 10  # Force in N
distance1 = 2  # Distance from pivot in m
moment1 = force1 * distance1

force2 = 5  # Force in N
distance2 = 4  # Distance from pivot in m
moment2 = force2 * distance2

# Checking for equilibrium
if moment1 == moment2:
    print("The system is in equilibrium.")
else:
    print("The system is not in equilibrium.")`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`The system is in equilibrium.`} language="text" />
            </div>

            <h4>Centre of Mass</h4>
            <p>The center of mass is the point where the mass of an object can be considered to be concentrated. In simple terms, it is the point at which the object would balance perfectly if supported at that point.</p>

            <CodeSnippet
                code={`# Example: Finding the center of mass for two masses
m1 = 2  # Mass in kg
d1 = 3  # Distance from pivot in meters

m2 = 4  # Mass in kg
d2 = 6  # Distance from pivot in meters

# Calculating the center of mass
center_of_mass = (m1 * d1 + m2 * d2) / (m1 + m2)
print(f"Center of Mass: {center_of_mass} meters")`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`Center of Mass: 5.0 meters`} language="text" />
            </div>

            <h4>Tilting</h4>
            <p>An object will tilt or topple if its center of mass moves outside its base of support. This concept is crucial in determining whether an object will remain stable or fall over.</p>

            <CodeSnippet
                code={`# Example: Checking stability and tilting
base_of_support = 4  # Base of support in meters
center_of_mass = 5  # Center of mass in meters

if center_of_mass > base_of_support:
    print("The object will tilt.")
else:
    print("The object is stable.")`} 
                language="python"
            />

            <div className="CodeSnippet-output">
                <CodeSnippet code={`The object will tilt.`} language="text" />
            </div>

            <div className="mt-4">
                <Button href="/topics" variant="secondary" className="me-2">Return to Topics</Button>
                <Button href="/quiz/41" variant="success">Take Quiz</Button>
            </div>
        </div>
    );
}
