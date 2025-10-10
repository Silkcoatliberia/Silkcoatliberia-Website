// ===== SILKCOAT LIBERIA MAIN JAVASCRIPT - OPTIMIZED ===== //

// ===== OPTIMIZED PRELOADER - LOADS ONLY FIRST IMAGE ===== //
(function() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    let firstImageLoaded = false;
    let minTimeElapsed = false;

    function hidePreloader() {
        if (firstImageLoaded && minTimeElapsed) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    }

    // ONLY load the first hero image and logo - rest load in background
    const criticalImages = [
        'public/images/silkcoat_logo.png',
        'public/images/marm.png'  // Only first slide
    ];

    let loadedCount = 0;
    const totalImages = criticalImages.length;

    function preloadImage(src) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                loadedCount++;
                resolve();
            };
            img.onerror = () => {
                loadedCount++;
                resolve(); // Still resolve to not block
            };
            img.src = src;
        });
    }

    // Load critical images
    Promise.all(criticalImages.map(preloadImage))
        .then(() => {
            firstImageLoaded = true;
            hidePreloader();
        });

    // Minimum display time (reduced to 300ms for faster feel)
    setTimeout(() => {
        minTimeElapsed = true;
        hidePreloader();
    }, 300);

    // Fallback after 3 seconds (reduced from 10s)
    setTimeout(() => {
        firstImageLoaded = true;
        minTimeElapsed = true;
        hidePreloader();
    }, 3000);
})();

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== LAZY LOAD REMAINING HERO IMAGES IN BACKGROUND ===== //
    const remainingHeroImages = [
        'public/images/2travert.png',
        'public/images/3pearly.png',
        'public/images/4palace.png',
        'public/images/6pearl.png'
    ];
    
    // Load these AFTER page is visible
    setTimeout(() => {
        remainingHeroImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }, 100);

    // ===== HERO SLIDESHOW ===== //
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    function initSlideshow() {
        if (slides.length === 0) return;
        
        slides[0].classList.add('active');
        if (dots.length > 0) dots[0].classList.add('active');
        
        startSlideshow();
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetSlideshow();
            });
        });
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

    // ===== FIX FOR MOBILE DROPDOWN SUBMENUS ===== //
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
                    },
                    // ADD REST OF YOUR PRODUCTS HERE - keeping full structure
                    'palace': {
                        name: 'Palace',
                        image: 'images/interior/decorative/Palace/silkcoat_palace.jpg',
                        image_details: 'images/interior/decorative/Palace/palace_color_chart.jpg',
                        features: [
                            'Biophilic design palette inspired by natural earth elements',
                            'Organic color harmonies that promote wellness and tranquility',
                            'Scientifically balanced combinations supporting circadian rhythm health',
                            'Sustainable color sourcing from natural mineral and plant-based pigments',
                            'Therapeutic color psychology integration for stress reduction'
                        ],
                        specs: [
                            'Natural Palette: 80+ earth-inspired tones',
                            'Color Psychology: Wellness-focused combinations',
                            'Mood Impact: Calming and grounding effects',
                            'Application Areas: Residential, healthcare, hospitality interiors',
                            'Color Coordination: Pre-matched harmony sets available'
                        ]
                    }
                    // ... ADD ALL YOUR OTHER PRODUCTS FROM YOUR ORIGINAL FILE
                }
            },
            'plastic-paint': {
                title: 'Plastic Paint',
                items: {
                    // ... YOUR PLASTIC PAINT ITEMS
                }
            },
            'latex-paint': {
                title: 'Latex Paint',
                items: {
                    // ... YOUR LATEX PAINT ITEMS
                }
            },
            'acrylic-paint': {
                title: 'Acrylic Paint',
                items: {
                    // ... YOUR ACRYLIC PAINT ITEMS
                }
            },
            'exterior-paint': {
                title: 'Exterior Paint',
                items: {
                    // ... YOUR EXTERIOR PAINT ITEMS
                }
            },
            'exterior-regular': {
                title: 'Exterior Regular Paint',
                items: {
                    // ... YOUR EXTERIOR REGULAR ITEMS
                }
            },
            'floor-paint': {
                title: 'Floor Paint',
                items: {
                    // ... YOUR FLOOR PAINT ITEMS
                }
            },
            'car-paint': {
                title: 'Car Paint',
                items: {
                    // ... YOUR CAR PAINT ITEMS
                }
            }
        },
        services: {
            'color-chart': {
                title: 'Color Chart',
                items: {
                    // ... YOUR COLOR CHART ITEMS
                }
            }
        }
    };

    // ===== NAVIGATION MANAGER ===== //
    const navigationManager = {
        currentPage: null,
        currentCategory: null,
        currentItem: null,

        init() {
            this.currentPage = this.detectPage();
            this.bindEvents();
            this.handleInitialLoad();
        },

        detectPage() {
            if (window.location.pathname.includes('products.html')) return 'products';
            if (window.location.pathname.includes('services.html')) return 'services';
            return null;
        },

        bindEvents() {
            document.addEventListener('click', (e) => {
                if (e.target.matches('.dropdown-item[data-category]')) {
                    e.preventDefault();
                    const category = e.target.getAttribute('data-category');
                    const targetPage = category === 'color-chart' ? 'services' : 'products';
                    
                    if (this.currentPage === targetPage) {
                        this.showCategoryGrid(category);
                    } else {
                        window.location.href = `${targetPage}.html?category=${category}`;
                    }
                }

                if (e.target.matches('.footer-links a[data-category]')) {
                    e.preventDefault();
                    const category = e.target.getAttribute('data-category');
                    const targetPage = category === 'color-chart' ? 'services' : 'products';
                    
                    if (this.currentPage === targetPage) {
                        this.showCategoryGrid(category);
                    } else {
                        window.location.href = `${targetPage}.html?category=${category}`;
                    }
                }

                if (e.target.matches('#backToCategory') || e.target.closest('#backToCategory')) {
                    e.preventDefault();
                    this.showCategoryGrid(this.currentCategory);
                }
            });
        },

        handleInitialLoad() {
            const urlParams = new URLSearchParams(window.location.search);
            const category = urlParams.get('category');
            const item = urlParams.get('item');

            if (category) {
                this.showCategoryGrid(category);
                if (item) {
                    setTimeout(() => this.showItemDetail(category, item), 100);
                }
            } else if (this.currentPage) {
                this.showCategorySelection();
            }
        },

        showCategorySelection() {
            const gridView = document.getElementById('categoryGridView');
            const detailView = document.getElementById('productDetailView') || document.getElementById('serviceDetailView');
            const categoryTitle = document.getElementById('categoryTitle');
            const categoryItems = document.getElementById('categoryItems');

            if (!gridView || !categoryItems) return;

            gridView.style.display = 'block';
            if (detailView) detailView.style.display = 'none';

            if (this.currentPage === 'products') {
                categoryTitle.textContent = 'Select a Product Category';
                this.renderProductCategories(categoryItems);
            } else if (this.currentPage === 'services') {
                categoryTitle.textContent = 'Select a Service Category';
                this.renderServiceCategories(categoryItems);
            }
        },

        renderProductCategories(container) {
            container.innerHTML = '';
            
            const row = document.createElement('div');
            row.className = 'row justify-content-center g-4';
            
            const categories = [
                { key: 'decorative-paint', title: 'Decorative Paint', desc: 'Premium decorative paints with special effects and finishes', icon: 'fas fa-magic' },
                { key: 'plastic-paint', title: 'Plastic Paint', desc: 'High-quality plastic emulsion paints for interior walls', icon: 'fas fa-paint-roller' },
                { key: 'latex-paint', title: 'Latex Paint', desc: 'Superior latex formulations with excellent durability', icon: 'fas fa-brush' },
                { key: 'acrylic-paint', title: 'Acrylic Paint', desc: 'Premium acrylic paints for versatile applications', icon: 'fas fa-palette' },
                { key: 'exterior-paint', title: 'Exterior Paint', desc: 'Weather-resistant exterior coatings and stone finishes', icon: 'fas fa-building' },
                { key: 'exterior-regular', title: 'Exterior Regular Paint', desc: 'Standard exterior paints for general applications', icon: 'fas fa-home' },
                { key: 'floor-paint', title: 'Floor Paint', desc: 'Durable floor coatings for industrial and commercial use', icon: 'fas fa-square' },
                { key: 'car-paint', title: 'Car Paint', desc: 'Professional automotive paint systems and finishes', icon: 'fas fa-car' }
            ];

            categories.forEach(category => {
                const col = document.createElement('div');
                col.className = 'col-lg-4 col-md-6 mb-4';
                col.innerHTML = `
                    <div class="category-item-card category-selection-card" data-category="${category.key}">
                        <div class="category-item-image">
                            <img src="public/images/interior_paint.jpg" alt="${category.title}" class="img-fluid" loading="lazy">
                            <div class="category-item-overlay">
                                <i class="${category.icon}"></i>
                            </div>
                        </div>
                        <h6 class="category-item-title">${category.title}</h6>
                        <p class="category-item-desc">${category.desc}</p>
                    </div>
                `;
                
                col.addEventListener('click', () => {
                    this.showCategoryGrid(category.key);
                });
                
                row.appendChild(col);
            });
            
            container.appendChild(row);
        },

        renderServiceCategories(container) {
            container.innerHTML = '';
            
            const row = document.createElement('div');
            row.className = 'row justify-content-center g-4';
            
            const colorChartCol = document.createElement('div');
            colorChartCol.className = 'col-lg-4 col-md-6 mb-4';
            colorChartCol.innerHTML = `
                <div class="category-item-card category-selection-card" data-category="color-chart">
                    <div class="category-item-image">
                        <img src="public/images/interior_paint.jpg" alt="Color Chart" class="img-fluid" loading="lazy">
                        <div class="category-item-overlay">
                            <i class="fas fa-palette"></i>
                        </div>
                    </div>
                    <h6 class="category-item-title">Color Chart</h6>
                    <p class="category-item-desc">Comprehensive color selection and professional consultation services</p>
                </div>
            `;
            
            colorChartCol.addEventListener('click', () => {
                this.showCategoryGrid('color-chart');
            });
            
            row.appendChild(colorChartCol);
            container.appendChild(row);
        },

        showCategoryGrid(category) {
            this.currentCategory = category;
            
            const gridView = document.getElementById('categoryGridView');
            const detailView = document.getElementById('productDetailView') || document.getElementById('serviceDetailView');
            const categoryTitle = document.getElementById('categoryTitle');
            const categoryItems = document.getElementById('categoryItems');

            if (!gridView || !categoryItems) return;

            gridView.style.display = 'block';
            if (detailView) detailView.style.display = 'none';

            const data = this.currentPage === 'products' ? dataManager.products : dataManager.services;
            const categoryData = data[category];
            
            if (categoryData) {
                categoryTitle.textContent = categoryData.title;
                this.renderCategoryItems(categoryData.items, categoryItems, category);
            }
        },

        renderCategoryItems(items, container, category) {
            container.innerHTML = '';
            
            const row = document.createElement('div');
            row.className = 'row justify-content-start g-4';
            
            Object.keys(items).forEach(itemKey => {
                const item = items[itemKey];
                const col = document.createElement('div');
                
                const itemCount = Object.keys(items).length;
                let colClass = 'col-lg-3 col-md-4 col-sm-6 col-6';
                
                if (itemCount === 1) {
                    colClass = 'col-12 col-md-6 col-lg-4';
                } else if (itemCount === 2) {
                    colClass = 'col-12 col-sm-6 col-lg-6';
                } else if (itemCount === 3) {
                    colClass = 'col-12 col-md-6 col-lg-4';
                } else if (itemCount === 4) {
                    colClass = 'col-12 col-sm-6 col-lg-3';
                }
                
                col.className = colClass;
                col.innerHTML = `
                    <div class="category-item-card h-100" data-category="${category}" data-item="${itemKey}">
                        <div class="category-item-image">
                            <img src="${item.image}" alt="${item.name}" class="img-fluid" loading="lazy">
                            <div class="category-item-overlay">
                                <i class="fas fa-eye"></i>
                            </div>
                        </div>
                        <h6 class="category-item-title">${item.name}</h6>
                    </div>
                `;
                
                col.addEventListener('click', () => {
                    this.showItemDetail(category, itemKey);
                });
                
                row.appendChild(col);
            });
            
            container.appendChild(row);
        },

        showItemDetail(category, itemKey) {
            this.currentItem = itemKey;
            
            const gridView = document.getElementById('categoryGridView');
            const detailView = document.getElementById('productDetailView') || document.getElementById('serviceDetailView');
            
            if (!detailView) return;

            gridView.style.display = 'none';
            detailView.style.display = 'block';

            const data = this.currentPage === 'products' ? dataManager.products : dataManager.services;
            const categoryData = data[category];
            const itemData = categoryData.items[itemKey];

            this.renderItemDetail(categoryData, itemData, category);
        },

        renderItemDetail(categoryData, itemData, category) {
            const detailTitle = document.getElementById('detailTitle');
            const detailImage = document.getElementById('detailImage');
            const sidebarTitle = document.getElementById('sidebarTitle');
            const sidebarItems = document.getElementById('sidebarItems');
            const featuresContainer = document.getElementById(this.currentPage === 'products' ? 'productFeatures' : 'serviceFeatures');
            const specsContainer = document.getElementById(this.currentPage === 'products' ? 'productSpecs' : 'serviceSpecs');

            detailTitle.textContent = itemData.name;
            detailImage.src = itemData.image_details || itemData.image;
            detailImage.alt = itemData.name;
            detailImage.loading = 'lazy';
            sidebarTitle.textContent = categoryData.title;

            featuresContainer.innerHTML = '';
            itemData.features.forEach(feature => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="fas fa-check text-success me-2"></i>${feature}`;
                featuresContainer.appendChild(li);
            });

            specsContainer.innerHTML = '';
            itemData.specs.forEach(spec => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="fas fa-info-circle text-primary me-2"></i>${spec}`;
                specsContainer.appendChild(li);
            });

            this.renderSidebar(categoryData.items, category);
        },

        renderSidebar(items, category) {
            const sidebarItems = document.getElementById('sidebarItems');
            sidebarItems.innerHTML = '';

            Object.keys(items).forEach(itemKey => {
                const item = items[itemKey];
                const sidebarItem = document.createElement('div');
                sidebarItem.className = `sidebar-item ${itemKey === this.currentItem ? 'active' : ''}`;
                
                sidebarItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="sidebar-item-image" loading="lazy">
                    <span class="sidebar-item-name">${item.name}</span>
                `;
                
                sidebarItem.addEventListener('click', () => {
                    this.showItemDetail(category, itemKey);
                });
                
                sidebarItems.appendChild(sidebarItem);
            });
        }
    };

    // ===== CONTACT FORM HANDLING ===== //
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!firstName || !lastName || !email || !subject || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                showNotification('Thank you for your message! We will get back to you within 24 hours.', 'success');
                this.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // ===== STATISTICS COUNTER ANIMATION ===== //
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (target >= 1000000) {
                element.textContent = (current / 1000000).toFixed(1) + 'M+';
            } else if (target >= 1000) {
                element.textContent = (current / 1000).toFixed(0) + 'K+';
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    }
    
    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => observer.observe(stat));
    }

    // ===== NOTIFICATION SYSTEM ===== //
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = `
            top: 20px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    // ===== MOBILE MENU HANDLING ===== //
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarToggler && navbarCollapse) {
        const regularNavLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle)');
        regularNavLinks.forEach(link => {
            if (!link.classList.contains('dropdown-toggle')) {
                link.addEventListener('click', () => {
                    if (navbarCollapse.classList.contains('show')) {
                        navbarToggler.click();
                    }
                });
            }
        });

        const dropdownItems = document.querySelectorAll('.dropdown-item:not(.dropdown-toggle)');
        dropdownItems.forEach(item => {
            item.addEventListener('click', () => {
                if (!item.classList.contains('dropdown-toggle')) {
                    setTimeout(() => {
                        if (navbarCollapse.classList.contains('show')) {
                            navbarToggler.click();
                        }
                    }, 150);
                }
            });
        });
        
        document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth < 992) {
                    e.stopPropagation();
                }
            });
        });
    }

    // ===== SCROLL ANIMATIONS ===== //
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .product-card, .service-card, .value-card, .team-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate-in');
            }
        });
    };
    
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .product-card, .service-card, .value-card, .team-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // ===== BACK TO TOP BUTTON ===== //
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 18px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-medium);
    `;
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===== INITIALIZE NAVIGATION MANAGER ===== //
    if (window.location.pathname.includes('products.html') || window.location.pathname.includes('services.html')) {
        navigationManager.init();
    }

    console.log('Silkcoat Liberia website initialized successfully!');
});

// ===== UTILITY FUNCTIONS ===== //
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-LR', {
        style: 'currency',
        currency: 'LRD'
    }).format(amount);
}

function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return `+231 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    }
    return phone;
}

function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-LR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showLoading(element) {
    element.classList.add('loading');
    element.disabled = true;
}

function hideLoading(element) {
    element.classList.remove('loading');
    element.disabled = false;
}

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function setUrlParameter(name, value) {
    const url = new URL(window.location);
    url.searchParams.set(name, value);
    window.history.pushState({}, '', url);
}

function removeUrlParameter(name) {
    const url = new URL(window.location);
    url.searchParams.delete(name);
    window.history.pushState({}, '', url);
}