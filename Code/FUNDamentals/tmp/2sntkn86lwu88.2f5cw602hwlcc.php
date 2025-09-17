<link rel="stylesheet" href="<?= ($BASE) ?>/static/css/simulations.css">
<link rel="stylesheet" href="<?= ($BASE) ?>/public/css/dashboard-tour.css">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>
    window.dashboardData = window.dashboardData || {
        onboardingCompleted: <?= ($onboarding_completed ? 'true' : 'false') ?>,
        user: "<?= ($user) ?>"
    };
</script>

<div class="simulations-header">
    <div class="header-content">
        <div class="header-text">
            <h1 class="simulations-title">Financial Calculators</h1>
            <p class="simulations-subtitle">Quick tools to help you make smart money decisions</p>
        </div>
        <div class="simulations-animation-container">
            <div class="lottie-animation-wrapper"></div>
            <dotlottie-wc 
                src="https://lottie.host/555a140a-d229-440c-b236-375ad45fcb0f/euvoxpIyJC.lottie"
                style="width: 184px; height: 184px; position: relative; z-index: 2;"
                speed="1"
                autoplay
                loop>
            </dotlottie-wc>
        </div>
    </div>
</div>

<div class="calculators-grid">
    
    <div class="calculator-preview-card" onclick="openModal('investmentModal')">
        <div class="calculator-header">
            <div class="calculator-icon">
                <i class="material-icons">trending_up</i>
            </div>
            <h3 class="calculator-title">Investment Growth</h3>
            <p class="calculator-subtitle">See your money grow over time</p>
        </div>
        <div class="preview-content">
            <div class="preview-features">
                <div class="feature-item">
                    <i class="material-icons">check_circle</i>
                    <span>Multiple market scenarios</span>
                </div>
                <div class="feature-item">
                    <i class="material-icons">check_circle</i>
                    <span>Long-term growth projection</span>
                </div>
                <div class="feature-item">
                    <i class="material-icons">check_circle</i>
                    <span>Risk level comparison</span>
                </div>
            </div>
            <div class="preview-action">
                <span class="open-tool-btn">
                    <i class="material-icons">launch</i>
                    Open Calculator
                </span>
            </div>
        </div>
    </div>

    <div class="calculator-preview-card" id="budget-calculator" onclick="openModal('budgetModal')">
        <div class="calculator-header">
            <div class="calculator-icon">
                <i class="material-icons">pie_chart</i>
            </div>
            <h3 class="calculator-title">Budget Calculator</h3>
            <p class="calculator-subtitle">Track your income and expenses to see your savings</p>
        </div>
        <div class="preview-content">
            <div class="preview-features">
                <div class="feature-item">
                    <i class="material-icons">check_circle</i>
                    <span>Comprehensive expense tracking</span>
                </div>
                <div class="feature-item">
                    <i class="material-icons">check_circle</i>
                    <span>Monthly & yearly planning</span>
                </div>
                <div class="feature-item">
                    <i class="material-icons">check_circle</i>
                    <span>Visual budget breakdown</span>
                </div>
            </div>
            <div class="preview-action">
                <span class="open-tool-btn">
                    <i class="material-icons">launch</i>
                    Open Calculator
                </span>
            </div>
        </div>
    </div>

    <div class="calculator-preview-card" onclick="openModal('savingsModal')">
        <div class="calculator-header">
            <div class="calculator-icon">
                <i class="material-icons">account_balance</i>
            </div>
            <h3 class="calculator-title">Savings Goal Calculator</h3>
            <p class="calculator-subtitle">Find out when you'll reach your target</p>
        </div>
        <div class="preview-content">
            <div class="preview-features">
                <div class="feature-item">
                    <i class="material-icons">check_circle</i>
                    <span>Goal timeline calculator</span>
                </div>
                <div class="feature-item">
                    <i class="material-icons">check_circle</i>
                    <span>Flexible saving frequency</span>
                </div>
                <div class="feature-item">
                    <i class="material-icons">check_circle</i>
                    <span>Interest-earning accounts</span>
                </div>
            </div>
            <div class="preview-action">
                <span class="open-tool-btn">
                    <i class="material-icons">launch</i>
                    Open Calculator
                </span>
            </div>
        </div>
    </div>

    
    <div class="calculator-preview-card disabled" id="mortgage-calculator">
        <div class="calculator-header">
            <div class="calculator-icon">
                <i class="material-icons">home</i>
            </div>
            <h3 class="calculator-title">How Much Can I Borrow?</h3>
            <p class="calculator-subtitle">Figure out your home buying budget</p>
        </div>
        <div class="preview-content">
            <div class="preview-features">
                <div class="feature-item">
                    <i class="material-icons">check_circle</i>
                    <span>Income-based calculation</span>
                </div>
                <div class="feature-item">
                    <i class="material-icons">check_circle</i>
                    <span>Down payment planning</span>
                </div>
                <div class="feature-item">
                    <i class="material-icons">check_circle</i>
                    <span>Monthly payment breakdown</span>
                </div>
            </div>
            <div class="preview-action">
                <span class="coming-soon-btn">
                    <i class="material-icons">schedule</i>
                    Coming Soon
                </span>
            </div>
        </div>
    </div>

    <div class="calculator-preview-card disabled">
        <div class="calculator-header">
            <div class="calculator-icon">
                <i class="material-icons">savings</i>
            </div>
            <h3 class="calculator-title">GIC Interest Calculator</h3>
            <p class="calculator-subtitle">See how much your guaranteed investment will earn</p>
        </div>
        <div class="preview-content">
            <div class="preview-features">
                <div class="feature-item">
                    <i class="material-icons">check_circle</i>
                    <span>Compare different terms</span>
                </div>
                <div class="feature-item">
                    <i class="material-icons">check_circle</i>
                    <span>Interest rate comparison</span>
                </div>
                <div class="feature-item">
                    <i class="material-icons">check_circle</i>
                    <span>Guaranteed returns</span>
                </div>
            </div>
            <div class="preview-action">
                <span class="coming-soon-btn">
                    <i class="material-icons">schedule</i>
                    Coming Soon
                </span>
            </div>
        </div>
    </div>

    <div class="calculator-preview-card disabled">
        <div class="calculator-header">
            <div class="calculator-icon">
                <i class="material-icons">account_balance_wallet</i>
            </div>
            <h3 class="calculator-title">Budget Generator</h3>
            <p class="calculator-subtitle">Create personalized budgets based on your income and spending style</p>
        </div>
        <div class="preview-content">
            <div class="preview-features">
                <div class="feature-item">
                    <i class="material-icons">check_circle</i>
                    <span>3 spending profiles</span>
                </div>
                <div class="feature-item">
                    <i class="material-icons">check_circle</i>
                    <span>Detailed category breakdown</span>
                </div>
                <div class="feature-item">
                    <i class="material-icons">check_circle</i>
                    <span>Monthly/yearly planning</span>
                </div>
            </div>
            <div class="preview-action">
                <span class="coming-soon-btn">
                    <i class="material-icons">schedule</i>
                    Coming Soon
                </span>
            </div>
        </div>
    </div>

    <div class="calculator-preview-card disabled">
        <div class="calculator-header">
            <div class="calculator-icon">
                <i class="material-icons">apartment</i>
            </div>
            <h3 class="calculator-title">Rent Affordability Calculator</h3>
            <p class="calculator-subtitle">Find out what rent you can comfortably afford</p>
        </div>
        <div class="preview-content">
            <div class="preview-features">
                <div class="feature-item">
                    <i class="material-icons">check_circle</i>
                    <span>25% rule guidance</span>
                </div>
                <div class="feature-item">
                    <i class="material-icons">check_circle</i>
                    <span>Comprehensive expense analysis</span>
                </div>
                <div class="feature-item">
                    <i class="material-icons">check_circle</i>
                    <span>Debt consideration</span>
                </div>
            </div>
            <div class="preview-action">
                <span class="coming-soon-btn">
                    <i class="material-icons">schedule</i>
                    Coming Soon
                </span>
            </div>
        </div>
    </div>
