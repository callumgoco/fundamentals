<div class="module-container">
    <div class="module-header">
        <h2>Saving and Goal Setting</h2>
    </div>
    
    <div class="progress-indicator-wrapper">
        <div class="progress-indicator">
            <div class="progress-step active" data-step="1">
                <div class="step-number">1</div>
                <div class="step-label">Introduction</div>
            </div>
            <div class="progress-connector"></div>
            <div class="progress-step" data-step="2">
                <div class="step-number">2</div>
                <div class="step-label">Pre-Quiz</div>
            </div>
            <div class="progress-connector"></div>
            <div class="progress-step" data-step="3">
                <div class="step-number">3</div>
                <div class="step-label">Challenge</div>
            </div>
            <div class="progress-connector"></div>
            <div class="progress-step" data-step="4">
                <div class="step-number">4</div>
                <div class="step-label">Post-Quiz</div>
            </div>
        </div>
    </div>

    <div class="module-content">
        <div class="module-step" id="step-1" style="display: block;">
            <div class="flashcard-container">
                <div class="flashcard-wrapper">
                    <div class="flashcard-counter">
                        <span id="current-card">1</span> of <span id="total-cards">5</span>
                    </div>
                    
                    <div class="flashcard active" id="card-1">
                        <div class="card-content">
                            <h3>What is Saving?</h3>
                            <p>Saving is setting aside money from your income for future use, whether for emergencies, goals, or investments. It's the foundation of financial security and allows you to build wealth over time.</p>
                            <div class="highlight-box">
                                <strong>Think of it as:</strong> Paying your future self first! Every pound saved today is a pound that can work for you tomorrow.
                            </div>
                            
                            <div class="card-navigation">
                                <button class="card-nav-btn prev-btn" onclick="previousCard()" disabled>
                                    <span>← Previous</span>
                                </button>
                                <div class="card-dots">
                                    <span class="dot active" onclick="goToCard(1)"></span>
                                    <span class="dot" onclick="goToCard(2)"></span>
                                    <span class="dot" onclick="goToCard(3)"></span>
                                    <span class="dot" onclick="goToCard(4)"></span>
                                    <span class="dot" onclick="goToCard(5)"></span>
                                </div>
                                <button class="card-nav-btn next-btn" onclick="nextCard()">
                                    <span>Next →</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flashcard" id="card-2">
                        <div class="card-content">
                            <h3>Emergency Fund</h3>
                            <p>An emergency fund is money set aside specifically for unexpected expenses like job loss, medical bills, or urgent home repairs. This fund provides financial security and prevents you from going into debt during tough times.</p>
                            <div class="savings-target">
                                <div class="target-item">
                                    <div class="target-label">Beginner Goal</div>
                                    <div class="target-amount">£1,000</div>
                                </div>
                                <div class="target-item">
                                    <div class="target-label">Ideal Goal</div>
                                    <div class="target-amount">3-6 months' expenses</div>
                                </div>
                            </div>
                            <div class="tip-box">
                                <strong>Pro tip:</strong> Start small! Even £5 a week adds up to £260 in a year.
                            </div>
                            
                            <div class="card-navigation">
                                <button class="card-nav-btn prev-btn" onclick="previousCard()">
                                    <span>← Previous</span>
                                </button>
                                <div class="card-dots">
                                    <span class="dot" onclick="goToCard(1)"></span>
                                    <span class="dot active" onclick="goToCard(2)"></span>
                                    <span class="dot" onclick="goToCard(3)"></span>
                                    <span class="dot" onclick="goToCard(4)"></span>
                                    <span class="dot" onclick="goToCard(5)"></span>
                                </div>
                                <button class="card-nav-btn next-btn" onclick="nextCard()">
                                    <span>Next →</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flashcard" id="card-3">
                        <div class="card-content">
                            <h3>SMART Saving Goals</h3>
                            <p>Setting SMART goals makes saving more effective and achievable. Each goal should be Specific, Measurable, Achievable, Relevant, and Time-bound.</p>
                            <div class="smart-breakdown">
                                <div class="smart-item">
                                    <div class="smart-letter">S</div>
                                    <div class="smart-word">Specific</div>
                                    <div class="smart-desc">Clear and well-defined</div>
                                </div>
                                <div class="smart-item">
                                    <div class="smart-letter">M</div>
                                    <div class="smart-word">Measurable</div>
                                    <div class="smart-desc">Track your progress</div>
                                </div>
                                <div class="smart-item">
                                    <div class="smart-letter">A</div>
                                    <div class="smart-word">Achievable</div>
                                    <div class="smart-desc">Realistic and possible</div>
                                </div>
                                <div class="smart-item">
                                    <div class="smart-letter">R</div>
                                    <div class="smart-word">Relevant</div>
                                    <div class="smart-desc">Meaningful to you</div>
                                </div>
                                <div class="smart-item">
                                    <div class="smart-letter">T</div>
                                    <div class="smart-word">Time-bound</div>
                                    <div class="smart-desc">Has a deadline</div>
                                </div>
                            </div>
                            
                            <div class="card-navigation">
                                <button class="card-nav-btn prev-btn" onclick="previousCard()">
                                    <span>← Previous</span>
                                </button>
                                <div class="card-dots">
                                    <span class="dot" onclick="goToCard(1)"></span>
                                    <span class="dot" onclick="goToCard(2)"></span>
                                    <span class="dot active" onclick="goToCard(3)"></span>
                                    <span class="dot" onclick="goToCard(4)"></span>
                                    <span class="dot" onclick="goToCard(5)"></span>
                                </div>
                                <button class="card-nav-btn next-btn" onclick="nextCard()">
                                    <span>Next →</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flashcard" id="card-4">
                        <div class="card-content">
                            <h3>Saving Strategies</h3>
                            <p>There are many effective ways to save money. The key is finding strategies that work for your lifestyle and income level.</p>
                            <div class="strategies-grid">
                                <div class="strategy-item">
                                    <div class="strategy-icon">🏦</div>
                                    <div class="strategy-title">Pay Yourself First</div>
                                    <div class="strategy-desc">Save before you spend</div>
                                </div>
                                <div class="strategy-item">
                                    <div class="strategy-icon">📱</div>
                                    <div class="strategy-title">Automate Savings</div>
                                    <div class="strategy-desc">Set up automatic transfers</div>
                                </div>
                                <div class="strategy-item">
                                    <div class="strategy-icon">🏷️</div>
                                    <div class="strategy-title">Use Coupons & Deals</div>
                                    <div class="strategy-desc">Save on everyday purchases</div>
                                </div>
                                <div class="strategy-item">
                                    <div class="strategy-icon">🎁</div>
                                    <div class="strategy-title">Save Windfalls</div>
                                    <div class="strategy-desc">Bank bonuses and gifts</div>
                                </div>
                            </div>
                            
                            <div class="card-navigation">
                                <button class="card-nav-btn prev-btn" onclick="previousCard()">
                                    <span>← Previous</span>
                                </button>
                                <div class="card-dots">
                                    <span class="dot" onclick="goToCard(1)"></span>
                                    <span class="dot" onclick="goToCard(2)"></span>
                                    <span class="dot" onclick="goToCard(3)"></span>
                                    <span class="dot active" onclick="goToCard(4)"></span>
                                    <span class="dot" onclick="goToCard(5)"></span>
                                </div>
                                <button class="card-nav-btn next-btn" onclick="nextCard()">
                                    <span>Next →</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flashcard" id="card-5">
                        <div class="card-content">
                            <h3>The Power of Compound Interest</h3>
                            <p>Compound interest is when you earn interest on both your original savings and the interest you've already earned. This creates exponential growth over time.</p>
                            <div class="compound-example">
                                <div class="example-scenario">
                                    <h4>Example: Saving £100/month</h4>
                                    <div class="timeline">
                                        <div class="timeline-item">
                                            <div class="timeline-year">Year 1</div>
                                            <div class="timeline-amount">£1,200</div>
                                        </div>
                                        <div class="timeline-item">
                                            <div class="timeline-year">Year 10</div>
                                            <div class="timeline-amount">£15,500</div>
                                        </div>
                                        <div class="timeline-item">
                                            <div class="timeline-year">Year 20</div>
                                            <div class="timeline-amount">£44,000</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="success-tip">
                                <h4>💡 Einstein's favorite financial concept!</h4>
                                <p>He called compound interest "the eighth wonder of the world" - start early and let time work in your favor.</p>
                            </div>

                            <div class="card-navigation">
                                <button class="card-nav-btn prev-btn" onclick="previousCard()">
                                    <span>← Previous</span>
                                </button>
                                <div class="card-dots">
                                    <span class="dot" onclick="goToCard(1)"></span>
                                    <span class="dot" onclick="goToCard(2)"></span>
                                    <span class="dot" onclick="goToCard(3)"></span>
                                    <span class="dot" onclick="goToCard(4)"></span>
                                    <span class="dot active" onclick="goToCard(5)"></span>
                                </div>
                                <button onclick="nextStep(2);" style="background: var(--accent) !important; color: white !important; padding: 12px 24px !important; border: none !important; border-radius: 24px !important; font-weight: 600 !important; cursor: pointer !important; z-index: 999999 !important;">
                                    Start Pre-Quiz
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="module-step" id="step-2" style="display: none;">
            <div class="card">
                <h3>Pre-Quiz: Test Your Knowledge</h3>
                <p style="margin-bottom: 20px; color: #666;">Let's see what you already know about saving and goal setting! Don't worry if you're not sure - this helps us understand your starting point.</p>
                <form id="pre-quiz-form">
                    <div class="quiz-question">
                        <p>1. What does it mean to "save money"?</p>
                        <label><input type="radio" name="q1" value="a"> Spending money on discounted items</label><br>
                        <label><input type="radio" name="q1" value="b"> Setting aside money for future use instead of spending it now</label><br>
                        <label><input type="radio" name="q1" value="c"> Borrowing money from friends</label><br>
                        <label><input type="radio" name="q1" value="d"> Investing in high-risk stocks</label>
                    </div>
                    <div class="quiz-question">
                        <p>2. What is an emergency fund?</p>
                        <label><input type="radio" name="q2" value="a"> Money for vacation trips</label><br>
                        <label><input type="radio" name="q2" value="b"> Money for buying luxury items</label><br>
                        <label><input type="radio" name="q2" value="c"> Money you lend to family members</label><br>
                        <label><input type="radio" name="q2" value="d"> Money set aside for unexpected expenses like car repairs or medical bills</label>
                    </div>
                    <div class="quiz-question">
                        <p>3. When is the best time to start saving money?</p>
                        <label><input type="radio" name="q3" value="a"> Only after you turn 30</label><br>
                        <label><input type="radio" name="q3" value="b"> After you retire</label><br>
                        <label><input type="radio" name="q3" value="c"> Only when you have a high-paying job</label><br>
                        <label><input type="radio" name="q3" value="d"> As soon as you start earning money</label>
                    </div>
                    <div class="quiz-question">
                        <p>4. Why is it helpful to set a specific savings goal?</p>
                        <label><input type="radio" name="q4" value="a"> To impress your friends</label><br>
                        <label><input type="radio" name="q4" value="b"> Banks require you to have goals</label><br>
                        <label><input type="radio" name="q4" value="c"> It gives you a clear target to work towards</label><br>
                        <label><input type="radio" name="q4" value="d"> It guarantees you will get rich</label>
                    </div>
                    <div class="quiz-question">
                        <p>5. What is the easiest way to build a savings habit?</p>
                        <label><input type="radio" name="q5" value="a"> Save a small amount regularly</label><br>
                        <label><input type="radio" name="q5" value="b"> Save large amounts only when you remember</label><br>
                        <label><input type="radio" name="q5" value="c"> Only save money during good months</label><br>
                        <label><input type="radio" name="q5" value="d"> Wait until you have extra money left over</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit Quiz</button>
                </form>
            </div>
        </div>

        <div class="module-step" id="step-3" style="display: none;">
            <div class="card">
                <h3>FOMO Budget Battle 📱💰</h3>
                <p style="margin-bottom: 20px; color: #666;">You're juggling a student budget while getting bombarded with social invites and spending temptations. Can you manage your money and your social life without blowing your savings?</p>
                
                <div class="fomo-game-container">
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
                        
                        <div class="chat-container" id="chat-container">
                            <div class="chat-messages" id="chat-messages">
                            </div>
                        </div>
                        
                        <div class="response-buttons" id="response-buttons">
                        </div>
                        
                        <div class="round-indicator">
                            <span id="round-text">Round 1 of 5</span>
                        </div>
                    </div>
                    
                    <div class="game-instructions">
                        <h4>How to Play:</h4>
                        <ul>
                            <li>You start with £250 weekly budget</li>
                            <li>Make 10 decisions (one per day)</li>
                            <li>Save £150+ to win the bonus!</li>
                            <li>Balance social life with savings</li>
                            <li>Manage your FOMO levels</li>
                            <li>Score is out of 100 points</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="module-step" id="step-4" style="display: none;">
            <div class="card">
                <h3>Post-Quiz: Apply Your Knowledge</h3>
                <p style="margin-bottom: 20px; color: #666;">Now that you've learned about saving and goal setting and completed the challenge, let's test your understanding!</p>
                <form id="post-quiz-form">
                    <div class="quiz-question">
                        <p>1. If you save £100 per month, how much will you have saved after 1 year?</p>
                        <label><input type="radio" name="q1" value="a"> £1,500</label><br>
                        <label><input type="radio" name="q1" value="b"> £2,000</label><br>
                        <label><input type="radio" name="q1" value="c"> £1,000</label><br>
                        <label><input type="radio" name="q1" value="d"> £1,200</label>
                    </div>
                    <div class="quiz-question">
                        <p>2. You have £200 extra this month. You have no emergency fund, but there's also a concert you really want to attend for £80. What should you do?</p>
                        <label><input type="radio" name="q2" value="a"> Go to the concert and save the remaining £120</label><br>
                        <label><input type="radio" name="q2" value="b"> Spend it all on entertainment since you worked hard</label><br>
                        <label><input type="radio" name="q2" value="c"> Save the full £200 for your emergency fund</label><br>
                        <label><input type="radio" name="q2" value="d"> Buy something expensive you don't really need</label>
                    </div>
                    <div class="quiz-question">
                        <p>3. You want to save £600 for a holiday in 6 months. How much do you need to save each month?</p>
                        <label><input type="radio" name="q3" value="a"> £50</label><br>
                        <label><input type="radio" name="q3" value="b"> £200</label><br>
                        <label><input type="radio" name="q3" value="c"> £150</label><br>
                        <label><input type="radio" name="q3" value="d"> £100</label>
                    </div>
                    <div class="quiz-question">
                        <p>4. Your laptop breaks and costs £400 to replace. You have £300 in your emergency fund. What is the best approach?</p>
                        <label><input type="radio" name="q4" value="a"> Use the £300 from emergency fund and put the remaining £100 on a credit card</label><br>
                        <label><input type="radio" name="q4" value="b"> Don't replace the laptop to avoid spending money</label><br>
                        <label><input type="radio" name="q4" value="c"> Borrow the full £400 from friends</label><br>
                        <label><input type="radio" name="q4" value="d"> Buy a more expensive laptop for £800 since you're already spending money</label>
                    </div>
                    <div class="quiz-question">
                        <p>5. Which of these is the best example of a SMART savings goal?</p>
                        <label><input type="radio" name="q5" value="a"> Save lots of money someday</label><br>
                        <label><input type="radio" name="q5" value="b"> Save £1,000 for an emergency fund by December 31st by setting aside £100 monthly</label><br>
                        <label><input type="radio" name="q5" value="c"> Become rich eventually</label><br>
                        <label><input type="radio" name="q5" value="d"> Save money when I feel like it</label>
                    </div>
                    <div class="quiz-question">
                        <p>6. Why is starting to save early (in your 20s vs 30s) so beneficial?</p>
                        <label><input type="radio" name="q6" value="a"> You have more energy when you're young</label><br>
                        <label><input type="radio" name="q6" value="b"> Compound interest has more time to grow your money</label><br>
                        <label><input type="radio" name="q6" value="c"> Banks give better rates to younger people</label><br>
                        <label><input type="radio" name="q6" value="d"> It's easier to save when you're young</label>
                    </div>
                    <div class="quiz-question">
                        <p>7. You've successfully saved for 3 months but suddenly have unexpected social expenses. What's the best way to stay on track?</p>
                        <label><input type="radio" name="q7" value="a"> Adjust your savings amount temporarily but keep the habit going</label><br>
                        <label><input type="radio" name="q7" value="b"> Stop saving completely until next year</label><br>
                        <label><input type="radio" name="q7" value="c"> Use all your existing savings for social activities</label><br>
                        <label><input type="radio" name="q7" value="d"> Borrow money to maintain the same savings rate</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit Quiz</button>
                </form>
            </div>
        </div>
    </div>
