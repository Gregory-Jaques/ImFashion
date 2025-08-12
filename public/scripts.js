// Variables globales para el carrusel
let animationId;

// Carrusel infinito para los logos de marcas
function initCarousel() {
    const carousel = document.querySelector('.carousel-container');
    const logosContainer = document.querySelector('.logos-container');
    
    if (!carousel || !logosContainer) return;
    
    // Duplicar los logos para crear el efecto infinito
    const originalLogos = logosContainer.innerHTML;
    logosContainer.innerHTML = originalLogos + originalLogos;
    
    // Variables para controlar la animación
    let currentPosition = 0;
    const speed = 0.5; // Velocidad del movimiento (píxeles por frame)
    let isPaused = false;
    
    // Función para animar el carrusel
    function animateCarousel() {
        if (!isPaused) {
            currentPosition -= speed;
            
            // Resetear posición cuando llegue a la mitad (logos duplicados)
            const containerWidth = logosContainer.scrollWidth / 2;
            if (Math.abs(currentPosition) >= containerWidth) {
                currentPosition = 0;
            }
            
            logosContainer.style.transform = `translateX(${currentPosition}px)`;
        }
        
        animationId = requestAnimationFrame(animateCarousel);
    }
    
    // Función para pausar el carrusel
    function pauseCarousel() {
        isPaused = true;
    }
    
    // Función para reanudar el carrusel
    function resumeCarousel() {
        isPaused = false;
    }
    
    // Event listeners para hover
    carousel.addEventListener('mouseenter', pauseCarousel);
    carousel.addEventListener('mouseleave', resumeCarousel);
    
    // Event listeners individuales para cada logo
    const logos = logosContainer.querySelectorAll('img');
    logos.forEach(logo => {
        logo.addEventListener('mouseenter', pauseCarousel);
        logo.addEventListener('mouseleave', resumeCarousel);
    });
    
    // Iniciar la animación
    animateCarousel();
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel if it exists
    initCarousel();

// Testimonials Carousel
function initTestimonialsCarousel() {
    const slides = document.querySelectorAll('.testimonial-slide');
    console.log('Found testimonial slides:', slides.length);
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    
    function showSlide(index) {
        console.log('Showing slide:', index);
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Show current slide
        slides[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        console.log('Next slide:', currentSlide);
        showSlide(currentSlide);
    }
    
    // Initialize first slide
    showSlide(0);
    
    // Auto-advance slides every 2 seconds
    setInterval(nextSlide, 2000);
}
    
    // Initialize testimonials carousel
    initTestimonialsCarousel();
    
    // Initialize mobile menu
    setupMobileMenu();
    
    // Initialize service events
    setupServiceEvents();
    
    // Navigation scroll effect - Initialize for all pages
    initNavigationColorSystem();
    
    // Modal functionality for "Agenda una llamada" - moved here to avoid duplicate DOMContentLoaded
    const agendaLlamadaModal = document.getElementById('agenda-llamada-modal');
    const agendaLlamadaBtn = document.getElementById('agenda-llamada-btn');
    const agendaLlamadaMenu = document.getElementById('agenda-llamada-menu');
    const closeAgendaModal = document.getElementById('close-agenda-modal');
    
    // Function to close modal
    function closeAgendaModalFunc() {
        if (agendaLlamadaModal) {
            const modalContent = agendaLlamadaModal.querySelector('div');
            
            agendaLlamadaModal.classList.remove('opacity-100');
            agendaLlamadaModal.classList.add('opacity-0');
            if (modalContent) {
                modalContent.classList.remove('translate-y-0', 'opacity-100');
                modalContent.classList.add('translate-y-4', 'opacity-95');
            }
            
            setTimeout(() => {
                agendaLlamadaModal.classList.add('hidden');
                agendaLlamadaModal.classList.remove('flex');
                document.body.style.overflow = 'auto'; // Restore scrolling
            }, 300);
        }
    }
    
    // Open modal events
    if (agendaLlamadaBtn && agendaLlamadaModal) {
        agendaLlamadaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openAgendaModal();
        });
    }
    
    if (agendaLlamadaMenu && agendaLlamadaModal) {
        agendaLlamadaMenu.addEventListener('click', function(e) {
            e.preventDefault();
            openAgendaModal();
        });
    }
    
    // Close modal events
    if (closeAgendaModal) {
        closeAgendaModal.addEventListener('click', closeAgendaModalFunc);
    }
    
    if (agendaLlamadaModal) {
        agendaLlamadaModal.addEventListener('click', function(e) {
            if (e.target === agendaLlamadaModal) {
                closeAgendaModalFunc();
            }
        });
    }
    
    // Similar setup for "Escribenos" modal
    const escribenosModal = document.getElementById('escribenos-modal');
    const escribenosBtn = document.getElementById('escribenos-btn');
    const escribenosMenu = document.getElementById('escribenos-menu');
    const closeEscribenosModal = document.getElementById('close-escribenos-modal');
    
    if (escribenosBtn && escribenosModal) {
        escribenosBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openEscribenosModal();
        });
    }
    
    if (escribenosMenu && escribenosModal) {
        escribenosMenu.addEventListener('click', function(e) {
            e.preventDefault();
            openEscribenosModal();
        });
    }
    
    if (closeEscribenosModal) {
        closeEscribenosModal.addEventListener('click', function() {
            escribenosModal.classList.add('hidden');
            escribenosModal.classList.remove('flex');
            document.body.style.overflow = 'auto'; // Restore scrolling
        });
    }
    
    if (escribenosModal) {
        escribenosModal.addEventListener('click', function(e) {
            if (e.target === escribenosModal) {
                escribenosModal.classList.add('hidden');
                escribenosModal.classList.remove('flex');
                document.body.style.overflow = 'auto'; // Restore scrolling
            }
        });
    }
    
    // Mobile menu modal events
    const mobileAgendaBtn = document.getElementById('mobile-agenda-llamada-btn');
    const mobileEscribenosBtn = document.getElementById('mobile-escribenos-btn');
    
    if (mobileAgendaBtn) {
        mobileAgendaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const mobileModal = document.getElementById('mobile-menu-modal');
            if (mobileModal) {
                mobileModal.classList.add('translate-x-full');
                mobileModal.classList.remove('translate-x-0');
                setTimeout(() => {
                    mobileModal.classList.add('hidden');
                    openAgendaModal();
                }, 300);
            }
        });
    }
    
    if (mobileEscribenosBtn) {
        mobileEscribenosBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const mobileModal = document.getElementById('mobile-menu-modal');
            if (mobileModal) {
                mobileModal.classList.add('translate-x-full');
                mobileModal.classList.remove('translate-x-0');
                setTimeout(() => {
                    mobileModal.classList.add('hidden');
                    openEscribenosModal();
                }, 300);
            }
        });
    }
    
    // Limpiar la animación cuando se cierre la página
    window.addEventListener('beforeunload', function() {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    });
});