</div>

<div class="modal-overlay" id="modalOverlay" onclick="closeModal()"></div>

<div class="calculator-modal" id="investmentModal">
    <div class="modal-header">
        <h3>Investment Growth Calculator</h3>
        <button class="modal-close-btn" onclick="closeModal()">
            <i class="material-icons">close</i>
        </button>
    </div>
    <div class="modal-content">
            <div class="input-row-inline">
                <div class="input-group">
                    <label for="investment-years">How many years?</label>
                    <input type="number" id="investment-years" value="25" min="1" max="50">
                </div>
                
                <div class="input-group">
                    <label for="initial-amount">Starting amount</label>
                    <div class="input-wrapper">
                        <span class="input-prefix">$</span>
                        <input type="number" id="initial-amount" value="1000" placeholder="1,000">
                    </div>
                </div>
                
                <div class="input-group">
                    <label for="monthly-contribution">Monthly contribution</label>
                    <div class="input-wrapper">
                        <span class="input-prefix">$</span>
                        <input type="number" id="monthly-contribution" value="200" placeholder="200">
                    </div>
                </div>
                
                <div class="input-group">
                    <label for="risk-level">Investment risk level</label>
                    <select id="risk-level">
                        <option value="low">Low risk (Conservative)</option>
                        <option value="medium" selected>Medium risk (Balanced)</option>
                        <option value="high">Higher risk (Growth focused)</option>
                    </select>
                </div>
            </div>
            
            <div class="result-section">
                <div class="investment-results">
                    <div class="scenario good">
                        <div class="scenario-label">Good market</div>
                        <div class="scenario-amount" id="good-scenario">$185,000</div>
                    </div>
                    <div class="scenario average">
                        <div class="scenario-label">Average market</div>
                        <div class="scenario-amount" id="average-scenario">$125,000</div>
                    </div>
                    <div class="scenario poor">
                        <div class="scenario-label">Poor market</div>
                        <div class="scenario-amount" id="poor-scenario">$85,000</div>
                    </div>
                </div>
                <div class="chart-container">
                    <canvas id="investmentChart"></canvas>
                </div>
                <div class="investment-note">*These are estimates based on historical market performance</div>
            </div>
            
            <div class="calculator-actions">
                <button class="btn btn-primary" onclick="calculateInvestment()">Recalculate</button>
                <button class="btn btn-secondary" onclick="resetInvestment()">Reset</button>
            </div>
    </div>
</div>