</div>

<style>
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.module-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
}

.module-header {
    text-align: center;
    margin-bottom: 20px;
}

.module-header h2 {
    margin: 0;
    color: #2c3e50;
    font-size: 1.8rem;
    font-weight: 700;
}

.progress-indicator-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
}

.progress-indicator {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(98, 54, 255, 0.05);
    border-radius: 50px;
    padding: 8px 16px;
    border: 1px solid rgba(98, 54, 255, 0.1);
}

.progress-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 8px 12px;
    border-radius: 12px;
    min-width: 60px;
    transition: none;
}

.step-number {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.85rem;
    background: #e9ecef;
    color: #6c757d;
    transition: all 0.3s ease;
}

.step-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #6c757d;
    text-align: center;
    transition: all 0.3s ease;
}

.progress-step.active .step-number {
    background: #6236FF;
    color: white;
    box-shadow: 0 2px 8px rgba(98, 54, 255, 0.3);
}

.progress-step.active .step-label {
    color: #6236FF;
}

.progress-step.completed .step-number {
    background: #28a745;
    color: white;
}

.progress-step.completed .step-label {
    color: #28a745;
}

.progress-connector {
    width: 20px;
    height: 2px;
    background: #e9ecef;
    border-radius: 1px;
    transition: all 0.3s ease;
}

