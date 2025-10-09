// ===== SILKCOAT LIBERIA MAIN JAVASCRIPT WITH DIAGNOSTICS ===== //

console.log('=== SCRIPT START ===', new Date().toISOString());

// ===== PRELOADER WITH DIAGNOSTICS ===== //
(function() {
    const startTime = performance.now();
    console.log('Preloader function started at:', startTime);
    
    const preloader = document.getElementById('preloader');
    if (!preloader) {
        console.error('PRELOADER NOT FOUND!');
        return;
    }
    console.log('Preloader element found');

    let assetsLoaded = false;
    let minTimeElapsed = false;

    function hidePreloader() {
        if (assetsLoaded && minTimeElapsed) {
            const hideTime = performance.now();
            console.log(`=== HIDING PRELOADER after ${((hideTime - startTime) / 1000).toFixed(2)}s ===`);
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                console.log('Preloader completely hidden');
            }, 500);
        }
    }

    // Critical images - CHECK IF THESE PATHS ARE CORRECT!
    const criticalImages = [
        'public/images/marm.png',
        'public/images/silkcoat_logo.png'
    ];

    let loadedCount = 0;
    const totalImages = criticalImages.length;

    function preloadImage(src) {
        const imgStartTime = performance.now();
        console.log(`Starting to load: ${src}`);
        
        return new Promise((resolve, reject) => {
            const img = new Image();
            
            img.onload = () => {
                const imgEndTime = performance.now();
                const loadTime = ((imgEndTime - imgStartTime) / 1000).toFixed(2);
                loadedCount++;
                console.log(`✓ LOADED (${loadTime}s) [${loadedCount}/${totalImages}]: ${src}`);
                console.log(`  - Image size: ${img.width}x${img.height}`);
                resolve();
            };
            
            img.onerror = (error) => {
                const imgEndTime = performance.now();
                const loadTime = ((imgEndTime - imgStartTime) / 1000).toFixed(2);
                console.error(`✗ FAILED (${loadTime}s): ${src}`, error);
                loadedCount++;
                resolve(); // Still resolve to not block
            };
            
            img.src = src;
        });
    }

    console.log('Starting to preload images...');
    const loadStartTime = performance.now();
    
    Promise.all(criticalImages.map(preloadImage))
        .then(() => {
            const loadEndTime = performance.now();
            const totalLoadTime = ((loadEndTime - loadStartTime) / 1000).toFixed(2);
            console.log(`=== ALL IMAGES LOADED in ${totalLoadTime}s ===`);
            assetsLoaded = true;
            hidePreloader();
        })
        .catch((error) => {
            console.error('Image loading error:', error);
            assetsLoaded = true;
            hidePreloader();
        });

    // Minimum display time
    setTimeout(() => {
        console.log('Minimum time elapsed (500ms)');
        minTimeElapsed = true;
        hidePreloader();
    }, 500);

    // Fallback: Force hide after 10 seconds
    setTimeout(() => {
        const fallbackTime = performance.now();
        console.warn(`⚠️ FALLBACK TRIGGERED after ${((fallbackTime - startTime) / 1000).toFixed(2)}s`);
        assetsLoaded = true;
        minTimeElapsed = true;
        hidePreloader();
    }, 10000);
})();

