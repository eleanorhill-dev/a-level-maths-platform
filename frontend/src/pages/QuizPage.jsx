import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/ui/Button";
import CodeSnippet from "../components/CodeSnippet";
import { toast } from "sonner";

const QuizPage = () => {
  const { topicId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(null);
  const [explanations, setExplanations] = useState([]);
  const [awardedAchievements, setAwardedAchievements] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
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
          <p className="text-green-600 font-semibold mb-2">
            🎉 Clean sweep! You nailed every question!
          </p>
        )}
        <ul className="space-y-4 list-none">
          {explanations.map((exp, index) => {
            const questionNumber = exp.question_number || index + 1;
            return (
              <li
                key={`exp-${exp.question_number || index}`}
                className="bg-gray-100 p-4 rounded shadow"
              >
                <p>
                  <strong>Q{questionNumber}:</strong> {exp.question}
                </p>
                <p>
                  <span className="text-red-600">Your Answer:</span>{" "}
                  {exp.your_answer}
                </p>
                <p>
                  <span className="text-green-600">Correct Answer:</span>{" "}
                  {exp.correct_answer}
                </p>
                <p>
                  <em>Explanation:</em> {exp.explanation}
                </p>
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
        <div className="mb-4 space-y-4">
          {currentQuestion.options.map((option, idx) => {
            const isImage =
              typeof option === "string" && option.match(/\.(png|jpg|jpeg|svg)$/i);
            return (
              <div key={idx} className="flex items-start space-x-2">
                <input
                  type="radio"
                  name={`answer-${currentIndex}`}
                  value={option}
                  checked={currentAnswer === option}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="mt-1"
                />
                <label htmlFor={`answer-${idx}`} className="cursor-pointer">
                  {isImage ? (
                    <img
                      src={`/quiz_images/${option}`}
                      alt={`Option ${idx + 1}`}
                      className="w-32 h-auto border rounded shadow"
                    />
                  ) : (
                    <span>{option}</span>
                  )}
                </label>
              </div>
            );
          })}
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