.progress-step.completed + .progress-connector {
    background: #28a745;
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

.quiz-question {
    margin-bottom: 25px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 10px;
}

.quiz-question p {
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 15px;
}

.quiz-question label {
    display: block;
    margin: 10px 0;
    padding: 12px;
    background: white;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
}

.quiz-question label:hover {
    background: #e3f2fd;
    border-color: #667eea;
}

.quiz-question input[type="radio"] {
    margin-right: 12px;
    transform: scale(1.2);
}

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
    border-bottom: 1px solid #eee;
    color: #666;
    position: relative;
    padding-left: 25px;
}

.game-instructions li:before {
    content: "✅";
    position: absolute;
    left: 0;
    top: 8px;
}

.game-instructions li:last-child {
    border-bottom: none;
}

.navigation-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid #dee2e6;
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

.btn:not(.back-btn) {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.btn:not(.back-btn):hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.back-btn {
    background: #6c757d;
    color: white;
}

.back-btn:hover {
    background: #5a6268;
}

.btn:disabled {
    background: #ccc !important;
    cursor: not-allowed !important;
    transform: none !important;
    box-shadow: none !important;
}

.flashcard-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
}

.flashcard-wrapper {
    position: relative;
    min-height: 500px;
    max-width: 1000px;
    margin: 0 auto;
}