<div class="calculator-modal" id="budgetModal">
    <div class="modal-header">
        <h3>Budget Calculator</h3>
        <button class="modal-close-btn" onclick="closeModal()">
            <i class="material-icons">close</i>
        </button>
    </div>
    <div class="modal-content">
            <div class="input-group">
                <label for="monthly-income">Monthly after-tax income</label>
                <div class="input-wrapper">
                    <span class="input-prefix">$</span>
                    <input type="number" id="monthly-income" value="3000" placeholder="3,000">
                </div>
            </div>
            
            <div class="expense-section">
                <h4>Monthly Expenses</h4>
                <div class="expense-items" id="monthly-expenses">
                    <div class="expense-item">
                        <select class="expense-category">
                            <option value="rent">Rent / Mortgage</option>
                            <option value="food">Food</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="transportation">Transportation</option>
                            <option value="utilities">Utilities</option>
                        </select>
                        <div class="input-wrapper">
                            <span class="input-prefix">$</span>
                            <input type="number" class="expense-amount" value="600" placeholder="0">
                        </div>
                    </div>
                    <div class="expense-item">
                        <select class="expense-category">
                            <option value="food" selected>Food</option>
                            <option value="rent">Rent / Mortgage</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="transportation">Transportation</option>
                            <option value="utilities">Utilities</option>
                        </select>
                        <div class="input-wrapper">
                            <span class="input-prefix">$</span>
                            <input type="number" class="expense-amount" value="150" placeholder="0">
                        </div>
                    </div>
                    <div class="expense-item">
                        <select class="expense-category">
                            <option value="entertainment" selected>Entertainment</option>
                            <option value="rent">Rent / Mortgage</option>
                            <option value="food">Food</option>
                            <option value="transportation">Transportation</option>
                            <option value="utilities">Utilities</option>
                        </select>
                        <div class="input-wrapper">
                            <span class="input-prefix">$</span>
                            <input type="number" class="expense-amount" value="40" placeholder="0">
                        </div>
                    </div>
                </div>
                <button class="add-expense-btn" onclick="addMonthlyExpense()">
                    <i class="material-icons">add</i> Add another...
                </button>
            </div>

            <div class="expense-section">
                <h4>Yearly Expenses</h4>
                <div class="expense-items" id="yearly-expenses">
                    <div class="expense-item">
                        <select class="expense-category">
                            <option value="medical" selected>Medical</option>
                            <option value="gifts">Gifts</option>
                            <option value="emergency">Emergency</option>
                            <option value="vacation">Vacation</option>
                            <option value="insurance">Insurance</option>
                        </select>
                        <div class="input-wrapper">
                            <span class="input-prefix">$</span>
                            <input type="number" class="expense-amount" value="3000" placeholder="0">
                        </div>
                    </div>
                    <div class="expense-item">
                        <select class="expense-category">
                            <option value="gifts" selected>Gifts</option>
                            <option value="medical">Medical</option>
                            <option value="emergency">Emergency</option>
                            <option value="vacation">Vacation</option>
                            <option value="insurance">Insurance</option>
                        </select>
                        <div class="input-wrapper">
                            <span class="input-prefix">$</span>
                            <input type="number" class="expense-amount" value="500" placeholder="0">
                        </div>
                    </div>
                    <div class="expense-item">
                        <select class="expense-category">
                            <option value="emergency" selected>Emergency</option>
                            <option value="medical">Medical</option>
                            <option value="gifts">Gifts</option>
                            <option value="vacation">Vacation</option>
                            <option value="insurance">Insurance</option>
                        </select>
                        <div class="input-wrapper">
                            <span class="input-prefix">$</span>
                            <input type="number" class="expense-amount" value="1000" placeholder="0">
                        </div>
                    </div>
                </div>
                <button class="add-expense-btn" onclick="addYearlyExpense()">
                    <i class="material-icons">add</i> Add another...
                </button>
            </div>
            
            <div class="result-section">
                <div class="savings-results">
                    <div class="savings-item">
                        <div class="savings-label">Monthly Savings</div>
                        <div class="savings-amount" id="monthly-savings">$1,835</div>
                    </div>
                    <div class="savings-item">
                        <div class="savings-label">Yearly Savings</div>
                        <div class="savings-amount" id="yearly-savings">$22,020</div>
                    </div>
                </div>
                <div class="chart-container">
                    <canvas id="budgetChart"></canvas>
                </div>
            </div>
            
            <div class="calculator-actions">
                <button class="btn btn-primary" onclick="calculateBudget()">Calculate</button>
                <button class="btn btn-secondary" onclick="resetBudget()">Reset</button>
            </div>
    </div>
</div>

<div class="calculator-modal" id="savingsModal">
    <div class="modal-header">
        <h3>Savings Goal Calculator</h3>
        <button class="modal-close-btn" onclick="closeModal()">
            <i class="material-icons">close</i>
        </button>
    </div>
    <div class="modal-content">
            <div class="input-row-inline-three">
                <div class="input-group">
                    <label for="savings-goal">What's your savings goal?</label>
                    <div class="input-wrapper">
                        <span class="input-prefix">$</span>
                        <input type="number" id="savings-goal" value="5000" placeholder="5,000">
                    </div>
                </div>
                
                <div class="input-group">
                    <label for="savings-amount">How much can you save?</label>
                    <div class="input-wrapper">
                        <span class="input-prefix">$</span>
                        <input type="number" id="savings-amount" value="100" placeholder="100">
                    </div>
                </div>
                
                <div class="input-group">
                    <label for="savings-frequency">How often?</label>
                    <select id="savings-frequency">
                        <option value="weekly" selected>Weekly</option>
                        <option value="biweekly">Every 2 weeks</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </div>
            </div>
            
            <div class="result-section">
                <div class="savings-timeline">
                    <div class="timeline-result">
                        <h4>You'll reach your goal in:</h4>
                        <div class="timeline-amount" id="savings-timeline">11 months</div>
                        <div class="timeline-detail">Including interest from a high-yield savings account</div>
                    </div>
                </div>
                <div class="chart-container">
                    <canvas id="savingsChart"></canvas>
                </div>
            </div>
            
                        <div class="calculator-actions">
                <button class="btn btn-primary" onclick="calculateSavings()">Show Me</button>
                <button class="btn btn-secondary" onclick="resetSavings()">Reset</button>
            </div>
    </div>
</div>

