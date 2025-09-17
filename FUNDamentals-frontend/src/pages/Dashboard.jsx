import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import LottieAnimation from '../components/LottieAnimation';
import './Dashboard.css';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalGames: 0,
    totalQuizzes: 0,
    completedModules: 0,
    totalModules: 5,
    moduleCompletionPercentage: 0,
    currentStreak: 0,
    modulesData: {
      budgeting: { name: 'Budgeting and Expense Tracking', completed: false, progress: 0 },
      saving: { name: 'Smart Saving Strategies', completed: false, progress: 0 },
      investing: { name: 'Basic Investing', completed: false, progress: 0 }
    }
  });
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);
  const fetchingDataRef = useRef(false);

  const { user } = useAuth();

  useEffect(() => {
    if (user && !dataFetched && !fetchingDataRef.current) {
      fetchDashboardData();
    } else if (user && dataFetched) {
      // If we already have data and user is the same, don't refetch
      setLoading(false);
    }
  }, [user, dataFetched]);

  const fetchDashboardData = async () => {
    if (fetchingDataRef.current) {
      return
    }
    
    try {
      fetchingDataRef.current = true
      
      // Fetch user profile and progress data
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;

      // Fetch module progress
      const { data: moduleProgress, error: moduleError } = await supabase
        .from('module_progress')
        .select('*')
        .eq('user_id', user.id);

      if (moduleError) throw moduleError;

      // Fetch game scores
      const { data: gameScores, error: gameError } = await supabase
        .from('game_scores')
        .select('*')
        .eq('user_id', user.id);

      if (gameError) throw gameError;

      // Fetch quiz results
      const { data: quizResults, error: quizError } = await supabase
        .from('quiz_results')
        .select('*')
        .eq('user_id', user.id);

      if (quizError) throw quizError;

      // Calculate dashboard data
      const totalGames = gameScores?.length || 0;
      const totalQuizzes = quizResults?.length || 0;
      
      // Calculate module completion
      const modulesData = {
        budgeting: { name: 'Budgeting and Expense Tracking', completed: false, progress: 0 },
        saving: { name: 'Smart Saving Strategies', completed: false, progress: 0 },
        investing: { name: 'Basic Investing', completed: false, progress: 0 }
      };

      if (moduleProgress && moduleProgress.length > 0) {
        const progress = moduleProgress[0]; // There should only be one row per user
        modulesData.budgeting.progress = progress.budgeting_progress || 0;
        modulesData.budgeting.completed = modulesData.budgeting.progress >= 100;
        
        modulesData.saving.progress = progress.savings_progress || 0;
        modulesData.saving.completed = modulesData.saving.progress >= 100;
        
        modulesData.investing.progress = progress.investing_progress || 0;
        modulesData.investing.completed = modulesData.investing.progress >= 100;
      }

      const completedModules = Object.values(modulesData).filter(m => m.completed).length;
      const moduleCompletionPercentage = Math.round((completedModules / 3) * 100);

      setDashboardData({
        totalGames,
        totalQuizzes,
        completedModules,
        totalModules: 3,
        moduleCompletionPercentage,
        currentStreak: profileData?.current_streak || 0,
        modulesData
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
      setDataFetched(true);
      fetchingDataRef.current = false;
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-text" id="dashboard-welcome">
            <h1 className="dashboard-title">Hi {user?.user_metadata?.full_name || 'User'} 👋 Ready to dive in?</h1>
            <p className="dashboard-subtitle">Your financial journey continues here.</p>
          </div>

          <div className="dashboard-animation-container">
            <div className="lottie-animation-wrapper">
              <LottieAnimation
                src="https://lottie.host/da17d58a-8673-42a5-ae4a-72f46b6812be/H0MnbK50JS.lottie"
                width={184}
                height={184}
                speed={1}
                autoplay={true}
                loop={true}
                fallbackIcon="trending_up"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="progress-overview-section">
        <div className="combined-progress-card">
          <div className="progress-content">
            <div className="stats-section">
              <div className="section-header">
                <h2>Overall Progress</h2>
              </div>
              <p className="progress-description">You're making excellent progress on your financial education journey!</p>
              
              <div className="stats-grid">
                <div className="stat-card games-stat">
                  <div className="stat-icon">
                    <span className="material-icons">sports_esports</span>
                  </div>
                  <div className="stat-content">
                    <div className="stat-number">{dashboardData.totalGames}</div>
                    <div className="stat-label">Games Played</div>
                  </div>
                </div>
                
                <div className="stat-card score-stat">
                  <div className="stat-icon">
                    <span className="material-icons">emoji_events</span>
                  </div>
                  <div className="stat-content">
                    <div className="stat-number">{dashboardData.totalQuizzes}/12</div>
                    <div className="stat-label">Best Score</div>
                  </div>
                </div>
                
                <div className="stat-card modules-stat">
                  <div className="stat-icon">
                    <span className="material-icons">import_contacts</span>
                  </div>
                  <div className="stat-content">
                    <div className="stat-number">{dashboardData.completedModules}/{dashboardData.totalModules}</div>
                    <div className="stat-label">Modules Completed</div>
                  </div>
                </div>
                
                <div className="stat-card quiz-stat">
                  <div className="stat-icon">
                    <span className="material-icons">psychology</span>
                  </div>
                  <div className="stat-content">
                    <div className="stat-number">{dashboardData.totalQuizzes}</div>
                    <div className="stat-label">Quiz Attempts</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="circular-progress">
              <div className="circular-progress-inner">
                <div className="circular-progress-circle" style={{ '--percentage': dashboardData.moduleCompletionPercentage }}>
                  <div className="circular-progress-fill"></div>
                  <div className="circular-progress-text">
                    <span className="percentage">{dashboardData.moduleCompletionPercentage}%</span>
                    <span className="label">Complete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modules-overview-section">
        <div className="section-header">
          <h2>Learning Modules</h2>
          <Link to="/modules" className="see-all-link">View all modules</Link>
        </div>
        
        <div className="modules-grid">
          <div className={`module-card ${dashboardData.modulesData.budgeting.completed ? 'completed' : ''}`}>
            <div className="module-header">
              <div className="module-icon budgeting">
                <span className="material-icons">account_balance_wallet</span>
              </div>
              <div className="module-status">
                {dashboardData.modulesData.budgeting.completed ? (
                  <span className="status-completed">
                    <i className="material-icons" style={{ fontSize: '1rem' }}>check</i>
                    Completed
                  </span>
                ) : dashboardData.modulesData.budgeting.progress > 0 ? (
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
            <h3>{dashboardData.modulesData.budgeting.name}</h3>
            <p>Learn to manage your money effectively by tracking income and expenses.</p>
            <div className="module-action">
              {dashboardData.modulesData.budgeting.completed ? (
                <Link to="/modules/budgeting" className="module-link">Review Module</Link>
              ) : dashboardData.modulesData.budgeting.progress > 0 ? (
                <Link to="/modules/budgeting" className="module-link">Continue Module</Link>
              ) : (
                <Link to="/modules/budgeting" className="module-link">Start Module</Link>
              )}
            </div>
          </div>
          
          <div className={`module-card ${dashboardData.modulesData.saving.completed ? 'completed' : ''}`}>
            <div className="module-header">
              <div className="module-icon saving">
                <span className="material-icons">savings</span>
              </div>
              <div className="module-status">
                {dashboardData.modulesData.saving.completed ? (
                  <span className="status-completed">
                    <i className="material-icons" style={{ fontSize: '1rem' }}>check</i>
                    Completed
                  </span>
                ) : dashboardData.modulesData.saving.progress > 0 ? (
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
            <h3>{dashboardData.modulesData.saving.name}</h3>
            <p>Build financial security through smart saving strategies and goal-setting techniques.</p>
            <div className="module-action">
              {dashboardData.modulesData.saving.completed ? (
                <Link to="/modules/saving" className="module-link">Review Module</Link>
              ) : dashboardData.modulesData.saving.progress > 0 ? (
                <Link to="/modules/saving" className="module-link">Continue Module</Link>
              ) : (
                <Link to="/modules/saving" className="module-link">Start Module</Link>
              )}
            </div>
          </div>
          
          <div className="module-card coming-soon">
            <div className="module-header">
              <div className="module-icon investing">
                <span className="material-icons">trending_up</span>
              </div>
              <div className="module-status">
                <span className="status-not-started">
                  <i className="material-icons" style={{ fontSize: '1rem' }}>error_outline</i>
                  To do list
                </span>
              </div>
            </div>
            <h3>Basic Investing</h3>
            <p>Learn investment fundamentals and how your money can grow over time.</p>
            <div className="module-action">
              <button className="module-link" disabled>Coming Soon</button>
            </div>
          </div>
        </div>
      </div>

      <div className="achievements-section" id="progress-section">
        <div className="section-header">
          <h2>Your Achievements</h2>
        </div>
        
        <div className="achievements-grid">
          <div className="achievement-card">
            <div className="achievement-icon">
              <div className="badge-placeholder">
                <span className="material-icons">military_tech</span>
              </div>
            </div>
            <h3>Badges</h3>
            <p>Earn badges for learning and completing modules.</p>
            <div className="achievement-stats">
              <span className="stat-muted">0 earned</span>
            </div>
          </div>
          
          <div className="achievement-card">
            <div className="achievement-icon">
              <div className="streak-placeholder">
                <span className="material-icons">local_fire_department</span>
              </div>
            </div>
            <h3>Streaks</h3>
            <p>Keep your learning streak alive for extra rewards.</p>
            <div className="achievement-stats">
              <span className="stat-highlight">{dashboardData.currentStreak} days</span>
            </div>
          </div>
          
          <div className="achievement-card">
            <div className="achievement-icon">
              <div className="challenge-placeholder">
                <span className="material-icons">emoji_events</span>
              </div>
            </div>
            <h3>Challenges</h3>
            <p>Complete challenges to test your financial skills.</p>
            <div className="achievement-stats">
              <span className="stat-highlight">{dashboardData.totalGames} completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
