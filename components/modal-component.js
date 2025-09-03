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
                    <div class="max-w-[430px] relative left-[420px] top-[0px] md:left-4 md:right-4 md:top-8 md:px-4 md:pt-8">
                        <span class="text-black text-3xl md:text-xl font-bold font-['Inter'] leading-[40px] md:leading-7">No te vamos a prometer resultados. </span>
                        <span class="text-red-900 text-3xl md:text-xl font-bold font-['Inter'] leading-[40px] md:leading-7">Vamos a planear cómo conseguirlos.</span>
                    </div>
                    <div class="max-w-[430px] h-32 relative left-[420px] top-[0px] md:left-4 md:right-4 md:top-[10%] md:px-4">
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
                    <div class="relative xl:absolute w-full left-0 right-4 top-8 px-4 md:w-[603px] md:h-32 md:left-[109px] md:top-[4px] text-center">
                        <div class="text-black text-2xl md:text-4xl font-light font-['Inter'] uppercase leading-7 md:leading-9">
                            <br class="hidden md:block"/>Una <span class="text-red-900">conversación honesta<br/></span>puede cambiarlo todo.
                        </div>
                    </div>
                    
                    <!-- Subtítulo -->
                    <div class="relative xl:absolute w-full left-0 right-4 top-10 px-4 md:w-[498px] md:h-12 md:left-[161px] md:top-[147px] text-center text-black text-lg md:text-xl font-light font-['Inter'] leading-7">
                        Cuéntanos lo que necesitas, y te responderemos de forma personalizada, como tú te mereces.
                    </div>
                    
                    <!-- Formulario -->
                        <form id="contacto-form" class="absolute left-4 right-4 top-72 px-4 md:left-[109px] md:top-[271px]">
                            <!-- Primera fila -->
                            <div class="flex flex-col gap-4 md:flex-row md:gap-6 mb-6">
                                <input type="text" id="nombre" name="nombre" placeholder="Nombre" required class="w-full md:w-[280px] h-11 p-3 rounded-lg border border-gray-300 text-base font-normal font-['Inter'] leading-tight placeholder-gray-400 focus:outline-none focus:border-gray-400">
                                <input type="email" id="email" name="email" placeholder="Email" required class="w-full md:w-[280px] h-11 p-3 rounded-lg border border-gray-300 text-base font-normal font-['Inter'] leading-tight placeholder-gray-400 focus:outline-none focus:border-gray-400">
                            </div>
                            
                            <!-- Segunda fila -->
                            <div class="flex flex-col gap-4 md:flex-row md:gap-6 mb-6">
                                <input type="tel" id="telefono" name="telefono" placeholder="Teléfono" class="w-full md:w-[280px] h-11 p-3 rounded-lg border border-gray-300 text-base font-normal font-['Inter'] leading-tight placeholder-gray-400 focus:outline-none focus:border-gray-400">
                                <input type="text" id="asunto" name="asunto" placeholder="Asunto" class="w-full md:w-[280px] h-11 p-3 rounded-lg border border-gray-300 text-base font-normal font-['Inter'] leading-tight placeholder-gray-400 focus:outline-none focus:border-gray-400">
                            </div>
                            
                            <!-- Mensaje -->
                            <div class="mb-8">
                                <textarea id="mensaje" name="mensaje" placeholder="Mensaje" required class="w-full md:w-[587px] h-24 p-3 rounded-lg border border-gray-300 text-base font-normal font-['Inter'] leading-tight placeholder-gray-400 resize-none focus:outline-none focus:border-gray-400"></textarea>
                            </div>
                            
                            <!-- Botón enviar -->
                            <div class="text-center">
                                <button type="submit" id="enviar-btn" class="text-red-900 text-xl font-light font-['Inter'] underline uppercase leading-7 hover:text-red-700 transition-colors">
                                    Enviar
                                </button>
                            </div>
                            
                            <!-- Mensaje de estado -->
                            <div id="mensaje-estado" class="text-center mt-4 hidden">
                                <p id="texto-estado" class="text-sm font-normal font-['Inter']"></p>
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
        const form = this.querySelector('#contacto-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.enviarFormulario(e);
            });
        }
    }

    enviarFormulario(event) {
        event.preventDefault();
        
        // Obtener los datos del formulario
        const formData = {
            nombre: this.querySelector('#nombre').value,
            email: this.querySelector('#email').value,
            telefono: this.querySelector('#telefono').value,
            asunto: this.querySelector('#asunto').value,
            mensaje: this.querySelector('#mensaje').value
        };
        
        // Mostrar mensaje de envío
        this.mostrarMensajeEstado('Enviando...', 'text-blue-600');
        
        // Deshabilitar el botón de envío
        const enviarBtn = this.querySelector('#enviar-btn');
        enviarBtn.disabled = true;
        enviarBtn.textContent = 'Enviando...';
        
        // URL de Vercel Function (proxy para Google Apps Script)
        const apiURL = '/api/contact';
        
        fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
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
            // Simplificar verificación - el backend siempre devuelve status: 'success' cuando es exitoso
            if (result.success && data.status === 'success') {
                this.mostrarMensajeEstado('¡Formulario enviado exitosamente!', 'text-green-600');
                this.querySelector('#contacto-form').reset();
                
                // Cerrar el modal después de 2 segundos
                setTimeout(() => {
                    const modal = this.querySelector('#escribenos-modal');
                    this.closeModal(modal);
                }, 2000);
            } else {
                this.mostrarMensajeEstado('Error al enviar el formulario. Inténtalo de nuevo.', 'text-red-600');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            this.mostrarMensajeEstado('Error de conexión. Verifica tu internet e inténtalo de nuevo.', 'text-red-600');
        })
        .finally(() => {
            // Rehabilitar el botón de envío
            enviarBtn.disabled = false;
            enviarBtn.textContent = 'Enviar';
        });
    }
    
    mostrarMensajeEstado(mensaje, colorClass) {
        const mensajeEstado = this.querySelector('#mensaje-estado');
        const textoEstado = this.querySelector('#texto-estado');
        
        if (mensajeEstado && textoEstado) {
            textoEstado.textContent = mensaje;
            textoEstado.className = `text-sm font-normal font-['Inter'] ${colorClass}`;
            mensajeEstado.classList.remove('hidden');
            
            // Ocultar el mensaje después de 5 segundos (excepto para mensajes de éxito)
            if (!colorClass.includes('green')) {
                setTimeout(() => {
                    mensajeEstado.classList.add('hidden');
                }, 5000);
            }
        }
    }

    closeModal(modal) {
        if (modal) {
            modal.classList.remove('opacity-100');
            modal.classList.add('opacity-0');
            setTimeout(() => {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
                // Restore body scroll when modal is closed
                document.body.style.overflow = 'auto';
                
                // Limpiar mensaje de estado al cerrar
                const mensajeEstado = this.querySelector('#mensaje-estado');
                if (mensajeEstado) {
                    mensajeEstado.classList.add('hidden');
                }
            }, 300);
        }
    }

    openAgendaModal() {
        const modal = this.querySelector('#agenda-llamada-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            // Prevent background scrolling
            document.body.style.overflow = 'hidden';
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
            // Prevent background scrolling
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                modal.classList.remove('opacity-0');
                modal.classList.add('opacity-100');
            }, 10);
        }
    }
}

// Define the custom element
customElements.define('modal-component', ModalComponent);