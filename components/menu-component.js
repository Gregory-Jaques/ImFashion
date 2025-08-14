class MenuComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <!-- Desktop Navigation -->
            <nav id="main-nav" class="hidden xl:block fixed top-0 left-0 w-screen xl:w-full z-[500] bg-transparent backdrop-blur-lg transition-all duration-300">
                <div class="w-full h-20 px-16 py-2">
                    <div id="nav-line" class="w-full h-px bg-white mt-1 mb-4 transition-colors duration-300"></div>
                    <div class="flex justify-between items-center h-full pb-2.5">
                        <!-- Logo -->
                        <div class="flex items-center">
                            <a href="index.html"><img src="images/imfashion-logo-menu.svg" alt="ImFashion Logo" class="h-10"></a>
                        </div>
                        
                        <!-- Menu Items -->
                        <div class="flex items-center space-x-20">
                            <div class="relative group">
                                <button id="servicios-btn" class="text-white text-lg font-medium">SERVICIOS</button>
                                <div class="absolute top-full right-0 mt-2 w-[483px] h-80 bg-white border border-black opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    <!-- Left section - Test de diagnostico -->
                                    <div class="absolute left-0 top-0 w-[292px] h-80 bg-white border-r border-b border-black">
                                        <div class="px-4 py-2 absolute left-[21px] top-[19px] inline-flex flex-col justify-center items-center">
                                            <div class="inline-flex justify-center items-center gap-2">
                                                <a href="test.html"><div class="text-black text-xl font-extralight leading-none">Test de diagnostico</div></a>
                                            </div>
                                            <div class="self-stretch h-[3px] relative overflow-hidden">
                                                <div class="w-60 h-[3px] left-0 top-[3px] absolute bg-black"></div>
                                            </div>
                                        </div>
                                        <div class="absolute left-[30px] top-[60px] text-neutral-500 text-sm font-normal leading-snug">
                                            Descubre en menos de 1 minuto en<br/>qué punto está tu marca
                                        </div>
                                        <a href="test.html"><img class="w-60 h-40 absolute left-[30px] top-[130px]" src="images/test-ig.jpg" alt="Test diagnostico" /></a>
                                    </div>
                                    
                                    <!-- Right section - Services -->
                                    <div class="absolute left-[292px] top-0 w-48 h-80 bg-white border-r border-b border-black">
                                        <!-- Foundation -->
                                        <a href="foundation.html" class="px-4 py-2 absolute left-[18px] top-[17px] inline-flex flex-col justify-center items-center hover:bg-gray-50">
                                            <div class="inline-flex justify-center items-center gap-2">
                                                <div class="text-black text-lg font-extralight leading-relaxed">Foundation</div>
                                            </div>
                                            <div class="self-stretch h-[3px] relative overflow-hidden">
                                                <div class="w-36 h-[3px] left-0 top-[3px] absolute bg-black"></div>
                                            </div>
                                        </a>
                                        
                                        <!-- Expansion -->
                                        <a href="expansion.html" class="px-4 py-2 absolute left-[18px] top-[70px] inline-flex flex-col justify-center items-center hover:bg-gray-50">
                                            <div class="inline-flex justify-center items-center gap-2">
                                                <div class="text-black text-lg font-extralight leading-relaxed">Expansion</div>
                                            </div>
                                            <div class="self-stretch h-[3px] relative overflow-hidden">
                                                <div class="w-36 h-[3px] left-0 top-[3px] absolute bg-black"></div>
                                            </div>
                                        </a>
                                        
                                        <!-- Rebuild -->
                                        <a href="rebuild.html" class="px-4 py-2 absolute left-[17px] top-[124px] inline-flex flex-col justify-center items-center hover:bg-gray-50">
                                            <div class="inline-flex justify-center items-center gap-2">
                                                <div class="text-black text-lg font-extralight leading-relaxed">Rebuild</div>
                                            </div>
                                            <div class="self-stretch h-[3px] relative overflow-hidden">
                                                <div class="w-28 h-[3px] left-0 top-[3px] absolute bg-black"></div>
                                            </div>
                                        </a>
                                        
                                        <!-- Amplify -->
                                        <a href="amplify.html" class="px-4 py-2 absolute left-[18px] top-[179px] inline-flex flex-col justify-center items-center hover:bg-gray-50">
                                            <div class="inline-flex justify-center items-center gap-2">
                                                <div class="text-black text-lg font-extralight leading-relaxed">Amplify</div>
                                            </div>
                                            <div class="self-stretch h-[3px] relative overflow-hidden">
                                                <div class="w-28 h-[3px] left-0 top-[3px] absolute bg-black"></div>
                                            </div>
                                        </a>
                                        
                                        <!-- Embedded -->
                                        <a href="embedded.html" class="px-4 py-2 absolute left-[16px] top-[234px] inline-flex flex-col justify-center items-center hover:bg-gray-50">
                                            <div class="inline-flex justify-center items-center gap-2">
                                                <div class="text-black text-lg font-extralight leading-relaxed">Embedded</div>
                                            </div>
                                            <div class="self-stretch h-[3px] relative overflow-hidden">
                                                <div class="w-36 h-[3px] left-0 top-[3px] absolute bg-black"></div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <a id="casos-btn" href="casos-de-exito.html" class="text-white text-lg font-medium">CASOS DE ÉXITO</a>
                            <a id="equipo-btn" href="equipo.html" class="text-white text-lg font-medium">EL EQUIPO</a>
                            
                            <!-- Contact Dropdown -->
                            <div class="relative group">
                                <button id="contacto-btn" class="text-white text-lg font-medium">CONTACTO</button>
                                <div class="absolute top-full w-[220px] right-0 mt-2 bg-white border border-black p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    <a href="#" id="agenda-llamada-menu" class="block px-4 py-2 text-black text-lg font-light hover:bg-gray-100">Agenda una llamada</a>
                                    <a href="#" id="escribenos-menu" class="block px-4 py-2 text-black text-lg font-light hover:bg-gray-100">Escríbenos</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- Mobile Navigation -->
            <nav id="mobile-nav" class="xl:hidden fixed top-0 left-0 w-full z-[500] bg-transparent backdrop-blur-lg transition-all duration-300">
                <div class="w-full h-20 px-4 py-4">
                    <div id="mobile-nav-line" class="w-full h-px bg-black mt-0 mb-2 transition-colors duration-300"></div>
                    <div class="flex justify-between items-center h-full">
                        <!-- Logo -->
                        <div class="flex items-center">
                            <a href="index.html"><img src="images/imfashion-logo-menu.svg" alt="ImFashion Logo" class="h-10"></a>
                        </div>
                        
                        <!-- Hamburger Menu -->
                        <button id="mobile-menu-btn" class="flex flex-col justify-center items-center w-8 h-8 space-y-1">
                            <span class="block w-6 h-0.5 bg-black transition-all duration-300"></span>
                            <span class="block w-6 h-0.5 bg-black transition-all duration-300"></span>
                            <span class="block w-6 h-0.5 bg-black transition-all duration-300"></span>
                        </button>
                    </div>
                </div>
            </nav>

            <!-- Mobile Menu Modal -->
            <div id="mobile-menu-modal" class="xl:hidden fixed inset-0 z-[600] bg-[#800020] transform translate-x-full transition-transform duration-300 ease-in-out">
                <div class="flex flex-col h-full">
                    <!-- Modal Header -->
                    <div class="flex justify-between items-center p-4 border-b border-white/20">
                        <a href="index.html"><img src="images/imfashion-logo-menu-white.png" alt="ImFashion Logo" class="h-10"></a>
                        <button id="mobile-menu-close" class="text-white text-2xl font-light">
                            ✕
                        </button>
                    </div>
                    
                    <!-- Modal Content -->
                    <div class="flex-1 overflow-y-auto p-6">
                        <!-- Services Section -->
                        <div class="mb-8">
                            <button id="mobile-servicios-btn" class="flex justify-between items-center w-full text-white text-xl font-medium py-4 border-b border-white/20">
                                SERVICIOS
                                <span class="text-lg transition-transform duration-200">+</span>
                            </button>
                            <div id="mobile-servicios-submenu" class="hidden mt-4 pl-4 space-y-4">
                                <!-- Test de diagnostico -->
                                <div class="mb-6">
                                    <a href="test.html"><h4 class="text-white text-lg font-medium mb-2">Test de diagnostico</h4></a>
                                    <p class="text-white/80 text-sm mb-4">Descubre en menos de 1 minuto en qué punto está tu marca</p>
                                </div>
                                
                                <!-- Services List -->
                                <div class="space-y-3">
                                    <a href="foundation.html" class="block text-white text-lg font-light py-2 border-b border-white/10">Foundation</a>
                                    <a href="expansion.html" class="block text-white text-lg font-light py-2 border-b border-white/10">Expansion</a>
                                    <a href="rebuild.html" class="block text-white text-lg font-light py-2 border-b border-white/10">Rebuild</a>
                                    <a href="amplify.html" class="block text-white text-lg font-light py-2 border-b border-white/10">Amplify</a>
                                    <a href="embedded.html" class="block text-white text-lg font-light py-2 border-b border-white/10">Embedded</a>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Casos de Éxito -->
                        <div class="mb-8">
                            <a href="casos-de-exito.html" class="block text-white text-xl font-medium py-4 border-b border-white/20">CASOS DE ÉXITO</a>
                        </div>
                        
                        <!-- El Equipo -->
                        <div class="mb-8">
                            <a href="equipo.html" class="block text-white text-xl font-medium py-4 border-b border-white/20">EL EQUIPO</a>
                        </div>
                        
                        <!-- Contact Section -->
                        <div class="mb-8">
                            <button id="mobile-contacto-btn" class="flex justify-between items-center w-full text-white text-xl font-medium py-4 border-b border-white/20">
                                CONTACTO
                                <span class="text-lg transition-transform duration-200">+</span>
                            </button>
                            <div id="mobile-contacto-submenu" class="hidden mt-4 pl-4 space-y-3">
                                <a href="#" id="mobile-agenda-llamada-btn" class="block text-white text-lg font-light py-2 border-b border-white/10">Agenda una llamada</a>
                                <a href="#" id="mobile-escribenos-btn" class="block text-white text-lg font-light py-2 border-b border-white/10">Escríbenos</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Reattach event listeners after innerHTML is set
        this.attachEventListeners();
    }

    attachEventListeners() {
        // Mobile menu toggle
        const mobileMenuBtn = this.querySelector('#mobile-menu-btn');
        const mobileMenuModal = this.querySelector('#mobile-menu-modal');
        const mobileMenuClose = this.querySelector('#mobile-menu-close');
        
        if (mobileMenuBtn && mobileMenuModal) {
            mobileMenuBtn.addEventListener('click', (e) => {
                e.preventDefault();
                // Remove hidden class first
                mobileMenuModal.classList.remove('hidden');
                // Then animate in
                mobileMenuModal.classList.remove('translate-x-full');
                mobileMenuModal.classList.add('translate-x-0');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        }
        
        if (mobileMenuClose && mobileMenuModal) {
            mobileMenuClose.addEventListener('click', () => {
                mobileMenuModal.classList.add('translate-x-full');
                mobileMenuModal.classList.remove('translate-x-0');
                document.body.style.overflow = 'auto'; // Restore scrolling
                // Add hidden class after transition
                setTimeout(() => {
                    mobileMenuModal.classList.add('hidden');
                }, 300);
            });
        }
        
        // Mobile submenu toggles
        const mobileServiciosBtn = this.querySelector('#mobile-servicios-btn');
        const mobileServiciosSubmenu = this.querySelector('#mobile-servicios-submenu');
        
        if (mobileServiciosBtn && mobileServiciosSubmenu) {
            mobileServiciosBtn.addEventListener('click', () => {
                mobileServiciosSubmenu.classList.toggle('hidden');
                const span = mobileServiciosBtn.querySelector('span');
                if (mobileServiciosSubmenu.classList.contains('hidden')) {
                    span.textContent = '+';
                } else {
                    span.textContent = '−';
                }
            });
        }
        
        const mobileContactoBtn = this.querySelector('#mobile-contacto-btn');
        const mobileContactoSubmenu = this.querySelector('#mobile-contacto-submenu');
        
        if (mobileContactoBtn && mobileContactoSubmenu) {
            mobileContactoBtn.addEventListener('click', () => {
                mobileContactoSubmenu.classList.toggle('hidden');
                const span = mobileContactoBtn.querySelector('span');
                if (mobileContactoSubmenu.classList.contains('hidden')) {
                    span.textContent = '+';
                } else {
                    span.textContent = '−';
                }
            });
        }
        
        // Contact menu items
        const agendaLlamadaMenu = this.querySelector('#agenda-llamada-menu');
        const escribenosMenu = this.querySelector('#escribenos-menu');
        const mobileAgendaBtn = this.querySelector('#mobile-agenda-llamada-btn');
        const mobileEscribenosBtn = this.querySelector('#mobile-escribenos-btn');
        
        if (agendaLlamadaMenu) {
            agendaLlamadaMenu.addEventListener('click', (e) => {
                e.preventDefault();
                if (typeof openAgendaModal === 'function') {
                    openAgendaModal();
                }
            });
        }
        
        if (escribenosMenu) {
            escribenosMenu.addEventListener('click', (e) => {
                e.preventDefault();
                if (typeof openEscribenosModal === 'function') {
                    openEscribenosModal();
                }
            });
        }
        
        if (mobileAgendaBtn) {
            mobileAgendaBtn.addEventListener('click', (e) => {
                e.preventDefault();
                // Close mobile menu first
                if (mobileMenuModal) {
                    mobileMenuModal.classList.add('translate-x-full');
                    mobileMenuModal.classList.remove('translate-x-0');
                    document.body.style.overflow = 'auto'; // Restore scrolling
                    // Add hidden class after transition
                    setTimeout(() => {
                        mobileMenuModal.classList.add('hidden');
                    }, 300);
                }
                // Open agenda modal after a short delay
                setTimeout(() => {
                    if (typeof openAgendaModal === 'function') {
                        openAgendaModal();
                    }
                }, 300);
            });
        }
        
        if (mobileEscribenosBtn) {
            mobileEscribenosBtn.addEventListener('click', (e) => {
                e.preventDefault();
                // Close mobile menu first
                if (mobileMenuModal) {
                    mobileMenuModal.classList.add('translate-x-full');
                    mobileMenuModal.classList.remove('translate-x-0');
                    document.body.style.overflow = 'auto'; // Restore scrolling
                    // Add hidden class after transition
                    setTimeout(() => {
                        mobileMenuModal.classList.add('hidden');
                    }, 300);
                }
                // Open escribenos modal after a short delay
                setTimeout(() => {
                    if (typeof openEscribenosModal === 'function') {
                        openEscribenosModal();
                    }
                }, 300);
            });
        }
    }
}

// Define the custom element
customElements.define('menu-component', MenuComponent);