document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DOM CONTENT LOADED ===', new Date().toISOString());
    
    // ===== HERO SLIDESHOW ===== //
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    console.log(`Found ${slides.length} slides and ${dots.length} dots`);
    
    let currentSlide = 0;
    let slideInterval;

    function initSlideshow() {
        if (slides.length === 0) {
            console.warn('No slides found, skipping slideshow');
            return;
        }
        
        console.log('Initializing slideshow...');
        slides[0].classList.add('active');
        if (dots.length > 0) dots[0].classList.add('active');
        
        startSlideshow();
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetSlideshow();
            });
        });
        console.log('Slideshow initialized');
    }

    function startSlideshow() {
        slideInterval = setInterval(() => {
            nextSlide();
        }, 5000);
    }

    function resetSlideshow() {
        clearInterval(slideInterval);
        startSlideshow();
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        goToSlide(nextIndex);
    }

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
        
        currentSlide = index;
        
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    // Only init slideshow on index page
    if (window.location.pathname === '/' || 
        window.location.pathname.includes('index.html') || 
        window.location.pathname === '/workspace/index.html' ||
        window.location.pathname === '') {
        initSlideshow();
    }

    // ===== NAVBAR SCROLL EFFECT ===== //
    const navbar = document.querySelector('.custom-navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ===== SCROLL INDICATOR ===== //
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const featuresSection = document.querySelector('.features-section');
            if (featuresSection) {
                featuresSection.scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        });
    }

    // ===== MOBILE DROPDOWN FIXES ===== //
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    
    if (isTouchDevice) {
        document.querySelectorAll('.dropdown-submenu .dropdown-toggle').forEach(function(element) {
            element.setAttribute('data-bs-toggle', '');
            element.removeAttribute('aria-expanded');
        });
    }

    document.querySelectorAll('.dropdown-submenu > .dropdown-toggle').forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            if (isTouchDevice || window.innerWidth < 992) {
                e.preventDefault();
                e.stopPropagation();
                
                const parentSubmenu = this.closest('.dropdown-submenu');
                const submenu = this.nextElementSibling;
                const isOpen = parentSubmenu.classList.contains('show') && submenu.classList.contains('show');
                
                document.querySelectorAll('.dropdown-submenu').forEach(function(item) {
                    if (item !== parentSubmenu) {
                        item.classList.remove('show');
                        const otherMenu = item.querySelector('.dropdown-menu');
                        if (otherMenu) {
                            otherMenu.classList.remove('show');
                            otherMenu.style.display = 'none';
                            otherMenu.style.opacity = '0';
                            otherMenu.style.visibility = 'hidden';
                        }
                    }
                });
                
                if (isOpen) {
                    parentSubmenu.classList.remove('show');
                    if (submenu) {
                        submenu.classList.remove('show');
                        submenu.style.display = 'none';
                        submenu.style.opacity = '0';
                        submenu.style.visibility = 'hidden';
                        submenu.style.height = '0';
                        submenu.style.overflow = 'hidden';
                    }
                } else {
                    parentSubmenu.classList.add('show');
                    if (submenu) {
                        submenu.style.display = 'block';
                        submenu.style.opacity = '1';
                        submenu.style.visibility = 'visible';
                        submenu.style.height = 'auto';
                        submenu.style.overflow = 'visible';
                        submenu.classList.add('show');
                    }
                }
            }
        });
    });

    document.querySelectorAll('.dropdown-menu .dropdown-item:not(.dropdown-toggle)').forEach(function(item) {
        item.addEventListener('click', function() {
            if (isTouchDevice || window.innerWidth < 992) {
                document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                    menu.classList.remove('show');
                    void menu.offsetWidth;
                });
                document.querySelectorAll('.dropdown-submenu.show').forEach(submenu => {
                    submenu.classList.remove('show');
                });
                
                if (window.innerWidth < 992) {
                    setTimeout(function() {
                        const navbar = document.querySelector('.navbar-collapse');
                        const toggler = document.querySelector('.navbar-toggler');
                        if (navbar && navbar.classList.contains('show') && toggler) {
                            toggler.click();
                        }
                    }, 150);
                }
            }
        });
    });

    // ===== PRODUCT AND SERVICE DATA ===== //
    console.log('Loading data manager...');
    const dataManager = {
        products: {
            'decorative-paint': {
                title: 'Decorative Paint',
                items: {
                    'marmarito': {
                        name: 'Marmarito',
                        image: 'images/interior/decorative/Marmarito/silkcoat_marmarito.jpg',
                        image_details: 'images/interior/decorative/Marmarito/marmarito_color_chart.jpg',
                        features: [
                            'Exclusive designer color collection with limited availability',
                            'Curated palette developed in collaboration with interior design professionals',
                            'Premium metallic and textured finish options with unique depth',
                            'Seasonal limited edition releases featuring cutting-edge color trends',
                            'Complimentary design consultation service with color selection'
                        ],
                        specs: [
                            'Exclusive Range: 50+ designer-curated colors',
                            'Finish Categories: Metallic, pearl, satin, textured options',
                            'Design Service: Professional consultation included',
                            'Application Scope: Premium interior and exterior projects',
                            'Premium Samples: 100ml designer specification containers'
                        ]
                    }
                    // ... rest of your products
                }
            }
            // ... rest of your product categories
        },
        services: {
            // ... your services
        }
    };

    // ===== NAVIGATION MANAGER ===== //
    console.log('Initializing navigation manager...');
    const navigationManager = {
        currentPage: null,
        currentCategory: null,
        currentItem: null,

        init() {
            console.log('Navigation manager init started');
            this.currentPage = this.detectPage();
            console.log('Current page:', this.currentPage);
            this.bindEvents();
            this.handleInitialLoad();
            console.log('Navigation manager initialized');
        },

        detectPage() {
            if (window.location.pathname.includes('products.html')) return 'products';
            if (window.location.pathname.includes('services.html')) return 'services';
            return null;
        },

        bindEvents() {
            // Your existing bindEvents code
        },

        handleInitialLoad() {
            // Your existing handleInitialLoad code
        },

        // ... rest of your navigation manager methods
    };

    // ===== INITIALIZE NAVIGATION MANAGER ===== //
    if (window.location.pathname.includes('products.html') || window.location.pathname.includes('services.html')) {
        navigationManager.init();
    }

    console.log('=== SILKCOAT INITIALIZED SUCCESSFULLY ===');
});

console.log('=== SCRIPT END ===', new Date().toISOString());