<div class="calculator-modal" id="budgetModal">
    <div class="modal-header">
        <h3>Budget Calculator</h3>
        <button class="modal-close-btn" onclick="closeModal()">
            <i class="material-icons">close</i>
        </button>
    </div>
    <div class="modal-content">
            <div class="input-group">
                <label for="monthly-income">Monthly after-tax income</label>
                <div class="input-wrapper">
                    <span class="input-prefix">$</span>
                    <input type="number" id="monthly-income" value="3000" placeholder="3,000">
                </div>
            </div>
            
            <div class="expense-section">
                <h4>Monthly Expenses</h4>
                <div class="expense-items" id="monthly-expenses">
                    <div class="expense-item">
                        <select class="expense-category">
                            <option value="rent">Rent / Mortgage</option>
                            <option value="food">Food</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="transportation">Transportation</option>
                            <option value="utilities">Utilities</option>
                        </select>
                        <div class="input-wrapper">
                            <span class="input-prefix">$</span>
                            <input type="number" class="expense-amount" value="600" placeholder="0">
                        </div>
                    </div>
                    <div class="expense-item">
                        <select class="expense-category">
                            <option value="food" selected>Food</option>
                            <option value="rent">Rent / Mortgage</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="transportation">Transportation</option>
                            <option value="utilities">Utilities</option>
                        </select>
                        <div class="input-wrapper">
                            <span class="input-prefix">$</span>
                            <input type="number" class="expense-amount" value="150" placeholder="0">
                        </div>
                    </div>
                    <div class="expense-item">
                        <select class="expense-category">
                            <option value="entertainment" selected>Entertainment</option>
                            <option value="rent">Rent / Mortgage</option>
                            <option value="food">Food</option>
                            <option value="transportation">Transportation</option>
                            <option value="utilities">Utilities</option>
                        </select>
                        <div class="input-wrapper">
                            <span class="input-prefix">$</span>
                            <input type="number" class="expense-amount" value="40" placeholder="0">
                        </div>
                    </div>
                </div>
                <button class="add-expense-btn" onclick="addMonthlyExpense()">
                    <i class="material-icons">add</i> Add another...
                </button>
            </div>

            <div class="expense-section">
                <h4>Yearly Expenses</h4>
                <div class="expense-items" id="yearly-expenses">
                    <div class="expense-item">
                        <select class="expense-category">
                            <option value="medical" selected>Medical</option>
                            <option value="gifts">Gifts</option>
                            <option value="emergency">Emergency</option>
                            <option value="vacation">Vacation</option>
                            <option value="insurance">Insurance</option>
                        </select>
                        <div class="input-wrapper">
                            <span class="input-prefix">$</span>
                            <input type="number" class="expense-amount" value="3000" placeholder="0">
                        </div>
                    </div>
                    <div class="expense-item">
                        <select class="expense-category">
                            <option value="gifts" selected>Gifts</option>
                            <option value="medical">Medical</option>
                            <option value="emergency">Emergency</option>
                            <option value="vacation">Vacation</option>
                            <option value="insurance">Insurance</option>
                        </select>
                        <div class="input-wrapper">
                            <span class="input-prefix">$</span>
                            <input type="number" class="expense-amount" value="500" placeholder="0">
                        </div>
                    </div>
                    <div class="expense-item">
                        <select class="expense-category">
                            <option value="emergency" selected>Emergency</option>
                            <option value="medical">Medical</option>
                            <option value="gifts">Gifts</option>
                            <option value="vacation">Vacation</option>
                            <option value="insurance">Insurance</option>
                        </select>
                        <div class="input-wrapper">
                            <span class="input-prefix">$</span>
                            <input type="number" class="expense-amount" value="1000" placeholder="0">
                        </div>
                    </div>
                </div>
                <button class="add-expense-btn" onclick="addYearlyExpense()">
                    <i class="material-icons">add</i> Add another...
                </button>
            </div>
            
            <div class="result-section">
                <div class="savings-results">
                    <div class="savings-item">
                        <div class="savings-label">Monthly Savings</div>
                        <div class="savings-amount" id="monthly-savings">$1,835</div>
                    </div>
                    <div class="savings-item">
                        <div class="savings-label">Yearly Savings</div>
                        <div class="savings-amount" id="yearly-savings">$22,020</div>
                    </div>
                </div>
                <div class="chart-container">
                    <canvas id="budgetChart"></canvas>
                </div>
            </div>
            
            <div class="calculator-actions">
                <button class="btn btn-primary" onclick="calculateBudget()">Calculate</button>
                <button class="btn btn-secondary" onclick="resetBudget()">Reset</button>
            </div>
    </div>
</div>

<script>
function openModal(modalId) {
    const scrollY = window.scrollY;
    document.body.style.top = `-${scrollY}px`;
    
    document.getElementById('modalOverlay').style.display = 'block';
    document.getElementById(modalId).style.display = 'block';
    document.body.classList.add('modal-open');
    
    if (modalId === 'mortgageModal') calculateMortgage();
    else if (modalId === 'gicModal') calculateGIC();
    else if (modalId === 'investmentModal') calculateInvestment();
    else if (modalId === 'savingsModal') calculateSavings();
    else if (modalId === 'budgetModal') calculateBudget();
    else if (modalId === 'rentModal') calculateRent();
    else if (modalId === 'budgetGeneratorModal') calculateBudgetGenerator();
}

