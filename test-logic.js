// Test Logic for Dynamic Results
class TestLogic {
    constructor() {
        this.form = document.querySelector('form');
        this.modal = document.getElementById('test-result-modal');
        this.backgroundImg = this.modal.querySelector('img');
        this.levelNumber = this.modal.querySelector('h2');
        this.levelName = this.modal.querySelector('h3');
        this.description = this.modal.querySelector('p');
        this.ctaButton = this.modal.querySelector('a');
        
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
        
        // Ensure only one checkbox per question can be selected
        this.setupCheckboxBehavior();
        
        // Add close modal functionality
        this.setupModalClose();
    }

    setupModalClose() {
        // Close modal when clicking outside the content
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
                this.closeModal();
            }
        });
    }

    closeModal() {
        this.modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    setupCheckboxBehavior() {
        const questions = ['question1', 'question2', 'question3', 'question4', 'question5'];
        
        questions.forEach(questionName => {
            const checkboxes = document.querySelectorAll(`input[name="${questionName}"]`);
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', (e) => {
                    if (e.target.checked) {
                        // Uncheck all other checkboxes in the same question
                        checkboxes.forEach(cb => {
                            if (cb !== e.target) {
                                cb.checked = false;
                            }
                        });
                    }
                });
            });
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const answers = this.getAnswers();
        
        if (!this.validateAnswers(answers)) {
            alert('Por favor, responde todas las preguntas antes de continuar.');
            return;
        }
        
        const result = this.calculateResult(answers);
        this.showResult(result);
    }

    getAnswers() {
        const answers = {};
        const questions = ['question1', 'question2', 'question3', 'question4', 'question5'];
        
        questions.forEach(questionName => {
            const checkedBox = document.querySelector(`input[name="${questionName}"]:checked`);
            if (checkedBox) {
                answers[questionName] = parseInt(checkedBox.value.replace('option', ''));
            }
        });
        
        return answers;
    }

    validateAnswers(answers) {
        return Object.keys(answers).length === 5;
    }

    calculateResult(answers) {
        const counts = { 1: 0, 2: 0, 3: 0, 4: 0 };
        
        Object.values(answers).forEach(answer => {
            counts[answer]++;
        });
        
        // Find the option with the most votes
        let maxCount = 0;
        let result = 1;
        
        for (let option in counts) {
            if (counts[option] > maxCount) {
                maxCount = counts[option];
                result = parseInt(option);
            }
        }
        
        return result;
    }

    showResult(result) {
        const resultData = this.getResultData(result);
        
        // Update modal content
        this.backgroundImg.src = resultData.backgroundImage;
        this.levelNumber.textContent = resultData.levelNumber;
        this.levelName.textContent = resultData.levelName;
        this.description.textContent = resultData.description;
        this.ctaButton.textContent = resultData.ctaText;
        this.ctaButton.href = resultData.ctaLink;
        
        // Show modal as overlay
        this.modal.classList.remove('hidden');
        
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    }

    getResultData(result) {
        const resultMap = {
            1: {
                backgroundImage: 'images/bgfound-big.jpg',
                levelNumber: 'Nivel 1:',
                levelName: 'Foundation',
                description: 'El primer sistema de crecimiento para marcas que ya validaron su propuesta.',
                ctaText: 'Quiero estructurar mi crecimiento',
                ctaLink: 'foundation.html'
            },
            2: {
                backgroundImage: 'images/bgexpand-big.jpg',
                levelNumber: 'Nivel 2:',
                levelName: 'Expansion',
                description: 'La estructura que tu marca necesita para escalar de verdad, no solo gastar más en ads.',
                ctaText: 'Quiero escalar con sistema',
                ctaLink: 'expansion.html'
            },
            3: {
                backgroundImage: 'images/bgrebui-big.jpg',
                levelNumber: 'Nivel 3:',
                levelName: 'Rebuild',
                description: 'Reconstruimos tu sistema de crecimiento desde datos reales.',
                ctaText: 'Quiero reconstruir con criterio',
                ctaLink: 'rebuild.html'
            },
            4: {
                backgroundImage: 'images/bgampli-big.jpg',
                levelNumber: 'Nivel 4:',
                levelName: 'Amplify',
                description: 'El sistema que coordina performance y marca para escalar con propósito, cultura visual y rentabilidad real.',
                ctaText: 'Quiero escalar con propósito',
                ctaLink: 'amplify.html'
            }
        };
        
        return resultMap[result] || resultMap[1];
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TestLogic();
});