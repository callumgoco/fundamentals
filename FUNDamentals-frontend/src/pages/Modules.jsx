import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import LottieAnimation from '../components/LottieAnimation'
import './Modules.css'

function Modules() {
  const { user } = useAuth()
  const [modulesCompletion, setModulesCompletion] = useState({
    budgeting: {
      completed: false,
      progress: 0,
      has_pre_quiz: false,
      has_game: false,
      has_post_quiz: false,
      pre_quiz_score: { score: 0, total: 100 },
      game_score: { score: 0, max_score: 12 },
      post_quiz_score: { score: 0, total: 100 }
    },
    saving: {
      completed: false,
      progress: 0,
      has_pre_quiz: false,
      has_game: false,
      has_post_quiz: false,
      pre_quiz_score: { score: 0, total: 100 },
      game_score: { score: 0, max_score: 10 },
      post_quiz_score: { score: 0, total: 100 }
    }
  })

  useEffect(() => {
    const fetchModulesData = async () => {
      try {
        const { supabase } = await import('../lib/supabase')
        
        // Get module progress
        const { data: moduleProgress } = await supabase
          .from('module_progress')
          .select('*')
          .eq('user_id', user?.id)
          .single()

        // Get quiz results
        const { data: quizResults } = await supabase
          .from('quiz_results')
          .select('*')
          .eq('user_id', user?.id)

        // Get game scores
        const { data: gameScores } = await supabase
          .from('game_scores')
          .select('*')
          .eq('user_id', user?.id)

        if (moduleProgress) {
          // Calculate budgeting module completion
          const budgetingProgress = moduleProgress.budgeting_progress || 0
          const budgetingPreQuiz = quizResults?.find(q => q.module === 'budgeting' && q.quiz_type === 'pre')
          const budgetingGame = gameScores?.find(g => g.game_name === 'budget-blitz')
          const budgetingPostQuiz = quizResults?.find(q => q.module === 'budgeting' && q.quiz_type === 'post')

          // Calculate saving module completion
          const savingProgress = moduleProgress.savings_progress || 0
          const savingPreQuiz = quizResults?.find(q => q.module === 'saving' && q.quiz_type === 'pre')
          const savingGame = gameScores?.find(g => g.game_name === 'fomo-fighter')
          const savingPostQuiz = quizResults?.find(q => q.module === 'saving' && q.quiz_type === 'post')

          setModulesCompletion({
            budgeting: {
              completed: budgetingProgress === 100,
              progress: budgetingProgress,
              has_pre_quiz: !!budgetingPreQuiz,
              has_game: !!budgetingGame,
              has_post_quiz: !!budgetingPostQuiz,
              pre_quiz_score: budgetingPreQuiz ? { score: budgetingPreQuiz.score, total: 100 } : { score: 0, total: 100 },
              game_score: budgetingGame ? { score: budgetingGame.score, max_score: 12 } : { score: 0, max_score: 12 },
              post_quiz_score: budgetingPostQuiz ? { score: budgetingPostQuiz.score, total: 100 } : { score: 0, total: 100 }
            },
            saving: {
              completed: savingProgress === 100,
              progress: savingProgress,
              has_pre_quiz: !!savingPreQuiz,
              has_game: !!savingGame,
              has_post_quiz: !!savingPostQuiz,
              pre_quiz_score: savingPreQuiz ? { score: savingPreQuiz.score, total: 100 } : { score: 0, total: 100 },
              game_score: savingGame ? { score: savingGame.score, max_score: 10 } : { score: 0, max_score: 10 },
              post_quiz_score: savingPostQuiz ? { score: savingPostQuiz.score, total: 100 } : { score: 0, total: 100 }
            }
          })
        }
      } catch (error) {
        console.error('Error fetching modules data:', error)
      }
    }

    if (user?.id) {
      fetchModulesData()
    }
  }, [user?.id])

  return (
    <div className="modules">
      <div className="modules-header">
        <div className="header-content">
          <div className="header-text">
            <h1 className="modules-title">Learning Modules</h1>
            <p className="modules-subtitle">Master financial literacy through interactive modules designed for your success</p>
          </div>
          <div className="modules-animation-container">
            <div className="lottie-animation-wrapper">
              <LottieAnimation
                src="https://lottie.host/15152c67-9198-4c03-86d4-95b900fbc388/Ni5Gylf8lg.lottie"
                width={184}
                height={184}
                speed={1}
                autoplay={true}
                loop={true}
                fallbackIcon="menu_book"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="module-grid">
        <div className="module-card" id="budgeting-module">
          <div className="module-header">
            <div className="module-icon budgeting">
              <span className="material-icons">account_balance_wallet</span>
            </div>
            <div className="module-status">
              {modulesCompletion.budgeting.completed ? (
                <span className="status-completed">
                  <i className="material-icons" style={{ fontSize: '1rem' }}>check</i>
                  Completed
                </span>
              ) : modulesCompletion.budgeting.progress > 0 ? (
                <span className="status-progress">
                  <i className="material-icons" style={{ fontSize: '1rem' }}>schedule</i>
                  In Progress
                </span>
              ) : (
                <span className="status-not-started">
                  <i className="material-icons" style={{ fontSize: '1rem' }}>error_outline</i>
                  To do list
                </span>
              )}
            </div>
          </div>
          
          <h3 className="module-title">Budgeting and Expense Tracking</h3>
          
          <p className="module-description">Learn to manage your money effectively by tracking your income and expenses. Understand the 50/30/20 rule and find the right budgeting tools.</p>
          
          <div className="module-progress">
            <div className="progress-label">
              <i className="material-icons">trending_up</i>
              Progress
            </div>
            
            <div className="progress-items">
              <div className={`progress-item ${modulesCompletion.budgeting.has_pre_quiz ? 'completed' : 'not-completed'}`} id="module-progress-tracker">
                <div className={`progress-item-name ${modulesCompletion.budgeting.has_pre_quiz ? 'completed' : 'not-completed'}`}>
                  <i className="material-icons">{modulesCompletion.budgeting.has_pre_quiz ? 'check_circle' : 'radio_button_unchecked'}</i>
                  Pre-Quiz
                </div>
                <div className="progress-item-score">
                  {modulesCompletion.budgeting.has_pre_quiz ? (
                    <div className="score-main">
                      {modulesCompletion.budgeting.pre_quiz_score.score}/{modulesCompletion.budgeting.pre_quiz_score.total}
                    </div>
                  ) : (
                    <div className="score-main" style={{ color: '#9ca3af' }}>-/{modulesCompletion.budgeting.pre_quiz_score.total}</div>
                  )}
                </div>
              </div>
              
              <div className={`progress-item ${modulesCompletion.budgeting.has_game ? 'completed' : 'not-completed'}`}>
                <div className={`progress-item-name ${modulesCompletion.budgeting.has_game ? 'completed' : 'not-completed'}`}>
                  <i className="material-icons">{modulesCompletion.budgeting.has_game ? 'check_circle' : 'radio_button_unchecked'}</i>
                  Mini-Game
                </div>
                <div className="progress-item-score">
                  {modulesCompletion.budgeting.has_game ? (
                    <div className="score-main">
                      {modulesCompletion.budgeting.game_score.score}/{modulesCompletion.budgeting.game_score.max_score}
                    </div>
                  ) : (
                    <div className="score-main" style={{ color: '#9ca3af' }}>--/{modulesCompletion.budgeting.game_score.max_score}</div>
                  )}
                </div>
              </div>
              
              <div className={`progress-item ${modulesCompletion.budgeting.has_post_quiz ? 'completed' : 'not-completed'}`}>
                <div className={`progress-item-name ${modulesCompletion.budgeting.has_post_quiz ? 'completed' : 'not-completed'}`}>
                  <i className="material-icons">{modulesCompletion.budgeting.has_post_quiz ? 'check_circle' : 'radio_button_unchecked'}</i>
                  Post-Quiz
                </div>
                <div className="progress-item-score">
                  {modulesCompletion.budgeting.has_post_quiz ? (
                    <div className="score-main">
                      {modulesCompletion.budgeting.post_quiz_score.score}/{modulesCompletion.budgeting.post_quiz_score.total}
                    </div>
                  ) : (
                    <div className="score-main" style={{ color: '#9ca3af' }}>-/{modulesCompletion.budgeting.post_quiz_score.total}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="module-actions">
            {modulesCompletion.budgeting.progress > 0 ? (
              <Link to="/modules/budgeting" className="module-action-btn primary">
                {modulesCompletion.budgeting.completed ? 'Review Module' : 'Continue Module'}
              </Link>
            ) : (
              <Link to="/modules/budgeting" className="module-action-btn primary">Start Module</Link>
            )}
            {(modulesCompletion.budgeting.has_pre_quiz || modulesCompletion.budgeting.has_post_quiz) && (
              <Link to="/modules/budgeting" state={{ startAt: 'review' }} className="module-action-btn secondary">Review Module</Link>
            )}
            <Link to="/games/budget-blitz" className="module-action-btn secondary push-right">Play Game</Link>
          </div>
        </div>
        
        <div className="module-card" id="saving-module">
          <div className="module-header">
            <div className="module-icon saving">
              <span className="material-icons">savings</span>
            </div>
            <div className="module-status">
              {modulesCompletion.saving.completed ? (
                <span className="status-completed">
                  <i className="material-icons" style={{ fontSize: '1rem' }}>check</i>
                  Completed
                </span>
              ) : modulesCompletion.saving.progress > 0 ? (
                <span className="status-progress">
                  <i className="material-icons" style={{ fontSize: '1rem' }}>schedule</i>
                  In Progress
                </span>
              ) : (
                <span className="status-not-started">
                  <i className="material-icons" style={{ fontSize: '1rem' }}>error_outline</i>
                  To do list
                </span>
              )}
            </div>
          </div>
          
          <h3 className="module-title">Smart Saving Strategies</h3>
          
          <p className="module-description">Build financial security through smart saving strategies and goal-setting techniques. Learn to overcome FOMO and make informed financial decisions.</p>
          
          <div className="module-progress">
            <div className="progress-label">
              <i className="material-icons">trending_up</i>
              Progress
            </div>
            
            <div className="progress-items">
              <div className={`progress-item ${modulesCompletion.saving.has_pre_quiz ? 'completed' : 'not-completed'}`}>
                <div className={`progress-item-name ${modulesCompletion.saving.has_pre_quiz ? 'completed' : 'not-completed'}`}>
                  <i className="material-icons">{modulesCompletion.saving.has_pre_quiz ? 'check_circle' : 'radio_button_unchecked'}</i>
                  Pre-Quiz
                </div>
                <div className="progress-item-score">
                  {modulesCompletion.saving.has_pre_quiz ? (
                    <div className="score-main">
                      {modulesCompletion.saving.pre_quiz_score.score}/{modulesCompletion.saving.pre_quiz_score.total}
                    </div>
                  ) : (
                    <div className="score-main" style={{ color: '#9ca3af' }}>-/{modulesCompletion.saving.pre_quiz_score.total}</div>
                  )}
                </div>
              </div>
              
              <div className={`progress-item ${modulesCompletion.saving.has_game ? 'completed' : 'not-completed'}`}>
                <div className={`progress-item-name ${modulesCompletion.saving.has_game ? 'completed' : 'not-completed'}`}>
                  <i className="material-icons">{modulesCompletion.saving.has_game ? 'check_circle' : 'radio_button_unchecked'}</i>
                  Mini-Game
                </div>
                <div className="progress-item-score">
                  {modulesCompletion.saving.has_game ? (
                    <div className="score-main">
                      {modulesCompletion.saving.game_score.score}/{modulesCompletion.saving.game_score.max_score}
                    </div>
                  ) : (
                    <div className="score-main" style={{ color: '#9ca3af' }}>--/{modulesCompletion.saving.game_score.max_score}</div>
                  )}
                </div>
              </div>
              
              <div className={`progress-item ${modulesCompletion.saving.has_post_quiz ? 'completed' : 'not-completed'}`}>
                <div className={`progress-item-name ${modulesCompletion.saving.has_post_quiz ? 'completed' : 'not-completed'}`}>
                  <i className="material-icons">{modulesCompletion.saving.has_post_quiz ? 'check_circle' : 'radio_button_unchecked'}</i>
                  Post-Quiz
                </div>
                <div className="progress-item-score">
                  {modulesCompletion.saving.has_post_quiz ? (
                    <div className="score-main">
                      {modulesCompletion.saving.post_quiz_score.score}/{modulesCompletion.saving.post_quiz_score.total}
                    </div>
                  ) : (
                    <div className="score-main" style={{ color: '#9ca3af' }}>-/{modulesCompletion.saving.post_quiz_score.total}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="module-actions">
            {modulesCompletion.saving.progress > 0 ? (
              <Link to="/modules/saving" className="module-action-btn primary">
                {modulesCompletion.saving.completed ? 'Review Module' : 'Continue Module'}
              </Link>
            ) : (
              <Link to="/modules/saving" className="module-action-btn primary">Start Module</Link>
            )}
            {(modulesCompletion.saving.has_pre_quiz || modulesCompletion.saving.has_post_quiz) && (
              <Link to="/modules/saving" state={{ startAt: 'review' }} className="module-action-btn secondary">Review Module</Link>
            )}
            <Link to="/games/fomo-fighter" className="module-action-btn secondary push-right">Play Game</Link>
          </div>
        </div>
        
        <div className="module-card coming-soon" id="investing-module">
          <div className="module-header">
            <div className="module-icon investing">
              <span className="material-icons">show_chart</span>
            </div>
            <div className="module-status">
              <span className="status-not-started">
                <i className="material-icons" style={{ fontSize: '1rem' }}>error_outline</i>
                Coming Soon
              </span>
            </div>
          </div>
          
          <h3 className="module-title">Basic Investing</h3>
          
          <p className="module-description">Learn investment fundamentals and how your money can grow over time. Understand different investment vehicles and risk management strategies.</p>
          
              <div className="module-progress">
            <div className="progress-label">
              <i className="material-icons">trending_up</i>
              Progress
            </div>
            
            <div className="progress-items">
              <div className="progress-item not-completed">
                <div className="progress-item-name not-completed">
                  <i className="material-icons">radio_button_unchecked</i>
                  Pre-Quiz
                </div>
                <div className="progress-item-score">
                  <div className="score-main" style={{ color: '#9ca3af' }}>-/5</div>
                </div>
              </div>
              
              <div className="progress-item not-completed">
                <div className="progress-item-name not-completed">
                  <i className="material-icons">radio_button_unchecked</i>
                  Mini-Game
                </div>
                <div className="progress-item-score">
                  <div className="score-main" style={{ color: '#9ca3af' }}>--/10</div>
                </div>
              </div>
              
              <div className="progress-item not-completed">
                <div className="progress-item-name not-completed">
                  <i className="material-icons">radio_button_unchecked</i>
                  Post-Quiz
                </div>
                <div className="progress-item-score">
                  <div className="score-main" style={{ color: '#9ca3af' }}>-/5</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="module-actions">
            <button className="module-action-btn primary" disabled>Coming Soon</button>
            <button className="module-action-btn secondary" disabled>Game Unavailable</button>
          </div>
        </div>

        {/* Placeholder: Credit Basics */}
        <div className="module-card coming-soon" id="credit-basics-module">
          <div className="module-header">
            <div className="module-icon">
              <span className="material-icons">credit_card</span>
            </div>
            <div className="module-status">
              <span className="status-not-started">
                <i className="material-icons" style={{ fontSize: '1rem' }}>error_outline</i>
                Coming Soon
              </span>
            </div>
          </div>
          <h3 className="module-title">Credit Basics</h3>
          <p className="module-description">Understand how credit works, credit scores, and how to build and maintain healthy credit.</p>
          <div className="module-progress">
            <div className="progress-label">
              <i className="material-icons">trending_up</i>
              Progress
            </div>
            <div className="progress-items">
              <div className="progress-item not-completed">
                <div className="progress-item-name not-completed">
                  <i className="material-icons">radio_button_unchecked</i>
                  Pre-Quiz
                </div>
                <div className="progress-item-score">
                  <div className="score-main" style={{ color: '#9ca3af' }}>-/5</div>
                </div>
              </div>
              <div className="progress-item not-completed">
                <div className="progress-item-name not-completed">
                  <i className="material-icons">radio_button_unchecked</i>
                  Mini-Game
                </div>
                <div className="progress-item-score">
                  <div className="score-main" style={{ color: '#9ca3af' }}>--/10</div>
                </div>
              </div>
              <div className="progress-item not-completed">
                <div className="progress-item-name not-completed">
                  <i className="material-icons">radio_button_unchecked</i>
                  Post-Quiz
                </div>
                <div className="progress-item-score">
                  <div className="score-main" style={{ color: '#9ca3af' }}>-/5</div>
                </div>
              </div>
            </div>
          </div>
          <div className="module-actions">
            <button className="module-action-btn primary" disabled>Coming Soon</button>
            <button className="module-action-btn secondary" disabled>Game Unavailable</button>
          </div>
        </div>

        {/* Placeholder: Taxes 101 */}
        <div className="module-card coming-soon" id="taxes-module">
          <div className="module-header">
            <div className="module-icon">
              <span className="material-icons">receipt_long</span>
            </div>
            <div className="module-status">
              <span className="status-not-started">
                <i className="material-icons" style={{ fontSize: '1rem' }}>error_outline</i>
                Coming Soon
              </span>
            </div>
          </div>
          <h3 className="module-title">Taxes 101</h3>
          <p className="module-description">Learn the basics of taxes, withholding, and how to file responsibly with confidence.</p>
          <div className="module-progress">
            <div className="progress-label">
              <i className="material-icons">trending_up</i>
              Progress
            </div>
            <div className="progress-items">
              <div className="progress-item not-completed">
                <div className="progress-item-name not-completed">
                  <i className="material-icons">radio_button_unchecked</i>
                  Pre-Quiz
                </div>
                <div className="progress-item-score">
                  <div className="score-main" style={{ color: '#9ca3af' }}>-/5</div>
                </div>
              </div>
              <div className="progress-item not-completed">
                <div className="progress-item-name not-completed">
                  <i className="material-icons">radio_button_unchecked</i>
                  Mini-Game
                </div>
                <div className="progress-item-score">
                  <div className="score-main" style={{ color: '#9ca3af' }}>--/10</div>
                </div>
              </div>
              <div className="progress-item not-completed">
                <div className="progress-item-name not-completed">
                  <i className="material-icons">radio_button_unchecked</i>
                  Post-Quiz
                </div>
                <div className="progress-item-score">
                  <div className="score-main" style={{ color: '#9ca3af' }}>-/5</div>
                </div>
              </div>
            </div>
          </div>
          <div className="module-actions">
            <button className="module-action-btn primary" disabled>Coming Soon</button>
            <button className="module-action-btn secondary" disabled>Game Unavailable</button>
          </div>
        </div>

        {/* Placeholder: Insurance & Protection */}
        <div className="module-card coming-soon" id="insurance-module">
          <div className="module-header">
            <div className="module-icon">
              <span className="material-icons">health_and_safety</span>
            </div>
            <div className="module-status">
              <span className="status-not-started">
                <i className="material-icons" style={{ fontSize: '1rem' }}>error_outline</i>
                Coming Soon
              </span>
            </div>
          </div>
          <h3 className="module-title">Insurance & Protection</h3>
          <p className="module-description">Explore different types of insurance and how to protect yourself from financial risk.</p>
          <div className="module-progress">
            <div className="progress-label">
              <i className="material-icons">trending_up</i>
              Progress
            </div>
            <div className="progress-items">
              <div className="progress-item not-completed">
                <div className="progress-item-name not-completed">
                  <i className="material-icons">radio_button_unchecked</i>
                  Pre-Quiz
                </div>
                <div className="progress-item-score">
                  <div className="score-main" style={{ color: '#9ca3af' }}>-/5</div>
                </div>
              </div>
              <div className="progress-item not-completed">
                <div className="progress-item-name not-completed">
                  <i className="material-icons">radio_button_unchecked</i>
                  Mini-Game
                </div>
                <div className="progress-item-score">
                  <div className="score-main" style={{ color: '#9ca3af' }}>--/10</div>
                </div>
              </div>
              <div className="progress-item not-completed">
                <div className="progress-item-name not-completed">
                  <i className="material-icons">radio_button_unchecked</i>
                  Post-Quiz
                </div>
                <div className="progress-item-score">
                  <div className="score-main" style={{ color: '#9ca3af' }}>-/5</div>
                </div>
              </div>
            </div>
          </div>
          <div className="module-actions">
            <button className="module-action-btn primary" disabled>Coming Soon</button>
            <button className="module-action-btn secondary" disabled>Game Unavailable</button>
          </div>
        </div>

        {/* Placeholder: Debt Management */}
        <div className="module-card coming-soon" id="debt-management-module">
          <div className="module-header">
            <div className="module-icon">
              <span className="material-icons">account_balance</span>
            </div>
            <div className="module-status">
              <span className="status-not-started">
                <i className="material-icons" style={{ fontSize: '1rem' }}>error_outline</i>
                Coming Soon
              </span>
            </div>
          </div>
          <h3 className="module-title">Debt Management</h3>
          <p className="module-description">Strategies for paying off debt efficiently and avoiding common pitfalls.</p>
          <div className="module-progress">
            <div className="progress-label">
              <i className="material-icons">trending_up</i>
              Progress
            </div>
            <div className="progress-items">
              <div className="progress-item not-completed">
                <div className="progress-item-name not-completed">
                  <i className="material-icons">radio_button_unchecked</i>
                  Pre-Quiz
                </div>
                <div className="progress-item-score">
                  <div className="score-main" style={{ color: '#9ca3af' }}>-/5</div>
                </div>
              </div>
              <div className="progress-item not-completed">
                <div className="progress-item-name not-completed">
                  <i className="material-icons">radio_button_unchecked</i>
                  Mini-Game
                </div>
                <div className="progress-item-score">
                  <div className="score-main" style={{ color: '#9ca3af' }}>--/10</div>
                </div>
              </div>
              <div className="progress-item not-completed">
                <div className="progress-item-name not-completed">
                  <i className="material-icons">radio_button_unchecked</i>
                  Post-Quiz
                </div>
                <div className="progress-item-score">
                  <div className="score-main" style={{ color: '#9ca3af' }}>-/5</div>
                </div>
              </div>
            </div>
          </div>
          <div className="module-actions">
            <button className="module-action-btn primary" disabled>Coming Soon</button>
            <button className="module-action-btn secondary" disabled>Game Unavailable</button>
          </div>
        </div>

        {/* Placeholder: Retirement Planning */}
        <div className="module-card coming-soon" id="retirement-module">
          <div className="module-header">
            <div className="module-icon">
              <span className="material-icons">elderly</span>
            </div>
            <div className="module-status">
              <span className="status-not-started">
                <i className="material-icons" style={{ fontSize: '1rem' }}>error_outline</i>
                Coming Soon
              </span>
            </div>
          </div>
          <h3 className="module-title">Retirement Planning</h3>
          <p className="module-description">Plan for long-term goals, understand retirement accounts, and the power of compounding.</p>
          <div className="module-progress">
            <div className="progress-label">
              <i className="material-icons">trending_up</i>
              Progress
            </div>
            <div className="progress-items">
              <div className="progress-item not-completed">
                <div className="progress-item-name not-completed">
                  <i className="material-icons">radio_button_unchecked</i>
                  Pre-Quiz
                </div>
                <div className="progress-item-score">
                  <div className="score-main" style={{ color: '#9ca3af' }}>-/5</div>
                </div>
              </div>
              <div className="progress-item not-completed">
                <div className="progress-item-name not-completed">
                  <i className="material-icons">radio_button_unchecked</i>
                  Mini-Game
                </div>
                <div className="progress-item-score">
                  <div className="score-main" style={{ color: '#9ca3af' }}>--/10</div>
                </div>
              </div>
              <div className="progress-item not-completed">
                <div className="progress-item-name not-completed">
                  <i className="material-icons">radio_button_unchecked</i>
                  Post-Quiz
                </div>
                <div className="progress-item-score">
                  <div className="score-main" style={{ color: '#9ca3af' }}>-/5</div>
                </div>
              </div>
            </div>
          </div>
          <div className="module-actions">
            <button className="module-action-btn primary" disabled>Coming Soon</button>
            <button className="module-action-btn secondary" disabled>Game Unavailable</button>
          </div>
        </div>

        {/* Placeholder: Understanding Loans */}
        <div className="module-card coming-soon" id="loans-module">
          <div className="module-header">
            <div className="module-icon">
              <span className="material-icons">request_quote</span>
            </div>
            <div className="module-status">
              <span className="status-not-started">
                <i className="material-icons" style={{ fontSize: '1rem' }}>error_outline</i>
                Coming Soon
              </span>
            </div>
          </div>
          <h3 className="module-title">Understanding Loans</h3>
          <p className="module-description">Learn about loan types, interest, repayment terms, and how to borrow wisely.</p>
          <div className="module-progress">
            <div className="progress-label">
              <i className="material-icons">trending_up</i>
              Progress
            </div>
            <div className="progress-items">
              <div className="progress-item not-completed">
                <div className="progress-item-name not-completed">
                  <i className="material-icons">radio_button_unchecked</i>
                  Pre-Quiz
                </div>
                <div className="progress-item-score">
                  <div className="score-main" style={{ color: '#9ca3af' }}>-/5</div>
                </div>
              </div>
              <div className="progress-item not-completed">
                <div className="progress-item-name not-completed">
                  <i className="material-icons">radio_button_unchecked</i>
                  Mini-Game
                </div>
                <div className="progress-item-score">
                  <div className="score-main" style={{ color: '#9ca3af' }}>--/10</div>
                </div>
              </div>
              <div className="progress-item not-completed">
                <div className="progress-item-name not-completed">
                  <i className="material-icons">radio_button_unchecked</i>
                  Post-Quiz
                </div>
                <div className="progress-item-score">
                  <div className="score-main" style={{ color: '#9ca3af' }}>-/5</div>
                </div>
              </div>
            </div>
          </div>
          <div className="module-actions">
            <button className="module-action-btn primary" disabled>Coming Soon</button>
            <button className="module-action-btn secondary" disabled>Game Unavailable</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modules
