import React, { useState, useEffect } from 'react';
import { Spinner, Card, Container, Row, Col, Button } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from 'recharts';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { motion } from 'framer-motion';
import { Tooltip as ReactToolTip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import "../styles/AnalyticsPage.css";

function calculateStreak(activityData) {
  if (!activityData || activityData.length === 0) return 0;

  const activityDates = new Set(
    activityData.map(item => new Date(item.date).toDateString())
  );

  let streak = 0;
  let today = new Date();

  while (activityDates.has(today.toDateString())) {
    streak++;
    today.setDate(today.getDate() - 1);
  }

  return streak;
}


const AnalyticsPage = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [scoreHistory, setScoreHistory] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [xpData, setXpData] = useState([]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/analytics", {
          method: "GET",
          credentials: "include"
        });
        const data = await response.json();
        setAnalyticsData(data);

        setScoreHistory(data.score_history || []);
        setActivityData(data.activity_data || []);
        setXpData(data.xp_by_day || []);

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

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Container className="analytics-container mt-5">
      <motion.div initial="hidden" animate="visible" variants={fadeInVariants} transition={{ duration: 0.6 }}>
      <h1 className = "analytics-heading">Analytics</h1>
        <Row className="analytics-row">
          <Col md={4} className="analytics-col-md-4">
            <Card className="analytics-card">
              <Card.Body className="analytics-card-body">
                <Card.Title className="analytics-card-title">Total Quizzes Taken</Card.Title>
                <Card.Text className="analytics-card-text large-number">{analyticsData.total_quizzes_taken}</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="analytics-col-md-4">
            <Card className="analytics-card">
              <Card.Body className="analytics-card-body">
                <Card.Title className="analytics-card-title">Average Score</Card.Title>
                <div style={{ width: 120, height: 120, margin: "0 auto" }}>
                  <CircularProgressbar 
                    value={analyticsData.average_score}
                    text={`${analyticsData.average_score.toFixed(0)}%`}
                    styles={buildStyles({
                      textSize: '18px',
                      pathColor: '#d96aa5',
                      textColor: '#129EBA',
                      trailColor: '#ffe9f0',
                    })}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="analytics-col-md-4">
            <Card className="analytics-card">
              <Card.Body className="analytics-card-body">
                <Card.Title className="analytics-card-title">Current Streak</Card.Title>
                <Card.Text className="analytics-card-text large-number">{calculateStreak(activityData)}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="analytics-row">
          <Col md={4} className="analytics-col-md-4">
            <Card className="analytics-card">
              <Card.Body className="analytics-card-body">
                <Card.Title className="analytics-card-title">Highest Scoring Topic</Card.Title>
                <Card.Text className="analytics-card-text">
                  {analyticsData.highest_scoring_topic?.name || 'N/A'}
                </Card.Text>
                <p className="analytics-topic-score">
                  Score: {analyticsData.highest_scoring_topic?.score || 'N/A'}%
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="analytics-col-md-4">
            <Card className="analytics-card">
              <Card.Body className="analytics-card-body">
                <Card.Title className="analytics-card-title">Lowest Scoring Topic</Card.Title>
                <Card.Text className="analytics-card-text">
                  {analyticsData.lowest_scoring_topic?.name || 'N/A'}
                </Card.Text>
                <p className="analytics-topic-score">
                  Score: {analyticsData.lowest_scoring_topic?.score || 'N/A'}%
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="analytics-col-md-4">
            <Card className="analytics-card">
              <Card.Body className="analytics-card-body">
                <Card.Title className="analytics-card-title">Most Attempted Topic</Card.Title>
                <Card.Text className="analytics-card-text">
                  {analyticsData.most_attempted_topic?.name || 'N/A'}
                </Card.Text>
                <p className="analytics-topic-score">
                  Attempts: {analyticsData.most_attempted_topic?.attempts || 'N/A'}
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="analytics-row">
          <Col md={12}>
            <h3>XP Earned Over the Past 7 Days</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.xp_by_day}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="xp" fill="#d96aa5" />
              </BarChart>
            </ResponsiveContainer>
          </Col>
        </Row>

        <Row className="analytics-row">
          <Col md={12}>
            <h3>Progress Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={scoreHistory}>
                <Line type="monotone" dataKey="score" stroke="#d96aa5" strokeWidth={3} />
                <XAxis dataKey="date_attempted" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </Col>
        </Row>

        <Row className="analytics-row">
          <Col md={12}>
            <h3>Activity Heatmap</h3>
            <div className="heatmap-wrapper">
            <CalendarHeatmap
              startDate={new Date(new Date().setMonth(new Date().getMonth() - 5))}
              endDate={new Date()}
              values={activityData}
              classForValue={value => {
                if (!value) return 'color-empty';
                if (value.count >= 4) return 'color-scale-4';
                if (value.count >= 3) return 'color-scale-3';
                if (value.count >= 2) return 'color-scale-2';
                return 'color-scale-1';
              }}
              tooltipDataAttrs={value => {
                if (!value || !value.date) {
                  return { 'data-tooltip-id': 'my-tooltip', 'data-tooltip-content': 'No activity' };
                }
                const date = new Date(value.date).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                });
                return {
                  'data-tooltip-id': 'my-tooltip',
                  'data-tooltip-content': `${date}: ${value.count} activities`,
                };
              }}
            />
            <ReactToolTip id="my-tooltip" />
            </div>
          </Col>
        </Row>

        <Row className="analytics-row">
          <Col md={12}>
            <h3>Achievements Timeline</h3>
            <div className="timeline">
              {achievements.map((ach, index) => (
                <motion.div
                  key={index}
                  className="timeline-item"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="timeline-content">
                    <h4>{ach.name}</h4>
                    <p>{ach.description}</p>
                    <span>{ach.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Col>
        </Row>

        <Row className="text-center">
          <Col md={12}>
            <Button className="analytics-button" href="/topics">
              Go to Topics
            </Button>
          </Col>
        </Row>
      </motion.div>
    </Container>
  );
};

export default AnalyticsPage;
