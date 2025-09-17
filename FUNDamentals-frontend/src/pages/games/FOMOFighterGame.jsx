import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './FOMOFighterGame.css'

function FOMOFighterGame() {
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [gameState, setGameState] = useState({
    isPlaying: false,
    currentRound: 1,
    totalRounds: 10,
    score: 0,
    savings: 1000,
    gameOver: false
  })

  const [currentTemptation, setCurrentTemptation] = useState(null)
  const [timeLeft, setTimeLeft] = useState(15)
  const [temptations, setTemptations] = useState([])

  const temptationTypes = [
    { 
      name: 'Social Media Sale', 
      description: 'Limited time 50% off on everything!',
      cost: 150,
      fomoLevel: 'high',
      color: '#f093fb',
      icon: 'shopping_bag'
    },
    { 
      name: 'Friend\'s Vacation', 
      description: 'Everyone is going to Hawaii this weekend!',
      cost: 800,
      fomoLevel: 'very-high',
      color: '#4facfe',
      icon: 'flight'
    },
    { 
      name: 'Trending Gadget', 
      description: 'The new iPhone everyone is talking about',
      cost: 1200,
      fomoLevel: 'medium',
      color: '#43e97b',
      icon: 'smartphone'
    },
    { 
      name: 'Restaurant Opening', 
      description: 'New trendy restaurant, everyone is going!',
      cost: 80,
      fomoLevel: 'low',
      color: '#ff9a9e',
      icon: 'restaurant'
    },
    { 
      name: 'Concert Tickets', 
      description: 'Your favorite band is in town this weekend!',
      cost: 200,
      fomoLevel: 'high',
      color: '#667eea',
      icon: 'music_note'
    }
  ]

  const generateTemptation = () => {
    const temptation = temptationTypes[Math.floor(Math.random() * temptationTypes.length)]
    const multiplier = Math.random() * 0.5 + 0.75 // 0.75x to 1.25x
    const adjustedCost = Math.floor(temptation.cost * multiplier)
    
    return {
      id: Date.now(),
      ...temptation,
      cost: adjustedCost,
      originalCost: temptation.cost
    }
  }

  const startGame = () => {
    setGameState({
      isPlaying: true,
      currentRound: 1,
      totalRounds: 10,
      score: 0,
      savings: 1000,
      gameOver: false
    })
    setTemptations([])
    setTimeLeft(15)
    setCurrentTemptation(generateTemptation())
  }

  const handleDecision = (decision) => {
    const newTemptations = [...temptations]
    let scoreChange = 0
    let savingsChange = 0
    
    if (decision === 'resist') {
      // Resisting FOMO gives points based on FOMO level
      const fomoMultiplier = {
        'low': 2,
        'medium': 5,
        'high': 10,
        'very-high': 15
      }
      scoreChange = fomoMultiplier[currentTemptation.fomoLevel]
      savingsChange = 0
    } else {
      // Giving in costs points and money
      scoreChange = -5
      savingsChange = -currentTemptation.cost
    }
    
    newTemptations.push({
      ...currentTemptation,
      decision: decision,
      score: scoreChange
    })
    
    setTemptations(newTemptations)
    setGameState(prev => ({
      ...prev,
      score: Math.max(0, prev.score + scoreChange),
      savings: Math.max(0, prev.savings + savingsChange)
    }))
    
    if (gameState.currentRound < gameState.totalRounds) {
      setGameState(prev => ({
        ...prev,
        currentRound: prev.currentRound + 1
      }))
      setTimeLeft(15)
      setCurrentTemptation(generateTemptation())
    } else {
      endGame()
    }
  }

  const endGame = () => {
    const finalScore = gameState.score + Math.floor(gameState.savings / 10)
    
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
          game_name: 'fomo-fighter',
          score: score,
          final_value: gameState.savings,
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
      // Time's up, auto-resist
      handleDecision('resist')
    }

    return () => clearTimeout(timer)
  }, [timeLeft, gameState.isPlaying, gameState.gameOver])

  const getFOMOColor = (level) => {
    const colors = {
      'low': '#10b981',
      'medium': '#f59e0b',
      'high': '#ef4444',
      'very-high': '#dc2626'
    }
    return colors[level] || '#6b7280'
  }

  if (!gameState.isPlaying && !gameState.gameOver) {
    return (
      <div className="fomo-fighter-game">
        <div className="game-header">
          <Link to="/games" className="back-link">
            <span className="material-icons">arrow_back</span>
            Back to Games
          </Link>
          <div className="game-title-section">
            <div className="game-icon">
              <span className="material-icons">psychology</span>
            </div>
            <h1>FOMO Fighter</h1>
          </div>
        </div>

        <div className="game-intro">
          <h2>Welcome to FOMO Fighter!</h2>
          <p>Learn to overcome the Fear of Missing Out and build your saving skills. Resist tempting offers and see how strong your financial willpower is!</p>
          
          <div className="game-instructions">
            <h3>How to Play:</h3>
            <ul>
              <li>Start with $1,000 in savings</li>
              <li>Resist tempting offers to earn points</li>
              <li>Higher FOMO levels give more points when resisted</li>
              <li>You have 15 seconds to make each decision</li>
              <li>Try to maximize your score while keeping your savings</li>
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
    const cameFromModule = location.state && location.state.fromModule === 'saving'
    return (
      <div className="fomo-fighter-game">
        <div className="game-header">
          <Link to="/games" className="back-link">
            <span className="material-icons">arrow_back</span>
            Back to Games
          </Link>
          <div className="game-title-section">
            <div className="game-icon">
              <span className="material-icons">psychology</span>
            </div>
            <h1>FOMO Fighter</h1>
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
              <span className="stat-label">Savings Remaining</span>
              <span className="stat-value">${gameState.savings}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Rounds Completed</span>
              <span className="stat-value">{gameState.currentRound}</span>
            </div>
          </div>

          <div className="game-actions">
            {cameFromModule ? (
              <button className="btn-primary" onClick={() => navigate('/modules/saving', { state: { startAt: 'post-quiz' } })}>
                Go to Post-Quiz
              </button>
            ) : (
              <button className="btn-primary" onClick={startGame}>Play Again</button>
            )}
            {cameFromModule ? (
              <Link to="/modules/saving" className="btn-secondary">Back to Module</Link>
            ) : (
              <Link to="/games" className="btn-secondary">Back to Games</Link>
            )}
          </div>
        </div>
      </div>
    )
  }

      return (
      <div className="fomo-fighter-game">
        <div className="game-header">
          <Link to="/games" className="back-link">
            <span className="material-icons">arrow_back</span>
            Back to Games
          </Link>
          <div className="game-title-section">
            <div className="game-icon">
              <span className="material-icons">psychology</span>
            </div>
            <h1>FOMO Fighter</h1>
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
          <div className="savings-info">
            Savings: ${gameState.savings}
          </div>
        </div>

        <div className="timer-section">
          <div className="timer-bar">
            <div 
              className="timer-fill" 
              style={{ width: `${(timeLeft / 15) * 100}%` }}
            ></div>
          </div>
          <div className="time-left">{timeLeft}s</div>
        </div>

        {currentTemptation && (
          <div className="temptation-card">
            <div className="temptation-header">
              <div 
                className="temptation-icon"
                style={{ backgroundColor: currentTemptation.color }}
              >
                <span className="material-icons">{currentTemptation.icon}</span>
              </div>
              <div className="temptation-info">
                <h3>{currentTemptation.name}</h3>
                <p className="temptation-description">{currentTemptation.description}</p>
                <p className="temptation-cost">Cost: ${currentTemptation.cost}</p>
                <div className="fomo-level">
                  <span 
                    className="fomo-indicator"
                    style={{ backgroundColor: getFOMOColor(currentTemptation.fomoLevel) }}
                  ></span>
                  <span className="fomo-text">
                    FOMO Level: {currentTemptation.fomoLevel.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="temptation-actions">
              <button 
                className="btn-resist"
                onClick={() => handleDecision('resist')}
              >
                Resist Temptation
              </button>
              <button 
                className="btn-give-in"
                onClick={() => handleDecision('give-in')}
                disabled={gameState.savings < currentTemptation.cost}
              >
                Give In (${currentTemptation.cost})
              </button>
            </div>
          </div>
        )}

        <div className="temptation-history">
          <h3>Decision History</h3>
          <div className="history-list">
            {temptations.map((temptation, index) => (
              <div key={temptation.id} className={`history-item ${temptation.decision}`}>
                <div className="history-icon" style={{ backgroundColor: temptation.color }}>
                  <span className="material-icons">{temptation.icon}</span>
                </div>
                <div className="history-details">
                  <span className="history-name">{temptation.name}</span>
                  <span className="history-cost">${temptation.cost}</span>
                  <span className="history-decision">{temptation.decision}</span>
                  <span className={`history-score ${temptation.score >= 0 ? 'positive' : 'negative'}`}>
                    {temptation.score >= 0 ? '+' : ''}{temptation.score} pts
                  </span>
                </div>
              </div>
            ))}
            {temptations.length === 0 && (
              <p className="no-temptations">No decisions yet. Start resisting FOMO!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FOMOFighterGame
