class ModalComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <!-- Modal Agenda una llamada -->
            <div id="agenda-llamada-modal" class="fixed inset-0 bg-black bg-opacity-50 z-[1000] hidden items-center justify-center transition-all duration-300 opacity-0">
                <div class="flex relative w-[1000px] h-[900px] md:w-[95vw] md:h-[75vh] bg-white overflow-hidden max-w-[95vw] max-h-[95vh] translate-y-4 opacity-95 transition-all duration-300">
                    <!-- Close button -->
                    <button id="close-agenda-modal" class="absolute top-4 right-4 text-black text-2xl font-bold hover:text-red-900 transition-colors z-10">
                        ×
                    </button>
                    
                    <!-- Content -->
                    <div class="flex flex-col w-[30%] h-[100%] hidden xl:block">
                    <div class="w-[430px] relative left-[420px] top-[0px] md:left-4 md:right-4 md:top-8 md:px-4 md:pt-8">
                        <span class="text-black text-3xl md:text-xl font-bold font-['Inter'] leading-[40px] md:leading-7">No te vamos a prometer resultados. </span>
                        <span class="text-red-900 text-3xl md:text-xl font-bold font-['Inter'] leading-[40px] md:leading-7">Vamos a planear cómo conseguirlos.</span>
                    </div>
                    <div class="w-[430px] h-32 relative left-[420px] top-[0px] md:left-4 md:right-4 md:top-[10%] md:px-4">
                        <span class="text-red-900 text-lg md:text-base font-normal font-['Inter'] leading-7">Esto no es un "call para conocernos".<br/></span>
                        <span class="text-black text-lg md:text-base font-normal font-['Inter'] leading-7">Es una conversación estratégica para entender si lo que hacemos tiene sentido para ti.</span>
                    </div>
                    </div> 

                    <!-- Principio del widget integrado de Calendly -->
                    <div class="relative xl:w-[70%] md:top-0 md:h-[100%] w-full">
                        <div class="absolute xl:-top-10 ml-5 calendly-inline-widget w-full h-full" data-url="https://calendly.com/d/cmvg-s3x-wqy/haz-que-tu-marca-crezca-de-verdad?hide_gdpr_banner=1&primary_color=3980e4" style="min-width:280px;height:100%;padding:0;margin:0;"></div>
                    </div>
                    <!-- Final del widget integrado de Calendly -->
                    
                </div>
            </div>

            <!-- Modal Escríbenos -->
            <div id="escribenos-modal" class="fixed inset-0 bg-black bg-opacity-50 z-[1000] hidden items-center justify-center transition-all duration-300 opacity-0">
                <div class="w-[95vw] h-[95vh] max-h-[90vh] overflow-y-auto md:w-[820px] md:h-[629px] bg-white rounded-md relative translate-y-4 opacity-95 transition-all duration-300">
                    <!-- Botón cerrar -->
                    <button id="close-escribenos-modal" class="w-16 h-11 absolute top-0 right-0 text-center text-red-900 text-2xl font-normal font-['Inter'] lowercase leading-7">
                        X
                    </button>
                    
                    <!-- Título -->
                    <div class="absolute w-full left-4 right-4 top-8 px-4 md:w-[603px] md:h-32 md:left-[109px] md:top-[4px] text-center">
                        <div class="text-black text-2xl md:text-4xl font-light font-['Inter'] uppercase leading-7 md:leading-9">
                            <br class="hidden md:block"/>Una <span class="text-red-900">conversación honesta<br/></span>puede cambiarlo todo.
                        </div>
                    </div>
                    
                    <!-- Subtítulo -->
                    <div class="absolute w-full left-4 right-4 top-32 px-4 md:w-[498px] md:h-12 md:left-[161px] md:top-[147px] text-center text-black text-lg md:text-xl font-light font-['Inter'] leading-7">
                        Cuéntanos lo que necesitas, y te responderemos de forma personalizada, como tú te mereces.
                    </div>
                    
                    <!-- Formulario -->
                        <form class="absolute left-4 right-4 top-48 px-4 md:left-[109px] md:top-[271px]">
                            <!-- Primera fila -->
                            <div class="flex flex-col gap-4 md:flex-row md:gap-6 mb-6">
                                <input type="text" placeholder="Nombre" class="w-full md:w-[280px] h-11 p-3 rounded-lg border border-gray-300 text-base font-normal font-['Inter'] leading-tight placeholder-gray-400 focus:outline-none focus:border-gray-400">
                                <input type="email" placeholder="Email" class="w-full md:w-[280px] h-11 p-3 rounded-lg border border-gray-300 text-base font-normal font-['Inter'] leading-tight placeholder-gray-400 focus:outline-none focus:border-gray-400">
                            </div>
                            
                            <!-- Segunda fila -->
                            <div class="flex flex-col gap-4 md:flex-row md:gap-6 mb-6">
                                <input type="tel" placeholder="Teléfono" class="w-full md:w-[280px] h-11 p-3 rounded-lg border border-gray-300 text-base font-normal font-['Inter'] leading-tight placeholder-gray-400 focus:outline-none focus:border-gray-400">
                                <input type="text" placeholder="Asunto" class="w-full md:w-[280px] h-11 p-3 rounded-lg border border-gray-300 text-base font-normal font-['Inter'] leading-tight placeholder-gray-400 focus:outline-none focus:border-gray-400">
                            </div>
                            
                            <!-- Mensaje -->
                            <div class="mb-8">
                                <textarea placeholder="Mensaje" class="w-full md:w-[587px] h-24 p-3 rounded-lg border border-gray-300 text-base font-normal font-['Inter'] leading-tight placeholder-gray-400 resize-none focus:outline-none focus:border-gray-400"></textarea>
                            </div>
                            
                            <!-- Botón enviar -->
                            <div class="text-center">
                                <button type="submit" class="text-red-900 text-xl font-light font-['Inter'] underline uppercase leading-7 hover:text-red-700 transition-colors">
                                    Enviar
                                </button>
                            </div>
                        </form>
                </div>
            </div>
        `;

        // Reattach event listeners after the component is rendered
        this.attachEventListeners();
    }

    attachEventListeners() {
        // Event listeners for agenda modal
        const agendaModal = this.querySelector('#agenda-llamada-modal');
        const closeAgendaBtn = this.querySelector('#close-agenda-modal');
        
        if (closeAgendaBtn) {
            closeAgendaBtn.addEventListener('click', () => {
                this.closeModal(agendaModal);
            });
        }

        // Event listeners for escribenos modal
        const escribenosModal = this.querySelector('#escribenos-modal');
        const closeEscribenosBtn = this.querySelector('#close-escribenos-modal');
        
        if (closeEscribenosBtn) {
            closeEscribenosBtn.addEventListener('click', () => {
                this.closeModal(escribenosModal);
            });
        }

        // Close modals when clicking outside
        if (agendaModal) {
            agendaModal.addEventListener('click', (e) => {
                if (e.target === agendaModal) {
                    this.closeModal(agendaModal);
                }
            });
        }

        if (escribenosModal) {
            escribenosModal.addEventListener('click', (e) => {
                if (e.target === escribenosModal) {
                    this.closeModal(escribenosModal);
                }
            });
        }

        // Handle form submission for escribenos modal
        const form = this.querySelector('form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                // Add your form submission logic here
                console.log('Form submitted');
            });
        }
    }

    closeModal(modal) {
        if (modal) {
            modal.classList.remove('opacity-100');
            modal.classList.add('opacity-0');
            setTimeout(() => {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }, 300);
        }
    }

    openAgendaModal() {
        const modal = this.querySelector('#agenda-llamada-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            setTimeout(() => {
                modal.classList.remove('opacity-0');
                modal.classList.add('opacity-100');
            }, 10);
        }
    }

    openEscribenosModal() {
        const modal = this.querySelector('#escribenos-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            setTimeout(() => {
                modal.classList.remove('opacity-0');
                modal.classList.add('opacity-100');
            }, 10);
        }
    }
}

// Define the custom element
customElements.define('modal-component', ModalComponent);