<!-- FOMO Fighter Game Header -->
<div class="game-header">
    <div class="header-content">
        <div class="back-nav">
            <a href="/FUNDamentals/games" class="back-btn">
                <span class="material-icons">arrow_back</span>
                Back to Games
            </a>
        </div>
        <div class="game-title-section">
            <h1>📱 FOMO Fighter</h1>
            <p class="game-subtitle">Resist Spending Temptations - Master the art of saying no to impulse purchases!</p>
        </div>
    </div>
</div>

<!-- FOMO Fighter Game Container -->
<div id="fomo-fighter-game" class="game-container">
    <div class="game-content-wrapper">
        <div class="card">
        <h3>FOMO Budget Battle 📱💰</h3>
        <p style="margin-bottom: 20px; color: #666;">You're juggling a student budget while getting bombarded with social invites and spending temptations. Can you manage your money and your social life without blowing your savings?</p>
        
        <div class="fomo-game-container">
            <!-- Phone UI Container -->
            <div class="phone-ui">
                <div class="phone-header">
                    <div class="phone-status">
                        <span class="time">9:41</span>
                        <div class="status-icons">
                            <span class="wifi">📶</span>
                            <span class="battery">🔋</span>
                        </div>
                    </div>
                </div>
                
                <!-- Game Stats Bar -->
                <div class="game-stats-bar">
                    <div class="stat-item">
                        <div class="stat-icon">💰</div>
                        <div class="stat-info">
                            <div class="stat-label">Budget Left</div>
                            <div class="stat-value" id="budget-left">£250</div>
                        </div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-icon">💎</div>
                        <div class="stat-info">
                            <div class="stat-label">Saved</div>
                            <div class="stat-value" id="total-saved">£0</div>
                        </div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-icon">😬</div>
                        <div class="stat-info">
                            <div class="stat-label">FOMO</div>
                            <div class="stat-value" id="fomo-level">0%</div>
                        </div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-icon">🎉</div>
                        <div class="stat-info">
                            <div class="stat-label">Social</div>
                            <div class="stat-value" id="social-score">5/10</div>
                        </div>
                    </div>
                </div>

                <!-- Chat Interface -->
                <div class="chat-container" id="chat-container">
                    <div class="chat-messages" id="chat-messages">
                        <!-- Messages will be populated by JavaScript -->
                    </div>
                </div>
                
                <!-- Response Buttons -->
                <div class="response-buttons" id="response-buttons">
                    <!-- Buttons will be populated by JavaScript -->
                </div>
                
                <!-- Round Indicator -->
                <div class="round-indicator">
                    <span id="round-text">Round 1 of 10</span>
                </div>
            </div>
            
            <!-- Game Instructions -->
            <div class="game-instructions">
                <h4>How to Play:</h4>
                <ul>
                    <li>You start with £250 weekly budget</li>
                    <li>Make 10 decisions (one per day)</li>
                    <li>Save £150+ to win the bonus!</li>
                    <li>Balance social life with savings</li>
                    <li>Manage your FOMO levels</li>
                    <li>Score based on savings + performance bonuses</li>
                </ul>
            </div>
        </div>

        <!-- Game Results -->
        <div class="game-results" id="game-results" style="display: none;">
            <h4>Challenge Complete!</h4>
            <div class="final-stats">
                <div class="final-stat">
                    <span class="stat-label">Final Score:</span>
                    <span class="stat-value" id="final-score">0</span>
                </div>
                <div class="final-stat">
                    <span class="stat-label">Total Saved:</span>
                    <span class="stat-value">£<span id="final-saved">0</span></span>
                </div>
                <div class="final-stat">
                    <span class="stat-label">Budget Remaining:</span>
                    <span class="stat-value">£<span id="final-budget">0</span></span>
                </div>
                <div class="final-stat">
                    <span class="stat-label">FOMO Level:</span>
                    <span class="stat-value"><span id="final-fomo">0</span>%</span>
                </div>
            </div>
            <div class="score-message" id="score-message"></div>
            <div class="game-actions">
                <button class="btn primary" onclick="startFOMOChallenge()">Play Again</button>
                <a href="/FUNDamentals/games" class="btn secondary">Back to Games</a>
            </div>
        </div>

        <!-- Start Game Button -->
        <div class="start-game" id="start-game">
            <button class="btn primary large" onclick="startFOMOChallenge()">Start FOMO Challenge!</button>
        </div>
    </div>
</div>

