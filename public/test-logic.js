// Test Logic for Dynamic Results
class TestLogic {
    constructor() {
        this.form = document.getElementById('test-form');
        this.userDataModal = document.getElementById('user-data-modal');
        this.userDataForm = document.getElementById('user-data-form');
        this.resultModal = document.getElementById('test-result-modal');
        this.backgroundImg = this.resultModal.querySelector('img');
        this.levelNumber = this.resultModal.querySelector('h2');
        this.levelName = this.resultModal.querySelector('h3');
        this.description = this.resultModal.querySelector('p');
        this.ctaButton = this.resultModal.querySelector('a');
        this.testResult = null; // Store test result
        
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
        
        if (this.userDataForm) {
            this.userDataForm.addEventListener('submit', (e) => this.handleUserDataSubmit(e));
        }
        
        // Ensure only one checkbox per question can be selected
        this.setupCheckboxBehavior();
        
        // Add close modal functionality
        this.setupModalClose();
    }

    setupModalClose() {
        // Close user data modal when clicking outside the content
        this.userDataModal.addEventListener('click', (e) => {
            if (e.target === this.userDataModal) {
                this.closeModal(this.userDataModal);
            }
        });
        
        // Close result modal when clicking outside the content
        this.resultModal.addEventListener('click', (e) => {
            if (e.target === this.resultModal) {
                this.closeModal(this.resultModal);
            }
        });
        
        // Close modals with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (!this.userDataModal.classList.contains('hidden')) {
                    this.closeModal(this.userDataModal);
                } else if (!this.resultModal.classList.contains('hidden')) {
                    this.closeModal(this.resultModal);
                }
            }
        });
    }

    closeModal(modal) {
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
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
        
        // Calculate and store the result
        this.testResult = this.calculateResult(answers);
        
        // Show user data form instead of result
        this.showUserDataForm();
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

    showUserDataForm() {
        // Show user data modal
        this.userDataModal.classList.remove('hidden');
        
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    }
    
    handleUserDataSubmit(e) {
        e.preventDefault();
        
        // Get user data
        const userData = {
            nombre: document.getElementById('user-nombre').value,
            apellido: document.getElementById('user-apellido').value,
            marca: document.getElementById('user-marca').value,
            email: document.getElementById('user-email').value
        };
        
        // Validate user data
        if (!userData.nombre || !userData.apellido || !userData.marca || !userData.email) {
            this.mostrarMensajeEstado('Por favor, completa todos los campos.', 'text-red-400');
            return;
        }
        
        // Show loading message
        this.mostrarMensajeEstado('Procesando...', 'text-blue-400');
        
        // Disable submit button
        const submitBtn = document.getElementById('user-data-submit');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Procesando...';
        
        // Send user data to API
        this.sendUserData(userData);
    }
    
    sendUserData(userData) {
        // Add test result info to user data
        const dataToSend = {
            ...userData,
            testResult: this.testResult,
            mensaje: `Test completado - Resultado: Nivel ${this.testResult}`
        };
        
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend)
        })
        .then(response => {
            if (response.ok) {
                return response.json().then(data => ({ success: true, data }));
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        })
        .then(result => {
            const data = result.data;
            if (result.success && data.status === 'success') {
                // Hide user data modal and show result
                this.userDataModal.classList.add('hidden');
                this.showResult(this.testResult);
            } else {
                this.mostrarMensajeEstado('Error al procesar los datos. Inténtalo de nuevo.', 'text-red-400');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            this.mostrarMensajeEstado('Error de conexión. Verifica tu internet e inténtalo de nuevo.', 'text-red-400');
        })
        .finally(() => {
            // Re-enable submit button
            const submitBtn = document.getElementById('user-data-submit');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Ver mi resultado';
        });
    }
    
    mostrarMensajeEstado(mensaje, colorClass) {
        const mensajeEstado = document.getElementById('user-data-mensaje');
        const textoEstado = document.getElementById('user-data-texto');
        
        if (mensajeEstado && textoEstado) {
            textoEstado.textContent = mensaje;
            textoEstado.className = `text-sm font-normal font-['Inter'] ${colorClass}`;
            mensajeEstado.classList.remove('hidden');
            
            // Hide message after 5 seconds (except for success messages)
            if (!colorClass.includes('blue')) {
                setTimeout(() => {
                    mensajeEstado.classList.add('hidden');
                }, 5000);
            }
        }
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
        this.resultModal.classList.remove('hidden');
        
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