// Mobile menu functionality
function setupMobileMenu() {
    const hamburgerBtn = document.getElementById('mobile-menu-btn');
    const mobileModal = document.getElementById('mobile-menu-modal');
    const closeBtn = document.getElementById('mobile-menu-close');
    const serviciosBtn = document.getElementById('mobile-servicios-btn');
    const serviciosSubmenu = document.getElementById('mobile-servicios-submenu');
    const contactoBtn = document.getElementById('mobile-contacto-btn');
    const contactoSubmenu = document.getElementById('mobile-contacto-submenu');
    
    // Open mobile menu
    if (hamburgerBtn && mobileModal) {
        hamburgerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            mobileModal.classList.remove('translate-x-full');
            mobileModal.classList.add('translate-x-0');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    }
    
    // Close mobile menu
    if (closeBtn && mobileModal) {
        closeBtn.addEventListener('click', function() {
            mobileModal.classList.add('translate-x-full');
            mobileModal.classList.remove('translate-x-0');
            document.body.style.overflow = 'auto'; // Restore scrolling
        });
    }
    
    // Toggle servicios submenu
    if (serviciosBtn && serviciosSubmenu) {
        serviciosBtn.addEventListener('click', function() {
            serviciosSubmenu.classList.toggle('hidden');
        });
    }
    
    // Toggle contacto submenu
    if (contactoBtn && contactoSubmenu) {
        contactoBtn.addEventListener('click', function() {
            contactoSubmenu.classList.toggle('hidden');
        });
    }
    
    // Mobile menu modal buttons
    const mobileAgendaBtn = document.getElementById('mobile-agenda-llamada-btn');
    const mobileEscribenosBtn = document.getElementById('mobile-escribenos-btn');
    
    if (mobileAgendaBtn) {
        mobileAgendaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Close mobile menu first
            mobileModal.classList.add('translate-x-full');
            mobileModal.classList.remove('translate-x-0');
            document.body.style.overflow = 'auto';
            // Open agenda modal after a short delay
            setTimeout(() => {
                openAgendaModal();
            }, 300);
        });
    }
    
    if (mobileEscribenosBtn) {
        mobileEscribenosBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Close mobile menu first
            mobileModal.classList.add('translate-x-full');
            mobileModal.classList.remove('translate-x-0');
            document.body.style.overflow = 'auto';
            // Open escribenos modal after a short delay
            setTimeout(() => {
                openEscribenosModal();
            }, 300);
        });
    }
    
    // Close menu when clicking outside
    if (mobileModal) {
        mobileModal.addEventListener('click', function(e) {
            if (e.target === mobileModal) {
                mobileModal.classList.add('translate-x-full');
                mobileModal.classList.remove('translate-x-0');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Efecto hover dinámico para los servicios
function setupServiceEvents() {
    const serviceItems = document.querySelectorAll('.service-item');
    
    if (!serviceItems.length) return;
    
    // Función para detectar si estamos en desktop (xl breakpoint)
    function isDesktop() {
        return window.innerWidth >= 1280;
    }
    
    // Función para activar un servicio
    function activateService(activeItem) {
        const desktop = isDesktop();
        
        serviceItems.forEach(item => {
            const img = item.querySelector('img');
            const paragraph = item.querySelector('p');
            const link = item.querySelector('a');
            
            if (item === activeItem) {
                if (desktop) {
                    // Desktop: expandir ancho
                    item.classList.remove('xl:w-[16.6%]');
                    item.classList.add('xl:w-[33.3%]');
                } else {
                    // Mobile: expandir altura
                    item.classList.remove('h-[120px]');
                    item.classList.add('h-[300px]');
                }
                
                // Remover blur y grayscale de la imagen
                img.classList.remove('blur-sm', 'grayscale');
                
                // Mostrar contenido con delay para que aparezca después de la expansión
                setTimeout(() => {
                    paragraph.classList.remove('hidden');
                    paragraph.classList.remove('opacity-0');
                    paragraph.classList.add('opacity-100');
                    link.classList.remove('hidden');
                    link.classList.remove('opacity-0');
                    link.classList.add('opacity-100');
                }, 250);
            } else {
                // Servicios inactivos - ocultar contenido instantáneamente
                paragraph.classList.add('hidden');
                paragraph.classList.remove('opacity-100');
                paragraph.classList.add('opacity-0');
                link.classList.add('hidden');
                link.classList.remove('opacity-100');
                link.classList.add('opacity-0');
                
                if (desktop) {
                    // Desktop: contraer ancho
                    item.classList.remove('xl:w-[33.3%]');
                    item.classList.add('xl:w-[16.6%]');
                } else {
                    // Mobile: contraer altura
                    item.classList.remove('h-[300px]');
                    item.classList.add('h-[120px]');
                }
                
                // Aplicar blur y grayscale
                img.classList.add('blur-sm', 'grayscale');
            }
        });
    }
    
    // Event listeners según el dispositivo
    function setupEventListeners() {
        const desktop = isDesktop();
        
        serviceItems.forEach(item => {
            // Remover listeners previos
            item.removeEventListener('mouseenter', item._hoverHandler);
            item.removeEventListener('click', item._clickHandler);
            
            if (desktop) {
                // Desktop: usar hover
                item._hoverHandler = () => activateService(item);
                item.addEventListener('mouseenter', item._hoverHandler);
            } else {
                // Mobile: usar click/touch
                item._clickHandler = () => activateService(item);
                item.addEventListener('click', item._clickHandler);
            }
        });
    }
    
    // Configurar listeners iniciales
    setupEventListeners();
    
    // Reconfigurar en resize
    window.addEventListener('resize', setupEventListeners);
    
    // Establecer Foundation como activo por defecto
    const foundationService = document.querySelector('[data-service="foundation"]');
    if (foundationService) {
        activateService(foundationService);
    }
}

// Global modal functions
function openAgendaModal() {
    const agendaLlamadaModal = document.getElementById('agenda-llamada-modal');
    if (!agendaLlamadaModal) return;
    
    const modalContent = agendaLlamadaModal.querySelector('div');
    
    agendaLlamadaModal.classList.remove('hidden');
    agendaLlamadaModal.classList.add('flex');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Trigger transition
    setTimeout(() => {
        agendaLlamadaModal.classList.remove('opacity-0');
        agendaLlamadaModal.classList.add('opacity-100');
        modalContent.classList.remove('translate-y-4', 'opacity-95');
        modalContent.classList.add('translate-y-0', 'opacity-100');
    }, 10);
}

function openEscribenosModal() {
    const escribenosModal = document.getElementById('escribenos-modal');
    if (!escribenosModal) return;
    
    const modalContent = escribenosModal.querySelector('div > div');
    
    escribenosModal.classList.remove('hidden');
    escribenosModal.classList.add('flex');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Trigger transition
    setTimeout(() => {
        escribenosModal.classList.remove('opacity-0');
        escribenosModal.classList.add('opacity-100');
        if (modalContent) {
            modalContent.classList.remove('translate-y-4', 'opacity-95');
            modalContent.classList.add('translate-y-0', 'opacity-100');
        }
    }, 10);
}

// Navigation color system - works on all pages
function initNavigationColorSystem() {
    const nav = document.getElementById('main-nav');
    const navLine = document.getElementById('nav-line');
    const serviciosBtn = document.getElementById('servicios-btn');
    const casosBtn = document.getElementById('casos-btn');
    const equipoBtn = document.getElementById('equipo-btn');
    const contactoBtn = document.getElementById('contacto-btn');
    
    // Only initialize if nav elements exist
    if (!nav || !navLine || !serviciosBtn || !casosBtn || !equipoBtn || !contactoBtn) {
        return;
    }
    
    // Function to get background color brightness
    function getBackgroundBrightness() {
        // Get the element behind the nav (at nav position)
        const navRect = nav.getBoundingClientRect();
        const elementBehind = document.elementFromPoint(navRect.left + navRect.width / 2, navRect.top + navRect.height + 10);
        
        if (!elementBehind) return 255; // Default to light
        
        console.log('Element behind nav:', elementBehind.tagName, elementBehind.className);
        
        // Check if we're over a hero section with dark background
        if (elementBehind.closest('section') && 
            (elementBehind.closest('section').classList.contains('bg-black') || 
             elementBehind.closest('section').querySelector('img[src*="bg"]'))) {
            console.log('Detected hero section with dark background');
            return 50; // Force dark background detection
        }
        
        // Get computed background color
        const computedStyle = window.getComputedStyle(elementBehind);
        let backgroundColor = computedStyle.backgroundColor;
        
        console.log('Initial background color:', backgroundColor);
        
        // If transparent, check parent elements
        let currentElement = elementBehind;
        let depth = 0;
        while ((backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor === 'transparent') && depth < 10) {
            currentElement = currentElement.parentElement;
            if (!currentElement || currentElement === document.body) {
                backgroundColor = 'rgb(255, 255, 255)'; // Default to white
                break;
            }
            backgroundColor = window.getComputedStyle(currentElement).backgroundColor;
            console.log('Parent element:', currentElement.tagName, 'background:', backgroundColor);
            depth++;
        }
        
        // Parse RGB values
        const rgbMatch = backgroundColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (!rgbMatch) return 255; // Default to light
        
        const r = parseInt(rgbMatch[1]);
        const g = parseInt(rgbMatch[2]);
        const b = parseInt(rgbMatch[3]);
        
        // Calculate brightness using luminance formula
        const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
        console.log('Final RGB:', r, g, b, 'Brightness:', brightness);
        return brightness;
    }
    
    // Function to change nav colors based on background
    function updateNavColors() {
        const brightness = getBackgroundBrightness();
        const isDarkBackground = brightness < 128; // Threshold for dark/light
        
        console.log('Brightness detected:', brightness, 'isDark:', isDarkBackground);
        
        if (isDarkBackground) {
            // Dark background - use light colors
            console.log('Applying light colors for dark background');
            navLine.classList.remove('bg-black');
            navLine.classList.add('bg-white');
            serviciosBtn.classList.remove('text-black');
            serviciosBtn.classList.add('text-white');
            casosBtn.classList.remove('text-black');
            casosBtn.classList.add('text-white');
            equipoBtn.classList.remove('text-black');
            equipoBtn.classList.add('text-white');
            contactoBtn.classList.remove('text-black');
            contactoBtn.classList.add('text-white');
        } else {
            // Light background - use dark colors
            console.log('Applying dark colors for light background');
            navLine.classList.remove('bg-white');
            navLine.classList.add('bg-black');
            serviciosBtn.classList.remove('text-white');
            serviciosBtn.classList.add('text-black');
            casosBtn.classList.remove('text-white');
            casosBtn.classList.add('text-black');
            equipoBtn.classList.remove('text-white');
            equipoBtn.classList.add('text-black');
            contactoBtn.classList.remove('text-white');
            contactoBtn.classList.add('text-black');
        }
    }
    
    // Scroll event listener with throttling for performance
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateNavColors();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    updateNavColors();
}

// Duplicate DOMContentLoaded block removed - functionality moved to main DOMContentLoaded block above