.flashcard-counter {
    text-align: center;
    margin-bottom: 20px;
    font-size: 1.1rem;
    color: #666;
    font-weight: 600;
}

.flashcard {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    background: white;
    border-radius: 20px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    opacity: 0;
    transform: translateX(50px) scale(0.95);
    transition: all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
    pointer-events: none;
}

.flashcard.active {
    opacity: 1;
    transform: translateX(0) scale(1);
    pointer-events: all;
}

.flashcard.prev {
    transform: translateX(-50px) scale(0.95);
}

.card-content {
    padding: 40px;
    text-align: center;
}

.card-icon {
    font-size: 3rem;
    margin-bottom: 20px;
    display: block;
}

.flashcard h3 {
    color: #2c3e50;
    margin-bottom: 20px;
    font-size: 1.8rem;
    font-weight: 700;
}

.flashcard p {
    color: #555;
    line-height: 1.6;
    margin-bottom: 20px;
    font-size: 1.1rem;
}

.highlight-box {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 20px;
    border-radius: 15px;
    margin: 20px 0;
    font-size: 1.1rem;
}

.savings-target {
    display: flex;
    gap: 20px;
    margin: 25px 0;
    justify-content: space-around;
    flex-wrap: wrap;
}

.target-item {
    flex: 1;
    min-width: 150px;
    text-align: center;
    padding: 20px;
    border-radius: 15px;
    background: linear-gradient(135deg, #48dbfb, #0abde3);
    color: white;
}

.target-label {
    font-size: 0.9rem;
    opacity: 0.9;
    margin-bottom: 5px;
}

.target-amount {
    font-size: 1.5rem;
    font-weight: 700;
}

.tip-box {
    background: #fff3cd;
    border: 1px solid #ffeaa7;
    border-radius: 15px;
    padding: 20px;
    margin-top: 25px;
}

.tip-box strong {
    color: #856404;
}

.tip-box p {
    color: #856404;
    margin: 0;
}

.smart-breakdown {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    margin: 25px 0;
}

.smart-item {
    text-align: center;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 10px;
    border: 2px solid #667eea;
}

.smart-letter {
    font-size: 2em;
    font-weight: bold;
    color: #667eea;
    margin-bottom: 10px;
}

.smart-word {
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 5px;
}

.smart-desc {
    font-size: 0.9em;
    color: #666;
}

.strategies-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin: 25px 0;
}

