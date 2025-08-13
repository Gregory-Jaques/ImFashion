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

// Portfolio Carousel with free drag functionality
function initPortfolioCarousel() {
    const container = document.querySelector('.portfolio-carousel-container');
    const track = document.querySelector('.portfolio-carousel-track');
    const prevBtn = document.querySelector('.portfolio-nav-prev');
    const nextBtn = document.querySelector('.portfolio-nav-next');
    const cards = document.querySelectorAll('.portfolio-card');
    
    if (!container || !track || cards.length === 0) return;
    
    // Free drag variables
    let currentTranslateX = 0;
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let initialTransform = 0;
    let maxTranslateX = 0;
    let minTranslateX = 0;
    let isInitialized = false;
    
    // Wait for images to load before initializing
    function waitForImages() {
        const images = track.querySelectorAll('img');
        const imagePromises = Array.from(images).map(img => {
            if (img.complete) {
                return Promise.resolve();
            }
            return new Promise(resolve => {
                img.addEventListener('load', resolve);
                img.addEventListener('error', resolve); // Continue even if image fails
            });
        });
        
        return Promise.all(imagePromises);
    }
    
    // Calculate dimensions and limits with validation and retry
    function updateDimensions(retryCount = 0) {
        const containerWidth = container.offsetWidth;
        const trackWidth = track.scrollWidth;
        
        // Validate dimensions - retry if trackWidth is 0 or invalid
        if (trackWidth === 0 || containerWidth === 0) {
            if (retryCount < 3) {
                console.warn(`Portfolio carousel: Invalid dimensions detected (container: ${containerWidth}px, track: ${trackWidth}px). Retrying... (${retryCount + 1}/3)`);
                setTimeout(() => updateDimensions(retryCount + 1), 100 * (retryCount + 1));
                return;
            } else {
                console.error('Portfolio carousel: Failed to get valid dimensions after 3 retries');
                return;
            }
        }
        
        // Calculate limits for free scrolling
        maxTranslateX = 0; // Can't scroll right beyond start
        
        // Only set minTranslateX if track is wider than container
        if (trackWidth > containerWidth) {
            minTranslateX = containerWidth - trackWidth; // Can scroll left to show all content
        } else {
            minTranslateX = 0; // If track fits in container, don't allow scrolling
        }
        
        // Ensure current position is within bounds
        currentTranslateX = Math.max(minTranslateX, Math.min(maxTranslateX, currentTranslateX));
        updateCarousel();
        
        if (!isInitialized) {
            isInitialized = true;
            console.log(`Portfolio carousel initialized: container ${containerWidth}px, track ${trackWidth}px`);
        }
    }
    
    // Update carousel position
    function updateCarousel() {
        track.style.transform = `translateX(${currentTranslateX}px)`;
        
        // Update button states if they exist
        if (prevBtn && nextBtn) {
            prevBtn.style.opacity = currentTranslateX >= maxTranslateX ? '0.5' : '1';
            prevBtn.style.pointerEvents = currentTranslateX >= maxTranslateX ? 'none' : 'auto';
            nextBtn.style.opacity = currentTranslateX <= minTranslateX ? '0.5' : '1';
            nextBtn.style.pointerEvents = currentTranslateX <= minTranslateX ? 'none' : 'auto';
        }
    }
    
    // Navigation functions (if buttons exist)
    function goToPrev() {
        const scrollAmount = container.offsetWidth * 0.8; // Scroll 80% of container width
        currentTranslateX = Math.min(maxTranslateX, currentTranslateX + scrollAmount);
        track.style.transition = 'transform 0.3s ease-out';
        updateCarousel();
        setTimeout(() => {
            track.style.transition = 'none';
        }, 300);
    }
    
    function goToNext() {
        const scrollAmount = container.offsetWidth * 0.8; // Scroll 80% of container width
        currentTranslateX = Math.max(minTranslateX, currentTranslateX - scrollAmount);
        track.style.transition = 'transform 0.3s ease-out';
        updateCarousel();
        setTimeout(() => {
            track.style.transition = 'none';
        }, 300);
    }
    
    // Mouse drag functionality
    function handleMouseDown(e) {
        isDragging = true;
        startX = e.clientX;
        currentX = e.clientX;
        initialTransform = currentTranslateX;
        track.style.cursor = 'grabbing';
        track.style.transition = 'none';
        
        // Prevent text selection
        e.preventDefault();
    }
    
    function handleMouseMove(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        currentX = e.clientX;
        const deltaX = currentX - startX;
        let newTransform = initialTransform + deltaX;
        
        // Apply elastic resistance at boundaries
        if (newTransform > maxTranslateX) {
            const excess = newTransform - maxTranslateX;
            newTransform = maxTranslateX + excess * 0.3; // Elastic effect
        } else if (newTransform < minTranslateX) {
            const excess = minTranslateX - newTransform;
            newTransform = minTranslateX - excess * 0.3; // Elastic effect
        }
        
        track.style.transform = `translateX(${newTransform}px)`;
    }
    
    function handleMouseUp() {
        if (!isDragging) return;
        
        isDragging = false;
        track.style.cursor = 'grab';
        
        const deltaX = currentX - startX;
        let finalTransform = initialTransform + deltaX;
        
        // Snap back to bounds if outside with smooth transition
        finalTransform = Math.max(minTranslateX, Math.min(maxTranslateX, finalTransform));
        
        // Only add transition if we need to snap back to bounds
        if (finalTransform !== initialTransform + deltaX) {
            track.style.transition = 'transform 0.3s ease-out';
            setTimeout(() => {
                track.style.transition = 'none';
            }, 300);
        } else {
            track.style.transition = 'none';
        }
        
        currentTranslateX = finalTransform;
        track.style.transform = `translateX(${currentTranslateX}px)`;
        
        // Update button states
        if (prevBtn && nextBtn) {
            prevBtn.style.opacity = currentTranslateX >= maxTranslateX ? '0.5' : '1';
            prevBtn.style.pointerEvents = currentTranslateX >= maxTranslateX ? 'none' : 'auto';
            nextBtn.style.opacity = currentTranslateX <= minTranslateX ? '0.5' : '1';
            nextBtn.style.pointerEvents = currentTranslateX <= minTranslateX ? 'none' : 'auto';
        }
    }
    
    // Touch functionality
    function handleTouchStart(e) {
        isDragging = true;
        startX = e.touches[0].clientX;
        currentX = e.touches[0].clientX;
        initialTransform = currentTranslateX;
        track.style.transition = 'none';
    }
    
    function handleTouchMove(e) {
        if (!isDragging) return;
        
        currentX = e.touches[0].clientX;
        const deltaX = currentX - startX;
        let newTransform = initialTransform + deltaX;
        
        // Apply elastic resistance at boundaries
        if (newTransform > maxTranslateX) {
            const excess = newTransform - maxTranslateX;
            newTransform = maxTranslateX + excess * 0.3; // Elastic effect
        } else if (newTransform < minTranslateX) {
            const excess = minTranslateX - newTransform;
            newTransform = minTranslateX - excess * 0.3; // Elastic effect
        }
        
        track.style.transform = `translateX(${newTransform}px)`;
        
        // Prevent page scroll when dragging horizontally
        if (Math.abs(deltaX) > 10) {
            e.preventDefault();
        }
    }
    
    function handleTouchEnd() {
        if (!isDragging) return;
        
        isDragging = false;
        
        const deltaX = currentX - startX;
        let finalTransform = initialTransform + deltaX;
        
        // Snap back to bounds if outside with smooth transition
        finalTransform = Math.max(minTranslateX, Math.min(maxTranslateX, finalTransform));
        
        // Only add transition if we need to snap back to bounds
        if (finalTransform !== initialTransform + deltaX) {
            track.style.transition = 'transform 0.3s ease-out';
            setTimeout(() => {
                track.style.transition = 'none';
            }, 300);
        } else {
            track.style.transition = 'none';
        }
        
        currentTranslateX = finalTransform;
        track.style.transform = `translateX(${currentTranslateX}px)`;
        
        // Update button states
        if (prevBtn && nextBtn) {
            prevBtn.style.opacity = currentTranslateX >= maxTranslateX ? '0.5' : '1';
            prevBtn.style.pointerEvents = currentTranslateX >= maxTranslateX ? 'none' : 'auto';
            nextBtn.style.opacity = currentTranslateX <= minTranslateX ? '0.5' : '1';
            nextBtn.style.pointerEvents = currentTranslateX <= minTranslateX ? 'none' : 'auto';
        }
    }
    
    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', goToPrev);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', goToNext);
    }
    
    // Mouse events
    track.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Touch events
    track.addEventListener('touchstart', handleTouchStart, { passive: false });
    track.addEventListener('touchmove', handleTouchMove, { passive: false });
    track.addEventListener('touchend', handleTouchEnd);
    
    // Keyboard navigation
    container.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            goToPrev();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            goToNext();
        }
    });
    
    // Make container focusable for keyboard navigation
    container.setAttribute('tabindex', '0');
    
    // Window resize handler
    window.addEventListener('resize', updateDimensions);
    
    // Initial setup with improved initialization
    track.style.cursor = 'grab';
    
    // Initialize with delay and image loading wait
    async function initialize() {
        try {
            // Wait for images to load
            await waitForImages();
            
            // Add a small delay to ensure DOM is fully settled
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Now calculate dimensions
            updateDimensions();
            
            console.log('Portfolio carousel initialized with', cards.length, 'cards');
        } catch (error) {
            console.error('Error initializing portfolio carousel:', error);
            // Fallback initialization without image waiting
            setTimeout(() => {
                updateDimensions();
                console.log('Portfolio carousel initialized (fallback) with', cards.length, 'cards');
            }, 200);
        }
    }
    
    // Start initialization
    initialize();
}