<style>
/* Game Page Styles */
.game-header {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    border-radius: var(--radius);
    padding: 2rem;
    margin-bottom: 2rem;
    border: 1px solid #e5e7eb;
}

.header-content {
    max-width: 100%;
}

.back-nav {
    margin-bottom: 1rem;
}

.back-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.95rem;
    transition: all 0.2s ease;
    padding: 0.5rem 1rem;
    border-radius: var(--radius-sm);
}

.back-btn:hover {
    background: rgba(98, 54, 255, 0.1);
    color: var(--primary);
}

.back-btn .material-icons {
    font-size: 1.2rem;
}

.game-title-section h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--text-main);
    margin: 0 0 0.5rem 0;
}

.game-subtitle {
    font-size: 1.2rem;
    color: var(--text-secondary);
    margin: 0;
}

.game-container {
    min-height: 600px;
    overflow: visible;
}

.game-content-wrapper {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 20px;
}

.card {
    background: white;
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}

.card h3 {
    color: #2c3e50;
    margin-bottom: 20px;
    font-size: 1.8em;
}

/* FOMO Game Styles */
.fomo-game-container {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 30px;
    margin-bottom: 20px;
}

.phone-ui {
    background: #1a1a1a;
    border-radius: 25px;
    padding: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    max-width: 400px;
    margin: 0 auto;
}

.phone-header {
    background: #000;
    border-radius: 20px 20px 0 0;
    padding: 10px 20px;
    margin: -20px -20px 20px -20px;
}

.phone-status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-size: 0.9rem;
    font-weight: 600;
}

.status-icons {
    display: flex;
    gap: 5px;
}

.game-stats-bar {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin-bottom: 20px;
    background: #2a2a2a;
    border-radius: 15px;
    padding: 15px;
}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: white;
}

.stat-icon {
    font-size: 1.5rem;
    margin-bottom: 5px;
}

.stat-label {
    font-size: 0.7rem;
    opacity: 0.8;
    margin-bottom: 2px;
}

.stat-value {
    font-size: 0.9rem;
    font-weight: 700;
}

.chat-container {
    background: #2a2a2a;
    border-radius: 15px;
    padding: 15px;
    margin-bottom: 15px;
    min-height: 300px;
    max-height: 400px;
    overflow-y: auto;
}

