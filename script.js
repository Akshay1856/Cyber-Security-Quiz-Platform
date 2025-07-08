// Quiz Questions Data
const quizQuestions = [
    {
        id: 1,
        question: "What does the C in CIA triad stand for?",
        options: ["Compliance", "Confidentiality", "Control", "Certification"],
        correctAnswer: 1
    },
    {
        id: 2,
        question: "Which protocol secures the HTTP traffic?",
        options: ["FTP", "SSH", "HTTPS", "SSL"],
        correctAnswer: 2
    },
    {
        id: 3,
        question: "Which malware encrypts files and demands ransom?",
        options: ["Worm", "Trojan", "Spyware", "Ransomware"],
        correctAnswer: 3
    },
    {
        id: 4,
        question: "Which cryptographic technique is irreversible?",
        options: ["Encryption", "Stegnanography", "Hashing", "Obfuscation"],
        correctAnswer: 2
    },
    {
        id: 5,
        question: "Which attack intercepts communication between two parties?",
        options: ["Phishing", "MITM", "DoS", "Spoofing"],
        correctAnswer: 1
    },
    {
        id: 6,
        question: "What is the practice of hiding data inside other files?",
        options: ["Hashing", "Encryption", "Stegnanography", "Obfuscation"],
        correctAnswer: 2
    },
    {
        id: 7,
        question: "WHich authentication uses two factors?",
        options: ["MFA", "SSO", "VPN", "IDS"],
        correctAnswer: 0 
    },
    {
        id: 8,
        question: "Which protocol is used for secure remote login?",
        options: ["Telnet", "SSH", "FTP", "SMTP"],
        correctAnswer: 1
    },
    {
        id: 9,
        question: "Which term describes minimal required access?",
        options: ["Control", "Least", "Full", "Root"],
        correctAnswer: 1
    },
    {
        id: 10,
        question: "Which asymmetric encryption algorithm is widely used?",
        options: ["AES", "RSA", "DES", "MD5"],
        correctAnswer: 1
    },
    {
        id: 11,
        question: "Which malware logs keystrokes?",
        options: ["Adware", "Keylogger", "Worm", "Rootkit"],
        correctAnswer: 1
    },
    {
        id: 12,
        question: "what is a precomputed hash table calle?",
        options: ["Honeypot", "Firewall", "Sandbox", "Rainbow"],
        correctAnswer: 3
    },
    {
        id: 13,
        question: "What is a previously unknown vulnerability called?",
        options: ["Exploit", "Patch", "Zero-day", "Bug"],
        correctAnswer: 2
    },
    {
        id: 14,
        question: "What is the process of testing a system for weakness?",
        options: ["Pentesting", "Hardening", "Obfuscation", "Sniffing"],
        correctAnswer: 0
    },
    {
        id: 15,
        question: "Which type of malware disguises itself as legitimate software?",
        options: ["Ransomware", "Trojan", "Worm", "Rootkit"],
        correctAnswer: 1
    },
    {
        id: 16,
        question: "What is the most common default HTTP port?",
        options: ["21", "25", "443", "80"],
        correctAnswer: 3
    },
    {
        id: 17,
        question: "Which tool is used for packet sniffing?",
        options: ["Metasploit", "Wireshark", "Burp", "Nessus"],
        correctAnswer: 1
    },
    {
        id: 18,
        question: "What is the standard bit length of IPv6?",
        options: ["128", "64", "32", "256"],
        correctAnswer: 0
    },
    {
        id: 19,
        question: "Which organisation publishes the Top 10 web vulnerabilities?",
        options: ["NIST", "ISO", "OWASP", "IEEE"],
        correctAnswer: 2
    },
    {
        id: 20,
        question: "Which malware provides admin-level access to an attacker?",
        options: ["Trojan", "Rootkit", "Worm", "Keylgger"],
        correctAnswer: 1
    },
    {
        id: 21,
        question: "Which protocol is used to transfer files securely over SSH?",
        options: ["SCP", "HTTPS", "FTP", "SFTP"],
        correctAnswer: 3
    },
    {
        id: 22,
        question: "Which attack floods a server with requests from more than one user?",
        options: ["DoS", "DDoS", "Spoofing", "Phishing"],
        correctAnswer: 1
    },
    {
        id: 23,
        question: "Which hashing algorithm is 256-bit?",
        options: ["SHA-256", "SHA-1", "MD5", "DES"],
        correctAnswer: 0
    },
    {
        id: 24,
        question: "Which technique prevents replay attacks by using unique values?",
        options: ["Key", "Salt", "Nonce", "Hash"],
        correctAnswer: 2
    },
    {
        id: 25,
        question: "Which principle ensures data remains unaltered?",
        options: ["Availability", "Integrity", "Confidentiality", "Privacy"],
        correctAnswer: 1
    }
];

// Quiz State Variables
let currentQuestionIndex = 0;
let userAnswers = [];
let userName = '';
let totalScore = 0;

// DOM Elements
const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');

// Welcome Screen Elements
const userNameInput = document.getElementById('user-name');
const nameError = document.getElementById('name-error');
const startQuizBtn = document.getElementById('start-quiz-btn');

// Quiz Screen Elements
const userDisplayName = document.getElementById('user-display-name');
const questionCounter = document.getElementById('question-counter');
const progressPercentage = document.getElementById('progress-percentage');
const progressFill = document.getElementById('progress-fill');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextQuestionBtn = document.getElementById('next-question-btn');
const finishQuizBtn = document.getElementById('finish-quiz-btn');
const restartQuizBtn = document.getElementById('restart-quiz-btn');

// Results Screen Elements
const resultsUserName = document.getElementById('results-user-name');
const scoreDisplay = document.getElementById('score-display');
const percentageDisplay = document.getElementById('percentage-display');
const scoreMessage = document.getElementById('score-message');
const scoreIcon = document.getElementById('score-icon');
const scoreBarFill = document.getElementById('score-bar-fill');
const resultsBreakdown = document.getElementById('results-breakdown');
const retakeQuizBtn = document.getElementById('retake-quiz-btn');

// Event Listeners
userNameInput.addEventListener('input', validateNameInput);
startQuizBtn.addEventListener('click', startQuiz);
nextQuestionBtn.addEventListener('click', nextQuestion);
finishQuizBtn.addEventListener('click', showResults);
restartQuizBtn.addEventListener('click', restartQuiz);
retakeQuizBtn.addEventListener('click', restartQuiz);

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    showScreen('welcome');
    userNameInput.focus();
});

// Name Input Validation
function validateNameInput() {
    const name = userNameInput.value.trim();
    const isValid = name.length >= 2;
    
    startQuizBtn.disabled = !isValid;
    
    if (userNameInput.value.length > 0 && !isValid) {
        nameError.classList.add('show');
        userNameInput.classList.add('error');
    } else {
        nameError.classList.remove('show');
        userNameInput.classList.remove('error');
    }
    
    return isValid;
}

// Screen Management
function showScreen(screenName) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    switch(screenName) {
        case 'welcome':
            welcomeScreen.classList.add('active');
            break;
        case 'quiz':
            quizScreen.classList.add('active');
            break;
        case 'results':
            resultsScreen.classList.add('active');
            break;
    }
}

// Start Quiz Function
function startQuiz() {
    if (!validateNameInput()) {
        nameError.classList.add('show');
        userNameInput.classList.add('error');
        userNameInput.focus();
        return;
    }
    
    // Store user name and initialize quiz state
    userName = userNameInput.value.trim();
    currentQuestionIndex = 0;
    userAnswers = [];
    totalScore = 0;
    
    // Update user display name
    userDisplayName.textContent = userName;
    
    // Show quiz screen and display first question
    showScreen('quiz');
    displayQuestion();
}

// Display Current Question
function displayQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    
    // Update progress indicators
    questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
    progressPercentage.textContent = `${Math.round(progress)}%`;
    progressFill.style.width = `${progress}%`;
    
    // Update question text
    questionText.textContent = question.question;
    
    // Clear and populate options
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = createOptionElement(option, index);
        optionsContainer.appendChild(optionElement);
    });
    
    // Update button states
    updateButtonStates();
    
    // Pre-select if user has already answered this question
    if (userAnswers[currentQuestionIndex] !== undefined) {
        selectOption(userAnswers[currentQuestionIndex]);
    }
}

// Create Option Element
function createOptionElement(optionText, index) {
    const optionDiv = document.createElement('div');
    optionDiv.className = 'option';
    optionDiv.dataset.index = index;
    
    const optionLetter = document.createElement('div');
    optionLetter.className = 'option-letter';
    optionLetter.textContent = String.fromCharCode(65 + index); // A, B, C, D
    
    const optionTextSpan = document.createElement('span');
    optionTextSpan.className = 'option-text';
    optionTextSpan.textContent = optionText;
    
    optionDiv.appendChild(optionLetter);
    optionDiv.appendChild(optionTextSpan);
    
    // Add click event listener
    optionDiv.addEventListener('click', () => selectOption(index));
    
    return optionDiv;
}

// Select Option Function
function selectOption(index) {
    // Remove previous selection
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selection to clicked option
    const selectedOption = document.querySelector(`[data-index="${index}"]`);
    if (selectedOption) {
        selectedOption.classList.add('selected');
    }
    
    // Store user answer
    userAnswers[currentQuestionIndex] = index;
    
    // Enable appropriate button
    if (currentQuestionIndex === quizQuestions.length - 1) {
        finishQuizBtn.disabled = false;
    } else {
        nextQuestionBtn.disabled = false;
    }
}

// Next Question Function
function nextQuestion() {
    if (userAnswers[currentQuestionIndex] === undefined) return;
    
    currentQuestionIndex++;
    displayQuestion();
}

// Update Button States
function updateButtonStates() {
    const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;
    const hasAnswer = userAnswers[currentQuestionIndex] !== undefined;
    
    if (isLastQuestion) {
        nextQuestionBtn.classList.add('hidden');
        finishQuizBtn.classList.remove('hidden');
        finishQuizBtn.disabled = !hasAnswer;
    } else {
        nextQuestionBtn.classList.remove('hidden');
        finishQuizBtn.classList.add('hidden');
        nextQuestionBtn.disabled = !hasAnswer;
    }
}

