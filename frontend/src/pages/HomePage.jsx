import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCode, FaChartLine, FaPuzzlePiece, FaUserCheck } from "react-icons/fa";
import '../styles/HomePage.css';

const features = [
  {
    icon: <FaPuzzlePiece size={32} />,
    title: "Master Every Topic",
    description: "Deep-dive into bite-sized A-Level Maths concepts — theory, examples, and code-powered practice.",
  },
  {
    icon: <FaChartLine size={32} />,
    title: "Track Your Progress",
    description: "Instant feedback, quiz history, analytics and more to help you improve efficiently.",
  },
  {
    icon: <FaCode size={32} />,
    title: "Learn Through Code",
    description: "See how maths and Python blend together for an interactive, modern learning experience.",
  },
  {
    icon: <FaUserCheck size={32} />,
    title: "Personalised Learning",
    description: "Your profile keeps tabs on performance and suggests areas to focus next.",
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="home-page">
      <section className="hero-section text-center">
        <h1 className="hero-title">Welcome to MathsUncoded</h1>
        <p className="hero-description">
          Build your skills, track your progress, and master A-Level Maths — one concept at a time.
        </p>
        <div className="hero-buttons">
          <button className="btn-secondary" onClick={() => navigate("/topics")}>Explore Topics</button>
          <button className="btn-secondary" onClick={() => navigate("/profile")}>Go to Profile</button>
        </div>
      </section>

      <section className="features-section">
        <div className="feature-cards">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="quote-section">
        <blockquote className="quote-text">
          “Pure mathematics is, in its way, the poetry of logical ideas.” — Albert Einstein
        </blockquote>
      </section>
    </div>
  );
};

export default HomePage;
