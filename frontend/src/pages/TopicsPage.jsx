import React from "react";
import { Link } from "react-router-dom";
import BaseLayout from '../components/BaseLayout';

const TopicsPage = ({ topics }) => {
  return (
    <BaseLayout>
    <div className="container">
      <h1>Topics</h1>
      {topics.length > 0 ? (
        topics.map((topic) => (
          <div key={topic.id} className="topic">
            <Link to={`/topics/${topic.id}`} className="topic-button">
              {topic.name}
            </Link>
          </div>
        ))
      ) : (
        <p>No topics available.</p>
      )}
    </div>
    </BaseLayout>
  );
};

export default TopicsPage;
