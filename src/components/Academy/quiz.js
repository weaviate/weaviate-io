import React, { useState } from 'react';
import './academy.css'

export default function Quiz(props) {

  const questions = props.questions

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showFeedback, setShowFeedback] = useState(false);
	const [feedback, setFeedback] = useState("");
	const [score, setScore] = useState(0);

	const handleAnswerOptionClick = (isCorrect, feedback) => {
		if (isCorrect) {
			setScore(score + 1);
			setFeedback("That's right!\n\n" + feedback);
		} else {
			setFeedback("That's not right.\n\n" + feedback);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowFeedback(true);
		}
	};

	const handleRetryClick = () => {
    setScore(0)
		setShowFeedback(false);
	};

  let btnClass = "quiz-button"
  if (props.isCode == true) {
    btnClass = "quiz-button code_answer"
  }

	return (
		<div className='quiz'>
			{showFeedback ? (
				<div>
				<div className='feedback-section'>
					<h3><i class="fa-solid fa-comments"></i>&nbsp;&nbsp;Feedback</h3>
					<div className='question-text'>{feedback}</div>
				</div>
				<div className='answer-section'>
          <button className={btnClass} onClick={() => handleRetryClick()}>Retry</button>
				</div>
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span><i class="fa-solid fa-clipboard-question"></i>&nbsp;&nbsp;Question</span>
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
              <div>
              <button className={btnClass} onClick={() => handleAnswerOptionClick(answerOption.isCorrect, answerOption.feedback)} dangerouslySetInnerHTML={{__html: answerOption.answerText}}></button>
              </div>
						))}
					</div>
				</>
			)}
		</div>
	);
}