.chat-messages {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.message {
    padding: 12px 16px;
    border-radius: 18px;
    max-width: 80%;
    word-wrap: break-word;
    animation: messageSlide 0.3s ease-out;
}

.message.incoming {
    background: #404040;
    color: white;
    align-self: flex-start;
    border-bottom-left-radius: 5px;
}

.message.outgoing {
    background: #667eea;
    color: white;
    align-self: flex-end;
    border-bottom-right-radius: 5px;
}

.message.system {
    background: #ff6b6b;
    color: white;
    align-self: center;
    text-align: center;
    font-size: 0.9rem;
    border-radius: 10px;
}

@keyframes messageSlide {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.response-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 15px;
}

.response-btn {
    padding: 15px 20px;
    border: none;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;
    text-align: left;
    position: relative;
    overflow: hidden;
}

.response-btn.accept {
    background: linear-gradient(135deg, #28a745, #20c997);
    color: white;
}

.response-btn.decline {
    background: linear-gradient(135deg, #dc3545, #fd7e14);
    color: white;
}

.response-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.response-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
}

.round-indicator {
    text-align: center;
    color: white;
    font-size: 0.9rem;
    font-weight: 600;
    padding: 10px;
    background: #2a2a2a;
    border-radius: 10px;
}

.game-instructions {
    background: white;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.game-instructions h4 {
    color: #2c3e50;
    margin-bottom: 15px;
    font-size: 1.2rem;
}

.game-instructions ul {
    list-style: none;
    padding: 0;
}

.game-instructions li {
    padding: 8px 0;
    color: #555;
    position: relative;
    padding-left: 20px;
}

.game-instructions li:before {
    content: "•";
    color: #667eea;
    font-weight: bold;
    position: absolute;
    left: 0;
}

.game-results {
    text-align: center;
    padding: 30px;
    background: white;
    border-radius: 15px;
    margin-top: 20px;
}

.final-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    margin-bottom: 25px;
}

.final-stat {
    padding: 15px;
    background: #f8f9fa;
    border-radius: 10px;
}

.final-stat .stat-label {
    display: block;
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 5px;
}

.final-stat .stat-value {
    font-size: 1.3rem;
    font-weight: bold;
    color: #2c3e50;
}

.score-message {
    font-size: 1.1rem;
    margin-bottom: 25px;
    padding: 15px;
    border-radius: 10px;
    font-weight: 600;
}

.start-game {
    text-align: center;
    margin-top: 30px;
}

.game-actions {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-top: 25px;
}

.btn {
    padding: 12px 30px;
    border: none;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-block;
}

.btn.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.btn.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.btn.secondary {
    background: #6c757d;
    color: white;
}

.btn.secondary:hover {
    background: #5a6268;
}

.btn.large {
    padding: 15px 40px;
    font-size: 1.1rem;
}

@media (max-width: 768px) {
    .game-title-section h1 {
        font-size: 2rem;
    }
    
    .card {
        padding: 20px;
    }
    
    .fomo-game-container {
        grid-template-columns: 1fr;
        gap: 20px;
    }
    
    .phone-ui {
        border-radius: 15px;
    }
    
    .chat-container {
        min-height: 250px;
        max-height: 300px;
    }
    
    .final-stats {
        grid-template-columns: 1fr;
    }
    
    .game-actions {
        flex-direction: column;
    }
    
    .btn {
        width: 100%;
        text-align: center;
    }
}
</style>

<script>
console.log('FOMO Fighter game loaded');

let fomoGame = null;

// FOMO Budget Battle Game
class FOMOBudgetBattle {
    constructor() {
        this.gameState = {
            round: 1,
            maxRounds: 10,
            budget: 250,
            totalSaved: 0,
            fomoLevel: 0,
            socialScore: 5,
            score: 0,
            decisions: []
        };
        
        this.scenarios = [
            {
                id: 1,
                title: "Flatmate Friday 🍻",
                message: "Let's hit the bar tonight 🍺 it's been a week!",
                options: [
                    { text: "I'm in! 🍺 (£40)", cost: 40, socialChange: 2, fomoChange: -10, type: "accept" },
                    { text: "Can't tonight – saving for a trip 💰", cost: -40, socialChange: -1, fomoChange: 15, type: "decline" }
                ]
            },
            {
                id: 2,
                title: "Flash Sale Alert! 🏷️",
                message: "50% off your favorite sneakers! Limited time only! 👟",
                options: [
                    { text: "Buy now! 👟 (£80)", cost: 80, socialChange: 1, fomoChange: -5, type: "accept" },
                    { text: "I'll pass – my current ones are fine 👌", cost: -80, socialChange: 0, fomoChange: 10, type: "decline" }
                ]
            },
            {
                id: 3,
                title: "Unexpected Gig 🎵",
                message: "Last-minute tickets for tonight's concert! 🎤",
                options: [
                    { text: "I'm there! 🎵 (£60)", cost: 60, socialChange: 3, fomoChange: -15, type: "accept" },
                    { text: "Not in the budget this week 💸", cost: -60, socialChange: -2, fomoChange: 20, type: "decline" }
                ]
            },
            {
                id: 4,
                title: "Study Group Snacks 📚",
                message: "Bringing snacks for study group tonight? 🍕",
                options: [
                    { text: "I'll grab pizza for everyone! 🍕 (£25)", cost: 25, socialChange: 2, fomoChange: -8, type: "accept" },
                    { text: "How about we all bring something? 🥪", cost: -25, socialChange: 0, fomoChange: 5, type: "decline" }
                ]
            },
            {
                id: 5,
                title: "New Game Release 🎮",
                message: "The new game we talked about is out! 🎮",
                options: [
                    { text: "Pre-ordered! Can't wait! 🎮 (£50)", cost: 50, socialChange: 1, fomoChange: -10, type: "accept" },
                    { text: "I'll wait for a sale 🔥", cost: -50, socialChange: 0, fomoChange: 15, type: "decline" }
                ]
            },
            {
                id: 6,
                title: "Coffee Date ☕",
                message: "Want to catch up over coffee? ☕",
                options: [
                    { text: "Sure! That new café looks nice ☕ (£12)", cost: 12, socialChange: 2, fomoChange: -5, type: "accept" },
                    { text: "How about we walk in the park instead? 🌳", cost: -12, socialChange: 1, fomoChange: 8, type: "decline" }
                ]
            },
            {
                id: 7,
                title: "Subscription Service 📺",
                message: "New streaming service has that show everyone's watching! 📺",
                options: [
                    { text: "Sign me up! 📺 (£15)", cost: 15, socialChange: 1, fomoChange: -12, type: "accept" },
                    { text: "I'll catch up later 📚", cost: -15, socialChange: 0, fomoChange: 18, type: "decline" }
                ]
            },
            {
                id: 8,
                title: "Weekend Trip 🚗",
                message: "Road trip this weekend? Split gas and food! 🚗",
                options: [
                    { text: "Count me in! 🚗 (£45)", cost: 45, socialChange: 3, fomoChange: -12, type: "accept" },
                    { text: "Maybe next time 🏠", cost: -45, socialChange: -1, fomoChange: 15, type: "decline" }
                ]
            },
            {
                id: 9,
                title: "Gym Membership 💪",
                message: "New gym opening! 50% off first month! 💪",
                options: [
                    { text: "Sign me up! 💪 (£30)", cost: 30, socialChange: 1, fomoChange: -5, type: "accept" },
                    { text: "I'll stick to home workouts 🏃", cost: -30, socialChange: 0, fomoChange: 8, type: "decline" }
                ]
            },
            {
                id: 10,
                title: "Birthday Dinner 🎂",
                message: "It's my birthday! Fancy restaurant tonight? 🎂",
                options: [
                    { text: "Of course! 🎂 (£55)", cost: 55, socialChange: 4, fomoChange: -15, type: "accept" },
                    { text: "Let's celebrate at home instead 🏠", cost: -55, socialChange: -2, fomoChange: 20, type: "decline" }
                ]
            }
        ];
        
        this.bonusEvents = [
            {
                id: 1,
                title: "Lucky Break! 🍀",
                message: "Your flatmate covers dinner! +£15 bonus savings! 🎉",
                effect: { budget: 15, socialChange: 1, fomoChange: -5 }
            },
            {
                id: 2,
                title: "Health Check 🏥",
                message: "You caught a cold, skip the party 😷 Forced savings, FOMO drop!",
                effect: { budget: 30, socialChange: -1, fomoChange: -10 }
            }
        ];
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.updateDisplay();
        this.showScenario();
    }
    
    showScenario() {
        const scenario = this.scenarios[this.gameState.round - 1];
        const chatMessages = document.getElementById('chat-messages');
        const responseButtons = document.getElementById('response-buttons');
        
        // Clear previous messages
        chatMessages.innerHTML = '';
        responseButtons.innerHTML = '';
        
        // Add scenario message
        this.addMessage(scenario.title, 'incoming');
        this.addMessage(scenario.message, 'incoming');
        
        // Add response buttons
        scenario.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = `response-btn ${option.type}`;
            button.textContent = option.text;
            button.onclick = () => this.makeDecision(option);
            responseButtons.appendChild(button);
        });
        
        // Update round indicator
        document.getElementById('round-text').textContent = `Round ${this.gameState.round} of ${this.gameState.maxRounds}`;
    }
    
    addMessage(text, type) {
        const chatMessages = document.getElementById('chat-messages');
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;
        chatMessages.appendChild(message);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    makeDecision(option) {
        // Disable buttons
        document.querySelectorAll('.response-btn').forEach(btn => btn.disabled = true);
        
        // Show player's response
        this.addMessage(option.text, 'outgoing');
        
        // Apply decision effects
        this.gameState.budget -= option.cost;
        this.gameState.socialScore += option.socialChange;
        this.gameState.fomoLevel += option.fomoChange;
        
        // If declining, add to savings
        if (option.type === 'decline') {
            this.gameState.totalSaved += Math.abs(option.cost);
        }
        
        // Store decision
        this.gameState.decisions.push({
            round: this.gameState.round,
            choice: option.text,
            cost: option.cost,
            type: option.type
        });
        
        // Clamp values
        this.gameState.socialScore = Math.max(0, Math.min(10, this.gameState.socialScore));
        this.gameState.fomoLevel = Math.max(0, Math.min(100, this.gameState.fomoLevel));
        
        // Check for bonus events (20% chance)
        if (Math.random() < 0.2 && this.gameState.round < this.gameState.maxRounds) {
            setTimeout(() => this.showBonusEvent(), 1500);
        } else {
            setTimeout(() => this.nextRound(), 1500);
        }
    }
    
    showBonusEvent() {
        const bonusEvent = this.bonusEvents[Math.floor(Math.random() * this.bonusEvents.length)];
        
        this.addMessage(bonusEvent.title, 'system');
        this.addMessage(bonusEvent.message, 'system');
        
        // Apply bonus effects
        this.gameState.budget += bonusEvent.effect.budget;
        this.gameState.totalSaved += bonusEvent.effect.budget;
        this.gameState.socialScore += bonusEvent.effect.socialChange;
        this.gameState.fomoLevel += bonusEvent.effect.fomoChange;
        
        // Clamp values
        this.gameState.socialScore = Math.max(0, Math.min(10, this.gameState.socialScore));
        this.gameState.fomoLevel = Math.max(0, Math.min(100, this.gameState.fomoLevel));
        
        setTimeout(() => this.nextRound(), 2000);
    }
    
    nextRound() {
        this.gameState.round++;
        this.updateDisplay();
        
        if (this.gameState.round <= this.gameState.maxRounds) {
            this.showScenario();
        } else {
            this.endGame();
        }
    }
    
    updateDisplay() {
        document.getElementById('budget-left').textContent = `£${this.gameState.budget}`;
        document.getElementById('total-saved').textContent = `£${this.gameState.totalSaved}`;
        document.getElementById('fomo-level').textContent = `${Math.round(this.gameState.fomoLevel)}%`;
        document.getElementById('social-score').textContent = `${this.gameState.socialScore}/10`;
    }
    
    endGame() {
        // Calculate final score based on multiple factors
        let score = this.gameState.totalSaved; // Base score from savings
        
        // Bonus for keeping FOMO low
        if (this.gameState.fomoLevel < 30) {
            score += 20; // Low FOMO bonus
        } else if (this.gameState.fomoLevel < 60) {
            score += 10; // Medium FOMO bonus
        }
        
        // Bonus for maintaining social relationships
        if (this.gameState.socialScore >= 7) {
            score += 15; // High social bonus
        } else if (this.gameState.socialScore >= 4) {
            score += 8; // Medium social bonus
        }
        
        // Budget management bonus
        if (this.gameState.budget > 200) {
            score += 25; // Excellent budget management
        } else if (this.gameState.budget > 100) {
            score += 15; // Good budget management
        } else if (this.gameState.budget > 0) {
            score += 5; // Basic budget management
        }
        
        this.gameState.score = Math.round(score);
        
        // Hide phone UI and show results
        document.querySelector('.phone-ui').style.display = 'none';
        document.getElementById('game-results').style.display = 'block';
        
        // Update results display
        document.getElementById('final-score').textContent = this.gameState.score;
        document.getElementById('final-saved').textContent = this.gameState.totalSaved;
        document.getElementById('final-budget').textContent = this.gameState.budget;
        document.getElementById('final-fomo').textContent = Math.round(this.gameState.fomoLevel);
        
        // Show performance message
        const scoreMessage = document.getElementById('score-message');
        if (this.gameState.score >= 80) {
            scoreMessage.textContent = "Outstanding! You mastered the art of smart spending and FOMO resistance!";
            scoreMessage.style.background = "#d4edda";
            scoreMessage.style.color = "#155724";
        } else if (this.gameState.score >= 60) {
            scoreMessage.textContent = "Great job! You balanced your social life and savings well.";
            scoreMessage.style.background = "#fff3cd";
            scoreMessage.style.color = "#856404";
        } else if (this.gameState.score >= 40) {
            scoreMessage.textContent = "Not bad! You're learning to resist temptation - keep practicing!";
            scoreMessage.style.background = "#cce7ff";
            scoreMessage.style.color = "#004085";
        } else {
            scoreMessage.textContent = "FOMO got the better of you this time. Try being more selective with spending!";
            scoreMessage.style.background = "#f8d7da";
            scoreMessage.style.color = "#721c24";
        }
        
        // Save game results
        this.saveGameResults(this.gameState.score);
    }
    
    saveGameResults(score) {
        const gameData = {
            game_name: 'fomo-fighter',
            score: score,
            final_value: this.gameState.budget,
            years_played: 0, // Not applicable
            profit_loss: this.gameState.totalSaved // Total amount saved
        };
        
        fetch('/FUNDamentals/api/games/score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(gameData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('FOMO Fighter score saved successfully:', data);
            } else {
                console.error('Failed to save FOMO Fighter score:', data.error);
            }
        })
        .catch(error => {
            console.error('Error saving FOMO Fighter score:', error);
        });
    }
}

// Game control functions
function startFOMOChallenge() {
    // Hide start button and results
    document.getElementById('start-game').style.display = 'none';
    document.getElementById('game-results').style.display = 'none';
    
    // Show phone UI
    document.querySelector('.phone-ui').style.display = 'block';
    
    // Initialize new game
    fomoGame = new FOMOBudgetBattle();
}

// Initialize game on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('FOMO Fighter game initialized');
});
</script> 