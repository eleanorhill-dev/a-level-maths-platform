import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/TopicsPage.css';

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
  'Measures of Location and Spread',
  'Representations of Data',
  'Correlation',
  'Probability',
  'Statistical Distributions',
  'Hypothesis Testing',
  'Modelling in Mechanics',
  'Constant Acceleration',
  'Forces and Motion',
  'Variable Acceleration'
];

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
];

const A_Level_StatisticsMechanics = [
  'Regression, Correlation, and Hypothesis Testing',
  'Conditional Probability',
  'The Normal Distribution',
  'Moments',
  'Forces and Friction',
  'Projectiles',
  'Applications of Forces',
  'Further Kinematics'
];

export default function TopicsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleTopicClick = (topic) => {
    navigate(`/topics/${topic.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const renderTopicCards = (topics, categoryTitle, className) => {
    const filteredTopics = topics.filter((topic) => 
      topic.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
      <div className={`container mt-5 ${className}`}>
        <h2 className="section-title">{categoryTitle}</h2>
        <div className="row">
          {filteredTopics.map((topic) => (
            <div key={topic} className="col-md-4 mb-4">
              <Card className="topic-card">
                <Card.Body onClick={() => handleTopicClick(topic)}>
                  <h5>{topic}</h5>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="topics-page">
      <div className="container mt-4">
        <input
          type="text"
          placeholder="Search Topics"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control"
        />
      </div>
      {renderTopicCards(AS_Pure, 'AS Pure Topics', 'as-pure')}
      {renderTopicCards(AS_StatisticsMechanics, 'AS Statistics & Mechanics Topics', 'as-statistics-mechanics')}
      {renderTopicCards(A_Level_Pure, 'A-Level Pure Topics', 'a-level-pure')}
      {renderTopicCards(A_Level_StatisticsMechanics, 'A-Level Statistics & Mechanics Topics', 'a-level-statistics-mechanics')}
    </div>
  );
}
