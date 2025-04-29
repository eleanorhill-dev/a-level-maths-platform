import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CodeSnippet from "../components/CodeSnippet";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import "../styles/QuizPage.css";


const QuizPage = ({ onXpUpdate }) => {
  const { topicId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(null);
  const [xpEarned, setXpEarned] = useState(null);
  const [explanations, setExplanations] = useState([]);
  const [awardedAchievements, setAwardedAchievements] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const userId = sessionStorage.getItem("userId");

  const fireConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };  

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`http://localhost:5000/quiz/${topicId}`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch questions");

        const data = await res.json();
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

  useEffect(() => {
    if (showPopUp && awardedAchievements.length > 0) {
      awardedAchievements.forEach((achievement) => {
        toast.success(`🏆 Achievement Unlocked: ${achievement.name}`, {
          description: achievement.description || "You earned a new achievement!",
          duration: 5000,
        });
      });
    }
  }, [showPopUp, awardedAchievements]);

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
      original_answers: questions.map((q, index) => ({
        id: q.id,
        question_number: index + 1,
        answer: (userAnswers[q.id] || ""),
      })),
      answers: questions.map((q, index) => ({
        id: q.id,
        question_number: index + 1,
        answer: (userAnswers[q.id] || "").replace(/\s+/g, ""), 
      })),
    };

    try {
      const res = await fetch("http://localhost:5000/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to submit quiz");

      const data = await res.json();

      if (data.awarded_achievements && data.awarded_achievements.length > 0) {
        setAwardedAchievements(data.awarded_achievements);
        setShowPopUp(true);
      }

      if (data.score === 100) {
        fireConfetti();
      }      

      setScore(data.score);
      setXpEarned(data.xp_earned);
      setExplanations(data.explanations || []);
      setQuizCompleted(true);

      if (onXpUpdate) onXpUpdate();
      
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  if (loading) return <p>Loading quiz...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (quizCompleted) {
    return (
      <div className="quiz-container quiz-complete">
        <div className="quiz-summary-header">
          <h2 className="quiz-complete-title">Quiz Complete!</h2>
          <p className="quiz-score">Score: {score !== null ? score.toFixed(1) : 0}%</p>
          {xpEarned !== null && (
            <p className="quiz-xp">XP Earned: {xpEarned}</p>
          )}
          <button onClick={() => navigate('/topics')} className="quiz-nav-btn">
            Return to Topics
          </button>
          <button onClick={() => navigate('/analytics')} className="quiz-nav-btn">
            View Analytics
          </button>
        </div>
        <ul className="space-y-4 list-none">
        {explanations.map((exp, index) => {
          const questionNumber = exp.question_number || index + 1;
          return (
            <li key={`exp-${exp.question_number || index}`} className="explanation-card">
              <p><strong>Q{questionNumber}:</strong> {exp.question}</p>
              <p><span className="incorrect">Your Answer:</span>
                <span style={{ whiteSpace: "pre-wrap" }}>{exp.your_answer}</span>
              </p>
              <p><span className="correct">Correct Answer:</span>
                <span style={{ whiteSpace: "pre-wrap" }}>{exp.correct_answer}</span>
              </p>
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

  return (
    <div className="quiz-container">
      <h2 className="quiz-header">
        Question {currentIndex + 1} of {questions.length}
      </h2>
      <p className="quiz-question">{currentQuestion.question_text}</p>
  
      {currentQuestion.code_snippet && (
        <div className="mb-4">
          <CodeSnippet code={currentQuestion.code_snippet} />
        </div>
      )}
  
      {currentQuestion.question_type === "multiple_choice" ? (
        <div className="quiz-options">
          {currentQuestion.options.map((option, idx) => {
            const isImage =
              typeof option === "string" && option.match(/\.(png|jpg|jpeg|svg)$/i);
        
            return (
              <label key={idx} className="quiz-option">
                <input
                  type="radio"
                  name={`answer-${currentIndex}`}
                  value={option}
                  checked={currentAnswer === option}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="hidden"
                />
                {isImage ? (
                  <img
                    src={`/quiz_images/${option}`}
                    alt={`Option ${idx + 1}`}
                    className="quiz-option-image"
                  />
                ) : (
                  <span>{option}</span>
                )}
              </label>
            );
          })}
        </div>
      ) : (
        <input
          type="text"
          className="quiz-input"
          placeholder="Type your answer here"
          value={currentAnswer}
          onChange={(e) => handleAnswerChange(e.target.value)}
        />
      )}
  
      <button
        className="quiz-submit-btn"
        onClick={handleNext}
        disabled={!currentAnswer}
      >
        {currentIndex === questions.length - 1 ? "Submit Quiz" : "Next Question"}
      </button>
    </div>
  );
  
};

export default QuizPage;
