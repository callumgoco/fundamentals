const steps = [
    {
        title: "What's your financial goal?",
        options: [
            { text: "Budgeting Basics", icon: "💰" },
            { text: "Saving Hacks", icon: "🎯" },
            { text: "Investing", icon: "📈" }
        ],
        type: "goal"
    },
    {
        title: "How confident are you with money?",
        options: [
            { text: "Just starting", value: 1 },
            { text: "Learning basics", value: 2 },
            { text: "Getting there", value: 3 },
            { text: "Pretty confident", value: 4 },
            { text: "Money master", value: 5 }
        ],
        type: "confidence"
    },
    {
        title: "How do you learn best?",
        options: [
            { text: "Visual learner", icon: "👀", value: "Visual" },
            { text: "Interactive exercises", icon: "🎮", value: "Interactive" },
            { text: "Reading & research", icon: "📚", value: "Reading" }
        ],
        type: "learn"
    }
];

let currentStep = 0;
let answers = {
    goal: null,
    confidence: null,
    learn: null
};

const stepContainer = document.getElementById('onboardingStep');
const progressBar = document.getElementById('progressBarInner');

function updateProgress() {
    const progress = ((currentStep + 1) / steps.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function createOption(option, type) {
    const div = document.createElement('div');
    div.className = 'onboarding-option';
    
    if (option.icon) {
        div.innerHTML = `
            <span class="option-icon">${option.icon}</span>
            <span class="option-text">${option.text}</span>
        `;
    } else {
        div.textContent = option.text;
    }
    
    if (answers[type] === (option.value || option.text)) {
        div.classList.add('selected');
    }
    
    div.addEventListener('click', () => selectOption(option, type));
    return div;
}

function selectOption(option, type) {
    answers[type] = option.value || option.text;
    
    const options = document.querySelectorAll('.onboarding-option');
    options.forEach(opt => opt.classList.remove('selected'));
    event.currentTarget.classList.add('selected');
    
    const nextBtn = document.querySelector('.next-btn');
    if (nextBtn) nextBtn.style.display = 'block';
}

function createStepContent(step) {
    const content = document.createElement('div');
    content.className = 'step-content';
    
    const title = document.createElement('h2');
    title.textContent = step.title;
    content.appendChild(title);
    
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'options-container';
    
    step.options.forEach(option => {
        const optionElement = createOption(option, step.type);
        optionsContainer.appendChild(optionElement);
    });
    content.appendChild(optionsContainer);
    
    const btnContainer = document.createElement('div');
    btnContainer.className = 'btn-container';
    
    if (currentStep > 0) {
        const backBtn = document.createElement('button');
        backBtn.textContent = 'Back';
        backBtn.className = 'back-btn';
        backBtn.onclick = previousStep;
        btnContainer.appendChild(backBtn);
    }
    
    const nextBtn = document.createElement('button');
    nextBtn.textContent = currentStep === steps.length - 1 ? 'Finish' : 'Next';
    nextBtn.className = 'next-btn';
    nextBtn.style.display = answers[step.type] ? 'block' : 'none';
    nextBtn.onclick = currentStep === steps.length - 1 ? finishOnboarding : nextStep;
    btnContainer.appendChild(nextBtn);
    
    content.appendChild(btnContainer);
    
    return content;
}

function nextStep() {
    if (currentStep < steps.length - 1) {
        currentStep++;
        updateStep();
    }
}

function previousStep() {
    if (currentStep > 0) {
        currentStep--;
        updateStep();
    }
}

function updateStep() {
    stepContainer.innerHTML = '';
    
    const content = createStepContent(steps[currentStep]);
    
    content.classList.add('fade-out');
    
    stepContainer.appendChild(content);
    
    content.offsetHeight;
    
    content.classList.remove('fade-out');
    
    updateProgress();
}

async function finishOnboarding() {
    try {
        const response = await fetch('/FUNDamentals/onboarding', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(answers)
        });
        
        if (response.ok) {
            window.location.href = '/FUNDamentals/dashboard';
        } else {
            console.error('Failed to save onboarding data');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateStep();
    
    gsap.from(".gsap-card", {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power3.out"
    });
    
    gsap.from(".gsap-progress", {
        duration: 1,
        scaleX: 0,
        ease: "power3.out",
        delay: 0.5
    });
}); 