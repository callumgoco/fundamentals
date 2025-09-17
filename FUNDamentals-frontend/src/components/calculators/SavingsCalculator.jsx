import React, { useState, useEffect, useRef } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const SavingsCalculator = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    goal: 5000,
    amount: 100,
    frequency: 'weekly'
  })

  const [results, setResults] = useState({
    timeline: '11 months',
    chartData: []
  })
  const modalRef = useRef(null)
  const firstInputRef = useRef(null)

  const calculateSavings = () => {
    const { goal, amount, frequency } = formData
    
    // Validate inputs
    if (goal <= 0 || amount <= 0) {
      setResults({
        timeline: 'Please enter valid amounts',
        chartData: []
      })
      return
    }
    
    const frequencyMultiplier = { weekly: 52, biweekly: 26, monthly: 12 }
    const annualSavings = amount * frequencyMultiplier[frequency]
    const interestRate = 0.015
    
    let months = 0
    let saved = 0
    const monthlyAmount = annualSavings / 12
    const monthlyRate = interestRate / 12
    
    const savingsData = [{ month: 'Start', saved: 0, goal: goal }]
    const labels = ['Start']
    
    while (saved < goal && months < 240) {
      saved = saved * (1 + monthlyRate) + monthlyAmount
      months++
      
      if (months % 3 === 0 || saved >= goal) {
        savingsData.push({
          month: `${months} months`,
          saved: Math.min(saved, goal),
          goal: goal
        })
        labels.push(`${months} months`)
      }
    }
    
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12
    
    let timeText = ''
    if (years > 0) {
      timeText += `${years} year${years > 1 ? 's' : ''}`
      if (remainingMonths > 0) {
        timeText += ` ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`
      }
    } else {
      timeText = `${months} month${months > 1 ? 's' : ''}`
    }
    
    setResults({
      timeline: timeText,
      chartData: savingsData
    })
  }

  useEffect(() => {
    if (isOpen) {
      calculateSavings()
      // Focus first input when modal opens
      setTimeout(() => {
        if (firstInputRef.current) {
          firstInputRef.current.focus()
        }
      }, 100)
    }
  }, [isOpen, formData])

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const resetSavings = () => {
    setFormData({
      goal: 5000,
      amount: 100,
      frequency: 'weekly'
    })
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="calculator-modal" 
        onClick={e => e.stopPropagation()}
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="savings-modal-title"
      >
        <div className="modal-header">
          <h3 id="savings-modal-title">Savings Goal Calculator</h3>
          <button 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close calculator"
          >
            <i className="material-icons">close</i>
          </button>
        </div>
        <div className="modal-content">
          <div className="calculator-card">
            <div className="input-row-inline-three">
              <div className="input-group">
                <label htmlFor="savings-goal">What's your savings goal?</label>
                <div className="input-wrapper">
                  <span className="input-prefix">$</span>
                  <input
                    ref={firstInputRef}
                    type="number"
                    id="savings-goal"
                    value={formData.goal}
                    onChange={(e) => handleInputChange('goal', parseFloat(e.target.value) || 0)}
                    onKeyDown={(e) => e.key === 'Enter' && calculateSavings()}
                    placeholder="5,000"
                  />
                </div>
              </div>
              
              <div className="input-group">
                <label htmlFor="savings-amount">How much can you save?</label>
                <div className="input-wrapper">
                  <span className="input-prefix">$</span>
                  <input
                    type="number"
                    id="savings-amount"
                    value={formData.amount}
                    onChange={(e) => handleInputChange('amount', parseFloat(e.target.value) || 0)}
                    placeholder="100"
                  />
                </div>
              </div>
              
              <div className="input-group">
                <label htmlFor="savings-frequency">How often?</label>
                <select
                  id="savings-frequency"
                  value={formData.frequency}
                  onChange={(e) => handleInputChange('frequency', e.target.value)}
                >
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Every 2 weeks</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
            
            <div className="result-section">
              <div className="savings-timeline">
                <div className="timeline-result">
                  <h4>You'll reach your goal in:</h4>
                  <div className="timeline-amount">{results.timeline}</div>
                  <div className="timeline-detail">Including interest from a high-yield savings account</div>
                </div>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={results.chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis 
                      tickFormatter={(value) => '$' + value.toLocaleString()}
                    />
                    <Tooltip 
                      formatter={(value, name) => [
                        '$' + value.toLocaleString(), 
                        name === 'saved' ? 'Your Savings' : 'Goal'
                      ]}
                      labelFormatter={(label) => label}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="saved" 
                      stroke="#6236FF" 
                      strokeWidth={3}
                      fill="#6236FF"
                      fillOpacity={0.2}
                      name="Your Savings"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="goal" 
                      stroke="#FF6B35" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Goal"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="calculator-actions">
              <button className="btn btn-primary" onClick={calculateSavings}>
                Show Me
              </button>
              <button className="btn btn-secondary" onClick={resetSavings}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SavingsCalculator
