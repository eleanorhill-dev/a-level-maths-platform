import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from extensions import db
from app import create_app
from models import QuizQuestion, Topic

app = create_app()

def seed_questions():
    with app.app_context():
        topic = Topic.query.filter_by(name="Statistical Distributions").first()
        if not topic:
            print("Topic 'Statistical Distributions' not found. Make sure it exists in the database.")
            return
        
        print(f"Topic found: {topic.name} (ID: {topic.id})")

        questions = [
            {
                "question_text": "What does the cumulative probability represent for a binomial distribution?",
                "code_snippet": None,
                "question_type": "multiple_choice",
                "options": [
                    "The probability of getting exactly k successes",
                    "The probability of getting k or fewer successes",
                    "The probability of getting more than k successes",
                    "The probability of getting k successes or greater"
                ],
                "correct_answer": "The probability of getting k or fewer successes",
                "explanation": "Cumulative probability gives the likelihood of getting k or fewer successes in a binomial distribution."
            },
            {
                "question_text": "Which of the following represents the binomial distribution's probability mass function (PMF)?",
                "code_snippet": None,
                "question_type": "multiple_choice",
                "options": [
                    "P(X = k) = nCk * p^k * (1-p)^(n-k)",
                    "P(X = k) = (1 - p) * k^n",
                    "P(X = k) = n * p * (1 - p)",
                    "None of the above"
                ],
                "correct_answer": "P(X = k) = nCk * p^k * (1-p)^(n-k)",
                "explanation": "The binomial distribution is defined by the PMF formula P(X = k) = nCk * p^k * (1-p)^(n-k)."
            },
            {
                "question_text": "What is the probability of getting exactly 3 heads in 5 flips of a fair coin (p = 0.5)?",
                "code_snippet": "from scipy.stats import binom\nprob_3_heads = binom.pmf(3, 5, 0.5)\nprint(prob_3_heads)",
                "question_type": "multiple_choice",
                "options": [
                    "0.5",
                    "0.3125",
                    "0.25",
                    "0.375"
                ],
                "correct_answer": "0.3125",
                "explanation": "The probability is calculated using the binomial PMF function. In this case, P(X = 3) for n = 5 and p = 0.5."
            },
            {
                "question_text": "What is the probability of getting 4 or fewer heads in 5 flips of a fair coin (p = 0.5)?",
                "code_snippet": "cumulative_prob = binom.cdf(4, 5, 0.5)\nprint(cumulative_prob)",
                "question_type": "multiple_choice",
                "options": [
                    "0.5",
                    "0.8",
                    "0.8125",
                    "0.96875"
                ],
                "correct_answer": "0.96875",
                "explanation": "The cumulative probability for 4 or fewer heads in 5 flips is calculated using binom.cdf."
            },
            {
                "question_text": "Which of the following is a correct statement about a binomial distribution?",
                "code_snippet": None,
                "question_type": "multiple_choice",
                "options": [
                    "The probability of success changes with each trial.",
                    "The trials are independent and there are only two possible outcomes (success or failure).",
                    "The number of trials is not fixed.",
                    "None of the above"
                ],
                "correct_answer": "The trials are independent and there are only two possible outcomes (success or failure).",
                "explanation": "In a binomial distribution, the trials are independent and there are two possible outcomes: success or failure."
            },
            {
                "question_text": "Which of the following is true for the probability of getting exactly k successes in n trials of a binomial distribution?",
                "code_snippet": None,
                "question_type": "multiple_choice",
                "options": [
                    "It is calculated using the normal distribution formula.",
                    "It is calculated using the binomial probability mass function.",
                    "It is calculated using the Poisson distribution formula.",
                    "None of the above"
                ],
                "correct_answer": "It is calculated using the binomial probability mass function.",
                "explanation": "The probability of exactly k successes in n trials in a binomial distribution is calculated using the PMF formula."
            },
            {
                "question_text": "Complete the code to calculate the cumulative probability of getting 3 or fewer heads in 10 flips of a coin with p = 0.5:",
                "code_snippet": "from scipy.stats import binom\nprob_3_or_fewer = binom.cdf(3, 10, ________)\nprint(prob_3_or_fewer)",
                "question_type": "fill_in_the_blank",
                "options": None,
                "correct_answer": "0.5",
                "explanation": "The cumulative probability is calculated using binom.cdf with n = 10 and p = 0.5."
            },
            {
                "question_text": "Fill in the blank to calculate the probability of getting exactly 2 successes in 8 trials with p = 0.4 using the binomial distribution:",
                "code_snippet": "from scipy.stats import binom\npmf_2_successes = binom.pmf(2, ___________, 0.4)\nprint(pmf_2_successes)",
                "question_type": "fill_in_the_blank",
                "options": None,
                "correct_answer": "8",
                "explanation": "The probability of exactly 2 successes is calculated using binom.pmf with n = 8 and p = 0.4."
            }
        ]

        for question in questions:
            quiz_question = QuizQuestion(
                topic_id=topic.id,
                question_text=question["question_text"],
                code_snippet=question["code_snippet"],
                question_type=question["question_type"],
                options=question.get("options"),
                correct_answer=question["correct_answer"],
                explanation=question["explanation"]
            )
            db.session.add(quiz_question)
            print(f"➕ Queued question with topic_id = {quiz_question.topic_id}")

        try:
            db.session.commit()
            print(f"{len(questions)} questions added to the 'StatisticalDistributions' topic.")
        except Exception as e:
            db.session.rollback()
            print(f"Error during commit: {e}")
            return

        total = QuizQuestion.query.count()
        print(f"Total questions now in the QuizQuestion table: {total}")

if __name__ == "__main__":
    seed_questions()
