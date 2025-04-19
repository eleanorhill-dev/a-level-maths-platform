import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/ui/Button"; 
import CodeSnippet from '../components/CodeSnippet';

const QuizPage = () => {
  const { topicId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(null);
  const [explanations, setExplanations] = useState([]);
  const [error, setError] = useState(null);

  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`http://localhost:5000/quiz/${topicId}`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch questions");

        const data = await res.json();
        console.log("Fetched questions:", data);
        setQuestions(data);
      } catch (error) {
        console.error("Failed to load questions:", error);
        setError("Failed to load quiz questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [topicId]);

  const handleNext = () => {
    if (questions.length === 0 || currentIndex >= questions.length) return;

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleAnswerChange = (value) => {
    const currentQuestion = questions[currentIndex];
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      user_id: parseInt(userId),
      topic_id: parseInt(topicId),
      answers: questions.map((q, index) => ({
        id: q.id,
        question_number: index + 1,
        answer: userAnswers[q.id] || "",
      })),
    };
  
    console.log("Submitting quiz with payload:", payload);
  
    try {
      const res = await fetch("http://localhost:5000/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
  
      console.log("Response status:", res.status);
  
      if (!res.ok) {
        console.error("Failed to submit quiz:", await res.text());
        throw new Error("Failed to submit quiz");
      }
  
      const data = await res.json();
      console.log("Received data:", data);
  
      setScore(data.score);
      setExplanations(data.explanations || []);
      setQuizCompleted(true);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };


  if (loading) return <p>Loading quiz...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (quizCompleted) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Quiz Complete!</h2>
        <p className="mb-2">Score: {score}%</p>
        {score === 100 && (
          <p className="text-green-600 font-semibold mb-2">🎉 Clean sweep! You nailed every question!</p>
        )}
        <ul className="space-y-4 list-none">
        {explanations.map((exp, index) => {
          const questionNumber = exp.question_number || index + 1;
          return (
              <li key={`exp-${exp.question_number || index}`} className="bg-gray-100 p-4 rounded shadow">
                <p><strong>Q{questionNumber}:</strong> {exp.question}</p>
                <p><span className="text-red-600">Your Answer:</span> {exp.your_answer}</p>
                <p><span className="text-green-600">Correct Answer:</span> {exp.correct_answer}</p>
                <p><em>Explanation:</em> {exp.explanation}</p>
              </li>
          );
        })}
        </ul>
      </div>
    );
  }
  

  if (questions.length === 0 || !questions[currentIndex]) {
    return <p className="text-red-500">Question not available.</p>;
  }

  const currentQuestion = questions[currentIndex];
  const currentAnswer = userAnswers[currentQuestion.id] || "";

  console.log("Current Index:", currentIndex);
  console.log("Current Question:", currentQuestion);
  console.log("User Answers:", userAnswers);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">
        Question {currentIndex + 1} of {questions.length}
      </h2>
      <p className="mb-2 whitespace-pre-wrap">{currentQuestion.question_text}</p>
      {currentQuestion.code_snippet && (
        <div className="mb-4">
          <CodeSnippet code={currentQuestion.code_snippet} />
        </div>
      )}

      {currentQuestion.question_type === "multiple_choice" ? (
        <div className="mb-4">
          {currentQuestion.options.map((option, idx) => (
            <div key={idx} className="mb-2">
              <label className="block cursor-pointer">
                <input
                  type="radio"
                  name={`answer-${currentIndex}`}
                  value={option}
                  checked={currentAnswer === option}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="mr-2"
                />
                {option}
              </label>
            </div>
          ))}
        </div>      
      ) : (
        <input
          type="text"
          className="border rounded p-2 w-full mb-4"
          placeholder="Type your answer here"
          value={currentAnswer}
          onChange={(e) => handleAnswerChange(e.target.value)}
        />
      )}

      <Button onClick={handleNext} disabled={!currentAnswer}>
        {currentIndex === questions.length - 1 ? "Submit Quiz" : "Next Question"}
      </Button>
    </div>
  );
};

export default QuizPage;
