import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useLocation } from 'react-router-dom'
import './BudgetingModule.css'

function BudgetingModule() {
  const { user } = useAuth()
  const location = useLocation()
  const [currentStep, setCurrentStep] = useState(() => (location.state && location.state.startAt) ? location.state.startAt : 'overview') // overview, learn, pre-quiz, game, post-quiz, review
  const [flipped, setFlipped] = useState({})

  const budgetingFlashcards = [
    {
      title: 'The 50/30/20 Rule',
      points: [
        '50% to needs, 30% to wants, 20% to savings/debt',
        'Use as a starting template, then adjust to fit',
        'Helps balance lifestyle with long‑term goals'
      ],
      example: 'If your take‑home pay is $2,000/month → $1,000 needs (rent, groceries), $600 wants (eating out, hobbies), $400 savings/debt payments.'
    },
    {
      title: 'Track Your Cashflow',
      points: [
        'List all income sources and every expense',
        'Categorize: housing, food, transport, subscriptions, etc.',
        'Use an app or a simple spreadsheet'
      ],
      example: 'After tracking for a month you find $60 in forgotten subscriptions. Cancelling frees up $60/month to add to savings.'
    },
    {
      title: 'Emergency Fund',
      points: [
        'Target 3–6 months of essential expenses',
        'Start with a mini‑goal (e.g., $500) and build up',
        'Keep it in a high‑yield savings account'
      ],
      example: 'If essentials cost $1,500/month, aim for $4,500–$9,000. Begin with $500 this quarter, then automate $150/month.'
    },
    {
      title: 'Zero‑Based Budgeting',
      points: [
        'Give every dollar a job before the month starts',
        'Income minus planned expenses equals zero',
        'Reallocate when circumstances change'
      ],
      example: 'Plan $2,000 income across rent, food, gas, savings, and fun. If car repair appears, move from “wants” to cover it.'
    }
  ]

  const toggleFlip = (idx) => {
    setFlipped(prev => ({ ...prev, [idx]: !prev[idx] }))
  }
  const [quizData, setQuizData] = useState({
    preQuiz: {
      questions: [
        {
          id: 1,
          question: "What is the 50/30/20 rule in budgeting?",
          options: [
            "50% needs, 30% wants, 20% savings",
            "50% savings, 30% needs, 20% wants",
            "50% wants, 30% savings, 20% needs",
            "50% needs, 30% savings, 20% wants"
          ],
          correct: 0,
          explanation: "The 50/30/20 rule suggests allocating 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment."
        },
        {
          id: 2,
          question: "Which of the following is considered a 'need' in budgeting?",
          options: [
            "Entertainment subscriptions",
            "Housing and utilities",
            "Dining out",
            "Shopping for clothes"
          ],
          correct: 1,
          explanation: "Housing and utilities are essential needs that you must pay for to maintain basic living standards."
        },
        {
          id: 3,
          question: "What is the purpose of an emergency fund?",
          options: [
            "To pay for vacations",
            "To cover unexpected expenses",
            "To invest in stocks",
            "To buy luxury items"
          ],
          correct: 1,
          explanation: "An emergency fund provides financial security by covering unexpected expenses like medical bills or car repairs."
        },
        {
          id: 4,
          question: "Which budgeting method involves giving every dollar a job?",
          options: [
            "The envelope method",
            "Zero-based budgeting",
            "The 50/30/20 rule",
            "Percentage-based budgeting"
          ],
          correct: 1,
          explanation: "Zero-based budgeting means every dollar is allocated to a specific purpose, leaving no money unassigned."
        },
        {
          id: 5,
          question: "What should you do first when creating a budget?",
          options: [
            "Set spending limits",
            "Track your income",
            "Choose budgeting tools",
            "Set financial goals"
          ],
          correct: 1,
          explanation: "The first step in budgeting is to track your total income from all sources to understand how much money you have to work with."
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
          question: "After learning about budgeting, what percentage should you aim to save?",
          options: [
            "At least 10%",
            "At least 20%",
            "At least 30%",
            "At least 40%"
          ],
          correct: 1,
          explanation: "Aiming to save at least 20% of your income is a good goal for building financial security."
        },
        {
          id: 2,
          question: "What is the best way to stick to your budget?",
          options: [
            "Review it monthly",
            "Review it weekly",
            "Review it daily",
            "Set it and forget it"
          ],
          correct: 1,
          explanation: "Reviewing your budget weekly helps you stay on track and make adjustments as needed."
        },
        {
          id: 3,
          question: "Which expense category should you prioritize?",
          options: [
            "Entertainment",
            "Needs and obligations",
            "Shopping",
            "Dining out"
          ],
          correct: 1,
          explanation: "Always prioritize needs and obligations like housing, food, and utilities before discretionary spending."
        },
        {
          id: 4,
          question: "What should you do if you overspend in one category?",
          options: [
            "Ignore it and continue",
            "Adjust other categories to compensate",
            "Give up on budgeting",
            "Wait until next month"
          ],
          correct: 1,
          explanation: "If you overspend in one category, adjust other categories to compensate and stay within your total budget."
        },
        {
          id: 5,
          question: "How often should you update your budget?",
          options: [
            "Only when income changes",
            "Monthly or when circumstances change",
            "Once a year",
            "Never"
          ],
          correct: 1,
          explanation: "Update your budget monthly or whenever your circumstances change to keep it relevant and effective."
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
          module: 'budgeting',
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
            budgeting_progress: 100
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
        <h3>Budget Blitz Game</h3>
        <p>Test your budgeting skills in this interactive game!</p>
        <Link to="/games/budget-blitz" state={{ fromModule: 'budgeting' }} className="btn-primary">
          Play Budget Blitz
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
        <h2>Budgeting and Expense Tracking</h2>
        <p>Learn to manage your money effectively by tracking your income and expenses.</p>
        
        <div className="module-steps">
          <div className={`step ${currentStep === 'pre-quiz' ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Learn</h4>
              <p>Read the key concepts of budgeting and expense tracking</p>
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
              <p>Test your current knowledge about budgeting</p>
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
              <p>Practice budgeting skills in a fun game</p>
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
              <p>Test what you've learned</p>
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
          <div className="learn-icon"><span className="material-icons">school</span></div>
          <div>
            <h3>Budgeting Basics</h3>
            <p>Key principles to help you master budgeting before taking the quiz.</p>
          </div>
        </div>
        <div className="flashcards">
          {budgetingFlashcards.map((card, idx) => (
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
    <div className="budgeting-module">
      <div className="module-header">
        <Link to="/modules" className="back-link">
          <span className="material-icons">arrow_back</span>
          Back to Modules
        </Link>
        <h1>Budgeting Module</h1>
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

export default BudgetingModule

