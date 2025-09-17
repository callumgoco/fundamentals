import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useLocation } from 'react-router-dom'
import './SavingModule.css'

function SavingModule() {
  const { user } = useAuth()
  const location = useLocation()
  const [currentStep, setCurrentStep] = useState(() => (location.state && location.state.startAt) ? location.state.startAt : 'overview') // overview, learn, pre-quiz, game, post-quiz, review
  const [flipped, setFlipped] = useState({})

  const savingFlashcards = [
    {
      title: 'Pay Yourself First',
      points: [
        'Automate savings on payday',
        'Treat savings like a bill you must pay',
        'Prevents lifestyle creep'
      ],
      example: 'Set an automatic $150 transfer every payday into savings before spending on anything else.'
    },
    {
      title: 'SMART Goals',
      points: [
        'Specific, Measurable, Achievable, Relevant, Time‑bound',
        'Break big goals into mini‑milestones',
        'Track progress monthly'
      ],
      example: '“Save $1,200 for travel by December by transferring $100/month into a dedicated account.”'
    },
    {
      title: 'Emergency Fund',
      points: [
        'Target 3–6 months of essentials',
        'Start with $500–$1,000 as a quick win',
        'Keep funds liquid and safe'
      ],
      example: 'If essentials cost $1,800/month → goal $5,400–$10,800. Begin with $600 in the next four months.'
    },
    {
      title: 'Beat FOMO',
      points: [
        'Create a 24‑hour rule for impulse buys',
        'Unfollow tempting promos; use shopping lists',
        'Anchor decisions to your savings goals'
      ],
      example: 'You want new headphones for $250. Wait 24 hours; decide to add $250 to the emergency fund instead.'
    }
  ]

  const toggleFlip = (idx) => setFlipped(prev => ({ ...prev, [idx]: !prev[idx] }))
  const [quizData, setQuizData] = useState({
    preQuiz: {
      questions: [
        {
          id: 1,
          question: "What is the primary purpose of saving money?",
          options: [
            "To spend on luxury items",
            "To build financial security and handle emergencies",
            "To impress others",
            "To avoid paying taxes"
          ],
          correct: 1,
          explanation: "Saving money primarily serves to build financial security and provide a safety net for unexpected expenses and emergencies."
        },
        {
          id: 2,
          question: "What is FOMO in financial terms?",
          options: [
            "Fear of Missing Out on investment opportunities",
            "Fear of Making Offers",
            "Fear of Money Operations",
            "Fear of Market Options"
          ],
          correct: 0,
          explanation: "FOMO (Fear of Missing Out) refers to the anxiety that others are making money or having better experiences, leading to impulsive financial decisions."
        },
        {
          id: 3,
          question: "What percentage of your income should you aim to save?",
          options: [
            "At least 5%",
            "At least 20%",
            "At least 50%",
            "At least 80%"
          ],
          correct: 1,
          explanation: "Financial experts recommend saving at least 20% of your income for long-term financial security."
        },
        {
          id: 4,
          question: "What is an emergency fund?",
          options: [
            "Money saved for vacations",
            "Money set aside for unexpected expenses",
            "Money invested in stocks",
            "Money for daily expenses"
          ],
          correct: 1,
          explanation: "An emergency fund is money specifically set aside to cover unexpected expenses like medical bills, car repairs, or job loss."
        },
        {
          id: 5,
          question: "Which saving strategy involves setting aside money before spending?",
          options: [
            "Pay yourself first",
            "Save what's left",
            "Spend first, save later",
            "Wait until the end of the month"
          ],
          correct: 0,
          explanation: "The 'pay yourself first' strategy means automatically setting aside a portion of your income for savings before spending on other things."
        }
      ],
      currentQuestion: 0,
      answers: [],
      score: 0,
      completed: false
    },
    postQuiz: {
      questions: [
        {
          id: 1,
          question: "After learning about saving strategies, what should you do first?",
          options: [
            "Spend all your money",
            "Set up automatic savings transfers",
            "Wait for a better time",
            "Ask others for money"
          ],
          correct: 1,
          explanation: "Setting up automatic savings transfers ensures you consistently save money without having to remember to do it manually."
        },
        {
          id: 2,
          question: "How can you overcome FOMO when it comes to spending?",
          options: [
            "Spend more to keep up",
            "Focus on your financial goals and priorities",
            "Ignore your budget completely",
            "Compare yourself to others constantly"
          ],
          correct: 1,
          explanation: "Focusing on your own financial goals and priorities helps you resist FOMO and make better financial decisions."
        },
        {
          id: 3,
          question: "What is the best way to build an emergency fund?",
          options: [
            "Save large amounts occasionally",
            "Save small amounts consistently",
            "Wait until you have extra money",
            "Borrow money from friends"
          ],
          correct: 1,
          explanation: "Saving small amounts consistently is the most effective way to build an emergency fund over time."
        },
        {
          id: 4,
          question: "When should you review your savings goals?",
          options: [
            "Never",
            "Only when you have extra money",
            "Regularly, such as monthly or quarterly",
            "Only at the end of the year"
          ],
          correct: 2,
          explanation: "Regularly reviewing your savings goals helps you stay on track and make adjustments as needed."
        },
        {
          id: 5,
          question: "What is the benefit of having multiple savings accounts?",
          options: [
            "It's more complicated",
            "It helps organize money for different goals",
            "It reduces your savings",
            "It has no benefits"
          ],
          correct: 1,
          explanation: "Multiple savings accounts help you organize money for different goals like emergency funds, vacations, or major purchases."
        }
      ],
      currentQuestion: 0,
      answers: [],
      score: 0,
      completed: false
    }
  })

  const handleQuizAnswer = (questionIndex, answerIndex) => {
    const quizType = currentStep === 'pre-quiz' ? 'preQuiz' : 'postQuiz'
    const newAnswers = [...quizData[quizType].answers]
    newAnswers[questionIndex] = answerIndex
    
    setQuizData(prev => ({
      ...prev,
      [quizType]: {
        ...prev[quizType],
        answers: newAnswers
      }
    }))
  }

  const handleQuizSubmit = async () => {
    const quizType = currentStep === 'pre-quiz' ? 'preQuiz' : 'postQuiz'
    const quiz = quizData[quizType]
    
    // Calculate score
    let score = 0
    quiz.answers.forEach((answer, index) => {
      if (answer === quiz.questions[index].correct) {
        score++
      }
    })
    
    const finalScore = Math.round((score / quiz.questions.length) * 100)
    
    // Update quiz data
    setQuizData(prev => ({
      ...prev,
      [quizType]: {
        ...prev[quizType],
        score: finalScore,
        completed: true
      }
    }))

    // Save to database
    try {
      const { supabase } = await import('../../lib/supabase')
      
      await supabase
        .from('quiz_results')
        .insert({
          user_id: user.id,
          module: 'saving',
          quiz_type: currentStep === 'pre-quiz' ? 'pre' : 'post',
          answers: quiz.answers,
          score: finalScore,
          total_questions: quiz.questions.length
        })

      // If this is the post-quiz, update module progress
      if (currentStep === 'post-quiz') {
        await supabase
          .from('module_progress')
          .upsert({
            user_id: user.id,
            savings_progress: 100
          })
      }
    } catch (error) {
      console.error('Error saving quiz results:', error)
    }
  }

  const renderQuiz = (quizType) => {
    const quiz = quizData[quizType]
    const currentQ = quiz.questions[quiz.currentQuestion]
    
    if (quiz.completed) {
      return (
        <div className="quiz-completed">
          <h3>Quiz Completed!</h3>
          <p>Your score: {quiz.score}%</p>
          <button 
            className="btn-primary"
            onClick={() => setCurrentStep(quizType === 'preQuiz' ? 'game' : 'overview')}
          >
            {quizType === 'preQuiz' ? 'Continue to Game' : 'Back to Overview'}
          </button>
          {quizType === 'postQuiz' && (
            <button 
              className="btn-secondary"
              onClick={() => setCurrentStep('review')}
              style={{ marginLeft: '0.5rem' }}
            >
              Review Answers
            </button>
          )}
        </div>
      )
    }

    return (
      <div className="quiz-section">
        <div className="quiz-progress">
          Question {quiz.currentQuestion + 1} of {quiz.questions.length}
        </div>
        
        <div className="question">
          <h3>{currentQ.question}</h3>
          <div className="options">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                className={`option ${quiz.answers[quiz.currentQuestion] === index ? 'selected' : ''}`}
                onClick={() => handleQuizAnswer(quiz.currentQuestion, index)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        
        <div className="quiz-navigation">
          {quiz.currentQuestion > 0 && (
            <button 
              className="btn-secondary"
              onClick={() => setQuizData(prev => ({
                ...prev,
                [quizType]: {
                  ...prev[quizType],
                  currentQuestion: prev[quizType].currentQuestion - 1
                }
              }))}
            >
              Previous
            </button>
          )}
          
          {quiz.currentQuestion < quiz.questions.length - 1 ? (
            <button 
              className="btn-primary"
              onClick={() => setQuizData(prev => ({
                ...prev,
                [quizType]: {
                  ...prev[quizType],
                  currentQuestion: prev[quizType].currentQuestion + 1
                }
              }))}
            >
              Next
            </button>
          ) : (
            <button 
              className="btn-primary"
              onClick={handleQuizSubmit}
              disabled={quiz.answers.length < quiz.questions.length}
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    )
  }

  const renderReview = () => {
    const pre = quizData.preQuiz
    const post = quizData.postQuiz
    const toRows = (quiz, label) => quiz.questions.map((q, idx) => ({
      quizLabel: label,
      question: q.question,
      yourAnswer: quiz.answers[idx] !== undefined ? q.options[quiz.answers[idx]] : '—',
      correctAnswer: q.options[q.correct],
      isCorrect: quiz.answers[idx] === q.correct
    }))
    const rows = [...toRows(pre, 'Pre‑Quiz'), ...toRows(post, 'Post‑Quiz')]
    return (
      <div className="review-section">
        <h3>Review Answers</h3>
        <div className="review-list">
          {rows.map((row, i) => (
            <div key={i} className={`review-item ${row.isCorrect ? 'correct' : 'incorrect'}`}>
              <div className="review-question">{row.question}</div>
              <div className="review-answers">
                <div className="your-answer"><strong>Your answer:</strong> {row.yourAnswer}</div>
                <div className="correct-answer"><strong>Correct:</strong> {row.correctAnswer}</div>
                <div className="quiz-label">{row.quizLabel}</div>
              </div>
            </div>
          ))}
          {rows.length === 0 && <p>No answers to review yet.</p>}
        </div>
        <div style={{ marginTop: '1rem' }}>
          <button className="btn-secondary" onClick={() => setCurrentStep('overview')}>Back to Overview</button>
        </div>
      </div>
    )
  }

  const renderGame = () => {
    return (
      <div className="game-section">
        <h3>FOMO Fighter Game</h3>
        <p>Learn to overcome the Fear of Missing Out and build your saving skills!</p>
        <Link to="/games/fomo-fighter" state={{ fromModule: 'saving' }} className="btn-primary">
          Play FOMO Fighter
        </Link>
        <button 
          className="btn-secondary"
          onClick={() => setCurrentStep('post-quiz')}
        >
          Skip to Post-Quiz
        </button>
      </div>
    )
  }

  const renderOverview = () => {
    return (
      <div className="overview-section">
        <h2>Smart Saving Strategies</h2>
        <p>Build financial security through smart saving strategies and goal-setting techniques. Learn to overcome FOMO and make informed financial decisions.</p>
        
        <div className="module-steps">
          <div className={`step ${currentStep === 'learn' ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Learn</h4>
              <p>Read the saving fundamentals and best practices</p>
              <button 
                className="btn-primary"
                onClick={() => setCurrentStep('learn')}
              >
                Start Learning
              </button>
            </div>
          </div>
          
          <div className={`step ${currentStep === 'pre-quiz' ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Pre-Quiz</h4>
              <p>Test your current knowledge about saving strategies</p>
              <button 
                className="btn-primary"
                onClick={() => setCurrentStep('pre-quiz')}
              >
                Start Pre-Quiz
              </button>
            </div>
          </div>
          
          <div className={`step ${currentStep === 'game' ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Interactive Game</h4>
              <p>Practice saving skills and overcome FOMO</p>
              <button 
                className="btn-primary"
                onClick={() => setCurrentStep('game')}
              >
                Play Game
              </button>
            </div>
          </div>
          
          <div className={`step ${currentStep === 'post-quiz' ? 'active' : ''}`}>
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>Post-Quiz</h4>
              <p>Test what you've learned about saving</p>
              <button 
                className="btn-primary"
                onClick={() => setCurrentStep('post-quiz')}
              >
                Take Post-Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderLearn = () => {
    return (
      <div className="learn-section">
        <div className="learn-hero">
          <div className="learn-icon"><span className="material-icons">savings</span></div>
          <div>
            <h3>Saving Fundamentals</h3>
            <p>Essential lessons to prepare you for the quiz and game.</p>
          </div>
        </div>
        <div className="flashcards">
          {savingFlashcards.map((card, idx) => (
            <div key={idx} className={`flashcard ${flipped[idx] ? 'is-flipped' : ''}`} onClick={() => toggleFlip(idx)}>
              <div className="flashcard-inner">
                <div className="flashcard-side front">
                  <h4>{card.title}</h4>
                  <ul>
                    {card.points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                  <div className="flip-hint">Tap to see example</div>
                </div>
                <div className="flashcard-side back">
                  <h4>Example</h4>
                  <p>{card.example}</p>
                  <div className="flip-hint">Tap to flip back</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="learn-actions">
          <button className="btn-secondary" onClick={() => setCurrentStep('overview')}>Back</button>
          <button className="btn-primary" onClick={() => setCurrentStep('pre-quiz')}>Take Pre-Quiz</button>
        </div>
      </div>
    )
  }

  return (
    <div className="saving-module">
      <div className="module-header">
        <Link to="/modules" className="back-link">
          <span className="material-icons">arrow_back</span>
          Back to Modules
        </Link>
        <h1>Saving Module</h1>
      </div>

      <div className="module-content">
        {currentStep === 'overview' && renderOverview()}
        {currentStep === 'learn' && renderLearn()}
        {currentStep === 'pre-quiz' && renderQuiz('preQuiz')}
        {currentStep === 'game' && renderGame()}
        {currentStep === 'post-quiz' && renderQuiz('postQuiz')}
        {currentStep === 'review' && renderReview()}
      </div>
    </div>
  )
}

export default SavingModule

