import React from 'react'
import LottieAnimation from '../components/LottieAnimation'
import { vocabulary } from '../data/vocabulary'
import './Vocab.css'

function Vocab() {
  return (
    <div className="vocab">
      <div className="vocab-header">
        <div className="header-content">
          <div className="header-text">
            <h1 className="vocab-title">Money Words</h1>
            <p className="vocab-subtitle">Master financial terms with clear definitions and real-world examples</p>
          </div>
          <div className="vocab-animation-container">
            <div className="lottie-animation-wrapper">
              <LottieAnimation
                src="https://lottie.host/caf437c1-4dcd-440e-9df3-2e6d8420fe34/HXDgblEUkQ.lottie"
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

      <div className="card-area" id="vocab-cards-grid">
        {vocabulary.map((word, index) => (
          <div 
            key={word.term}
            className={`card${index === 0 ? ' first-vocab-card' : ''}`}
            id={index === 0 ? 'first-vocab-card' : ''}
          >
            <div className="card__front">
              <div className="term-icon">
                <span className="material-icons" style={{fontSize: '5rem'}}>
                  {word.icon}
                </span>
              </div>
              <h3>{word.term}</h3>
              <div className="pronunciation">{word.pronunciation}</div>
              <div className="definition">{word.definition}</div>
              <div className="hover-prompt">Hover to see example</div>
            </div>
            
            <div className="card__back">
              <div className="card__back-content">
                <div className="card__back-definition">
                  <p>{word.definition}</p>
                </div>
                <div className="card__back-gif">
                  <img src={word.gif_url} alt={`${word.term} GIF`} />
                </div>
              </div>
            </div>
            
            <div className="inside-page">
              <div className="inside-page__container">
                <div className="inside-page__heading">{word.term}</div>
                
                <div className="gen-z-section">
                  <div className="gen-z-title">💡 Example:</div>
                  <p className="inside-page__gen-z">{word.gen_z_example}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Vocab
