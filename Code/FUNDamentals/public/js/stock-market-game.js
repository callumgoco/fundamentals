class StockMarketGame {
    constructor() {
        this.gameState = {
            year: 1,
            cash: 1000,
            totalMoney: 1000,
            startingMoney: 1000,
            stocks: {
                'TECH': { name: 'TechCorp', price: 100, owned: 0, history: [], color: '#3b82f6' },
                'HEAL': { name: 'HealthPlus', price: 100, owned: 0, history: [], color: '#10b981' },
                'ENER': { name: 'PowerGrid', price: 100, owned: 0, history: [], color: '#f59e0b' },
                'FOOD': { name: 'FreshMart', price: 100, owned: 0, history: [], color: '#ef4444' },
                'AUTO': { name: 'DriveMax', price: 100, owned: 0, history: [], color: '#8b5cf6' }
            },
            savings: 0,
            savingsRate: 0.03,
            maxYears: 25,
            yearsPer5YearCycle: 5,
            gameSpeed: 1000,
            isPlaying: false,
            isPaused: false,
            isWaitingToContinue: false,
            events: [],
            score: 0,
            leaderboard: []
        };
        
        this.marketEvents = [
            { type: 'boom', message: '📈 Tech boom! Technology stocks surge!', stocks: ['TECH'], multiplier: 1.3 },
            { type: 'crash', message: '📉 Market correction! Prices drop across the board.', stocks: ['TECH', 'HEAL', 'ENER', 'FOOD', 'AUTO'], multiplier: 0.8 },
            { type: 'healthcare', message: '🏥 Healthcare breakthrough! Medical stocks rise!', stocks: ['HEAL'], multiplier: 1.25 },
            { type: 'energy', message: '⚡ Energy crisis! Power stocks volatile!', stocks: ['ENER'], multiplier: 1.4 },
            { type: 'recession', message: '😰 Economic downturn! All stocks affected.', stocks: ['TECH', 'HEAL', 'ENER', 'FOOD', 'AUTO'], multiplier: 0.7 },
            { type: 'recovery', message: '🌟 Economic recovery! Markets stabilizing.', stocks: ['TECH', 'HEAL', 'ENER', 'FOOD', 'AUTO'], multiplier: 1.1 }
        ];
        
        this.initializeStockHistory();
    }
    
    initializeStockHistory() {
        Object.keys(this.gameState.stocks).forEach(symbol => {
            this.gameState.stocks[symbol].history = [100];
        });
    }
    
    updateStockPrices() {
        const volatility = 0.15;
        
        Object.keys(this.gameState.stocks).forEach(symbol => {
            const stock = this.gameState.stocks[symbol];
            
            const randomFactor = 1 + ((Math.random() - 0.5) * volatility);
            let newPrice = stock.price * randomFactor;
            
            this.gameState.events.forEach(event => {
                if (event.stocks.includes(symbol)) {
                    newPrice *= event.multiplier;
                }
            });
            
            newPrice = Math.max(1, newPrice);
            
            stock.price = Math.round(newPrice * 100) / 100;
            stock.history.push(stock.price);
            
            if (stock.history.length > 20) {
                stock.history.shift();
            }
        });
        
        this.gameState.events = [];
    }
    
    calculatePortfolioValue() {
        let totalValue = this.gameState.cash + this.gameState.savings;
        
        Object.keys(this.gameState.stocks).forEach(symbol => {
            const stock = this.gameState.stocks[symbol];
            totalValue += stock.owned * stock.price;
        });
        
        return Math.round(totalValue * 100) / 100;
    }
    
    calculateScore() {
        const currentValue = this.calculatePortfolioValue();
        const percentageChange = ((currentValue - this.gameState.startingMoney) / this.gameState.startingMoney) * 100;
        this.gameState.score = Math.round(percentageChange * 10) / 10;
        return this.gameState.score;
    }
    
    buyStock(symbol, shares) {
        const stock = this.gameState.stocks[symbol];
        const cost = shares * stock.price;
        
        if (cost <= this.gameState.cash && shares > 0) {
            this.gameState.cash -= cost;
            stock.owned += shares;
            this.gameState.cash = Math.round(this.gameState.cash * 100) / 100;
            
            this.showNotification(`✅ Bought ${shares} shares of ${stock.name} for $${cost.toFixed(2)}`, 'success');
            this.updateDisplay();
            this.animateTransaction('buy', symbol);
            return true;
        } else {
            this.showNotification('❌ Insufficient funds for this purchase!', 'error');
            return false;
        }
    }
    
    sellStock(symbol, shares) {
        const stock = this.gameState.stocks[symbol];
        
        if (shares <= stock.owned && shares > 0) {
            const revenue = shares * stock.price;
            this.gameState.cash += revenue;
            stock.owned -= shares;
            this.gameState.cash = Math.round(this.gameState.cash * 100) / 100;
            
            this.showNotification(`💰 Sold ${shares} shares of ${stock.name} for $${revenue.toFixed(2)}`, 'success');
            this.updateDisplay();
            this.animateTransaction('sell', symbol);
            return true;
        } else {
            this.showNotification('❌ You don\'t own enough shares to sell!', 'error');
            return false;
        }
    }
    
    depositSavings(amount) {
        if (amount <= this.gameState.cash && amount > 0) {
            this.gameState.cash -= amount;
            this.gameState.savings += amount;
            this.gameState.cash = Math.round(this.gameState.cash * 100) / 100;
            this.gameState.savings = Math.round(this.gameState.savings * 100) / 100;
            
            this.showNotification(`🏦 Deposited $${amount.toFixed(2)} to savings`, 'success');
            this.updateDisplay();
            return true;
        } else {
            this.showNotification('❌ Insufficient cash for this deposit!', 'error');
            return false;
        }
    }
    
    withdrawSavings(amount) {
        if (amount <= this.gameState.savings && amount > 0) {
            this.gameState.savings -= amount;
            this.gameState.cash += amount;
            this.gameState.cash = Math.round(this.gameState.cash * 100) / 100;
            this.gameState.savings = Math.round(this.gameState.savings * 100) / 100;
            
            this.showNotification(`💸 Withdrew $${amount.toFixed(2)} from savings`, 'success');
            this.updateDisplay();
            return true;
        } else {
            this.showNotification('❌ Insufficient savings for this withdrawal!', 'error');
            return false;
        }
    }
    
    applySavingsInterest() {
        const interest = this.gameState.savings * this.gameState.savingsRate;
        this.gameState.savings += interest;
        this.gameState.savings = Math.round(this.gameState.savings * 100) / 100;
        
        if (interest > 0) {
            this.showNotification(`💰 Earned $${interest.toFixed(2)} in savings interest!`, 'success');
        }
    }
    
    triggerRandomEvent() {
        if (Math.random() < 0.3) {
            const event = this.marketEvents[Math.floor(Math.random() * this.marketEvents.length)];
            this.gameState.events.push(event);
            this.showNotification(event.message, 'event');
        }
    }
    
    nextYear() {
        if (this.gameState.year >= this.gameState.maxYears) {
            this.endGame();
            return;
        }
        
        this.gameState.year++;
        
        this.applySavingsInterest();
        
        this.triggerRandomEvent();
        
        this.updateStockPrices();
        
        this.gameState.totalMoney = this.calculatePortfolioValue();
        
        this.calculateScore();
        
        this.updateDisplay();
        this.updateCharts();
        
        this.animateYearChange();
        
        if (this.gameState.year % this.gameState.yearsPer5YearCycle === 0) {
            this.pause5YearCycle();
        }
    }
    
    pause5YearCycle() {
        clearInterval(this.gameTimer);
        this.gameState.isPlaying = false;
        this.gameState.isWaitingToContinue = true;
        
        const currentValue = this.calculatePortfolioValue();
        const score = this.calculateScore();
        
        this.show5YearSummary(this.gameState.year, currentValue, score);
        
        const continueBtn = document.getElementById('continueBtn');
        
        if (this.gameState.year >= this.gameState.maxYears) {
            continueBtn.innerHTML = '🏁 Finish Journey';
        } else {
            const yearsRemaining = this.gameState.maxYears - this.gameState.year;
            continueBtn.innerHTML = `▶️ Continue Next ${Math.min(5, yearsRemaining)} Years`;
        }
        
        document.getElementById('startBtn').style.display = 'none';
        document.getElementById('pauseBtn').style.display = 'none';
        continueBtn.style.display = 'inline-block';
        document.getElementById('resetBtn').style.display = 'inline-block';
    }
    
    show5YearSummary(year, currentValue, score) {
        const yearsCompleted = `Year ${year}`;
        const yearsRemaining = this.gameState.maxYears - year;
        let nextPhase;
        
        if (year >= this.gameState.maxYears) {
            nextPhase = 'Investment Complete!';
        } else if (yearsRemaining <= 5) {
            nextPhase = `Final Phase: Years ${year + 1}-${this.gameState.maxYears}`;
        } else {
            nextPhase = `Next: Years ${year + 1}-${Math.min(year + 5, this.gameState.maxYears)}`;
        }
        
        this.showNotification(
            `🎯 ${yearsCompleted} Complete! Portfolio: $${currentValue.toFixed(2)} | Score: ${score >= 0 ? '+' : ''}${score}% | ${nextPhase}`, 
            'event'
        );
    }
    
    continueGame() {
        if (this.gameState.year >= this.gameState.maxYears) {
            this.endGame();
            return;
        }
        
        this.gameState.isPlaying = true;
        this.gameState.isWaitingToContinue = false;
        
        this.gameTimer = setInterval(() => {
            if (!this.gameState.isPaused) {
                this.nextYear();
            }
        }, this.gameState.gameSpeed);
        
        document.getElementById('continueBtn').style.display = 'none';
        document.getElementById('pauseBtn').style.display = 'inline-block';
        
        const endYear = Math.min(this.gameState.year + 5, this.gameState.maxYears);
        
        if (this.gameState.year >= this.gameState.maxYears) {
            this.showNotification(`🏁 Investment journey complete! Final portfolio achieved.`, 'success');
        } else {
            this.showNotification(`🚀 Continuing investment journey! Years ${this.gameState.year + 1}-${endYear}`, 'success');
        }
    }
    
    startGame() {
        this.gameState.isPlaying = true;
        this.gameState.isPaused = false;
        this.gameState.isWaitingToContinue = false;
        
        this.gameTimer = setInterval(() => {
            if (!this.gameState.isPaused) {
                this.nextYear();
            }
        }, this.gameState.gameSpeed);
        
        document.getElementById('startBtn').style.display = 'none';
        document.getElementById('pauseBtn').style.display = 'inline-block';
        document.getElementById('continueBtn').style.display = 'none';
        document.getElementById('resetBtn').style.display = 'inline-block';
        
        this.showNotification('🚀 Starting your 25-year investment journey! First phase: Years 1-5', 'success');
        this.showNotification('💡 Buy and sell stocks, save money, and watch your portfolio grow!', 'info');
    }
    
    pauseGame() {
        this.gameState.isPaused = !this.gameState.isPaused;
        const pauseBtn = document.getElementById('pauseBtn');
        pauseBtn.textContent = this.gameState.isPaused ? '▶️ Resume' : '⏸️ Pause';
    }
    
    resetGame() {
        if (confirm('Are you sure you want to restart the game? Your progress will be lost.')) {
            clearInterval(this.gameTimer);
            this.gameState = {
                year: 1,
                cash: 1000,
                totalMoney: 1000,
                startingMoney: 1000,
                stocks: {
                    'TECH': { name: 'TechCorp', price: 100, owned: 0, history: [], color: '#3b82f6' },
                    'HEAL': { name: 'HealthPlus', price: 100, owned: 0, history: [], color: '#10b981' },
                    'ENER': { name: 'PowerGrid', price: 100, owned: 0, history: [], color: '#f59e0b' },
                    'FOOD': { name: 'FreshMart', price: 100, owned: 0, history: [], color: '#ef4444' },
                    'AUTO': { name: 'DriveMax', price: 100, owned: 0, history: [], color: '#8b5cf6' }
                },
                savings: 0,
                savingsRate: 0.03,
                maxYears: 25,
                yearsPer5YearCycle: 5,
                gameSpeed: 1000,
                isPlaying: false,
                isPaused: false,
                isWaitingToContinue: false,
                events: [],
                score: 0,
                leaderboard: []
            };
            
            this.initializeStockHistory();
            this.updateDisplay();
            this.updateCharts();
            this.clearNotificationsCard();
            
            document.getElementById('continueBtn').innerHTML = '▶️ Continue Next 5 Years';
            
            document.getElementById('startBtn').style.display = 'inline-block';
            document.getElementById('pauseBtn').style.display = 'none';
            document.getElementById('continueBtn').style.display = 'none';
            document.getElementById('resetBtn').style.display = 'none';
        }
    }
    
    endGame() {
        clearInterval(this.gameTimer);
        this.gameState.isPlaying = false;
        
        const finalValue = this.calculatePortfolioValue();
        const finalScore = this.calculateScore();
        const profit = finalValue - this.gameState.startingMoney;
        
        this.saveScoreToDatabase(finalScore, finalValue, this.gameState.year, profit);
        
        const currentHighScore = localStorage.getItem('stockGameHighScore') || 1000;
        if (finalValue > parseFloat(currentHighScore)) {
            localStorage.setItem('stockGameHighScore', finalValue.toString());
            const scoreElement = document.getElementById('stock-high-score');
            if (scoreElement) {
                scoreElement.textContent = `$${finalValue.toFixed(2)}`;
            }
        }
        
        this.showGameResults(finalValue, profit, finalScore);
    }
    
    async saveScoreToDatabase(score, finalValue, yearsPlayed, profitLoss) {
        try {
            const response = await fetch('/FUNDamentals/api/games/score', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    game_name: 'stock-market-simulator',
                    score: score,
                    final_value: finalValue,
                    years_played: yearsPlayed,
                    profit_loss: profitLoss
                })
            });
            
            const result = await response.json();
            if (result.success) {
                console.log('Score saved successfully:', result.score_id);
                
                this.showNotification('🏆 Score saved to leaderboard!', 'success');
                
                if (window.location.pathname.includes('/games') && !window.location.pathname.includes('stock-market')) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
            } else {
                console.error('Failed to save score:', result.error);
                this.showNotification('⚠️ Could not save score to leaderboard', 'error');
            }
        } catch (error) {
            console.error('Error saving score:', error);
            this.showNotification('⚠️ Could not save score to leaderboard', 'error');
        }
    }
    
    showGameResults(finalValue, profit, finalScore) {
        const resultModal = document.createElement('div');
        resultModal.className = 'game-result-modal';
        resultModal.innerHTML = `
            <div class="result-content">
                <h2>🎉 25-Year Investment Journey Complete!</h2>
                <div class="result-stats">
                    <div class="stat-item">
                        <div class="stat-value">$${finalValue.toFixed(2)}</div>
                        <div class="stat-label">Final Portfolio Value</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value ${profit >= 0 ? 'positive' : 'negative'}">
                            ${profit >= 0 ? '+' : ''}$${profit.toFixed(2)}
                        </div>
                        <div class="stat-label">Total ${profit >= 0 ? 'Profit' : 'Loss'}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value ${finalScore >= 0 ? 'positive' : 'negative'} score-highlight">
                            ${finalScore >= 0 ? '+' : ''}${finalScore}%
                        </div>
                        <div class="stat-label">Final Score</div>
                    </div>
                </div>
                <div class="result-message">
                    ${this.getResultMessage(finalScore)}
                </div>
                <div class="score-breakdown">
                    <h4>Score Breakdown:</h4>
                    <p>Your score is based on the percentage change from your starting $1,000.</p>
                    <p><strong>Starting Money:</strong> $${this.gameState.startingMoney.toFixed(2)}</p>
                    <p><strong>Final Value:</strong> $${finalValue.toFixed(2)}</p>
                    <p><strong>Score Formula:</strong> ((${finalValue.toFixed(2)} - ${this.gameState.startingMoney.toFixed(2)}) ÷ ${this.gameState.startingMoney.toFixed(2)}) × 100 = ${finalScore}%</p>
                </div>
                <div class="result-actions">
                    <button class="btn btn-accent" onclick="game.resetGame(); this.parentElement.parentElement.parentElement.remove();">
                        🔄 Play Again
                    </button>
                    <button class="btn" onclick="this.parentElement.parentElement.parentElement.remove();">
                        📊 View Portfolio
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(resultModal);
    }
    
    getResultMessage(score) {
        if (score >= 500) return "🚀 Legendary Investor! You've achieved extraordinary returns!";
        if (score >= 200) return "🌟 Master Investor! You've built incredible wealth!";
        if (score >= 100) return "💎 Expert Investor! You've doubled your money!";
        if (score >= 50) return "👑 Great Investor! Excellent returns over 25 years!";
        if (score >= 20) return "👍 Good Investor! You beat most market averages!";
        if (score >= 0) return "💪 Positive Returns! You made money and learned a lot!";
        if (score >= -20) return "📚 Learning Experience! Every investor faces challenges.";
        return "🎯 Keep Learning! Investing is a skill that improves with practice.";
    }
    
    animateTransaction(type, symbol) {
        const stockElement = document.querySelector(`[data-stock="${symbol}"]`);
        if (stockElement) {
            stockElement.classList.add(type === 'buy' ? 'flash-green' : 'flash-red');
            setTimeout(() => {
                stockElement.classList.remove('flash-green', 'flash-red');
            }, 500);
        }
    }
    
    animateYearChange() {
        const yearElement = document.getElementById('currentYear');
        if (yearElement) {
            yearElement.classList.add('year-change');
            setTimeout(() => {
                yearElement.classList.remove('year-change');
            }, 500);
        }
    }
    
    showNotification(message, type) {
        this.addNotificationToCard(message, type);
    }
    
    addNotificationToCard(message, type) {
        const notificationsList = document.getElementById('notificationsList');
        if (!notificationsList) return;
        
        const emptyMessage = notificationsList.querySelector('.notifications-empty');
        if (emptyMessage) {
            emptyMessage.remove();
        }
        
        const notificationItem = document.createElement('div');
        notificationItem.className = `notification-item ${type}`;
        
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        notificationItem.innerHTML = `
            <div>${message}</div>
            <div class="notification-timestamp">Year ${this.gameState.year} • ${timestamp}</div>
        `;
        
        notificationsList.insertBefore(notificationItem, notificationsList.firstChild);
        
        const items = notificationsList.querySelectorAll('.notification-item');
        if (items.length > 10) {
            items[items.length - 1].remove();
        }
        
        notificationsList.scrollTop = 0;
    }
    
    clearNotificationsCard() {
        const notificationsList = document.getElementById('notificationsList');
        if (!notificationsList) return;
        
        notificationsList.innerHTML = '<div class="notifications-empty">No events yet. Start the game to see market updates!</div>';
    }
    
    updateDisplay() {
        document.getElementById('currentYear').textContent = this.gameState.year;
        document.getElementById('availableCash').textContent = this.gameState.cash.toFixed(2);
        document.getElementById('totalValue').textContent = this.calculatePortfolioValue().toFixed(2);
        document.getElementById('savingsAmount').textContent = this.gameState.savings.toFixed(2);
        
        const currentScore = this.calculateScore();
        const scoreElement = document.getElementById('currentScore');
        if (scoreElement) {
            scoreElement.textContent = `${currentScore >= 0 ? '+' : ''}${currentScore}%`;
            scoreElement.className = `stat-value ${currentScore >= 0 ? 'positive' : 'negative'}`;
        }
        
        const savingsDisplay = document.getElementById('savingsDisplay');
        if (savingsDisplay) {
            savingsDisplay.textContent = this.gameState.savings.toFixed(2);
        }
        
        Object.keys(this.gameState.stocks).forEach(symbol => {
            const stock = this.gameState.stocks[symbol];
            const stockElement = document.querySelector(`[data-stock="${symbol}"]`);
            
            if (stockElement) {
                stockElement.querySelector('.stock-price').textContent = `$${stock.price.toFixed(2)}`;
                stockElement.querySelector('.owned-shares').textContent = stock.owned;
                stockElement.querySelector('.stock-value').textContent = `$${(stock.owned * stock.price).toFixed(2)}`;
                
                const priceChange = this.calculatePriceChange(stock);
                const changeElement = stockElement.querySelector('.price-change');
                if (changeElement) {
                    changeElement.textContent = `${priceChange >= 0 ? '+' : ''}${priceChange.toFixed(1)}%`;
                    changeElement.className = `price-change ${priceChange >= 0 ? 'positive' : 'negative'}`;
                }
            }
        });
        
        const progress = (this.gameState.year / this.gameState.maxYears) * 100;
        const progressBar = document.getElementById('gameProgress');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
        
        const progressYearIndicator = document.getElementById('progressYearIndicator');
        if (progressYearIndicator) {
            progressYearIndicator.textContent = `Year ${this.gameState.year} of ${this.gameState.maxYears}`;
        }
    }
    
    calculatePriceChange(stock) {
        if (stock.history.length < 2) return 0;
        
        const currentPrice = stock.history[stock.history.length - 1];
        const previousPrice = stock.history[stock.history.length - 2];
        
        return ((currentPrice - previousPrice) / previousPrice) * 100;
    }
    
    updateCharts() {
        Object.keys(this.gameState.stocks).forEach(symbol => {
            this.updateStockChart(symbol);
        });
        
        this.updatePortfolioChart();
    }
    
    updateStockChart(symbol) {
        const stock = this.gameState.stocks[symbol];
        const canvas = document.getElementById(`chart-${symbol}`);
        
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.clearRect(0, 0, width, height);
        
        if (stock.history.length < 2) return;
        
        const minPrice = Math.min(...stock.history);
        const maxPrice = Math.max(...stock.history);
        const priceRange = maxPrice - minPrice || 1;
        
        ctx.beginPath();
        ctx.strokeStyle = stock.color;
        ctx.lineWidth = 2;
        
        stock.history.forEach((price, index) => {
            const x = (index / (stock.history.length - 1)) * width;
            const y = height - ((price - minPrice) / priceRange) * height;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, stock.color + '40');
        gradient.addColorStop(1, stock.color + '10');
        
        ctx.fillStyle = gradient;
        ctx.fill();
    }
    
    updatePortfolioChart() {
        this.updatePortfolioDonut();
    }
    
    updatePortfolioDonut() {
        const canvas = document.getElementById('portfolioChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 10;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const totalValue = this.calculatePortfolioValue();
        const portfolioData = [];
        
        if (this.gameState.cash > 0) {
            portfolioData.push({
                label: 'Cash',
                value: this.gameState.cash,
                color: '#64748b'
            });
        }
        
        if (this.gameState.savings > 0) {
            portfolioData.push({
                label: 'Savings',
                value: this.gameState.savings,
                color: '#16a34a'
            });
        }
        
        Object.keys(this.gameState.stocks).forEach(symbol => {
            const stock = this.gameState.stocks[symbol];
            const value = stock.owned * stock.price;
            if (value > 0) {
                portfolioData.push({
                    label: stock.name,
                    value: value,
                    color: stock.color
                });
            }
        });
        
        if (portfolioData.length === 0) return;
        
        let currentAngle = -Math.PI / 2;
        
        portfolioData.forEach(item => {
            const sliceAngle = (item.value / totalValue) * 2 * Math.PI;
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.arc(centerX, centerY, radius * 0.6, currentAngle + sliceAngle, currentAngle, true);
            ctx.closePath();
            
            ctx.fillStyle = item.color;
            ctx.fill();
            
            currentAngle += sliceAngle;
        });
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI);
        ctx.fillStyle = '#f8fafc';
        ctx.fill();
        
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 14px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Portfolio', centerX, centerY - 5);
        ctx.font = '12px Inter';
        ctx.fillText(`$${totalValue.toFixed(0)}`, centerX, centerY + 10);
    }
    
    handleStockAction(symbol, action) {
        const input = document.getElementById(`${action}-${symbol}-input`);
        const shares = parseInt(input.value) || 0;
        
        if (shares <= 0) {
            this.showNotification('❌ Please enter a valid number of shares!', 'error');
            return;
        }
        
        if (action === 'buy') {
            this.buyStock(symbol, shares);
        } else if (action === 'sell') {
            this.sellStock(symbol, shares);
        }
        
        input.value = '';
    }
    
    handleSavingsAction(action) {
        const input = document.getElementById(`${action}-savings-input`);
        const amount = parseFloat(input.value) || 0;
        
        if (amount <= 0) {
            this.showNotification('❌ Please enter a valid amount!', 'error');
            return;
        }
        
        if (action === 'deposit') {
            this.depositSavings(amount);
        } else if (action === 'withdraw') {
            this.withdrawSavings(amount);
        }
        
        input.value = '';
    }
    
    startTutorial() {
        setTimeout(() => {
            if (typeof introJs !== 'undefined') {
                const intro = introJs();
                intro.setOptions({
                    tooltipClass: 'stock-market-tour-tooltip',
                    highlightClass: 'introjs-highlight',
                    exitOnEsc: true,
                    exitOnOverlayClick: false,
                    showStepNumbers: true,
                    showProgress: true,
                    showButtons: true,
                    showBullets: false,
                    nextLabel: 'Next →',
                    prevLabel: '← Back',
                    doneLabel: 'Start Trading! 🚀',
                    skipLabel: 'Skip'
                });
                
                intro.start();
            }
        }, 500);
    }
    
    restartTutorial() {
        if (typeof introJs !== 'undefined') {
            const intro = introJs();
            intro.setOptions({
                tooltipClass: 'stock-market-tour-tooltip',
                highlightClass: 'introjs-highlight',
                exitOnEsc: true,
                exitOnOverlayClick: false,
                showStepNumbers: true,
                showProgress: true,
                showButtons: true,
                showBullets: false,
                nextLabel: 'Next →',
                prevLabel: '← Back',
                doneLabel: 'Start Trading! 🚀',
                skipLabel: 'Skip'
            });
            
            intro.start();
        }
    }
}

function initStockMarketGame() {
    window.game = new StockMarketGame();
    
    const gameContainer = document.getElementById('stock-market-game');
    gameContainer.innerHTML = `
        <div class="stock-game-container">
            <div class="game-header-stats">
                <div class="stat-card">
                    <div class="stat-label">Year</div>
                    <div class="stat-value" id="currentYear">1</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Available Cash</div>
                    <div class="stat-value cash" id="availableCash">1000.00</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Total Portfolio Value</div>
                    <div class="stat-value total" id="totalValue">1000.00</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Current Score</div>
                    <div class="stat-value" id="currentScore">+0.0%</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Savings Account</div>
                    <div class="stat-value savings" id="savingsAmount">0.00</div>
                </div>
            </div>
            
            <div class="game-controls-container">
                <div class="game-controls">
                    <div class="game-buttons">
                        <button id="startBtn" class="btn btn-accent" onclick="game.startGame()" data-intro="Once you've made your initial investments, click this button to start your 25-year investment journey! The game will simulate years passing and show you how your investments perform." data-step="4">🚀 Start Investing!</button>
                        <button id="pauseBtn" class="btn" onclick="game.pauseGame()" style="display: none;">⏸️ Pause</button>
                        <button id="continueBtn" class="btn btn-accent" onclick="game.continueGame()" style="display: none;">▶️ Continue Next 5 Years</button>
                        <button id="resetBtn" class="btn" onclick="game.resetGame()" style="display: none;">🔄 Reset</button>
                    </div>
                    <div class="game-progress-container">
                        <div class="progress-label">
                            <span>25-Year Investment Journey</span>
                            <span class="progress-year-indicator" id="progressYearIndicator">Year 1 of 25</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" id="gameProgress" style="width: 4%;"></div>
                        </div>
                    </div>
                </div>
                
                <div class="notifications-card">
                    <div class="notifications-header">
                        <span>📢</span>
                        <span>Game Events</span>
                        <button class="help-tutorial-btn" onclick="game.restartTutorial()" title="Show tutorial again">
                            <span>❓</span>
                        </button>
                    </div>
                    <div class="notifications-list" id="notificationsList">
                        <div class="notifications-empty">No events yet. Start the game to see market updates!</div>
                    </div>
                </div>
            </div>
            
            <div class="game-main">
                <div class="stocks-section">
                    <h3>📈 Available Stocks</h3>
                    <div class="stocks-grid">
                        ${Object.keys(window.game.gameState.stocks).map(symbol => {
                            const stock = window.game.gameState.stocks[symbol];
                            const stepNumber = Object.keys(window.game.gameState.stocks).indexOf(symbol) + 1;
                            const isFirstStock = stepNumber === 1;
                            const isSecondStock = stepNumber === 2;
                            
                            return `
                                <div class="stock-card" data-stock="${symbol}" ${isFirstStock ? 'data-intro="Let\'s start by buying some stock! Enter the number of shares you want to buy in this box, then click the Buy button. Try buying 5 shares of TechCorp." data-step="1"' : ''}>
                                    <div class="stock-header">
                                        <div class="stock-info">
                                            <div class="stock-name">${stock.name}</div>
                                            <div class="stock-symbol">${symbol}</div>
                                        </div>
                                        <div class="stock-price-info">
                                            <div class="stock-price">$${stock.price.toFixed(2)}</div>
                                            <div class="price-change">0.0%</div>
                                        </div>
                                    </div>
                                    
                                    <div class="stock-chart-container">
                                        <canvas id="chart-${symbol}" width="200" height="60"></canvas>
                                    </div>
                                    
                                    <div class="stock-portfolio">
                                        <div class="portfolio-info">
                                            <span>Owned: <strong class="owned-shares">0</strong> shares</span>
                                            <span>Value: <strong class="stock-value">$0.00</strong></span>
                                        </div>
                                    </div>
                                    
                                    <div class="stock-actions">
                                        <div class="action-group">
                                            <input type="number" id="buy-${symbol}-input" placeholder="Shares" min="1" max="1000">
                                            <button class="btn buy-btn" onclick="game.handleStockAction('${symbol}', 'buy')">
                                                💰 Buy
                                            </button>
                                        </div>
                                        <div class="action-group" ${isSecondStock ? 'data-intro="After owning stocks, you can sell them anytime. Enter the number of shares to sell and click Sell. This is useful when stock prices are high!" data-step="2"' : ''}>
                                            <input type="number" id="sell-${symbol}-input" placeholder="Shares" min="1">
                                            <button class="btn sell-btn" onclick="game.handleStockAction('${symbol}', 'sell')">
                                                💸 Sell
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                
                <div class="game-sidebar">
                    <div class="sidebar-section">
                        <h4>📊 Portfolio Overview</h4>
                        <div class="portfolio-chart-container">
                            <canvas id="portfolioChart" width="200" height="200"></canvas>
                        </div>
                    </div>
                    
                    <div class="sidebar-section" data-intro="Don't forget about your savings account! It earns 3% interest per year. Deposit some money here for steady, guaranteed growth. Try depositing $100." data-step="3">
                        <h4>🏦 Savings Account</h4>
                        <div class="savings-info">
                            <p>Interest Rate: <strong>3.0% per year</strong></p>
                            <p>Current Balance: <strong>$<span id="savingsDisplay">0.00</span></strong></p>
                        </div>
                        <div class="savings-actions">
                            <div class="action-group">
                                <input type="number" id="deposit-savings-input" placeholder="Amount" min="1" step="0.01">
                                <button class="btn deposit-btn" onclick="game.handleSavingsAction('deposit')">
                                    ⬇️ Deposit
                                </button>
                            </div>
                            <div class="action-group">
                                <input type="number" id="withdraw-savings-input" placeholder="Amount" min="1" step="0.01">
                                <button class="btn withdraw-btn" onclick="game.handleSavingsAction('withdraw')">
                                    ⬆️ Withdraw
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="sidebar-section" data-intro="Finally, check out these helpful tips for successful investing! Remember: diversify your investments, be patient, and don't panic when prices fluctuate. Good luck on your 25-year journey!" data-step="5">
                        <h4>💡 Beginner Tips</h4>
                        <div class="tips-container">
                            <div class="tip">
                                <strong>5-Year Cycles:</strong> The game pauses every 5 years to let you review and adjust your strategy.
                            </div>
                            <div class="tip">
                                <strong>Score System:</strong> Your score is the percentage change from your starting $1,000.
                            </div>
                            <div class="tip">
                                <strong>Diversify:</strong> Don't put all your money in one stock!
                            </div>
                            <div class="tip">
                                <strong>Save Money:</strong> Keep some cash in savings for emergencies.
                            </div>
                            <div class="tip">
                                <strong>Be Patient:</strong> Stock prices go up and down - stay calm!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    window.game.updateDisplay();
    window.game.updateCharts();
    
    window.game.startTutorial();
}

document.addEventListener('DOMContentLoaded', function() {
    const highScore = localStorage.getItem('stockGameHighScore');
    if (highScore) {
        const scoreElement = document.getElementById('stock-high-score');
        if (scoreElement) {
            scoreElement.textContent = `$${parseFloat(highScore).toFixed(2)}`;
        }
    }
}); 