.strategy-item {
    text-align: center;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 10px;
    border: 2px solid #28a745;
}

.strategy-icon {
    font-size: 2em;
    margin-bottom: 10px;
}

.strategy-title {
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 8px;
}

.strategy-desc {
    font-size: 0.9em;
    color: #666;
}

.compound-example {
    background: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    margin: 20px 0;
}

.timeline {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
}

.timeline-item {
    text-align: center;
    padding: 15px;
    background: white;
    border-radius: 10px;
    border: 2px solid #667eea;
}

.timeline-year {
    font-weight: 600;
    color: #667eea;
    margin-bottom: 10px;
}

.timeline-amount {
    font-size: 1.3em;
    font-weight: bold;
    color: #28a745;
}

.success-tip {
    background: #d1ecf1;
    border: 1px solid #bee5eb;
    border-radius: 15px;
    padding: 20px;
    margin-top: 25px;
}

.success-tip h4 {
    color: #0c5460;
    margin-bottom: 10px;
}

.success-tip p {
    color: #0c5460;
    margin: 0;
}

.card-navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    padding: 20px 0;
    border-top: 1px solid #eee;
}

.card-nav-btn {
    background: white;
    border: 2px solid #667eea;
    color: #667eea;
    padding: 12px 24px;
    border-radius: 25px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
}