function closeModal() {
    document.getElementById('modalOverlay').style.display = 'none';
    const modals = document.querySelectorAll('.calculator-modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
    
    document.body.classList.remove('modal-open');
    const scrollY = document.body.style.top;
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
}
let mortgageChart, gicChart, investmentChart, savingsChart, budgetChart, rentChart;

const chartColors = {
    primary: '#6236FF',
    secondary: '#FF6B35',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    gray: '#6b7280'
};

function calculateMortgage() {
    const income = parseFloat(document.getElementById('income').value) || 0;
    const downPayment = parseFloat(document.getElementById('downpayment').value) || 0;
    const monthlyDebt = parseFloat(document.getElementById('monthly-debt').value) || 0;
    const years = parseInt(document.getElementById('loan-years').value) || 25;
    const propertyTax = parseFloat(document.getElementById('property-tax').value) || 0;
    
    const maxMonthlyPayment = (income * 0.4) / 12 - monthlyDebt - (propertyTax / 12);
    const monthlyRate = 0.05 / 12;
    const numPayments = years * 12;
    
    let maxLoan = 0;
    if (maxMonthlyPayment > 0) {
        maxLoan = maxMonthlyPayment * ((1 - Math.pow(1 + monthlyRate, -numPayments)) / monthlyRate);
    }
    
    const totalBudget = Math.max(0, maxLoan + downPayment);
    document.getElementById('mortgage-result').textContent = `$${totalBudget.toLocaleString('en-US', {maximumFractionDigits: 0})}`;
    
    updateMortgageChart(maxLoan, downPayment, maxMonthlyPayment);
}

function updateMortgageChart(loanAmount, downPayment, monthlyPayment) {
    const ctx = document.getElementById('mortgageChart').getContext('2d');
    
    if (mortgageChart) {
        mortgageChart.destroy();
    }
    
    mortgageChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Loan Amount', 'Down Payment'],
            datasets: [{
                data: [loanAmount, downPayment],
                backgroundColor: [chartColors.primary, chartColors.secondary],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 12
                        }
                    }
                },
                title: {
                    display: true,
                    text: `Monthly Payment: $${Math.max(0, monthlyPayment).toLocaleString('en-US', {maximumFractionDigits: 0})}`,
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            }
        }
    });
}

function resetMortgage() {
    document.getElementById('income').value = '50000';
    document.getElementById('downpayment').value = '5000';
    document.getElementById('monthly-debt').value = '0';
    document.getElementById('loan-years').value = '25';
    document.getElementById('property-tax').value = '0';
    calculateMortgage();
}

function calculateGIC() {
    const amount = parseFloat(document.getElementById('gic-amount').value) || 5000;
    const term = parseInt(document.getElementById('gic-term').value) || 180;
    const compareTerm = parseInt(document.getElementById('compare-term').value) || 365;
    
    const rates = {90: 0.0275, 180: 0.03, 365: 0.035, 730: 0.04};
    
    const interest = amount * rates[term] * (term / 365);
    const compareInterest = amount * rates[compareTerm] * (compareTerm / 365);
    
    document.getElementById('gic-interest').textContent = `$${interest.toFixed(2)}`;
    document.getElementById('gic-compare').textContent = `$${compareInterest.toFixed(2)}`;
    
    updateGICChart(amount, interest, compareInterest, term, compareTerm);
}

function updateGICChart(principal, interest1, interest2, term1, term2) {
    const ctx = document.getElementById('gicChart').getContext('2d');
    
    if (gicChart) {
        gicChart.destroy();
    }
    
    const termLabels = {90: '90 days', 180: '6 months', 365: '1 year', 730: '2 years'};
    
    gicChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [termLabels[term1], termLabels[term2]],
            datasets: [{
                label: 'Interest Earned',
                data: [interest1, interest2],
                backgroundColor: [chartColors.primary, chartColors.secondary],
                borderRadius: 8,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: `Investment: $${principal.toLocaleString()}`,
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toFixed(2);
                        }
                    }
                }
            }
        }
    });
}

function resetGIC() {
    document.getElementById('gic-amount').value = '5000';
    document.getElementById('gic-term').value = '180';
    document.getElementById('compare-term').value = '365';
    calculateGIC();
}

function calculateInvestment() {
    const initial = parseFloat(document.getElementById('initial-amount').value) || 1000;
    const monthly = parseFloat(document.getElementById('monthly-contribution').value) || 200;
    const years = parseInt(document.getElementById('investment-years').value) || 25;
    const risk = document.getElementById('risk-level').value;
    
    const returns = {
        low: {good: 0.06, average: 0.04, poor: 0.02},
        medium: {good: 0.08, average: 0.06, poor: 0.03},
        high: {good: 0.12, average: 0.08, poor: 0.04}
    };
    
    function calculateCompound(rate) {
        const monthlyRate = rate / 12;
        const months = years * 12;
        const futureValue = initial * Math.pow(1 + monthlyRate, months) + 
                           monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
        return futureValue;
    }
    
    const goodValue = calculateCompound(returns[risk].good);
    const averageValue = calculateCompound(returns[risk].average);
    const poorValue = calculateCompound(returns[risk].poor);
    
    document.getElementById('good-scenario').textContent = `$${goodValue.toLocaleString('en-US', {maximumFractionDigits: 0})}`;
    document.getElementById('average-scenario').textContent = `$${averageValue.toLocaleString('en-US', {maximumFractionDigits: 0})}`;
    document.getElementById('poor-scenario').textContent = `$${poorValue.toLocaleString('en-US', {maximumFractionDigits: 0})}`;
    
    updateInvestmentChart(initial, monthly, years, returns[risk]);
}

function updateInvestmentChart(initial, monthly, years, rates) {
    const ctx = document.getElementById('investmentChart').getContext('2d');
    
    if (investmentChart) {
        investmentChart.destroy();
    }
    
    const labels = [];
    const goodData = [];
    const averageData = [];
    const poorData = [];
    
    for (let year = 0; year <= years; year += Math.max(1, Math.floor(years / 10))) {
        labels.push(`Year ${year}`);
        
        const months = year * 12;
        
        ['good', 'average', 'poor'].forEach((scenario, index) => {
            const rate = rates[scenario];
            const monthlyRate = rate / 12;
            
            let value = 0;
            if (months > 0) {
                value = initial * Math.pow(1 + monthlyRate, months) + 
                       monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
            } else {
                value = initial;
            }
            
            if (index === 0) goodData.push(value);
            else if (index === 1) averageData.push(value);
            else poorData.push(value);
        });
    }
    
    investmentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Good Market',
                    data: goodData,
                    borderColor: chartColors.success,
                    backgroundColor: chartColors.success + '20',
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Average Market',
                    data: averageData,
                    borderColor: chartColors.warning,
                    backgroundColor: chartColors.warning + '20',
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Poor Market',
                    data: poorData,
                    borderColor: chartColors.danger,
                    backgroundColor: chartColors.danger + '20',
                    fill: false,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 12
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + (value / 1000).toFixed(0) + 'k';
                        }
                    }
                }
            }
        }
    });
}

