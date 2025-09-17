import React, { useState, useEffect, useRef } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const BudgetCalculator = ({ isOpen, onClose }) => {
  const [monthlyIncome, setMonthlyIncome] = useState(3000)
  const [monthlyExpenses, setMonthlyExpenses] = useState([
    { category: 'rent', amount: 600 },
    { category: 'food', amount: 150 },
    { category: 'entertainment', amount: 40 }
  ])
  const [yearlyExpenses, setYearlyExpenses] = useState([
    { category: 'medical', amount: 3000 },
    { category: 'gifts', amount: 500 },
    { category: 'emergency', amount: 1000 }
  ])

  const [results, setResults] = useState({
    monthlySavings: 1835,
    yearlySavings: 22020
  })

  const [chartData, setChartData] = useState([])
  const modalRef = useRef(null)
  const firstInputRef = useRef(null)

  const calculateBudget = () => {
    const totalMonthlyExpenses = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0)
    const totalYearlyExpenses = yearlyExpenses.reduce((sum, expense) => sum + expense.amount, 0)
    const monthlyFromYearly = totalYearlyExpenses / 12
    
    const monthlySavings = monthlyIncome - totalMonthlyExpenses - monthlyFromYearly
    const yearlySavings = monthlySavings * 12
    
    setResults({
      monthlySavings: Math.max(0, monthlySavings),
      yearlySavings: Math.max(0, yearlySavings)
    })

    // Update chart data
    setChartData([
      { name: 'Monthly Expenses', value: totalMonthlyExpenses, color: '#f59e0b' },
      { name: 'Yearly Expenses', value: monthlyFromYearly, color: '#ef4444' },
      { name: 'Savings', value: Math.max(0, monthlySavings), color: '#10b981' }
    ])
  }

  useEffect(() => {
    if (isOpen) {
      calculateBudget()
      // Focus first input when modal opens
      setTimeout(() => {
        if (firstInputRef.current) {
          firstInputRef.current.focus()
        }
      }, 100)
    }
  }, [isOpen, monthlyIncome, monthlyExpenses, yearlyExpenses])

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

  const addMonthlyExpense = () => {
    setMonthlyExpenses([...monthlyExpenses, { category: 'utilities', amount: 0 }])
  }

  const addYearlyExpense = () => {
    setYearlyExpenses([...yearlyExpenses, { category: 'vacation', amount: 0 }])
  }

  const removeExpense = (type, index) => {
    if (type === 'monthly') {
      setMonthlyExpenses(monthlyExpenses.filter((_, i) => i !== index))
    } else {
      setYearlyExpenses(yearlyExpenses.filter((_, i) => i !== index))
    }
  }

  const updateExpense = (type, index, field, value) => {
    if (type === 'monthly') {
      const updated = [...monthlyExpenses]
      updated[index][field] = field === 'amount' ? parseFloat(value) || 0 : value
      setMonthlyExpenses(updated)
    } else {
      const updated = [...yearlyExpenses]
      updated[index][field] = field === 'amount' ? parseFloat(value) || 0 : value
      setYearlyExpenses(updated)
    }
  }

  const resetBudget = () => {
    setMonthlyIncome(3000)
    setMonthlyExpenses([
      { category: 'rent', amount: 600 },
      { category: 'food', amount: 150 },
      { category: 'entertainment', amount: 40 }
    ])
    setYearlyExpenses([
      { category: 'medical', amount: 3000 },
      { category: 'gifts', amount: 500 },
      { category: 'emergency', amount: 1000 }
    ])
  }

  const categoryOptions = {
    monthly: [
      { value: 'rent', label: 'Rent / Mortgage' },
      { value: 'food', label: 'Food' },
      { value: 'entertainment', label: 'Entertainment' },
      { value: 'transportation', label: 'Transportation' },
      { value: 'utilities', label: 'Utilities' }
    ],
    yearly: [
      { value: 'medical', label: 'Medical' },
      { value: 'gifts', label: 'Gifts' },
      { value: 'emergency', label: 'Emergency' },
      { value: 'vacation', label: 'Vacation' },
      { value: 'insurance', label: 'Insurance' }
    ]
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
        aria-labelledby="budget-modal-title"
      >
        <div className="modal-header">
          <h3 id="budget-modal-title">Budget Calculator</h3>
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
            <div className="input-group">
              <label htmlFor="monthly-income">Monthly after-tax income</label>
              <div className="input-wrapper">
                <span className="input-prefix">$</span>
                <input
                  ref={firstInputRef}
                  type="number"
                  id="monthly-income"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(parseFloat(e.target.value) || 0)}
                  onKeyDown={(e) => e.key === 'Enter' && calculateBudget()}
                  placeholder="3,000"
                />
              </div>
            </div>
            
            <div className="expense-section">
              <h4>Monthly Expenses</h4>
              <div className="expense-items">
                {monthlyExpenses.map((expense, index) => (
                  <div key={index} className="expense-item">
                    <select
                      className="expense-category"
                      value={expense.category}
                      onChange={(e) => updateExpense('monthly', index, 'category', e.target.value)}
                    >
                      {categoryOptions.monthly.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="input-wrapper">
                      <span className="input-prefix">$</span>
                      <input
                        type="number"
                        className="expense-amount"
                        value={expense.amount}
                        onChange={(e) => updateExpense('monthly', index, 'amount', e.target.value)}
                        placeholder="0"
                      />
                    </div>
                    <button 
                      className="remove-expense-btn" 
                      onClick={() => removeExpense('monthly', index)}
                    >
                      <i className="material-icons">close</i>
                    </button>
                  </div>
                ))}
              </div>
              <button className="add-expense-btn" onClick={addMonthlyExpense}>
                <i className="material-icons">add</i> Add another...
              </button>
            </div>

            <div className="expense-section">
              <h4>Yearly Expenses</h4>
              <div className="expense-items">
                {yearlyExpenses.map((expense, index) => (
                  <div key={index} className="expense-item">
                    <select
                      className="expense-category"
                      value={expense.category}
                      onChange={(e) => updateExpense('yearly', index, 'category', e.target.value)}
                    >
                      {categoryOptions.yearly.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="input-wrapper">
                      <span className="input-prefix">$</span>
                      <input
                        type="number"
                        className="expense-amount"
                        value={expense.amount}
                        onChange={(e) => updateExpense('yearly', index, 'amount', e.target.value)}
                        placeholder="0"
                      />
                    </div>
                    <button 
                      className="remove-expense-btn" 
                      onClick={() => removeExpense('yearly', index)}
                    >
                      <i className="material-icons">close</i>
                    </button>
                  </div>
                ))}
              </div>
              <button className="add-expense-btn" onClick={addYearlyExpense}>
                <i className="material-icons">add</i> Add another...
              </button>
            </div>
            
            <div className="result-section">
              <div className="savings-results">
                <div className="savings-item">
                  <div className="savings-label">Monthly Savings</div>
                  <div className="savings-amount">${results.monthlySavings.toLocaleString('en-US', {maximumFractionDigits: 0})}</div>
                </div>
                <div className="savings-item">
                  <div className="savings-label">Yearly Savings</div>
                  <div className="savings-amount">${results.yearlySavings.toLocaleString('en-US', {maximumFractionDigits: 0})}</div>
                </div>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => ['$' + value.toLocaleString(), '']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="calculator-actions">
              <button className="btn btn-primary" onClick={calculateBudget}>
                Calculate
              </button>
              <button className="btn btn-secondary" onClick={resetBudget}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BudgetCalculator