.card-nav-btn:hover:not(:disabled) {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.card-nav-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
}

.card-dots {
    display: flex;
    gap: 10px;
    align-items: center;
}

.dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #ddd;
    cursor: pointer;
    transition: all 0.3s ease;
}

.dot.active {
    background: #667eea;
    transform: scale(1.3);
}

.dot:hover {
    background: #667eea;
    opacity: 0.7;
}

.continue-section {
    text-align: center;
    margin-top: 30px;
    padding: 20px;
    background: white;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.btn {
    padding: 12px 24px;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
}

.btn-primary {
    background: #667eea;
    color: white;
}

.btn-primary:hover {
    background: #5a67d8;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.card {
    background: white;
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    margin-bottom: 20px;
}

.card h3 {
    color: #2c3e50;
    margin-bottom: 20px;
    font-size: 1.8em;
}

.quiz-question {
    margin-bottom: 25px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 10px;
}

.quiz-question p {
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 15px;
}

.quiz-question label {
    display: block;
    margin-bottom: 8px;
    padding: 8px;
    cursor: pointer;
    border-radius: 5px;
    transition: background 0.3s ease;
}

.quiz-question label:hover {
    background: #e9ecef;
}

.quiz-question input[type="radio"] {
    margin-right: 10px;
}

.game-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    margin: 20px 0;
}

.city-grid-container {
    background: #f8f9fa;
    border-radius: 15px;
    padding: 25px;
}

.city-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    margin-top: 20px;
}

.city-cell {
    width: 60px;
    height: 60px;
    border: 2px solid #ddd;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
    cursor: pointer;
    transition: all 0.3s ease;
    background: white;
}

.city-cell:hover {
    border-color: #667eea;
    transform: scale(1.05);
}

.city-cell.selected {
    border-color: #667eea;
    background: #e3f2fd;
}

.game-controls {
    background: white;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.game-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    margin-bottom: 25px;
}

.stat-item {
    text-align: center;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 10px;
    border: 2px solid #28a745;
}

.stat-label {
    font-weight: 600;
    color: #666;
    margin-bottom: 5px;
}

.stat-value {
    font-size: 1.3em;
    font-weight: bold;
    color: #28a745;
}

.action-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 25px;
}

.action-btn {
    padding: 12px 20px;
    border: 2px solid #667eea;
    background: white;
    color: #667eea;
    border-radius: 25px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
}

.action-btn:hover:not(:disabled) {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
}

.action-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
}

.game-actions {
    margin-bottom: 25px;
}

.game-log {
    background: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    max-height: 200px;
    overflow-y: auto;
}

.log-content {
    font-family: monospace;
    font-size: 0.9em;
}

.log-entry {
    margin-bottom: 10px;
    padding: 8px;
    background: white;
    border-radius: 5px;
    border-left: 4px solid #667eea;
}

.game-legend {
    background: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    margin-top: 20px;
}

.legend-items {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 15px;
}

.legend-item {
    font-weight: 600;
    color: #2c3e50;
}

@media (max-width: 768px) {
    .game-layout {
        grid-template-columns: 1fr;
    }
    
    .city-cell {
        width: 50px;
        height: 50px;
        font-size: 1.2em;
    }
    
    .game-stats {
        grid-template-columns: 1fr;
    }
    
    .strategies-grid,
    .smart-breakdown {
        grid-template-columns: 1fr;
    }
    
    .timeline {
        flex-direction: column;
        gap: 15px;
    }
    
    .savings-target {
        flex-direction: column;
        gap: 15px;
    }
}
</style>

<script>
console.log('Saving module script loaded');

let currentStep = 1;
let currentCard = 1;
let totalCards = 5;
let fomoGame = null;

function updateProgressIndicator() {
    const steps = document.querySelectorAll('.progress-step');
    steps.forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index + 1 === currentStep) {
            step.classList.add('active');
        } else if (index + 1 < currentStep) {
            step.classList.add('completed');
        }
    });
}

function showStep(step) {
    document.querySelectorAll('.module-step').forEach(s => s.style.display = 'none');
    document.getElementById(`step-${step}`).style.display = 'block';
    currentStep = step;
    updateProgressIndicator();
    
    if (step === 3) {
        initializeFOMOGame();
    }
}

function nextStep(step) {
    showStep(step);
}

