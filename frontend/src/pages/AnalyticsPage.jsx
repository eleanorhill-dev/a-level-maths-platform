import React, { useState, useEffect } from 'react';
import { Spinner, Card, Container, Row, Col, Badge, Button } from 'react-bootstrap';
import "../styles/AnalyticsPage.css";

const AnalyticsPage = () => {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/analytics", {
                    method: "GET",
                    credentials: "include"
                });
                const data = await response.json();
                setAnalyticsData(data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching analytics data');
                setLoading(false);
            }
        };

        fetchAnalyticsData();
    }, []);

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p>Loading your analytics...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="text-center mt-5">
                <h4>{error}</h4>
            </Container>
        );
    }

    const achievements = analyticsData.achievements || [];
    const focusAreas = analyticsData.focus_areas || [];

    return (
      <Container className="analytics-container mt-5">
          <Row>
              <Col md={12} className="text-center mb-5">
                  <h1 className="analytics-heading">Analytics Overview</h1>
                  <p className="analytics-subheading">Here are your personalized analytics to track your progress!</p>
              </Col>
          </Row>
  
          {/* Total Quizzes Taken, Average Score, Current Streak */}
          <Row className="analytics-row">
              <Col md={4} className="analytics-col-md-4">
                  <Card className="analytics-card">
                      <Card.Body className="analytics-card-body">
                          <Card.Title className="analytics-card-title">Total Quizzes Taken</Card.Title>
                          <Card.Text className="analytics-card-text">{analyticsData.total_quizzes_taken}</Card.Text>
                      </Card.Body>
                  </Card>
              </Col>
              <Col md={4} className="analytics-col-md-4">
                  <Card className="analytics-card">
                      <Card.Body className="analytics-card-body">
                          <Card.Title className="analytics-card-title">Average Score</Card.Title>
                          <Card.Text className="analytics-card-text">{analyticsData.average_score.toFixed(2)}%</Card.Text>
                      </Card.Body>
                  </Card>
              </Col>
              <Col md={4} className="analytics-col-md-4">
                  <Card className="analytics-card">
                      <Card.Body className="analytics-card-body">
                          <Card.Title className="analytics-card-title">Current Streak</Card.Title>
                          <Card.Text className="analytics-card-text">{analyticsData.current_streak} Days</Card.Text>
                      </Card.Body>
                  </Card>
              </Col>
          </Row>
  
          {/* Topic Stats */}
          <Row className="analytics-row">
              <Col md={12} className="analytics-topic-stats">
                  <h3>Highest Scoring Topic: {analyticsData.highest_scoring_topic ? analyticsData.highest_scoring_topic.name : 'N/A'}</h3>
                  <p>Score: {analyticsData.highest_scoring_topic ? analyticsData.highest_scoring_topic.score : 'N/A'}%</p>
                  <h3>Lowest Scoring Topic: {analyticsData.lowest_scoring_topic ? analyticsData.lowest_scoring_topic.name : 'N/A'}</h3>
                  <p>Score: {analyticsData.lowest_scoring_topic ? analyticsData.lowest_scoring_topic.score : 'N/A'}%</p>
                  <h3>Most Attempted Topic: {analyticsData.most_attempted_topic ? analyticsData.most_attempted_topic.name : 'N/A'}</h3>
                  <p>Number of Attempts: {analyticsData.most_attempted_topic ? analyticsData.most_attempted_topic.attempts : 'N/A'}</p>
              </Col>
          </Row>
  
          {/* Achievements */}
          <Row className="analytics-row">
              <Col md={12}>
                  <h3>Your Achievements</h3>
                  <div className="analytics-badge-container">
                      {achievements.length > 0 ? (
                          achievements.map((achievement, index) => (
                              <div key={index} className="analytics-achievement-card">
                                  <h4 className="analytics-achievement-card-title">{achievement.name}</h4>
                                  <p className="analytics-achievement-card-text">{achievement.description}</p>
                                  <p className="analytics-achievement-card-date">{achievement.date}</p>
                              </div>
                          ))
                      ) : (
                          <p>No achievements yet!</p>
                      )}
                  </div>
              </Col>
          </Row>
  
          {/* Focus Areas */}
          <Row className="analytics-row">
              <Col md={12}>
                  <h3>Focus Areas</h3>
                  <div className="analytics-focus-area">
                      {analyticsData.areas_to_focus.length > 0 ? (
                          analyticsData.areas_to_focus.map((area, index) => (
                              <div key={index} className="analytics-focus-card">
                                  <h4 className="analytics-focus-card-title">{area}</h4>
                                  <p className="analytics-focus-card-description">You scored less than 50% on this topic, focus on improving!</p>
                              </div>
                          ))
                      ) : (
                          <p>No focus areas yet!</p>
                      )}
                  </div>
              </Col>
          </Row>
  
          {/* Action Button */}
          <Row className="text-center">
              <Col md={12}>
                  <Button className="analytics-button" href="/quizzes">Take a Quiz</Button>
              </Col>
          </Row>
      </Container>
  );
  
};

export default AnalyticsPage;
