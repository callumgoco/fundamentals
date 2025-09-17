import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Onboarding.css';

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    goal: null,
    confidence: null,
    learn: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, completeOnboarding } = useAuth();

  const steps = [
    {
      title: "What's your financial goal?",
      options: [
        { text: "Budgeting Basics", icon: "account_balance_wallet", value: "Budgeting Basics" },
        { text: "Saving Hacks", icon: "savings", value: "Saving Hacks" },
        { text: "Investing", icon: "trending_up", value: "Investing" }
      ],
      type: "goal"
    },
    {
      title: "How confident are you with money?",
      options: [
        { text: "Just starting", value: 1 },
        { text: "Learning basics", value: 2 },
        { text: "Getting there", value: 3 },
        { text: "Pretty confident", value: 4 },
        { text: "Money master", value: 5 }
      ],
      type: "confidence"
    },
    {
      title: "How do you learn best?",
      options: [
        { text: "Visual learner", icon: "visibility", value: "visual" },
        { text: "Interactive exercises", icon: "sports_esports", value: "interactive" },
        { text: "Reading & research", icon: "menu_book", value: "reading" }
      ],
      type: "learn"
    }
  ];

  useEffect(() => {
    // GSAP animations
    const loadGSAP = async () => {
      try {
        const { gsap } = await import('gsap');
        
        gsap.from(".gsap-card", {
          duration: 1,
          y: 50,
          opacity: 0,
          ease: "power3.out"
        });
        
        gsap.from(".gsap-progress", {
          duration: 1,
          scaleX: 0,
          ease: "power3.out",
          delay: 0.5
        });
      } catch (error) {
        console.log('GSAP not available, using CSS animations');
      }
    };

    loadGSAP();
  }, []);

  const updateProgress = () => {
    const progress = ((currentStep + 1) / steps.length) * 100;
    return progress;
  };

  const selectOption = (option, type) => {
    setAnswers(prev => ({
      ...prev,
      [type]: option.value || option.text
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const finishOnboarding = async () => {
    if (!user) {
      setError('User not authenticated');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      console.log('Completing onboarding with data:', answers);

      // Use the AuthContext's completeOnboarding function
      const result = await completeOnboarding(answers);

      if (!result.success) {
        throw new Error(result.error || 'Failed to complete onboarding');
      }

      console.log('Onboarding completed successfully');

      // Small delay to ensure user state is updated
      setTimeout(() => {
        navigate('/dashboard');
      }, 100);
    } catch (error) {
      console.error('Error completing onboarding:', error);
      setError('Failed to complete onboarding. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const currentStepData = steps[currentStep];
  const progress = updateProgress();

  return (
    <div className="onboarding-container">
      <div className="onboarding-card gsap-card">
        <div className="progress-bar gsap-progress">
          <div 
            className="progress-bar-inner" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="step-content">
          <h2>{currentStepData.title}</h2>
          
          <div className="options-container">
                             {currentStepData.options.map((option, index) => (
                   <div
                     key={index}
                     className={`onboarding-option ${
                       answers[currentStepData.type] === (option.value || option.text) ? 'selected' : ''
                     }`}
                     onClick={() => selectOption(option, currentStepData.type)}
                   >
                     {option.icon && (
                       <span className="option-icon">
                         <span className="material-icons">{option.icon}</span>
                       </span>
                     )}
                     <span className="option-text">{option.text}</span>
                   </div>
                 ))}
          </div>
          
          <div className="btn-container">
            {currentStep > 0 && (
              <button className="back-btn" onClick={previousStep}>
                Back
              </button>
            )}
            
            {answers[currentStepData.type] && (
              <button
                className="next-btn"
                onClick={currentStep === steps.length - 1 ? finishOnboarding : nextStep}
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : currentStep === steps.length - 1 ? 'Finish' : 'Next'}
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="onboarding-logo">FUNDamentals</div>
      
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Onboarding;
