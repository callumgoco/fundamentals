import React, { useState } from 'react'
import LottieAnimation from '../components/LottieAnimation'
import CalculatorCard from '../components/calculators/CalculatorCard'
import InvestmentCalculator from '../components/calculators/InvestmentCalculator'
import BudgetCalculator from '../components/calculators/BudgetCalculator'
import SavingsCalculator from '../components/calculators/SavingsCalculator'
import './Simulations.css'

function Simulations() {
  const [activeModal, setActiveModal] = useState(null)

  const calculators = [
    {
      id: 'investment',
      icon: 'trending_up',
      title: 'Investment Growth',
      subtitle: 'See your money grow over time',
      features: [
        'Multiple market scenarios',
        'Long-term growth projection',
        'Risk level comparison'
      ],
      onOpen: () => setActiveModal('investment')
    },
    {
      id: 'budget',
      icon: 'pie_chart',
      title: 'Budget Calculator',
      subtitle: 'Track your income and expenses to see your savings',
      features: [
        'Comprehensive expense tracking',
        'Monthly & yearly planning',
        'Visual budget breakdown'
      ],
      onOpen: () => setActiveModal('budget')
    },
    {
      id: 'savings',
      icon: 'account_balance',
      title: 'Savings Goal Calculator',
      subtitle: 'Find out when you\'ll reach your target',
      features: [
        'Goal timeline calculator',
        'Flexible saving frequency',
        'Interest-earning accounts'
      ],
      onOpen: () => setActiveModal('savings')
    },
    {
      id: 'mortgage',
      icon: 'home',
      title: 'How Much Can I Borrow?',
      subtitle: 'Figure out your home buying budget',
      features: [
        'Income-based calculation',
        'Down payment planning',
        'Monthly payment breakdown'
      ],
      disabled: true,
      comingSoon: true
    },
    {
      id: 'gic',
      icon: 'savings',
      title: 'GIC Interest Calculator',
      subtitle: 'See how much your guaranteed investment will earn',
      features: [
        'Compare different terms',
        'Interest rate comparison',
        'Guaranteed returns'
      ],
      disabled: true,
      comingSoon: true
    },
    {
      id: 'budget-generator',
      icon: 'account_balance_wallet',
      title: 'Budget Generator',
      subtitle: 'Create personalized budgets based on your income and spending style',
      features: [
        '3 spending profiles',
        'Detailed category breakdown',
        'Monthly/yearly planning'
      ],
      disabled: true,
      comingSoon: true
    },
    {
      id: 'rent',
      icon: 'apartment',
      title: 'Rent Affordability Calculator',
      subtitle: 'Find out what rent you can comfortably afford',
      features: [
        '25% rule guidance',
        'Comprehensive expense analysis',
        'Debt consideration'
      ],
      disabled: true,
      comingSoon: true
    }
  ]

  const closeModal = () => {
    setActiveModal(null)
  }

  return (
    <div className="simulations">
      <div className="simulations-header">
        <div className="header-content">
          <div className="header-text">
            <h1 className="simulations-title">Financial Calculators</h1>
            <p className="simulations-subtitle">Quick tools to help you make smart money decisions</p>
          </div>
          <div className="simulations-animation-container">
            <div className="lottie-animation-wrapper">
              <LottieAnimation
                src="https://lottie.host/555a140a-d229-440c-b236-375ad45fcb0f/euvoxpIyJC.lottie"
                width={184}
                height={184}
                speed={1}
                autoplay={true}
                loop={true}
                fallbackIcon="analytics"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="calculators-grid">
        {calculators.map((calculator) => (
          <CalculatorCard
            key={calculator.id}
            icon={calculator.icon}
            title={calculator.title}
            subtitle={calculator.subtitle}
            features={calculator.features}
            onOpen={calculator.onOpen}
            disabled={calculator.disabled}
            comingSoon={calculator.comingSoon}
          />
        ))}
      </div>

      {/* Modals */}
      <InvestmentCalculator 
        isOpen={activeModal === 'investment'} 
        onClose={closeModal} 
      />
      <BudgetCalculator 
        isOpen={activeModal === 'budget'} 
        onClose={closeModal} 
      />
      <SavingsCalculator 
        isOpen={activeModal === 'savings'} 
        onClose={closeModal} 
      />
    </div>
  )
}

export default Simulations
