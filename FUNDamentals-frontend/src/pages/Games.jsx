import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import LottieAnimation from '../components/LottieAnimation'
import './Games.css'

function Games() {
  const { user } = useAuth()
  const [gamesData, setGamesData] = useState({
    stockMarket: { bestScore: 0, gamesPlayed: 0, rank: 'N/A' },
    budgetBlitz: { bestScore: 0, gamesPlayed: 0, rank: 'N/A' },
    fomoFighter: { bestScore: 0, gamesPlayed: 0, rank: 'N/A' }
  })
  const [leaderboards, setLeaderboards] = useState({
    stockMarket: [],
    budgetBlitz: [],
    fomoFighter: []
  })
  const [activeLeaderboard, setActiveLeaderboard] = useState('stockMarket')

  useEffect(() => {
    const fetchGamesData = async () => {
      try {
        const { supabase } = await import('../lib/supabase')
        
        // Get game scores for the current user
        const { data: gameScores } = await supabase
          .from('game_scores')
          .select('*')
          .eq('user_id', user?.id)

        // Get leaderboard data for all games
        const { data: stockMarketLeaderboard } = await supabase
          .from('game_scores')
          .select(`
            score,
            user_profiles!inner(username)
          `)
          .eq('game_name', 'stock-market')
          .order('score', { ascending: false })
          .limit(10)

        const { data: budgetBlitzLeaderboard } = await supabase
          .from('game_scores')
          .select(`
            score,
            user_profiles!inner(username)
          `)
          .eq('game_name', 'budget-blitz')
          .order('score', { ascending: false })
          .limit(10)

        const { data: fomoFighterLeaderboard } = await supabase
          .from('game_scores')
          .select(`
            score,
            user_profiles!inner(username)
          `)
          .eq('game_name', 'fomo-fighter')
          .order('score', { ascending: false })
          .limit(10)

        if (gameScores) {
          const stockMarketScores = gameScores.filter(g => g.game_name === 'stock-market')
          const budgetBlitzScores = gameScores.filter(g => g.game_name === 'budget-blitz')
          const fomoFighterScores = gameScores.filter(g => g.game_name === 'fomo-fighter')

          // Calculate user ranks
          const getUserRank = (userScores, leaderboard) => {
            if (userScores.length === 0) return 'N/A'
            const bestUserScore = Math.max(...userScores.map(s => s.score))
            const rank = leaderboard?.findIndex(entry => entry.score <= bestUserScore) + 1
            return rank || 'N/A'
          }

          setGamesData({
            stockMarket: {
              bestScore: stockMarketScores.length > 0 ? Math.max(...stockMarketScores.map(s => s.score)) : 0,
              gamesPlayed: stockMarketScores.length,
              rank: getUserRank(stockMarketScores, stockMarketLeaderboard)
            },
            budgetBlitz: {
              bestScore: budgetBlitzScores.length > 0 ? Math.max(...budgetBlitzScores.map(s => s.score)) : 0,
              gamesPlayed: budgetBlitzScores.length,
              rank: getUserRank(budgetBlitzScores, budgetBlitzLeaderboard)
            },
            fomoFighter: {
              bestScore: fomoFighterScores.length > 0 ? Math.max(...fomoFighterScores.map(s => s.score)) : 0,
              gamesPlayed: fomoFighterScores.length,
              rank: getUserRank(fomoFighterScores, fomoFighterLeaderboard)
            }
          })

          setLeaderboards({
            stockMarket: stockMarketLeaderboard || [],
            budgetBlitz: budgetBlitzLeaderboard || [],
            fomoFighter: fomoFighterLeaderboard || []
          })
        }
      } catch (error) {
        console.error('Error fetching games data:', error)
      }
    }

    if (user?.id) {
      fetchGamesData()
    }
  }, [user?.id])

  return (
    <div className="games">
      <div className="games-header">
        <div className="header-content">
          <div className="header-text">
            <h1 className="games-title">Mini-Games</h1>
            <p className="games-subtitle">Test your financial knowledge through fun and interactive games</p>
          </div>
          <div className="games-animation-container">
            <div className="lottie-animation-wrapper">
              <LottieAnimation
                src="https://lottie.host/01e87317-ead8-41a7-9eb6-2a18c53730e9/EaJd85cxHu.lottie"
                width={184}
                height={184}
                speed={1}
                autoplay={true}
                loop={true}
                fallbackIcon="sports_esports"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="games-grid">
        <div className="game-card" id="stock-market-game">
          <div className="game-header">
            <div className="game-icon stock-market">
              <span className="material-icons">trending_up</span>
            </div>
            <div className="game-status">
              {gamesData.stockMarket.gamesPlayed > 0 ? (
                <span className="status-played">
                  <i className="material-icons" style={{ fontSize: '1rem' }}>play_circle</i>
                  Played {gamesData.stockMarket.gamesPlayed} times
                </span>
              ) : (
                <span className="status-not-played">
                  <i className="material-icons" style={{ fontSize: '1rem' }}>play_circle_outline</i>
                  Not played yet
                </span>
              )}
            </div>
          </div>
          
          <h3 className="game-title">Stock Market Simulator</h3>
          
          <p className="game-description">Experience the ups and downs of the stock market. Make investment decisions, manage your portfolio, and learn about market dynamics in this realistic simulation.</p>
          
          <div className="game-stats">
            <div className="stat-item">
              <div className="stat-label">Best Score</div>
              <div className="stat-value">{gamesData.stockMarket.bestScore.toLocaleString()}</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Games Played</div>
              <div className="stat-value">{gamesData.stockMarket.gamesPlayed}</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Your Rank</div>
              <div className="stat-value">{gamesData.stockMarket.rank}</div>
            </div>
          </div>
          
          <div className="game-features">
            <div className="feature-item">
              <span className="material-icons">timeline</span>
              <span>Real-time market simulation</span>
            </div>
            <div className="feature-item">
              <span className="material-icons">account_balance</span>
              <span>Portfolio management</span>
            </div>
            <div className="feature-item">
              <span className="material-icons">analytics</span>
              <span>Performance tracking</span>
            </div>
          </div>
          
          <div className="game-actions">
            <Link to="/games/stock-market" className="game-action-btn primary">Play Now</Link>
            <Link to="/games/stock-market" className="game-action-btn secondary">View Leaderboard</Link>
          </div>
        </div>
        
        <div className="game-card" id="budget-blitz-game">
          <div className="game-header">
            <div className="game-icon budget-blitz">
              <span className="material-icons">account_balance_wallet</span>
            </div>
            <div className="game-status">
              {gamesData.budgetBlitz.gamesPlayed > 0 ? (
                <span className="status-played">
                  <i className="material-icons" style={{ fontSize: '1rem' }}>play_circle</i>
                  Played {gamesData.budgetBlitz.gamesPlayed} times
                </span>
              ) : (
                <span className="status-not-played">
                  <i className="material-icons" style={{ fontSize: '1rem' }}>play_circle_outline</i>
                  Not played yet
                </span>
              )}
            </div>
          </div>
          
          <h3 className="game-title">Budget Blitz</h3>
          
          <p className="game-description">Test your budgeting skills in this fast-paced game. Make quick financial decisions, categorize expenses, and see how well you can manage your money under pressure.</p>
          
          <div className="game-stats">
            <div className="stat-item">
              <div className="stat-label">Best Score</div>
              <div className="stat-value">{gamesData.budgetBlitz.bestScore}%</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Games Played</div>
              <div className="stat-value">{gamesData.budgetBlitz.gamesPlayed}</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Your Rank</div>
              <div className="stat-value">{gamesData.budgetBlitz.rank}</div>
            </div>
          </div>
          
          <div className="game-features">
            <div className="feature-item">
              <span className="material-icons">speed</span>
              <span>Fast-paced gameplay</span>
            </div>
            <div className="feature-item">
              <span className="material-icons">category</span>
              <span>Expense categorization</span>
            </div>
            <div className="feature-item">
              <span className="material-icons">timer</span>
              <span>Time management</span>
            </div>
          </div>
          
          <div className="game-actions">
            <Link to="/games/budget-blitz" className="game-action-btn primary">Play Now</Link>
            <Link to="/games/budget-blitz" className="game-action-btn secondary">View Leaderboard</Link>
          </div>
        </div>
        
        <div className="game-card" id="fomo-fighter-game">
          <div className="game-header">
            <div className="game-icon fomo-fighter">
              <span className="material-icons">psychology</span>
            </div>
            <div className="game-status">
              {gamesData.fomoFighter.gamesPlayed > 0 ? (
                <span className="status-played">
                  <i className="material-icons" style={{ fontSize: '1rem' }}>play_circle</i>
                  Played {gamesData.fomoFighter.gamesPlayed} times
                </span>
              ) : (
                <span className="status-not-played">
                  <i className="material-icons" style={{ fontSize: '1rem' }}>play_circle_outline</i>
                  Not played yet
                </span>
              )}
            </div>
          </div>
          
          <h3 className="game-title">FOMO Fighter</h3>
          
          <p className="game-description">Learn to overcome the Fear of Missing Out in this psychological game. Make smart saving decisions, resist impulsive spending, and build your financial resilience.</p>
          
          <div className="game-stats">
            <div className="stat-item">
              <div className="stat-label">Best Score</div>
              <div className="stat-value">{gamesData.fomoFighter.bestScore.toLocaleString()}</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Games Played</div>
              <div className="stat-value">{gamesData.fomoFighter.gamesPlayed}</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Your Rank</div>
              <div className="stat-value">{gamesData.fomoFighter.rank}</div>
            </div>
          </div>
          
          <div className="game-features">
            <div className="feature-item">
              <span className="material-icons">psychology</span>
              <span>Psychological challenges</span>
            </div>
            <div className="feature-item">
              <span className="material-icons">savings</span>
              <span>Smart saving strategies</span>
              </div>
            <div className="feature-item">
              <span className="material-icons">self_improvement</span>
              <span>Self-control training</span>
            </div>
          </div>
          
          <div className="game-actions">
            <Link to="/games/fomo-fighter" className="game-action-btn primary">Play Now</Link>
            <Link to="/games/fomo-fighter" className="game-action-btn secondary">View Leaderboard</Link>
          </div>
        </div>
      </div>

      <div className="leaderboard-section">
        <div className="section-header">
          <h2>Global Leaderboards</h2>
          <p>See how you rank against other players worldwide</p>
        </div>
        
        <div className="leaderboard-tabs">
          <button 
            className={`tab-btn ${activeLeaderboard === 'stockMarket' ? 'active' : ''}`}
            onClick={() => setActiveLeaderboard('stockMarket')}
          >
            Stock Market
          </button>
          <button 
            className={`tab-btn ${activeLeaderboard === 'budgetBlitz' ? 'active' : ''}`}
            onClick={() => setActiveLeaderboard('budgetBlitz')}
          >
            Budget Blitz
          </button>
          <button 
            className={`tab-btn ${activeLeaderboard === 'fomoFighter' ? 'active' : ''}`}
            onClick={() => setActiveLeaderboard('fomoFighter')}
          >
            FOMO Fighter
          </button>
        </div>
        
        <div className="leaderboard-content">
          {leaderboards[activeLeaderboard] && leaderboards[activeLeaderboard].length > 0 ? (
            <div className="leaderboard-list">
              {leaderboards[activeLeaderboard].map((entry, index) => (
                <div key={index} className={`leaderboard-entry ${index < 3 ? 'top-three' : ''}`}>
                  <div className="rank">
                    {index === 0 && <span className="material-icons">emoji_events</span>}
                    {index === 1 && <span className="material-icons">emoji_events</span>}
                    {index === 2 && <span className="material-icons">emoji_events</span>}
                    <span className="rank-number">{index + 1}</span>
                  </div>
                  <div className="player-info">
                    <span className="player-name">{entry.user_profiles?.username || 'Anonymous'}</span>
                  </div>
                  <div className="score">
                    {activeLeaderboard === 'stockMarket' || activeLeaderboard === 'fomoFighter' 
                      ? `$${entry.score.toLocaleString()}` 
                      : `${entry.score}%`
                    }
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="leaderboard-placeholder">
              <span className="material-icons">emoji_events</span>
              <h3>No Scores Yet</h3>
              <p>Be the first to play and set a high score!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Games
