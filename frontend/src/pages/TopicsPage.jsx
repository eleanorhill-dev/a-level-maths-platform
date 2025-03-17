import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TopicsPage = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch('http://localhost:5000/topics'); 
        const text = await response.text();
        console.log("Raw Response:", text);
    
        const data = JSON.parse(text);
        console.log("Parsed topics:", data);
        setTopics(data);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };
    

    fetchTopics();
  }, []);
  

  return (
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
  );
};

export default TopicsPage;
