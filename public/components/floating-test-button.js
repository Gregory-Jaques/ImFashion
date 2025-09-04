class FloatingTestButton extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <!-- Botón flotante de test diagnóstico -->
            <div class="fixed bottom-6 right-6 z-50">
                <a href="test.html" class="floating-test-btn group flex items-center bg-[#800020] hover:bg-[#D4B996] text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                    <!-- Icono de diagnóstico -->
                    <svg class="w-5 h-5 mr-3 transition-transform duration-300 group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span class="font-medium text-sm xl:text-base whitespace-nowrap">Test diagnóstico gratuito</span>
                </a>
            </div>

            <style>
                .floating-test-btn {
                    animation: float 3s ease-in-out infinite;
                }

                .floating-test-btn:hover {
                    animation-play-state: paused;
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-8px);
                    }
                }

                /* Responsive adjustments */
                @media (max-width: 768px) {
                    .floating-test-btn {
                        padding: 12px 16px;
                    }
                    
                    .floating-test-btn span {
                        font-size: 0.875rem;
                    }
                }

                @media (max-width: 480px) {
                    .floating-test-btn {
                        bottom: 20px;
                        right: 20px;
                        padding: 10px 14px;
                    }
                    
                    .floating-test-btn span {
                        font-size: 0.8rem;
                    }
                    
                    .floating-test-btn svg {
                        width: 16px;
                        height: 16px;
                        margin-right: 8px;
                    }
                }
            </style>
        `;
    }
}

customElements.define('floating-test-button', FloatingTestButton);