// Team Carousel - Two rows with opposite directions (continuous infinite scroll)
function initTeamCarousel() {
    // Right-moving carousel (first row)
    const carouselRight = document.querySelector('.team-carousel-container-right');
    const trackRight = document.querySelector('.team-carousel-track-right');
    
    // Left-moving carousel (second row)
    const carouselLeft = document.querySelector('.team-carousel-container-left');
    const trackLeft = document.querySelector('.team-carousel-track-left');
    
    if (!carouselRight || !trackRight || !carouselLeft || !trackLeft) return;
    
    // Variables para controlar la animación del carrusel derecho
    let currentPositionRight = 0;
    const speedRight = 0.8; // Velocidad del movimiento (píxeles por frame)
    let animationIdRight;
    
    // Variables para controlar la animación del carrusel izquierdo
    let currentPositionLeft = 0;
    const speedLeft = 0.8; // Velocidad del movimiento (píxeles por frame)
    let animationIdLeft;
    
    // Función para animar el carrusel derecho (hacia la derecha) - infinito continuo
    function animateTeamCarouselRight() {
        currentPositionRight -= speedRight;
        
        // Crear efecto infinito suave sin resetear bruscamente
        const trackWidth = trackRight.scrollWidth / 2;
        if (Math.abs(currentPositionRight) >= trackWidth) {
            currentPositionRight += trackWidth;
        }
        
        trackRight.style.transform = `translateX(${currentPositionRight}px)`;
        animationIdRight = requestAnimationFrame(animateTeamCarouselRight);
    }
    
    // Función para animar el carrusel izquierdo (hacia la izquierda) - infinito continuo
    function animateTeamCarouselLeft() {
        currentPositionLeft += speedLeft;
        
        // Crear efecto infinito suave sin resetear bruscamente
        const trackWidth = trackLeft.scrollWidth / 2;
        if (currentPositionLeft >= trackWidth) {
            currentPositionLeft -= trackWidth;
        }
        
        trackLeft.style.transform = `translateX(${currentPositionLeft}px)`;
        animationIdLeft = requestAnimationFrame(animateTeamCarouselLeft);
    }
    
    // Inicializar posición del carrusel izquierdo
    currentPositionLeft = -(trackLeft.scrollWidth / 2);
    
    // Iniciar las animaciones continuas
    animateTeamCarouselRight();
    animateTeamCarouselLeft();
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel if it exists
    initCarousel();
    
    // Initialize team carousel
    initTeamCarousel();
    
    // Initialize portfolio carousel
    initPortfolioCarousel();

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
    
    // Initialize stacking cards effect
    initStackingCards();
    
    // Setup mobile menu
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

// Stacking Cards Scroll Effect
function initStackingCards() {
    const cards = document.querySelectorAll('.stacking-card');
    const container = document.querySelector('.stacking-cards-container');
    
    if (!cards.length || !container) return;
    
    function updateCardsOnScroll() {
        const containerRect = container.getBoundingClientRect();
        const containerTop = containerRect.top;
        const containerHeight = containerRect.height;
        const viewportHeight = window.innerHeight;
        
        // Calculate scroll progress through the container
        const scrollProgress = Math.max(0, Math.min(1, -containerTop / (containerHeight - viewportHeight)));
        
        cards.forEach((card, index) => {
            const cardProgress = scrollProgress * cards.length;
            const cardIndex = index + 1;
            
            // Remove all animation classes first
            card.classList.remove('card-hidden', 'card-visible', 'card-stacked');
            
            if (cardProgress < cardIndex - 0.5) {
                // Card hasn't appeared yet
                card.classList.add('card-hidden');
            } else if (cardProgress >= cardIndex - 0.5 && cardProgress < cardIndex + 0.5) {
                // Card is currently visible
                card.classList.add('card-visible');
            } else {
                // Card is stacked (passed)
                card.classList.add('card-stacked');
            }
        });
    }
    
    // Throttled scroll handler
    let ticking = false;
    function handleStackingScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateCardsOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Add scroll listener
    window.addEventListener('scroll', handleStackingScroll);
    
    // Initial check
    updateCardsOnScroll();
}

// Duplicate DOMContentLoaded block removed - functionality moved to main DOMContentLoaded block above