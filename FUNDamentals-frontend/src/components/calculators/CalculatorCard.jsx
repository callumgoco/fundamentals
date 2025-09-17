import React from 'react'

const CalculatorCard = ({ 
  icon, 
  title, 
  subtitle, 
  features, 
  onOpen, 
  disabled = false, 
  comingSoon = false 
}) => {
  return (
    <div 
      className={`calculator-preview-card ${disabled ? 'disabled' : ''}`}
      onClick={disabled ? undefined : onOpen}
    >
      <div className="calculator-header">
        <div className="calculator-icon">
          <i className="material-icons">{icon}</i>
        </div>
        <h3 className="calculator-title">{title}</h3>
        <p className="calculator-subtitle">{subtitle}</p>
      </div>
      <div className="preview-content">
        <div className="preview-features">
          {features.map((feature, index) => (
            <div key={index} className="feature-item">
              <i className="material-icons">check_circle</i>
              <span>{feature}</span>
            </div>
          ))}
        </div>
        <div className="preview-action">
          {comingSoon ? (
            <span className="coming-soon-btn">
              <i className="material-icons">schedule</i>
              Coming Soon
            </span>
          ) : (
            <span className="open-tool-btn">
              <i className="material-icons">launch</i>
              Open Calculator
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default CalculatorCard