function initModule() {
    let currentCard = 1;
    const totalCards = 5;
    
    window.nextCard = function() {
        if (currentCard < totalCards) {
            document.getElementById(`card-${currentCard}`).classList.remove('active');
            currentCard++;
            document.getElementById(`card-${currentCard}`).classList.add('active');
            updateCardCounter();
            updateCardNavigation();
        }
    };
    
    window.previousCard = function() {
        if (currentCard > 1) {
            document.getElementById(`card-${currentCard}`).classList.remove('active');
            currentCard--;
            document.getElementById(`card-${currentCard}`).classList.add('active');
            updateCardCounter();
            updateCardNavigation();
        }
    };
    
    window.goToCard = function(cardNumber) {
        document.getElementById(`card-${currentCard}`).classList.remove('active');
        currentCard = cardNumber;
        document.getElementById(`card-${currentCard}`).classList.add('active');
        updateCardCounter();
        updateCardNavigation();
    };
    
    function updateCardCounter() {
        document.getElementById('current-card').textContent = currentCard;
    }
    
    function updateCardNavigation() {
        document.querySelectorAll('.card-navigation').forEach(navSection => {
            const dots = navSection.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index + 1 === currentCard);
            });
            
            const prevBtn = navSection.querySelector('.prev-btn');
            const nextBtn = navSection.querySelector('.next-btn');
            
            if (prevBtn) {
                prevBtn.disabled = currentCard === 1;
            }
            if (nextBtn) {
                nextBtn.disabled = currentCard === totalCards;
            }
        });
    }
    
    window.nextStep = function(step) {
        document.querySelectorAll('.module-step').forEach(s => s.style.display = 'none');
        
        document.getElementById(`step-${step}`).style.display = 'block';
        
        document.querySelectorAll('.progress-step').forEach((stepEl, index) => {
            stepEl.classList.remove('active', 'completed');
            if (index + 1 < step) {
                stepEl.classList.add('completed');
            } else if (index + 1 === step) {
                stepEl.classList.add('active');
            }
        });
        
        if (step === 3) {
            initializeFOMOGame();
        }
    };
    
    window.previousStep = function(step) {
        nextStep(step);
    };
    
    showStep(1);
    
    updateCardNavigation();
}

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
                title: "Takeaway Temptation 🍕",
                message: "Too tired to cook? Pizza delivery in 30 mins! 🍕",
                options: [
                    { text: "Order pizza! 🍕 (£25)", cost: 25, socialChange: 1, fomoChange: -3, type: "accept" },
                    { text: "I'll cook something simple 🍳", cost: -25, socialChange: 0, fomoChange: 5, type: "decline" }
                ]
            },
            {
                id: 5,
                title: "Streaming Bundle 📺",
                message: "New streaming service bundle! All your shows in one place! 📱",
                options: [
                    { text: "Sign me up! 📺 (£35)", cost: 35, socialChange: 1, fomoChange: -5, type: "accept" },
                    { text: "I'll stick with what I have 📱", cost: -35, socialChange: 0, fomoChange: 8, type: "decline" }
                ]
            },
            {
                id: 6,
                title: "Coffee Shop Invite ☕",
                message: "Want to grab coffee and catch up? ☕",
                options: [
                    { text: "Sure! ☕ (£8)", cost: 8, socialChange: 2, fomoChange: -3, type: "accept" },
                    { text: "Let's meet at the library instead 📚", cost: -8, socialChange: 1, fomoChange: 5, type: "decline" }
                ]
            },
            {
                id: 7,
                title: "Online Shopping Spree 🛍️",
                message: "New clothes collection just dropped! Limited time offer! 👗",
                options: [
                    { text: "Treat myself! 👗 (£120)", cost: 120, socialChange: 1, fomoChange: -8, type: "accept" },
                    { text: "I'll wait for the next sale 🛒", cost: -120, socialChange: 0, fomoChange: 12, type: "decline" }
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
        
        chatMessages.innerHTML = '';
        responseButtons.innerHTML = '';
        
        this.addMessage(scenario.title, 'incoming');
        this.addMessage(scenario.message, 'incoming');
        
        scenario.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = `response-btn ${option.type}`;
            button.textContent = option.text;
            button.onclick = () => this.makeDecision(option);
            responseButtons.appendChild(button);
        });
        
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
        document.querySelectorAll('.response-btn').forEach(btn => btn.disabled = true);
        
        this.addMessage(option.text, 'outgoing');
        
        this.gameState.budget -= option.cost;
        this.gameState.socialScore += option.socialChange;
        this.gameState.fomoLevel += option.fomoChange;
        
        if (option.type === 'decline') {
            this.gameState.totalSaved += Math.abs(option.cost);
        }
        
        this.gameState.decisions.push({
            round: this.gameState.round,
            choice: option.text,
            cost: option.cost,
            type: option.type
        });
        
        this.gameState.socialScore = Math.max(0, Math.min(10, this.gameState.socialScore));
        this.gameState.fomoLevel = Math.max(0, Math.min(100, this.gameState.fomoLevel));
        
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

        this.gameState.budget += bonusEvent.effect.budget;
        this.gameState.totalSaved += bonusEvent.effect.budget;
        this.gameState.socialScore += bonusEvent.effect.socialChange;
        this.gameState.fomoLevel += bonusEvent.effect.fomoChange;
        
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
    
    calculateScore() {
        let score = 0;
        
        score += 40;
        
        const savingsPoints = Math.min(30, Math.floor(this.gameState.totalSaved / 10) * 3);
        score += savingsPoints;
        
        if (this.gameState.socialScore >= 5) {
            score += Math.min(15, this.gameState.socialScore * 1.5);
        }
        
        if (this.gameState.fomoLevel > 70) {
            score -= Math.min(15, Math.floor(this.gameState.fomoLevel / 10));
        }
        
        if (this.gameState.totalSaved >= 150) {
            score += 15;
        }
        
        return Math.max(0, Math.min(100, score));
    }
    
    endGame() {
        const finalScore = this.calculateScore();
        this.gameState.score = finalScore;
        
        this.addMessage("Game Over! Here's your final breakdown:", 'system');
        this.addMessage(`💰 Total Saved: £${this.gameState.totalSaved}`, 'system');
        this.addMessage(`😬 FOMO Managed: ${Math.round(this.gameState.fomoLevel)}%`, 'system');
        this.addMessage(`🎉 Social Score: ${this.gameState.socialScore}/10`, 'system');
        this.addMessage(`🏆 Final Score: ${finalScore} points`, 'system');
        
        setTimeout(() => {
            this.addMessage("Where did you give in? Could you have saved more without losing your social streak?", 'system');
        }, 2000);
        
        this.saveGameResults(finalScore);
        
        setTimeout(() => {
            if (confirm(`Game completed! Your final score: ${finalScore}. Continue to post-quiz?`)) {
                nextStep(4);
            }
        }, 4000);
    }
    
    saveGameResults(score) {
        const gameData = {
            score: score,
            total_saved: this.gameState.totalSaved,
            final_budget: this.gameState.budget,
            fomo_level: Math.round(this.gameState.fomoLevel),
            social_score: this.gameState.socialScore,
            decisions: this.gameState.decisions
        };
        
        fetch('<?= ($BASE) ?>/modules/saving/game', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(gameData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Game results saved successfully');
            } else {
                console.error('Failed to save game results');
            }
        })
        .catch(error => {
            console.error('Error saving game results:', error);
        });
    }
}

