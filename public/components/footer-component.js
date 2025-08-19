class FooterComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <!-- Contact Section -->
            <section id="contacto" class="w-full bg-white py-16">
                <div class=" mx-auto px-8 xl:px-16">
                    <div class="flex xl:justify-between items-center flex-col xl:flex-row">
                        <div>
                            <h2 class="text-black text-2xl xl:text-6xl font-bold uppercase leading-tight mb-4 xl:mb-8 text-center xl:text-left">¿Hablamos?</h2>
                            <p class="text-black text-lg xl:text-xl font-light leading-snug max-w-2xl text-center xl:text-left">
                                Si has llegado hasta aquí es porque tu marca está en un momento clave. Veamos juntos como podemos evolucionar al siguiente nivel.
                            </p>
                        </div>
                        
                        <div class="flex xl:space-x-4 flex-col xl:flex-row mt-10 xl:mt-0 gap-4 xl:gap-0 items-center">
                            <button id="agenda-llamada-btn" class="xl:px-16 xl:py-3 px-12 py-2 rounded-full border border-[#D4B996] text-[#D4B996] text-lg xl:text-xl font-semibold hover:bg-[#D4B996] hover:text-white transition-colors">
                                Agenda una llamada
                            </button>
                            <div class="w-16 h-px bg-[#D4B996] rotate-0 xl:rotate-90 self-center"></div>
                            <button id="escribenos-btn" class="xl:px-20 xl:py-3 px-12 py-2 rounded-full border border-[#D4B996] text-[#D4B996] text-lg xl:text-xl font-semibold hover:bg-[#D4B996] hover:text-white transition-colors">
                                Escríbenos
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Footer -->
            <footer class="bg-zinc-900 pt-12 xl:pt-24 pb-8">
                <div class="w-full mx-auto px-8 xl:px-16">
                    <div class="flex justify-between items-start mb-16 flex-col xl:flex-row gap-6 xl:gap-0">
                        <div class="text-center">
                            <img src="images/fashion-logo.svg" alt="Fashion Logo" class="mb-8 xl:hidden">
                        </div>
                        <div class="flex flex-col">
                            <div class="mb-8">
                                <p class="text-white text-xl font-extralight leading-snug mb-4">(+34) 93 122 62 54</p>
                                <p class="text-white text-xl font-extralight leading-snug mb-2">Pg. de Gràcia, 21,</p>
                                <p class="text-white text-xl font-extralight leading-snug mb-4">08007 Barcelona</p>
                                <a href="https://www.google.com/maps/place/P.%C2%BA+de+Gracia,+21,+Eixample,+08007+Barcelona,+Espa%C3%B1a/@41.3902442,2.166457,17z/data=!3m1!4b1!4m6!3m5!1s0x12a4a2f29005ea9f:0x5e3af35c4a0c5a9d!8m2!3d41.3902442!4d2.166457!16s%2Fg%2F11bw40b78t?entry=ttu&g_ep=EgoyMDI1MDgxMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" class="text-white text-xl font-extralight underline leading-snug hover:text-[#D4B996] transition-colors">
                                    Ver en mapa
                                </a>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" class="inline ml-2">
                                    <path d="M12 1C12 0.447714 11.5523 -7.61451e-07 11 -3.39982e-07L2 -2.13542e-07C1.44772 -5.50717e-07 1 0.447715 1 0.999999C1 1.55228 1.44772 2 2 2L10 2L10 10C10 10.5523 10.4477 11 11 11C11.5523 11 12 10.5523 12 10L12 1ZM1 11L1.70711 11.7071L11.7071 1.70711L11 0.999999L10.2929 0.292893L0.292893 10.2929L1 11Z" fill="white"/>
                                </svg>
                            </div>
                        </div>
                        
                        <div class="text-center">
                            <img src="images/fashion-logo.svg" alt="Fashion Logo" class="mb-8 hidden xl:block h-20">
                            <a href="https://immoral.marketing"  target="_blank" ><p class="text-[#D4B996] text-xl font-extralight leading-snug mb-2 hidden xl:block">Somos parte de</p>
                            <img src="images/immoral-logo-white.svg" alt="Immoral Logo" class="mx-auto hidden xl:block"></a>
                        </div>
                        
                        <div>
                            <p class="text-white text-xl font-extralight leading-snug mb-4">Síguenos</p>
                            <div class="space-y-2">
                                <a href="https://www.tiktok.com/@immoral.marketing"  target="_blank"  class="block text-white text-lg font-extralight underline uppercase hover:text-[#D4B996] transition-colors">tiktok</a>
                                <a href="https://www.instagram.com/immoral.marketing/"  target="_blank"  class="block text-white text-lg font-extralight underline uppercase hover:text-[#D4B996] transition-colors">instagram</a>
                                <a href="https://es.linkedin.com/company/immoral-marketing"   target="_blank" class="block text-white text-lg font-extralight underline uppercase hover:text-[#D4B996] transition-colors">linkedin</a>
                            </div>
                        </div>

                        <div class="text-center">
                            <p class="text-[#D4B996] text-xl font-extralight leading-snug mt-8 mb-2 xl:hidden">Somos parte de</p>
                            <a href="https://immoral.marketing"  target="_blank" ><img src="images/immoral-logo-white.svg" alt="Immoral Logo" class="mx-auto xl:hidden"></a>
                        </div>
                    </div>
                    
                    <div class="border-t border-white pt-6">
                        <div class="flex flex-col xl:flex-row xl:justify-between items-center">
                            <p class="text-white text-base font-light">©2025 Immoral Fashion</p>
                            <p class="text-white text-base font-light">Privacidad      Legal      Cookies</p>
                        </div>
                    </div>
                </div>
            </footer>
        `;
        
        // Reattach event listeners after innerHTML is set
        this.attachEventListeners();
    }

    attachEventListeners() {
        const agendaBtn = this.querySelector('#agenda-llamada-btn');
        const escribenosBtn = this.querySelector('#escribenos-btn');
        
        if (agendaBtn) {
            agendaBtn.addEventListener('click', () => {
                // Add your agenda llamada functionality here
                console.log('Agenda una llamada clicked');
            });
        }
        
        if (escribenosBtn) {
            escribenosBtn.addEventListener('click', () => {
                // Add your escribenos functionality here
                console.log('Escríbenos clicked');
            });
        }
    }
}

// Define the custom element
customElements.define('footer-component', FooterComponent);