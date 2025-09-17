import React, { useState, useEffect, useRef } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const InvestmentCalculator = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    years: 25,
    initialAmount: 1000,
    monthlyContribution: 200,
    riskLevel: 'medium'
  })

  const [results, setResults] = useState({
    good: 185000,
    average: 125000,
    poor: 85000
  })

  const [chartData, setChartData] = useState([])
  const [isCalculating, setIsCalculating] = useState(false)
  const modalRef = useRef(null)
  const firstInputRef = useRef(null)

  const returns = {
    low: { good: 0.06, average: 0.04, poor: 0.02 },
    medium: { good: 0.08, average: 0.06, poor: 0.03 },
    high: { good: 0.12, average: 0.08, poor: 0.04 }
  }

  const calculateCompound = (rate, initial, monthly, years) => {
    const monthlyRate = rate / 12
    const months = years * 12
    const futureValue = initial * Math.pow(1 + monthlyRate, months) + 
                       monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
    return futureValue
  }

  const calculateInvestment = () => {
    const { years, initialAmount, monthlyContribution, riskLevel } = formData
    
    // Validate inputs
    if (years <= 0 || initialAmount < 0 || monthlyContribution < 0) {
      setResults({ good: 0, average: 0, poor: 0 })
      setChartData([])
      return
    }
    
    setIsCalculating(true)
    
    // Use setTimeout to simulate calculation and allow UI to update
    setTimeout(() => {
      const rates = returns[riskLevel]
      
      const goodValue = calculateCompound(rates.good, initialAmount, monthlyContribution, years)
      const averageValue = calculateCompound(rates.average, initialAmount, monthlyContribution, years)
      const poorValue = calculateCompound(rates.poor, initialAmount, monthlyContribution, years)
      
      setResults({
        good: goodValue,
        average: averageValue,
        poor: poorValue
      })

      // Generate chart data
      const chartPoints = []
      const step = Math.max(1, Math.floor(years / 10))
      for (let year = 0; year <= years; year += step) {
        const goodValue = calculateCompound(rates.good, initialAmount, monthlyContribution, year)
        const averageValue = calculateCompound(rates.average, initialAmount, monthlyContribution, year)
        const poorValue = calculateCompound(rates.poor, initialAmount, monthlyContribution, year)
        
        chartPoints.push({
          year: `Year ${year}`,
          good: goodValue,
          average: averageValue,
          poor: poorValue
        })
      }
      setChartData(chartPoints)
      setIsCalculating(false)
    }, 100)
  }

  useEffect(() => {
    if (isOpen) {
      calculateInvestment()
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

  const resetInvestment = () => {
    setFormData({
      years: 25,
      initialAmount: 1000,
      monthlyContribution: 200,
      riskLevel: 'medium'
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
        aria-labelledby="investment-modal-title"
      >
        <div className="modal-header">
          <h3 id="investment-modal-title">Investment Growth Calculator</h3>
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
            <div className="input-row-inline">
              <div className="input-group">
                <label htmlFor="investment-years">How many years?</label>
                                  <input
                    ref={firstInputRef}
                    type="number"
                    id="investment-years"
                    value={formData.years}
                    onChange={(e) => handleInputChange('years', parseInt(e.target.value) || 0)}
                    onKeyDown={(e) => e.key === 'Enter' && calculateInvestment()}
                    min="1"
                    max="50"
                    aria-describedby="years-help"
                  />
              </div>
              
              <div className="input-group">
                <label htmlFor="initial-amount">Starting amount</label>
                <div className="input-wrapper">
                  <span className="input-prefix">$</span>
                  <input
                    type="number"
                    id="initial-amount"
                    value={formData.initialAmount}
                    onChange={(e) => handleInputChange('initialAmount', parseFloat(e.target.value) || 0)}
                    placeholder="1,000"
                  />
                </div>
              </div>
              
              <div className="input-group">
                <label htmlFor="monthly-contribution">Monthly contribution</label>
                <div className="input-wrapper">
                  <span className="input-prefix">$</span>
                  <input
                    type="number"
                    id="monthly-contribution"
                    value={formData.monthlyContribution}
                    onChange={(e) => handleInputChange('monthlyContribution', parseFloat(e.target.value) || 0)}
                    placeholder="200"
                  />
                </div>
              </div>
              
              <div className="input-group">
                <label htmlFor="risk-level">Investment risk level</label>
                <select
                  id="risk-level"
                  value={formData.riskLevel}
                  onChange={(e) => handleInputChange('riskLevel', e.target.value)}
                >
                  <option value="low">Low risk (Conservative)</option>
                  <option value="medium">Medium risk (Balanced)</option>
                  <option value="high">Higher risk (Growth focused)</option>
                </select>
              </div>
            </div>
            
            <div className="result-section">
              <div className="investment-results">
                <div className="scenario good">
                  <div className="scenario-label">Good market</div>
                  <div className="scenario-amount">${results.good.toLocaleString('en-US', {maximumFractionDigits: 0})}</div>
                </div>
                <div className="scenario average">
                  <div className="scenario-label">Average market</div>
                  <div className="scenario-amount">${results.average.toLocaleString('en-US', {maximumFractionDigits: 0})}</div>
                </div>
                <div className="scenario poor">
                  <div className="scenario-label">Poor market</div>
                  <div className="scenario-amount">${results.poor.toLocaleString('en-US', {maximumFractionDigits: 0})}</div>
                </div>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis 
                      tickFormatter={(value) => '$' + (value / 1000).toFixed(0) + 'k'}
                    />
                    <Tooltip 
                      formatter={(value) => ['$' + value.toLocaleString(), '']}
                      labelFormatter={(label) => label}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="good" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      name="Good Market"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="average" 
                      stroke="#f59e0b" 
                      strokeWidth={2}
                      name="Average Market"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="poor" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                      name="Poor Market"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="investment-note">*These are estimates based on historical market performance</div>
            </div>
            
            <div className="calculator-actions">
              <button 
                className="btn btn-primary" 
                onClick={calculateInvestment}
                disabled={isCalculating}
              >
                {isCalculating ? 'Calculating...' : 'Recalculate'}
              </button>
              <button className="btn btn-secondary" onClick={resetInvestment}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvestmentCalculator
