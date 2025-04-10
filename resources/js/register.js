// Modal functionality
const openSignupBtn = document.getElementById('openSignup');
const modal = document.getElementById('signupModal');
const closeModalBtn = document.getElementById('closeModal');

openSignupBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
});

closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    resetSteps();
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        resetSteps();
    }
});

// Multi-step form functionality
const stepContents = document.querySelectorAll('.step-content');
const stepIndicators = document.querySelectorAll('.step-indicator');
const nextStepButtons = document.querySelectorAll('.next-step');
let currentStep = 1;

nextStepButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentStep < 4) {
            // Hide current step
            document.getElementById(`step${currentStep}-content`).classList.add('hidden');
            
            // Update step indicator
            stepIndicators[currentStep - 1].classList.remove('active');
            stepIndicators[currentStep - 1].classList.add('completed');
            
            currentStep++;
            
            // Show next step
            document.getElementById(`step${currentStep}-content`).classList.remove('hidden');
            
            // Update next step indicator
            stepIndicators[currentStep - 1].classList.add('active');
        }
    });
});

function resetSteps() {
    // Hide all steps except first
    stepContents.forEach((content, index) => {
        if (index === 0) {
            content.classList.remove('hidden');
        } else {
            content.classList.add('hidden');
        }
    });
    
    // Reset step indicators
    stepIndicators.forEach((indicator, index) => {
        indicator.classList.remove('active', 'completed');
        if (index === 0) {
            indicator.classList.add('completed');
        } else if (index === 1) {
            indicator.classList.add('completed');
        } else if (index === 2) {
            indicator.classList.add('active');
        }
    });
    
    currentStep = 1;
}

// Toggle switches
const toggleSwitches = document.querySelectorAll('input[type="checkbox"]');
toggleSwitches.forEach(switchEl => {
    switchEl.addEventListener('change', (e) => {
        const parent = e.target.closest('label');
        if (e.target.checked) {
            parent.querySelector('div').classList.add('peer-checked:bg-blue-500');
            parent.querySelector('div').classList.remove('bg-gray-700');
        } else {
            parent.querySelector('div').classList.remove('peer-checked:bg-blue-500');
            parent.querySelector('div').classList.add('bg-gray-700');
        }
    });
});