// Calculate Score
function calculateScore() {
    totalScore = 0;
    userAnswers.forEach((userAnswer, index) => {
        if (userAnswer === quizQuestions[index].correctAnswer) {
            totalScore++;
        }
    });
    return totalScore;
}

// Show Results Function
function showResults() {
    calculateScore();
    const percentage = Math.round((totalScore / quizQuestions.length) * 100);
    
    // Update user name
    resultsUserName.textContent = userName;
    
    // Update score display
    scoreDisplay.textContent = `${totalScore}/${quizQuestions.length}`;
    percentageDisplay.textContent = `${percentage}%`;
    
    // Update score message and styling based on performance
    updateScorePresentation(percentage);
    
    // Generate detailed results
    generateDetailedResults();
    
    // Show results screen
    showScreen('results');
    
    // Animate score bar
    setTimeout(() => {
        scoreBarFill.style.width = `${percentage}%`;
    }, 500);
}

// Update Score Presentation
function updateScorePresentation(percentage) {
    const scoreBadge = document.querySelector('.score-badge');
    const scoreMessageElement = document.querySelector('.score-message');
    
    // Remove existing classes
    scoreBadge.classList.remove('excellent', 'good', 'average', 'poor');
    scoreBarFill.classList.remove('excellent', 'good', 'average', 'poor');
    scoreMessageElement.classList.remove('excellent', 'good', 'average', 'poor');
    
    if (percentage >= 80) {
        scoreBadge.classList.add('excellent');
        scoreBarFill.classList.add('excellent');
        scoreMessageElement.classList.add('excellent');
        scoreMessage.textContent = 'Outstanding Performance!';
        scoreIcon.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22,4 12,14.01 9,11.01"/>
            </svg>
        `;
    } else if (percentage >= 60) {
        scoreBadge.classList.add('good');
        scoreBarFill.classList.add('good');
        scoreMessageElement.classList.add('good');
        scoreMessage.textContent = 'Great Job!';
        scoreIcon.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22,4 12,14.01 9,11.01"/>
            </svg>
        `;
    } else if (percentage >= 40) {
        scoreBadge.classList.add('average');
        scoreBarFill.classList.add('average');
        scoreMessageElement.classList.add('average');
        scoreMessage.textContent = 'Good Effort!';
        scoreIcon.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
        `;
    } else {
        scoreBadge.classList.add('poor');
        scoreBarFill.classList.add('poor');
        scoreMessageElement.classList.add('poor');
        scoreMessage.textContent = 'Keep Learning!';
        scoreIcon.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
        `;
    }
}

// Generate Detailed Results
function generateDetailedResults() {
    resultsBreakdown.innerHTML = '';
    
    quizQuestions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correctAnswer;
        
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        
        const resultHeader = document.createElement('div');
        resultHeader.className = 'result-header';
        
        const resultIcon = document.createElement('div');
        resultIcon.className = `result-icon ${isCorrect ? 'correct' : 'incorrect'}`;
        resultIcon.innerHTML = isCorrect ? 
            `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22,4 12,14.01 9,11.01"/>
            </svg>` :
            `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>`;
        
        const resultQuestion = document.createElement('div');
        resultQuestion.className = 'result-question';
        resultQuestion.textContent = `${index + 1}. ${question.question}`;
        
        resultHeader.appendChild(resultIcon);
        resultHeader.appendChild(resultQuestion);
        
        const resultDetails = document.createElement('div');
        resultDetails.className = 'result-details';
        
        if (userAnswer !== undefined) {
            const userAnswerDiv = document.createElement('div');
            userAnswerDiv.className = `user-answer ${isCorrect ? 'correct' : 'incorrect'}`;
            userAnswerDiv.textContent = `Your answer: ${question.options[userAnswer]}`;
            resultDetails.appendChild(userAnswerDiv);
            
            if (!isCorrect) {
                const correctAnswerDiv = document.createElement('div');
                correctAnswerDiv.className = 'correct-answer';
                correctAnswerDiv.textContent = `Correct answer: ${question.options[question.correctAnswer]}`;
                resultDetails.appendChild(correctAnswerDiv);
            }
        }
        
        resultItem.appendChild(resultHeader);
        resultItem.appendChild(resultDetails);
        resultsBreakdown.appendChild(resultItem);
    });
}

// Restart Quiz Function
function restartQuiz() {
    // Reset all state variables
    currentQuestionIndex = 0;
    userAnswers = [];
    userName = '';
    totalScore = 0;
    
    // Reset form inputs
    userNameInput.value = '';
    userNameInput.classList.remove('error');
    nameError.classList.remove('show');
    startQuizBtn.disabled = true;
    
    // Reset score bar
    scoreBarFill.style.width = '0%';
    
    // Show welcome screen
    showScreen('welcome');
    
    // Focus on name input
    setTimeout(() => {
        userNameInput.focus();
    }, 100);
}