function resetInvestment() {
    document.getElementById('investment-years').value = '25';
    document.getElementById('initial-amount').value = '1000';
    document.getElementById('monthly-contribution').value = '200';
    document.getElementById('risk-level').value = 'medium';
    calculateInvestment();
}

function calculateSavings() {
    const goal = parseFloat(document.getElementById('savings-goal').value) || 5000;
    const amount = parseFloat(document.getElementById('savings-amount').value) || 100;
    const frequency = document.getElementById('savings-frequency').value;
    
    const frequencyMultiplier = {weekly: 52, biweekly: 26, monthly: 12};
    const annualSavings = amount * frequencyMultiplier[frequency];
    const interestRate = 0.015;
    
    let months = 0;
    let saved = 0;
    const monthlyAmount = annualSavings / 12;
    const monthlyRate = interestRate / 12;
    
    const savingsData = [0];
    const labels = ['Start'];
    
    while (saved < goal && months < 240) {
        saved = saved * (1 + monthlyRate) + monthlyAmount;
        months++;
        
        if (months % 3 === 0 || saved >= goal) {
            savingsData.push(Math.min(saved, goal));
            labels.push(`${months} months`);
        }
    }
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    let timeText = '';
    if (years > 0) {
        timeText += `${years} year${years > 1 ? 's' : ''}`;
        if (remainingMonths > 0) {
            timeText += ` ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
        }
    } else {
        timeText = `${months} month${months > 1 ? 's' : ''}`;
    }
    
    document.getElementById('savings-timeline').textContent = timeText;
    
    updateSavingsChart(goal, savingsData, labels);
}

function updateSavingsChart(goal, data, labels) {
    const ctx = document.getElementById('savingsChart').getContext('2d');
    
    if (savingsChart) {
        savingsChart.destroy();
    }
    
    const goalLine = new Array(data.length).fill(goal);
    
    savingsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Your Savings',
                    data: data,
                    borderColor: chartColors.primary,
                    backgroundColor: chartColors.primary + '20',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Goal',
                    data: goalLine,
                    borderColor: chartColors.secondary,
                    backgroundColor: 'transparent',
                    borderDash: [5, 5],
                    pointRadius: 0,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 12
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

function resetSavings() {
    document.getElementById('savings-goal').value = '5000';
    document.getElementById('savings-amount').value = '100';
    document.getElementById('savings-frequency').value = 'weekly';
    calculateSavings();
}

function calculateBudget() {
    const monthlyIncome = parseFloat(document.getElementById('monthly-income').value) || 0;

    const monthlyExpenseItems = document.querySelectorAll('#monthly-expenses .expense-item');
    let totalMonthlyExpenses = 0;
    monthlyExpenseItems.forEach(item => {
        const amount = parseFloat(item.querySelector('.expense-amount').value) || 0;
        totalMonthlyExpenses += amount;
    });
    
    const yearlyExpenseItems = document.querySelectorAll('#yearly-expenses .expense-item');
    let totalYearlyExpenses = 0;
    yearlyExpenseItems.forEach(item => {
        const amount = parseFloat(item.querySelector('.expense-amount').value) || 0;
        totalYearlyExpenses += amount;
    });
    const monthlyFromYearly = totalYearlyExpenses / 12;
    
    const monthlySavings = monthlyIncome - totalMonthlyExpenses - monthlyFromYearly;
    const yearlySavings = monthlySavings * 12;
    
    document.getElementById('monthly-savings').textContent = `$${monthlySavings.toLocaleString('en-US', {maximumFractionDigits: 0})}`;
    document.getElementById('yearly-savings').textContent = `$${yearlySavings.toLocaleString('en-US', {maximumFractionDigits: 0})}`;
    
    updateBudgetChart(monthlyIncome, totalMonthlyExpenses, monthlyFromYearly, monthlySavings);
}

function updateBudgetChart(income, monthlyExpenses, yearlyExpenses, savings) {
    const ctx = document.getElementById('budgetChart').getContext('2d');
    
    if (budgetChart) {
        budgetChart.destroy();
    }
    
    budgetChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Monthly Expenses', 'Yearly Expenses', 'Savings'],
            datasets: [{
                data: [monthlyExpenses, yearlyExpenses, Math.max(0, savings)],
                backgroundColor: [chartColors.warning, chartColors.danger, chartColors.success],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 12
                        }
                    }
                },
                title: {
                    display: true,
                    text: `Monthly Income: $${income.toLocaleString()}`,
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            }
        }
    });
}

function addMonthlyExpense() {
    const container = document.getElementById('monthly-expenses');
    const newItem = document.createElement('div');
    newItem.className = 'expense-item';
    newItem.innerHTML = `
        <select class="expense-category">
            <option value="utilities">Utilities</option>
            <option value="transportation">Transportation</option>
            <option value="phone">Phone/Internet</option>
            <option value="groceries">Groceries</option>
            <option value="subscription">Subscriptions</option>
        </select>
        <div class="input-wrapper">
            <span class="input-prefix">$</span>
            <input type="number" class="expense-amount" value="0" placeholder="0">
        </div>
        <button class="remove-expense-btn" onclick="removeExpense(this)">
            <i class="material-icons">close</i>
        </button>
    `;
    container.appendChild(newItem);
}

function addYearlyExpense() {
    const container = document.getElementById('yearly-expenses');
    const newItem = document.createElement('div');
    newItem.className = 'expense-item';
    newItem.innerHTML = `
        <select class="expense-category">
            <option value="vacation">Vacation</option>
            <option value="insurance">Insurance</option>
            <option value="taxes">Taxes</option>
            <option value="clothing">Clothing</option>
            <option value="maintenance">Home/Car Maintenance</option>
        </select>
        <div class="input-wrapper">
            <span class="input-prefix">$</span>
            <input type="number" class="expense-amount" value="0" placeholder="0">
        </div>
        <button class="remove-expense-btn" onclick="removeExpense(this)">
            <i class="material-icons">close</i>
        </button>
    `;
    container.appendChild(newItem);
}

function removeExpense(button) {
    button.parentElement.remove();
    calculateBudget();
}

function resetBudget() {
    document.getElementById('monthly-income').value = '3000';
    
    const monthlyContainer = document.getElementById('monthly-expenses');
    monthlyContainer.innerHTML = `
        <div class="expense-item">
            <select class="expense-category">
                <option value="rent">Rent / Mortgage</option>
                <option value="food">Food</option>
                <option value="entertainment">Entertainment</option>
                <option value="transportation">Transportation</option>
                <option value="utilities">Utilities</option>
            </select>
            <div class="input-wrapper">
                <span class="input-prefix">$</span>
                <input type="number" class="expense-amount" value="600" placeholder="0">
            </div>
        </div>
        <div class="expense-item">
            <select class="expense-category">
                <option value="food" selected>Food</option>
                <option value="rent">Rent / Mortgage</option>
                <option value="entertainment">Entertainment</option>
                <option value="transportation">Transportation</option>
                <option value="utilities">Utilities</option>
            </select>
            <div class="input-wrapper">
                <span class="input-prefix">$</span>
                <input type="number" class="expense-amount" value="150" placeholder="0">
            </div>
        </div>
        <div class="expense-item">
            <select class="expense-category">
                <option value="entertainment" selected>Entertainment</option>
                <option value="rent">Rent / Mortgage</option>
                <option value="food">Food</option>
                <option value="transportation">Transportation</option>
                <option value="utilities">Utilities</option>
            </select>
            <div class="input-wrapper">
                <span class="input-prefix">$</span>
                <input type="number" class="expense-amount" value="40" placeholder="0">
            </div>
        </div>
    `;
    
    const yearlyContainer = document.getElementById('yearly-expenses');
    yearlyContainer.innerHTML = `
        <div class="expense-item">
            <select class="expense-category">
                <option value="medical" selected>Medical</option>
                <option value="gifts">Gifts</option>
                <option value="emergency">Emergency</option>
                <option value="vacation">Vacation</option>
                <option value="insurance">Insurance</option>
            </select>
            <div class="input-wrapper">
                <span class="input-prefix">$</span>
                <input type="number" class="expense-amount" value="3000" placeholder="0">
            </div>
        </div>
        <div class="expense-item">
            <select class="expense-category">
                <option value="gifts" selected>Gifts</option>
                <option value="medical">Medical</option>
                <option value="emergency">Emergency</option>
                <option value="vacation">Vacation</option>
                <option value="insurance">Insurance</option>
            </select>
            <div class="input-wrapper">
                <span class="input-prefix">$</span>
                <input type="number" class="expense-amount" value="500" placeholder="0">
            </div>
        </div>
        <div class="expense-item">
            <select class="expense-category">
                <option value="emergency" selected>Emergency</option>
                <option value="medical">Medical</option>
                <option value="gifts">Gifts</option>
                <option value="vacation">Vacation</option>
                <option value="insurance">Insurance</option>
            </select>
            <div class="input-wrapper">
                <span class="input-prefix">$</span>
                <input type="number" class="expense-amount" value="1000" placeholder="0">
            </div>
        </div>
    `;
    
    calculateBudget();
}

function calculateRent() {
    const grossIncome = parseFloat(document.getElementById('gross-income').value) || 0;
    const foodExpenses = parseFloat(document.getElementById('food-expenses').value) || 0;
    const entertainmentExpenses = parseFloat(document.getElementById('entertainment-expenses').value) || 0;
    const gasExpenses = parseFloat(document.getElementById('gas-expenses').value) || 0;
    const otherExpenses = parseFloat(document.getElementById('other-expenses').value) || 0;
    const carPayment = parseFloat(document.getElementById('car-payment').value) || 0;
    const debtPayments = parseFloat(document.getElementById('debt-payments').value) || 0;
    
    const totalExpenses = foodExpenses + entertainmentExpenses + gasExpenses + otherExpenses;
    const totalDebts = carPayment + debtPayments;
    
    const availableForRent = grossIncome - totalExpenses - totalDebts;
    
    const recommendedRent = grossIncome * 0.25;
    
    document.getElementById('available-rent').textContent = `$${Math.max(0, availableForRent).toLocaleString('en-US', {maximumFractionDigits: 0})}`;
    document.getElementById('recommended-rent').textContent = `$${recommendedRent.toLocaleString('en-US', {maximumFractionDigits: 0})}`;
    
    updateRentChart(grossIncome, recommendedRent, totalExpenses, totalDebts);
}

function updateRentChart(grossIncome, recommendedRent, expenses, debts) {
    const ctx = document.getElementById('rentChart').getContext('2d');
    
    if (rentChart) {
        rentChart.destroy();
    }
    
    const availableIncome = grossIncome - recommendedRent - expenses - debts;
    
    rentChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Recommended Rent (25%)', 'Available Income', 'Monthly Expenses', 'Monthly Debts'],
            datasets: [{
                data: [
                    recommendedRent, 
                    Math.max(0, availableIncome), 
                    expenses, 
                    debts
                ],
                backgroundColor: [chartColors.primary, chartColors.success, chartColors.warning, chartColors.danger],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 12
                        }
                    }
                },
                title: {
                    display: true,
                    text: `Monthly Income: $${grossIncome.toLocaleString()}`,
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            }
        }
    });
}

function resetRent() {
    document.getElementById('gross-income').value = '3000';
    document.getElementById('food-expenses').value = '250';
    document.getElementById('entertainment-expenses').value = '50';
    document.getElementById('gas-expenses').value = '100';
    document.getElementById('other-expenses').value = '150';
    document.getElementById('car-payment').value = '230';
    document.getElementById('debt-payments').value = '0';
    calculateRent();
}

function updateIncomeLabel() {
    const incomeType = document.getElementById('bg-income-type').value;
    const label = document.getElementById('bg-income-label');
    const input = document.getElementById('bg-income');
    
    if (incomeType === 'monthly') {
        label.textContent = "What's your monthly after-tax income?";
        input.placeholder = "4,000";
    } else {
        label.textContent = "What's your yearly after-tax income?";
        input.placeholder = "48,000";
    }
    calculateBudgetGenerator();
}

function calculateBudgetGenerator() {
    const incomeType = document.getElementById('bg-income-type').value;
    let income = parseFloat(document.getElementById('bg-income').value) || 0;
    
    const monthlyIncome = incomeType === 'yearly' ? income / 12 : income;
    
    if (monthlyIncome <= 0) {
        document.getElementById('bg-results').style.display = 'none';
        return;
    }
    
    calculateProfile('high-saver', monthlyIncome, {savings: 0.50, needs: 0.30, wants: 0.20});
    calculateProfile('balanced', monthlyIncome, {savings: 0.30, needs: 0.50, wants: 0.20});
    calculateProfile('spendy', monthlyIncome, {savings: 0.10, needs: 0.50, wants: 0.40});
    
    document.getElementById('bg-results').style.display = 'block';
}

function calculateProfile(profileName, monthlyIncome, percentages) {
    const savings = monthlyIncome * percentages.savings;
    const needs = monthlyIncome * percentages.needs;
    const wants = monthlyIncome * percentages.wants;
    
    document.getElementById(`${profileName}-savings`).textContent = `$${Math.round(savings).toLocaleString()}`;
    document.getElementById(`${profileName}-needs`).textContent = `$${Math.round(needs).toLocaleString()}`;
    document.getElementById(`${profileName}-wants`).textContent = `$${Math.round(wants).toLocaleString()}`;
    
    calculateNeedsBreakdown(profileName, needs);
    calculateWantsBreakdown(profileName, wants);
    calculateSavingsBreakdown(profileName, savings);
}

function calculateNeedsBreakdown(profileName, totalNeeds) {
    const needsBreakdown = {
        housing: 0.40,
        food: 0.20,
        transport: 0.15,
        utilities: 0.10,
        insurance: 0.10,
        loans: 0.05
    };
    
    Object.keys(needsBreakdown).forEach(category => {
        const amount = totalNeeds * needsBreakdown[category];
        document.getElementById(`${profileName}-${category}`).textContent = `$${Math.round(amount).toLocaleString()}`;
    });
}

function calculateWantsBreakdown(profileName, totalWants) {
    const wantsBreakdown = {
        entertainment: 0.30,
        dining: 0.20,
        shopping: 0.25,
        subscriptions: 0.10,
        travel: 0.10,
        gym: 0.05
    };
    
    Object.keys(wantsBreakdown).forEach(category => {
        const amount = totalWants * wantsBreakdown[category];
        document.getElementById(`${profileName}-${category}`).textContent = `$${Math.round(amount).toLocaleString()}`;
    });
}

function calculateSavingsBreakdown(profileName, totalSavings) {
    let savingsBreakdown = {};
    
    if (profileName === 'high-saver') {
        savingsBreakdown = {
            emergency: 0.40,
            investments: 0.40,
            goals: 0.20
        };
    } else if (profileName === 'balanced') {
        savingsBreakdown = {
                emergency: 0.50,
            investments: 0.33,
            goals: 0.17
        };
    } else { // spendy
        savingsBreakdown = {
            emergency: 0.50,
            investments: 0.37,
            goals: 0.13
        };
    }
    
    Object.keys(savingsBreakdown).forEach(category => {
        const amount = totalSavings * savingsBreakdown[category];
        document.getElementById(`${profileName}-${category}`).textContent = `$${Math.round(amount).toLocaleString()}`;
    });
}

function toggleDetails(profileName) {
    const details = document.getElementById(`${profileName}-details`);
    const button = details.parentElement.querySelector('.expand-btn i');
    
    if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block';
        button.textContent = 'expand_less';
    } else {
        details.style.display = 'none';
        button.textContent = 'expand_more';
    }
}

function resetBudgetGenerator() {
    document.getElementById('bg-income-type').value = 'monthly';
    document.getElementById('bg-income').value = '4000';
    updateIncomeLabel();
    
    ['high-saver', 'balanced', 'spendy'].forEach(profile => {
        const details = document.getElementById(`${profile}-details`);
        const button = details.parentElement.querySelector('.expand-btn i');
        details.style.display = 'none';
        button.textContent = 'expand_more';
    });
    
    calculateBudgetGenerator();
}

document.addEventListener('DOMContentLoaded', function() {
});
</script>

<script>
    window.dashboardData = {
        onboardingCompleted: <?= ($onboarding_completed ? 'true' : 'false') ?>,
        user: "<?= ($user) ?>",
        userId: "<?= ($user) ?>",
        hasSeenTour: <?= ($has_seen_tour ? 'true' : 'false') ?>,
        tourContinueSection: <?= ($tour_continue_section ? '"' . $tour_continue_section . '"' : 'null')."
" ?>
    };
</script> 