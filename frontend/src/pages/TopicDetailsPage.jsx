// src/pages/TopicDetailPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CodeSnippet from "../components/CodeSnippet";

const TopicDetailsPage = () => {
  const { topicId } = useParams();
  const [topic, setTopic] = useState(null);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await fetch(`http://localhost:5000/topics/${topicId}`);
        if (!response.ok) throw new Error("Failed to fetch topic");
        const data = await response.json();
        setTopic(data);
      } catch (error) {
        console.error("Error loading topic:", error);
      }
    };

    fetchTopic();
  }, [topicId]);

  if (!topic) return <p>Loading topic...</p>;

  const renderContentWithCode = (htmlContent) => {
    const regex = /<pre><code class="language-(.*?)">(.*?)<\/code><\/pre>|<code>(.*?)<\/code>/gs;

    const parts = [];
    let lastIndex = 0;

    htmlContent.replace(regex, (match, language, blockCode, inlineCode, offset) => {
      parts.push(
        <div
          key={offset}
          dangerouslySetInnerHTML={{ __html: htmlContent.slice(lastIndex, offset) }}
        />
      );

      if (blockCode) {
        parts.push(<CodeSnippet key={offset + 1} code={decodeHTML(blockCode)} language={language} />);
      } else if (inlineCode) {
        parts.push(<CodeSnippet key={offset + 2} code={decodeHTML(inlineCode)} language="python" />);
      }

      lastIndex = offset + match.length;
    });

    parts.push(
      <div
        key="remaining"
        dangerouslySetInnerHTML={{ __html: htmlContent.slice(lastIndex) }}
      />
    );

    return parts;
  };

  const decodeHTML = (str) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
  };

  return (
      <div className="container">
        <h1>{topic.name}</h1>
        <div>{renderContentWithCode(topic.description)}</div>
        <div>{renderContentWithCode(topic.content)}</div>
      </div>
  );
};

export default TopicDetailsPage;