function initializeFOMOGame() {
    fomoGame = new FOMOBudgetBattle();
}

document.getElementById('pre-quiz-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const answers = {
        q1: formData.get('q1'),
        q2: formData.get('q2'),
        q3: formData.get('q3'),
        q4: formData.get('q4'),
        q5: formData.get('q5')
    };

    if (Object.values(answers).some(answer => !answer)) {
        alert('Please answer all questions before submitting.');
        return;
    }

    const correctAnswers = ['b', 'd', 'd', 'c', 'a'];
    let score = 0;
    correctAnswers.forEach((correct, index) => {
        if (answers[`q${index + 1}`] === correct) {
            score++;
        }
    });

    fetch('<?= ($BASE) ?>/modules/saving/pre-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            answers: answers,
            score: score,
            total_questions: 5
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            nextStep(3);
        } else {
            alert('Error saving quiz results. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error saving quiz results. Please try again.');
    });
});

document.getElementById('post-quiz-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const answers = {
        q1: formData.get('q1'),
        q2: formData.get('q2'),
        q3: formData.get('q3'),
        q4: formData.get('q4'),
        q5: formData.get('q5'),
        q6: formData.get('q6'),
        q7: formData.get('q7')
    };

    if (Object.values(answers).some(answer => !answer)) {
        alert('Please answer all questions before submitting.');
        return;
    }

    const correctAnswers = ['d', 'c', 'd', 'a', 'b', 'b', 'a'];
    let score = 0;
    correctAnswers.forEach((correct, index) => {
        if (answers[`q${index + 1}`] === correct) {
            score++;
        }
    });

    fetch('<?= ($BASE) ?>/modules/saving/post-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            answers: answers,
            score: score,
            total_questions: 7
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(`Module completed! Your score: ${score}/7`);
            window.location.href = '<?= ($BASE) ?>/modules';
        } else {
            alert('Error saving quiz results. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error saving quiz results. Please try again.');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    initModule();
    
    const startQuizBtn = document.getElementById('start-quiz-btn');
    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', function(e) {
            console.log('Button clicked via event listener!');
            alert('Button works via event listener!');
            nextStep(2);
        });
    } else {
        console.log('Start quiz button not found!');
    }
});
</script> 