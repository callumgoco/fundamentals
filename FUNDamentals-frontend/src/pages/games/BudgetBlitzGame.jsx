import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './BudgetBlitzGame.css'

function BudgetBlitzGame() {
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [gameState, setGameState] = useState({
    isPlaying: false,
    currentRound: 1,
    totalRounds: 12,
    score: 0,
    budget: 1000,
    gameOver: false
  })

  const [currentExpense, setCurrentExpense] = useState(null)
  const [timeLeft, setTimeLeft] = useState(10)
  const [expenses, setExpenses] = useState([])

  const expenseCategories = [
    { name: 'Housing', color: '#667eea', icon: 'home' },
    { name: 'Food', color: '#f093fb', icon: 'restaurant' },
    { name: 'Transportation', color: '#4facfe', icon: 'directions_car' },
    { name: 'Entertainment', color: '#43e97b', icon: 'movie' },
    { name: 'Utilities', color: '#f5576c', icon: 'power' },
    { name: 'Healthcare', color: '#ff9a9e', icon: 'local_hospital' }
  ]

  const generateExpense = () => {
    const category = expenseCategories[Math.floor(Math.random() * expenseCategories.length)]
    const amount = Math.floor(Math.random() * 200) + 50 // $50 to $250
    const isEssential = ['Housing', 'Food', 'Transportation', 'Utilities', 'Healthcare'].includes(category.name)
    
    return {
      id: Date.now(),
      category: category.name,
      amount: amount,
      isEssential: isEssential,
      color: category.color,
      icon: category.icon,
      description: `${category.name} expense`
    }
  }

  const startGame = () => {
    setGameState({
      isPlaying: true,
      currentRound: 1,
      totalRounds: 12,
      score: 0,
      budget: 1000,
      gameOver: false
    })
    setExpenses([])
    setTimeLeft(10)
    setCurrentExpense(generateExpense())
  }

  const handleDecision = (decision) => {
    const newExpenses = [...expenses]
    
    if (decision === 'accept') {
      if (gameState.budget >= currentExpense.amount) {
        newExpenses.push({
          ...currentExpense,
          decision: 'accepted',
          score: currentExpense.isEssential ? 10 : 5
        })
        setGameState(prev => ({
          ...prev,
          budget: prev.budget - currentExpense.amount,
          score: prev.score + (currentExpense.isEssential ? 10 : 5)
        }))
      } else {
        // Can't afford it
        newExpenses.push({
          ...currentExpense,
          decision: 'rejected',
          score: 0
        })
      }
    } else {
      // Rejected
      const score = currentExpense.isEssential ? -5 : 2
      newExpenses.push({
        ...currentExpense,
        decision: 'rejected',
        score: score
      })
      setGameState(prev => ({
        ...prev,
        score: Math.max(0, prev.score + score)
      }))
    }

    setExpenses(newExpenses)
    
    if (gameState.currentRound < gameState.totalRounds) {
      setGameState(prev => ({
        ...prev,
        currentRound: prev.currentRound + 1
      }))
      setTimeLeft(10)
      setCurrentExpense(generateExpense())
    } else {
      endGame()
    }
  }

  const endGame = () => {
    const finalScore = gameState.score + Math.floor(gameState.budget / 10)
    
    setGameState(prev => ({
      ...prev,
      gameOver: true,
      isPlaying: false,
      score: finalScore
    }))

    // Save score to database
    saveScore(finalScore)
  }

  const saveScore = async (score) => {
    try {
      const { supabase } = await import('../../lib/supabase')
      
      await supabase
        .from('game_scores')
        .insert({
          user_id: user.id,
          game_name: 'budget-blitz',
          score: score,
          final_value: gameState.budget,
          years_played: 1,
          profit_loss: score
        })
    } catch (error) {
      console.error('Error saving game score:', error)
    }
  }

  useEffect(() => {
    let timer
    if (gameState.isPlaying && !gameState.gameOver && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && gameState.isPlaying) {
      // Time's up, auto-reject
      handleDecision('reject')
    }

    return () => clearTimeout(timer)
  }, [timeLeft, gameState.isPlaying, gameState.gameOver])

  if (!gameState.isPlaying && !gameState.gameOver) {
    return (
      <div className="budget-blitz-game">
        <div className="game-header">
          <Link to="/games" className="back-link">
            <span className="material-icons">arrow_back</span>
            Back to Games
          </Link>
          <div className="game-title-section">
            <div className="game-icon">
              <span className="material-icons">account_balance_wallet</span>
            </div>
            <h1>Budget Blitz</h1>
          </div>
        </div>

        <div className="game-intro">
          <h2>Welcome to Budget Blitz!</h2>
          <p>Test your budgeting skills in this fast-paced game. Make quick decisions about expenses and see how well you can manage your $1,000 budget!</p>
          
          <div className="game-instructions">
            <h3>How to Play:</h3>
            <ul>
              <li>Start with $1,000 budget</li>
              <li>Decide whether to accept or reject each expense</li>
              <li>Essential expenses (housing, food, etc.) give more points</li>
              <li>You have 10 seconds to make each decision</li>
              <li>Try to maximize your score while staying within budget</li>
            </ul>
          </div>

          <button className="btn-primary start-btn" onClick={startGame}>
            Start Game
          </button>
        </div>
      </div>
    )
  }

  if (gameState.gameOver) {
    const cameFromModule = location.state && location.state.fromModule === 'budgeting'
    return (
      <div className="budget-blitz-game">
        <div className="game-header">
          <Link to="/games" className="back-link">
            <span className="material-icons">arrow_back</span>
            Back to Games
          </Link>
          <div className="game-title-section">
            <div className="game-icon">
              <span className="material-icons">account_balance_wallet</span>
            </div>
            <h1>Budget Blitz</h1>
          </div>
        </div>

        <div className="game-over">
          <h2>Game Over!</h2>
          <div className="final-stats">
            <div className="stat">
              <span className="stat-label">Final Score</span>
              <span className="stat-value">{gameState.score}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Budget Remaining</span>
              <span className="stat-value">${gameState.budget}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Rounds Completed</span>
              <span className="stat-value">{gameState.currentRound}</span>
            </div>
          </div>

          <div className="game-actions">
            {cameFromModule ? (
              <button className="btn-primary" onClick={() => navigate('/modules/budgeting', { state: { startAt: 'post-quiz' } })}>
                Go to Post-Quiz
              </button>
            ) : (
              <button className="btn-primary" onClick={startGame}>
                Play Again
              </button>
            )}
            {cameFromModule ? (
              <Link to="/modules/budgeting" className="btn-secondary">Back to Module</Link>
            ) : (
              <Link to="/games" className="btn-secondary">Back to Games</Link>
            )}
          </div>
        </div>
      </div>
    )
  }

      return (
      <div className="budget-blitz-game">
        <div className="game-header">
          <Link to="/games" className="back-link">
            <span className="material-icons">arrow_back</span>
            Back to Games
          </Link>
          <div className="game-title-section">
            <div className="game-icon">
              <span className="material-icons">account_balance_wallet</span>
            </div>
            <h1>Budget Blitz</h1>
          </div>
        </div>

        <div className="game-content">
        <div className="game-info">
          <div className="round-info">
            Round {gameState.currentRound} of {gameState.totalRounds}
          </div>
          <div className="score-info">
            Score: {gameState.score}
          </div>
          <div className="budget-info">
            Budget: ${gameState.budget}
          </div>
        </div>

        <div className="timer-section">
          <div className="timer-bar">
            <div 
              className="timer-fill" 
              style={{ width: `${(timeLeft / 10) * 100}%` }}
            ></div>
          </div>
          <div className="time-left">{timeLeft}s</div>
        </div>

        {currentExpense && (
          <div className="expense-card">
            <div className="expense-header">
              <div 
                className="expense-icon"
                style={{ backgroundColor: currentExpense.color }}
              >
                <span className="material-icons">{currentExpense.icon}</span>
              </div>
              <div className="expense-info">
                <h3>{currentExpense.category}</h3>
                <p className="expense-amount">${currentExpense.amount}</p>
                <p className="expense-type">
                  {currentExpense.isEssential ? 'Essential Expense' : 'Discretionary Expense'}
                </p>
              </div>
            </div>
            
            <div className="expense-actions">
              <button 
                className="btn-accept"
                onClick={() => handleDecision('accept')}
                disabled={gameState.budget < currentExpense.amount}
              >
                Accept (${currentExpense.amount})
              </button>
              <button 
                className="btn-reject"
                onClick={() => handleDecision('reject')}
              >
                Reject
              </button>
            </div>
          </div>
        )}

        <div className="expense-history">
          <h3>Expense History</h3>
          <div className="history-list">
            {expenses.map((expense, index) => (
              <div key={expense.id} className={`history-item ${expense.decision}`}>
                <div className="history-icon" style={{ backgroundColor: expense.color }}>
                  <span className="material-icons">{expense.icon}</span>
                </div>
                <div className="history-details">
                  <span className="history-category">{expense.category}</span>
                  <span className="history-amount">${expense.amount}</span>
                  <span className="history-decision">{expense.decision}</span>
                  <span className="history-score">+{expense.score} pts</span>
                </div>
              </div>
            ))}
            {expenses.length === 0 && (
              <p className="no-expenses">No expenses yet. Start making decisions!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BudgetBlitzGame
