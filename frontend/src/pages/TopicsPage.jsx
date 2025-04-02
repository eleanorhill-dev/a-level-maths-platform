import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AS_Pure = [
  'Algebraic Expressions',
  'Quadratics',
  'Equations and Inequalities',
  'Graphs and Transformations',
  'Straight Line Graphs',
  'Circles',
  'Algebraic Methods',
  'The Binomial Expansion',
  'Trigonometric Ratios',
  'Trigonometric Identities and Equations',
  'Vectors',
  'Differentiation',
  'Integration',
  'Exponentials and Logarithms'
];

const AS_StatisticsMechanics = [
  'Data Collection',
  'Measures of Location and Speed',
  'Representations of Data',
  'Correlation',
  'Probability',
  'Statistical Distributions',
  'Hypothesis Testing',
  'Modelling in Mechanics',
  'Constant Acceleration',
  'Forces and Motion',
  'Variable Acceleration'
]

const A_Level_Pure = [
  'Algebraic Methods',
  'Functions and Graphs',
  'Sequences and Series',
  'Binomial Expansion',
  'Radians',
  'Trigonometric Functions',
  'Trigonometry and Modelling',
  'Parametric Equations',
  'Differentiation',
  'Numerical Methods',
  'Integration',
  'Vectors'
]

const A_Level_StatisticsMechanics = [
  'Regression, Correlation, and Hypothesis Testing',
  'Conditional Probability',
  'The Normal Distribution',
  'Moments',
  'Forces and Friction',
  'Projectiles',
  'Applications of Forces',
  'Further Kinematics'
]

export default function TopicsPage() {
  const navigate = useNavigate();

  const handleTopicClick = (topic) => {
    navigate(`/topics/${topic.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const renderTopicCards = (topics, categoryTitle) => {
    return (
      <div className="container mt-4">
        <h1>{categoryTitle}</h1>
        <div className="row">
          {topics.map((topic) => (
            <div key={topic} className="col-md-4 mb-3">
              <Card className="shadow-sm">
                <Card.Body>
                  <Button onClick={() => handleTopicClick(topic)} variant="primary" className="w-100">
                    {topic}
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderTopicCards(AS_Pure, 'AS Pure Topics')}
      {renderTopicCards(AS_StatisticsMechanics, 'AS Statistics & Mechanics Topics')}
      {renderTopicCards(A_Level_Pure, 'A-Level Pure Topics')}
      {renderTopicCards(A_Level_StatisticsMechanics, 'A-Level Statistics & Mechanics Topics')}
    </div>
  );

}
