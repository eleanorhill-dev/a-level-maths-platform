import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/TopicsPage.css';

const AS_Pure = [
  { name: 'Algebraic Expressions', route: 'algebraic-expressions' },
  { name: 'Quadratics', route: 'quadratics' },
  { name: 'Equations and Inequalities', route: 'equations-and-inequalities' },
  { name: 'Graphs and Transformations', route: 'graphs-and-transformations' },
  { name: 'Straight Line Graphs', route: 'straight-line-graphs' },
  { name: 'Circles', route: 'circles' },
  { name: 'Algebraic Methods', route: 'algebraic-methods' },
  { name: 'The Binomial Expansion', route: 'the-binomial-expansion' },
  { name: 'Trigonometric Ratios', route: 'trigonometric-ratios' },
  { name: 'Trigonometric Identities and Equations', route: 'trigonometric-identities-and-equations' },
  { name: 'Vectors', route: 'vectors' },
  { name: 'Differentiation', route: 'differentiation' },
  { name: 'Integration', route: 'integration' },
  { name: 'Exponentials and Logarithms', route: 'exponentials-and-logarithms' }
];

const AS_StatisticsMechanics = [
  { name: 'Data Collection', route: 'data-collection' },
  { name: 'Measures of Location and Spread', route: 'measures-of-location-and-spread' },
  { name: 'Representations of Data', route: 'representations-of-data' },
  { name: 'Correlation', route: 'correlation' },
  { name: 'Probability', route: 'probability' },
  { name: 'Statistical Distributions', route: 'statistical-distributions' },
  { name: 'Hypothesis Testing', route: 'hypothesis-testing' },
  { name: 'Modelling in Mechanics', route: 'modelling-in-mechanics' },
  { name: 'Constant Acceleration', route: 'constant-acceleration' },
  { name: 'Forces and Motion', route: 'forces-and-motion' },
  { name: 'Variable Acceleration', route: 'variable-acceleration' }
];

const A_Level_Pure = [
  { name: 'Algebraic Methods', route: 'algebraic-methods-2' },
  { name: 'Functions and Graphs', route: 'functions-and-graphs' },
  { name: 'Sequences and Series', route: 'sequences-and-series' },
  { name: 'The Binomial Expansion', route: 'the-binomial-expansion-2' },
  { name: 'Radians', route: 'radians' },
  { name: 'Trigonometric Functions', route: 'trigonometric-functions' },
  { name: 'Trigonometry and Modelling', route: 'trigonometry-and-modelling' },
  { name: 'Parametric Equations', route: 'parametric-equations' },
  { name: 'Differentiation', route: 'differentiation-2' },
  { name: 'Numerical Methods', route: 'numerical-methods' },
  { name: 'Integration', route: 'integration-2' },
  { name: 'Vectors', route: 'vectors-2' }
];

const A_Level_StatisticsMechanics = [
  { name: 'Regression, Correlation, and Hypothesis Testing', route: 'regression-correlation-hypothesis-testing' },
  { name: 'Conditional Probability', route: 'conditional-probability' },
  { name: 'The Normal Distribution', route: 'the-normal-distribution' },
  { name: 'Moments', route: 'moments' },
  { name: 'Forces and Friction', route: 'forces-and-friction' },
  { name: 'Projectiles', route: 'projectiles' },
  { name: 'Applications of Forces', route: 'applications-of-forces' },
  { name: 'Further Kinematics', route: 'further-kinematics' }
];

export default function TopicsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [userScores, setUserScores] = useState({}); 

  useEffect(() => {
    const fetchScores = async () => {
      const response = await fetch("http://localhost:5000/topic-progress", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      const scoresByName = {};
      data.forEach(({ topic_name, highest_score }) => {
        scoresByName[topic_name] = highest_score;
      });
      setUserScores(scoresByName);
    };
  
    fetchScores();
  }, []);


  const handleTopicClick = (route) => {
    navigate(`/topics/${route}`);
  };
  

  const renderTopicCards = (topics, categoryTitle, className) => {
    const filteredTopics = topics.filter((topic) =>
      topic.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
      <div className={`container mt-5 ${className}`}>
        <h2 className="section-title">{categoryTitle}</h2>
        <div className="row">
          {filteredTopics.map(({ name, route }) => {
            const score = userScores[name] ?? null;
            return (
              <div key={name} className="col-md-4 mb-4">
                <Card className="topic-card">
                  <Card.Body onClick={() => handleTopicClick(route)}>
                    <h5>{name}</h5>
                    {typeof score === 'number' ? (
                      <div className="topic-progress-container">
                        <div
                          className="progress-bar"
                          style={{ width: `${score}%` }} 
                        ></div>
                        <span className="topic-progress-text">Highest Score: {score}%</span>
                      </div>
                    ) : (
                      <p />
                    )}
                  </Card.Body>
                </Card>
              </div>
            );
          })}
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
