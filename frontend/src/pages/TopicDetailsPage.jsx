import React from "react";
import { useParams, Link } from "react-router-dom";
import BaseLayout from '../components/BaseLayout';

const TopicPage = ({ topics }) => {
  const { topicId } = useParams();
  const topic = topics.find((t) => t.id === topicId); 

  if (!topic) {
    return <div className="container"><h2>Topic not found.</h2></div>;
  }

  return (
    <BaseLayout>
    <div className="container">
      <h1>{topic.name}</h1>
      <p dangerouslySetInnerHTML={{ __html: topic.description }}></p>
      <h2>Content</h2>
      <div dangerouslySetInnerHTML={{ __html: topic.content }}></div> 
      <Link to="/topics" className="btn btn-primary mt-3">Back to Topics</Link>
    </div>
    </BaseLayout>
  );
};

export default TopicPage;
