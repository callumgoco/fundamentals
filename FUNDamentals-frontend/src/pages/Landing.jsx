import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div className="nav-container">
          <div className="nav-logo">
            <span>FUNDamentals</span>
          </div>
          <div className="nav-actions">
            <Link to="/login" className="btn-login">Login</Link>
            <Link to="/register" className="btn-signup">Sign Up</Link>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-background">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
          >
            <source src="/landing_bg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Stop Being Broke <span className="highlight">Forever</span>
            </h1>
            <p className="hero-subtitle">
              Learn money skills that actually matter through fun games, 
              real scenarios, and interactive lessons. No boring lectures - 
              just practical stuff you'll actually use.
            </p>
            <div className="hero-cta">
              <Link to="/register" className="btn-primary">Start Learning Free</Link>
              <a href="#about" className="btn-secondary">See How It Works</a>
            </div>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">People Like You</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10+</div>
              <div className="stat-label">Real Money Skills</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">95%</div>
              <div className="stat-label">Actually Use It</div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <div className="container">
          <div className="section-header">
            <h2>Why FUNDamentals Actually Works</h2>
            <p>We get it - money stuff is confusing. Here's why our approach is different</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <span className="material-icons">school</span>
              </div>
              <h3>Learn By Doing</h3>
              <p>No more boring lectures. Practice with real scenarios, make mistakes safely, and actually remember what you learn.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <span className="material-icons">games</span>
              </div>
              <h3>Make It Fun</h3>
              <p>Turn money management into a game. Compete, earn points, and actually enjoy learning about finances for once.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <span className="material-icons">psychology</span>
              </div>
              <h3>Real Life Skills</h3>
              <p>Learn stuff you'll actually use - budgeting, saving, investing basics, and how to not get ripped off.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Stop Being Broke?</h2>
            <p>Join hundreds of people your age who are finally figuring out this money stuff.</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn-primary">Start Learning Free</Link>
              <Link to="/login" className="btn-secondary">Already signed up? Login</Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <span>FUNDamentals</span>
            </div>
            <p>&copy; 2025 FUNDamentals</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
