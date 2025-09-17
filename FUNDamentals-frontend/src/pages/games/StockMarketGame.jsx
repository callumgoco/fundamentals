import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import './StockMarketGame.css'

function StockMarketGame() {
  const { user } = useAuth()
  const [gameState, setGameState] = useState({
    isPlaying: false,
    currentYear: 1,
    totalYears: 10,
    portfolio: {
      cash: 10000,
      stocks: 0,
      stockPrice: 100
    },
    history: [],
    gameOver: false,
    finalScore: 0
  })

  const [currentStockPrice, setCurrentStockPrice] = useState(100)
  const [priceHistory, setPriceHistory] = useState([100])

  useEffect(() => {
    if (gameState.isPlaying && !gameState.gameOver) {
      const interval = setInterval(() => {
        // Simulate stock price changes
        const change = (Math.random() - 0.5) * 20 // -10 to +10
        const newPrice = Math.max(10, currentStockPrice + change)
        setCurrentStockPrice(newPrice)
        setPriceHistory(prev => [...prev, newPrice])
        
        // Update portfolio value
        setGameState(prev => ({
          ...prev,
          portfolio: {
            ...prev.portfolio,
            stockPrice: newPrice
          }
        }))
      }, 2000) // Update every 2 seconds

      return () => clearInterval(interval)
    }
  }, [gameState.isPlaying, gameState.gameOver, currentStockPrice])

  const startGame = () => {
    setGameState({
      isPlaying: true,
      currentYear: 1,
      totalYears: 10,
      portfolio: {
        cash: 10000,
        stocks: 0,
        stockPrice: 100
      },
      history: [],
      gameOver: false,
      finalScore: 0
    })
    setCurrentStockPrice(100)
    setPriceHistory([100])
  }

  const buyStocks = () => {
    if (gameState.portfolio.cash >= currentStockPrice) {
      const stocksToBuy = Math.floor(gameState.portfolio.cash / currentStockPrice)
      setGameState(prev => ({
        ...prev,
        portfolio: {
          ...prev.portfolio,
          cash: prev.portfolio.cash - (stocksToBuy * currentStockPrice),
          stocks: prev.portfolio.stocks + stocksToBuy
        },
        history: [...prev.history, {
          action: 'buy',
          price: currentStockPrice,
          amount: stocksToBuy,
          year: prev.currentYear
        }]
      }))
    }
  }

  const sellStocks = () => {
    if (gameState.portfolio.stocks > 0) {
      setGameState(prev => ({
        ...prev,
        portfolio: {
          ...prev.portfolio,
          cash: prev.portfolio.cash + (prev.portfolio.stocks * currentStockPrice),
          stocks: 0
        },
        history: [...prev.history, {
          action: 'sell',
          price: currentStockPrice,
          amount: prev.portfolio.stocks,
          year: prev.currentYear
        }]
      }))
    }
  }

  const nextYear = () => {
    if (gameState.currentYear < gameState.totalYears) {
      setGameState(prev => ({
        ...prev,
        currentYear: prev.currentYear + 1
      }))
    } else {
      endGame()
    }
  }

  const endGame = () => {
    const totalValue = gameState.portfolio.cash + (gameState.portfolio.stocks * currentStockPrice)
    const finalScore = Math.round(totalValue)
    
    setGameState(prev => ({
      ...prev,
      gameOver: true,
      finalScore,
      isPlaying: false
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
          game_name: 'stock-market',
          score: score,
          final_value: score,
          years_played: gameState.currentYear,
          profit_loss: score - 10000
        })
    } catch (error) {
      console.error('Error saving game score:', error)
    }
  }

  const getPortfolioValue = () => {
    return gameState.portfolio.cash + (gameState.portfolio.stocks * currentStockPrice)
  }

  const getPortfolioReturn = () => {
    const initialValue = 10000
    const currentValue = getPortfolioValue()
    return ((currentValue - initialValue) / initialValue) * 100
  }

  if (!gameState.isPlaying && !gameState.gameOver) {
    return (
      <div className="stock-market-game">
        <div className="game-header">
          <Link to="/games" className="back-link">
            <span className="material-icons">arrow_back</span>
            Back to Games
          </Link>
          <div className="game-title-section">
            <div className="game-icon">
              <span className="material-icons">trending_up</span>
            </div>
            <h1>Stock Market Simulator</h1>
          </div>
        </div>

        <div className="game-intro">
          <h2>Welcome to the Stock Market Simulator!</h2>
          <p>Experience the ups and downs of the stock market. Make investment decisions, manage your portfolio, and see how well you can grow your $10,000 starting capital over 10 years.</p>
          
          <div className="game-instructions">
            <h3>How to Play:</h3>
            <ul>
              <li>Start with $10,000 in cash</li>
              <li>Buy stocks when you think the price is low</li>
              <li>Sell stocks when you think the price is high</li>
              <li>Stock prices change every 2 seconds</li>
              <li>Try to maximize your portfolio value over 10 years</li>
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
    return (
      <div className="stock-market-game">
        <div className="game-header">
          <Link to="/games" className="back-link">
            <span className="material-icons">arrow_back</span>
            Back to Games
          </Link>
          <div className="game-title-section">
            <div className="game-icon">
              <span className="material-icons">trending_up</span>
            </div>
            <h1>Stock Market Simulator</h1>
          </div>
        </div>

        <div className="game-over">
          <h2>Game Over!</h2>
          <div className="final-stats">
            <div className="stat">
              <span className="stat-label">Final Portfolio Value</span>
              <span className="stat-value">${gameState.finalScore.toLocaleString()}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Total Return</span>
              <span className={`stat-value ${getPortfolioReturn() >= 0 ? 'positive' : 'negative'}`}>
                {getPortfolioReturn() >= 0 ? '+' : ''}{getPortfolioReturn().toFixed(1)}%
              </span>
            </div>
            <div className="stat">
              <span className="stat-label">Years Played</span>
              <span className="stat-value">{gameState.currentYear}</span>
            </div>
          </div>

          <div className="game-actions">
            <button className="btn-primary" onClick={startGame}>
              Play Again
            </button>
            <Link to="/games" className="btn-secondary">
              Back to Games
            </Link>
          </div>
        </div>
      </div>
    )
  }

      return (
      <div className="stock-market-game">
        <div className="game-header">
          <Link to="/games" className="back-link">
            <span className="material-icons">arrow_back</span>
            Back to Games
          </Link>
          <div className="game-title-section">
            <div className="game-icon">
              <span className="material-icons">trending_up</span>
            </div>
            <h1>Stock Market Simulator</h1>
          </div>
        </div>

        <div className="game-content">
        <div className="game-info">
          <div className="year-info">
            Year {gameState.currentYear} of {gameState.totalYears}
          </div>
          <div className="stock-price">
            Current Stock Price: <span className="price">${currentStockPrice.toFixed(2)}</span>
          </div>
        </div>

        <div className="portfolio-section">
          <h3>Your Portfolio</h3>
          <div className="portfolio-stats">
            <div className="portfolio-stat">
              <span className="stat-label">Cash</span>
              <span className="stat-value">${gameState.portfolio.cash.toFixed(2)}</span>
            </div>
            <div className="portfolio-stat">
              <span className="stat-label">Stocks</span>
              <span className="stat-value">{gameState.portfolio.stocks}</span>
            </div>
            <div className="portfolio-stat">
              <span className="stat-label">Total Value</span>
              <span className="stat-value">${getPortfolioValue().toFixed(2)}</span>
            </div>
            <div className="portfolio-stat">
              <span className="stat-label">Return</span>
              <span className={`stat-value ${getPortfolioReturn() >= 0 ? 'positive' : 'negative'}`}>
                {getPortfolioReturn() >= 0 ? '+' : ''}{getPortfolioReturn().toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        <div className="game-actions">
          <button 
            className="btn-primary" 
            onClick={buyStocks}
            disabled={gameState.portfolio.cash < currentStockPrice}
          >
            Buy Stocks
          </button>
          <button 
            className="btn-secondary" 
            onClick={sellStocks}
            disabled={gameState.portfolio.stocks === 0}
          >
            Sell All Stocks
          </button>
          <button className="btn-primary" onClick={nextYear}>
            Next Year
          </button>
        </div>

        <div className="price-chart">
          <h3>Stock Price History</h3>
          <div className="chart-container">
            {priceHistory.map((price, index) => (
              <div 
                key={index}
                className="price-bar"
                style={{ 
                  height: `${(price / 200) * 100}%`,
                  backgroundColor: index === priceHistory.length - 1 ? 'var(--primary)' : 'var(--accent)'
                }}
                title={`$${price.toFixed(2)}`}
              />
            ))}
          </div>
        </div>

        <div className="trade-history">
          <h3>Trade History</h3>
          <div className="history-list">
            {gameState.history.map((trade, index) => (
              <div key={index} className={`trade-item ${trade.action}`}>
                <span className="trade-action">{trade.action.toUpperCase()}</span>
                <span className="trade-amount">{trade.amount} stocks</span>
                <span className="trade-price">@${trade.price.toFixed(2)}</span>
                <span className="trade-year">Year {trade.year}</span>
              </div>
            ))}
            {gameState.history.length === 0 && (
              <p className="no-trades">No trades yet. Start buying and selling stocks!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StockMarketGame
