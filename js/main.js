// ===== SILKCOAT LIBERIA MAIN JAVASCRIPT ===== //

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== PRELOADER ===== //
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.style.opacity = '0';
                setTimeout(function() {
                    preloader.style.display = 'none';
                }, 500);
            }, 1000);
        });
    }

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
    // Handle dropdown submenus on mobile
    // ===== FIX FOR MOBILE DROPDOWN SUBMENUS ===== //
    // Detect if device is touch-enabled
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    
    console.log('=== DROPDOWN DEBUG ===');
    console.log('Is Touch Device:', isTouchDevice);
    console.log('Window Width:', window.innerWidth);
    console.log('Max Touch Points:', navigator.maxTouchPoints);
    console.log('Has ontouchstart:', 'ontouchstart' in window);
    
    // Disable Bootstrap's default dropdown behavior for submenus on touch devices
    if (isTouchDevice) {
        document.querySelectorAll('.dropdown-submenu .dropdown-toggle').forEach(function(element) {
            element.setAttribute('data-bs-toggle', '');
            element.removeAttribute('aria-expanded');
            console.log('Disabled Bootstrap toggle on:', element.textContent.trim());
        });
    }

    // Handle submenu clicks on touch devices OR mobile screens
    document.querySelectorAll('.dropdown-submenu > .dropdown-toggle').forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            console.log('Submenu clicked:', this.textContent.trim());
            console.log('isTouchDevice:', isTouchDevice, '| innerWidth < 992:', window.innerWidth < 992);
            
            // Apply on touch devices regardless of screen size
            if (isTouchDevice || window.innerWidth < 992) {
                console.log('Preventing default and handling click');
                e.preventDefault();
                e.stopPropagation();
                
                const parentSubmenu = this.closest('.dropdown-submenu');
                const submenu = this.nextElementSibling;
                const isOpen = parentSubmenu.classList.contains('show');
                
                console.log('Is currently open:', isOpen);
                console.log('Parent submenu:', parentSubmenu);
                console.log('Submenu element:', submenu);
                
                // Close all other submenus
                document.querySelectorAll('.dropdown-submenu').forEach(function(item) {
                    if (item !== parentSubmenu) {
                        item.classList.remove('show');
                        const menu = item.querySelector('.dropdown-menu');
                        if (menu) menu.classList.remove('show');
                    }
                });
                
                // Toggle this submenu
                if (isOpen) {
                    console.log('Closing submenu');
                    parentSubmenu.classList.remove('show');
                    if (submenu) submenu.classList.remove('show');
                } else {
                    console.log('Opening submenu');
                    parentSubmenu.classList.add('show');
                    if (submenu) submenu.classList.add('show');
                }
                
                console.log('After toggle - has show class:', parentSubmenu.classList.contains('show'));
            } else {
                console.log('NOT handling click - conditions not met');
            }
        });
    });

    // Handle final dropdown item clicks (products/services links)
    document.querySelectorAll('.dropdown-menu .dropdown-item:not(.dropdown-toggle)').forEach(function(item) {
        item.addEventListener('click', function() {
            console.log('Final item clicked:', this.textContent.trim());
            
            // Close all dropdowns on touch devices or mobile
            if (isTouchDevice || window.innerWidth < 992) {
                console.log('Closing all dropdowns');
                document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                    menu.classList.remove('show');
                });
                document.querySelectorAll('.dropdown-submenu.show').forEach(submenu => {
                    submenu.classList.remove('show');
                });
                
                // Close navbar only on smaller screens
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
                        image: 'images/Color_Chart/Marmarito/silkcoat_marmarito.jpg',
                        image_details: 'images/Color_Chart/Marmarito/marmarito_color_chart.jpg',
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
                    'palace': {
                        name: 'Palace',
                        image: 'images/Color_Chart/Palace/silkcoat_palace.jpg',
                        image_details: 'images/Color_Chart/Palace/palace_color_chart.jpg',
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
                    },
                    'metalico': {
                        name: 'Metalico',
                        image: 'images/Color_Chart/Metalico/silkcoat_metalico.jpg',
                        image_details: 'images/Color_Chart/Metalico/metalico_color_chart.jpg',
                        features: [
                            'High-saturation color collection for dynamic visual impact',
                            'Bold contemporary palette designed for statement applications',
                            'Architectural accent colors optimized for lighting enhancement',
                            'Creative expression tools for modern interior design concepts',
                            'Specialty formulations for feature walls and artistic installations'
                        ],
                        specs: [
                            'Bold Selection: 60+ high-impact color options',
                            'Saturation Level: Maximum chroma intensity formulations',
                            'Visual Impact: Dramatic focal point applications',
                            'Optimal Use: Accent walls, artistic features, commercial spaces',
                            'Pairing System: Coordinated neutral backdrop colors available'
                        ]
                    },
                    'metalico-soft': {
                        name: 'Metalico Soft',
                        image: 'images/Color_Chart/Metalico_Soft/silkcoat_metalico_soft.jpg',
                        image_details: 'images/Color_Chart/Metalico_Soft/metalico_soft_color_chart.jpg',
                        features: [
                            'Refined pastel collection with subtle metallic undertones',
                            'Light-reflective properties create spacious, airy environments',
                            'Child-safe formulations ideal for nurseries and family spaces',
                            'Color therapy principles incorporated for stress relief and comfort',
                            'Timeless aesthetic appeal transcends temporary design trends'
                        ],
                        specs: [
                            'Gentle Palette: 70+ soft-toned options',
                            'Color Temperature: Cool and warm balanced selections',
                            'Light Reflection: Enhanced brightness and space perception',
                            'Family Spaces: Nursery, bedroom, relaxation area optimization',
                            'Longevity: Classic appeal with enduring beauty'
                        ]
                    },
                    'decortivo': {
                        name: 'Decortivo',
                        image: 'images/Color_Chart/Decortivo/silkcoat_decortivo.jpg',
                        image_details: 'images/Color_Chart/Decortivo/decortivo_color_chart.jpg',
                        features: [
                            'Sophisticated pearlescent color range with iridescent depth',
                            'Multi-dimensional finishes that change with lighting conditions',
                            'Elegant sophistication suitable for upscale residential applications',
                            'Advanced pearl pigment technology creates luxurious surface effects',
                            'Designer-grade finishes for premium interior environments'
                        ],
                        specs: [
                            'Pearlescent Range: 45+ iridescent color options',
                            'Finish Effect: Multi-dimensional pearl and shimmer',
                            'Lighting Response: Dynamic color shifts with angle and illumination',
                            'Premium Application: High-end residential and commercial projects',
                            'Surface Quality: Smooth, elegant, washable finish'
                        ]
                    },
                    'velvetto': {
                        name: 'Velvetto',
                        image: 'images/Color_Chart/Velvetto/silkcoat_velvetto.jpg',
                        image_details: 'images/Color_Chart/Velvetto/velvetto_color_chart.jpg',
                        features: [
                            'Luxurious silk-textured color collection with velvet-like appearance',
                            'Rich, saturated hues with exceptional color depth and warmth',
                            'Tactile surface quality that invites physical interaction',
                            'Acoustic benefits through texture-enhanced sound absorption',
                            'Premium residential applications for sophisticated living spaces'
                        ],
                        specs: [
                            'Velvet Collection: 55+ rich, tactile color options',
                            'Texture Quality: Silk-fiber enhanced surface depth',
                            'Color Depth: Maximum saturation with warm undertones',
                            'Acoustic Properties: Enhanced sound dampening characteristics',
                            'Application: Luxury residential, hospitality, retail environments'
                        ]
                    },
                    'velvetto_soft': {
                        name: 'Velvetto Soft',
                        image: 'images/Color_Chart/Velvetto_Soft/silkcoat_velvetto_soft.jpg',
                        image_details: 'images/Color_Chart/Velvetto_Soft/velvetto_soft_color_chart.jpg',
                        features: [
                            'Gentle velvet-textured palette with understated elegance',
                            'Muted color sophistication perfect for serene environments',
                            'Whisper-soft color tones that promote relaxation and comfort',
                            'Balanced neutral base with subtle warm and cool variations',
                            'Versatile coordination options for multi-room color schemes'
                        ],
                        specs: [
                            'Soft Velvet Range: 65+ muted sophisticated options',
                            'Color Intensity: Gentle, calming saturation levels',
                            'Environmental Impact: Peaceful, serene atmosphere creation',
                            'Coordination: Multi-room harmony and flow optimization',
                            'Texture: Refined velvet surface with subtle tactile appeal'
                        ]
                    },
                    'arteco': {
                        name: 'Arteco',
                        image: 'images/Color_Chart/Arteco/silkcoat_arteco.jpg',
                        image_details: 'images/Color_Chart/Arteco/arteco_color_chart.jpg',
                        features: [
                            'Artistic metallic color palette with professional-grade sophistication',
                            'Museum-quality pigment stability for long-term color integrity',
                            'Architectural metallic finishes suitable for commercial applications',
                            'Contemporary design integration with modern aesthetic principles',
                            'Professional specification standards for high-visibility projects'
                        ],
                        specs: [
                            'Metallic Artistic Range: 40+ professional-grade options',
                            'Pigment Quality: Museum-standard lightfastness rating',
                            'Commercial Grade: Architectural specification compliance',
                            'Design Integration: Modern aesthetic compatibility',
                            'Professional Standard: High-visibility project specifications'
                        ]
                    },
                    'pearl': {
                        name: 'Pearl',
                        image: 'images/Color_Chart/Pearl/silkcoat_pearl.jpg',
                        image_details: 'images/Color_Chart/Pearl/pearl_color_chart.jpg',
                        features: [
                            'Natural pearl-inspired color collection with organic luminescence',
                            'Silk fiber integration creates unique texture and light interaction',
                            'Sustainable natural materials with eco-friendly composition',
                            'Breathable surface technology promotes healthy indoor environments',
                            'Artisan-quality finishes with handcrafted appearance characteristics'
                        ],
                        specs: [
                            'Pearl Collection: 35+ natural luminescent options',
                            'Material Integration: Natural silk fiber enhancement',
                            'Environmental Impact: Sustainable, eco-friendly formulation',
                            'Indoor Air Quality: Breathable, non-toxic surface technology',
                            'Artisan Quality: Handcrafted texture and appearance'
                        ]
                    },
                    'magico': {
                        name: 'Magico',
                        image: 'images/Color_Chart/Magico/silkcoat_magico.jpg',
                        image_details: 'images/Color_Chart/Magico/magico_color_chart.jpg',
                        features: [
                            'Mystical copper and bronze metallic color range with antique patina',
                            'Time-weathered appearance creates historical design authenticity',
                            'Architectural restoration compatibility for heritage projects',
                            'Variable patina effects adapt to different lighting conditions',
                            'Professional antiquing techniques for authentic vintage aesthetics'
                        ],
                        specs: [
                            'Copper Bronze Range: 30+ antique patina variations',
                            'Patina Effect: Authentic time-weathered appearance',
                            'Heritage Compatibility: Architectural restoration appropriate',
                            'Lighting Adaptation: Variable appearance in different illumination',
                            'Authenticity: Professional antiquing and aging techniques'
                        ]
                    },
                    'cracos': {
                        name: 'Cracos',
                        image: 'images/Color_Chart/Cracos/silkcoat_cracos.jpg',
                        image_details: 'images/Color_Chart/Cracos/cracos_color_chart.jpg',
                        features: [
                            'Premium silver metallic collection with mirror-like brilliance',
                            'High-reflectance surface technology maximizes light distribution',
                            'Contemporary architectural applications for modern design schemes',
                            'Tarnish-resistant formulation maintains long-term appearance',
                            'Professional-grade finish quality for commercial installations'
                        ],
                        specs: [
                            'Silver Metallic Range: 25+ high-brilliance options',
                            'Reflectance Technology: Maximum light distribution enhancement',
                            'Modern Applications: Contemporary architectural compatibility',
                            'Tarnish Resistance: Long-term appearance preservation',
                            'Commercial Grade: Professional installation standards'
                        ]
                    },
                    'travertino': {
                        name: 'Travertino',
                        image: 'images/Color_Chart/Travertino/silkcoat_travertino.jpg',
                        image_details: 'images/Color_Chart/Travertino/travertino_color_chart.jpg',
                        features: [
                            'Natural stone-inspired color palette with travertine marble aesthetics',
                            'Organic mineral color variations replicate authentic stone characteristics',
                            'Luxury architectural finishes suitable for high-end residential projects',
                            'Dimensional color depth creates realistic stone texture appearance',
                            'Mediterranean design compatibility with classical architectural elements'
                        ],
                        specs: [
                            'Stone-Inspired Range: 40+ travertine marble variations',
                            'Natural Variation: Authentic mineral color characteristics',
                            'Luxury Application: High-end residential and commercial projects',
                            'Dimensional Quality: Realistic stone texture depth',
                            'Design Style: Mediterranean, classical architectural compatibility'
                        ]
                    },
                    'prestige': {
                        name: 'Prestige',
                        image: 'images/Color_Chart/Prestige/silkcoat_prestige.jpg',
                        image_details: 'images/Color_Chart/Prestige/prestige_color_chart.jpg',
                        features: [
                            'Ultra-premium color collection with exclusive formulation technology',
                            'Highest quality pigments ensure superior color performance',
                            'Executive-level applications for prestigious commercial projects',
                            'Signature color development for brand identity and corporate environments',
                            'Concierge color consultation service with premium project support'
                        ],
                        specs: [
                            'Premium Collection: 60+ exclusive ultra-quality options',
                            'Pigment Grade: Highest quality formulation standards',
                            'Executive Applications: Prestigious commercial environments',
                            'Custom Development: Signature brand color creation',
                            'Concierge Service: Premium consultation and project support'
                        ]
                    }
                }
            },
            'plastic-paint': {
                title: 'Plastic Paint',
                items: {
                    'premium-plastic': {
                        name: 'Premium Plastic Paint',
                        image: 'images/Effect_Paint/silkcoat-Arteco.jpg',
                        features: [
                            'High-quality plastic emulsion for interior walls',
                            'Excellent coverage and hiding power',
                            'Washable and durable finish',
                            'Low odor and quick drying',
                            'Suitable for all interior surfaces'
                        ],
                        specs: [
                            'Coverage: 12-14 m²/L per coat',
                            'Drying Time: 2-4 hours',
                            'Finish: Matte',
                            'VOC Content: Low',
                            'Application: Brush, Roller, Spray'
                        ]
                    },
                    'economy-plastic': {
                        name: 'Economy Plastic Paint',
                        image: 'images/Effect_Paint/silkcoat-cracos.jpg',
                        features: [
                            'Budget-friendly plastic paint option',
                            'Good coverage for basic interior walls',
                            'Easy application and maintenance',
                            'Available in standard colors',
                            'Suitable for residential projects'
                        ],
                        specs: [
                            'Coverage: 10-12 m²/L per coat',
                            'Drying Time: 3-4 hours',
                            'Finish: Flat matte',
                            'VOC Content: Standard',
                            'Application: Brush, Roller'
                        ]
                    }
                }
            },
            'latex-paint': {
                title: 'Latex Paint',
                items: {
                    'premium-latex': {
                        name: 'Premium Latex Paint',
                        image: 'images/Effect_Paint/silkcoat-decortivo.jpg',
                        features: [
                            'High-quality latex formulation for superior performance',
                            'Excellent washability and stain resistance',
                            'Zero VOC environmental friendly formula',
                            'Superior color retention and fade resistance',
                            'Antimicrobial properties for healthier environments'
                        ],
                        specs: [
                            'Coverage: 14-16 m²/L per coat',
                            'Drying Time: 1-2 hours',
                            'Finish: Eggshell/Satin',
                            'VOC Content: Zero VOC',
                            'Application: Brush, Roller, Spray'
                        ]
                    },
                    'standard-latex': {
                        name: 'Standard Latex Paint',
                        image: 'images/Effect_Paint/silkcoat-Magico.jpg',
                        features: [
                            'Reliable latex paint for general interior use',
                            'Good durability and coverage',
                            'Easy cleanup with soap and water',
                            'Available in multiple sheen levels',
                            'Cost-effective solution for large projects'
                        ],
                        specs: [
                            'Coverage: 12-14 m²/L per coat',
                            'Drying Time: 2-3 hours',
                            'Finish: Various sheens available',
                            'VOC Content: Low VOC',
                            'Application: Brush, Roller'
                        ]
                    }
                }
            },
            'acrylic-paint': {
                title: 'Acrylic Paint',
                items: {
                    'premium-acrylic': {
                        name: 'Premium Acrylic Paint',
                        image: 'images/Effect_Paint/silkcoat-Marmarito.png',
                        features: [
                            'High-performance 100% acrylic resin formulation',
                            'Superior adhesion to various substrates',
                            'Excellent color retention and gloss retention',
                            'Weather resistant for both interior and exterior use',
                            'Self-priming on most surfaces'
                        ],
                        specs: [
                            'Coverage: 10-12 m²/L per coat',
                            'Drying Time: 1-2 hours',
                            'Finish: Semi-gloss/Gloss',
                            'VOC Content: Low VOC',
                            'Application: Brush, Roller, Spray'
                        ]
                    },
                    'artist-acrylic': {
                        name: 'Artist Acrylic Paint',
                        image: 'images/Effect_Paint/silkcoat-Palace.jpg',
                        features: [
                            'Professional-grade acrylic paint for artistic applications',
                            'High pigment concentration for vibrant colors',
                            'Fast drying with permanent results',
                            'Mixable for custom color creation',
                            'Suitable for canvas, wood, and various surfaces'
                        ],
                        specs: [
                            'Pigment Load: High concentration',
                            'Drying Time: 30 minutes - 1 hour',
                            'Finish: Varies by formulation',
                            'Lightfastness: Excellent',
                            'Application: Brush, Palette knife, Spray'
                        ]
                    }
                }
            },
            'exterior-paint': {
                title: 'Exterior Paint',
                items: {
                    'stone': {
                        name: 'Stone',
                        image: 'images/Color_Chart/Stone/silkcoat_stone.jpg',
                        image_details: 'images/Color_Chart/Stone/stone_color_chart.jpg',
                        features: [
                            'Comprehensive natural stone color palette with geological authenticity',
                            'Regional stone types represented including granite, limestone, and sandstone',
                            'Architectural specification compatibility for stone veneer coordination',
                            'Weathering and aging effects simulate natural stone patina development',
                            'Professional masonry and architectural consultation available'
                        ],
                        specs: [
                            'Natural Stone Range: 85+ geological color variations',
                            'Stone Types: Granite, limestone, sandstone, marble representations',
                            'Architectural Use: Stone veneer coordination and specification',
                            'Weathering Effects: Natural patina and aging simulation',
                            'Professional Service: Masonry and architectural consultation'
                        ]
                    },
                    'travertino-exterior': {
                        name: 'Travertino Exterior',
                        image: 'images/Color_Chart/Travertino/silkcoat_travertino.jpg',
                        image_details: 'images/Color_Chart/Travertino/travertino_color_chart.jpg',
                        features: [
                            'Weather-resistant travertine finish for exterior applications',
                            'UV-stable pigments maintain color integrity outdoors',
                            'Enhanced durability against harsh weather conditions',
                            'Natural stone appearance with superior protection',
                            'Ideal for facades and exterior architectural elements'
                        ],
                        specs: [
                            'Exterior Range: 40+ weather-resistant travertine variations',
                            'UV Protection: Advanced UV-stable formulation',
                            'Weather Resistance: Superior outdoor durability',
                            'Application: Building facades, exterior walls',
                            'Warranty: 10-year exterior performance guarantee'
                        ]
                    },
                    // NEW EXTERIOR DECORATIVE PAINTS
                    'elastico': {
                        name: 'Elastico',
                        image: 'images/Color_Chart/Elastico/silkcoat_elastico.jpg',
                        image_details: 'images/Color_Chart/Elastico/elastico_color_chart.jpg',
                        features: [
                            'Flexible and elastic coating that bridges hairline cracks',
                            'Excellent waterproofing and weather resistance properties',
                            'UV resistant formulation maintains color integrity',
                            'Ideal for concrete, stucco, and masonry surfaces',
                            'Long-lasting protection against harsh weather conditions'
                        ],
                        specs: [
                            'Elasticity: Up to 300% elongation',
                            'Crack Bridging: Up to 2mm cracks',
                            'Weather Resistance: Excellent UV and water resistance',
                            'Application: Concrete, stucco, masonry surfaces',
                            'Durability: 10+ years weather protection'
                        ]
                    },
                    'rolosev': {
                        name: 'Rolosev',
                        image: 'images/Color_Chart/Rolosev/silkcoat_rolosev.jpg',
                        image_details: 'images/Color_Chart/Rolosev/rolosev_color_chart.jpg',
                        features: [
                            'Premium metallic finish for exterior applications',
                            'Advanced UV protection prevents color fading',
                            'Easy application with standard painting tools',
                            'Creates luxurious architectural appearance',
                            'Suitable for both residential and commercial buildings'
                        ],
                        specs: [
                            'Metallic Finish: Premium aluminum and pearl effects',
                            'UV Protection: Advanced UV-resistant formulation',
                            'Application: Brush, roller, or spray application',
                            'Surface Types: Most exterior surfaces',
                            'Durability: Excellent weather and fade resistance'
                        ]
                    },
                    'siltcoat-terasic': {
                        name: 'Siltcoat Terasic',
                        image: 'images/Color_Chart/Siltcoat/silkcoat_siltcoat.jpg',
                        image_details: 'images/Color_Chart/Siltcoat/siltcoat_color_chart.jpg',
                        features: [
                            'Textured finish that mimics natural stone and terracotta',
                            'Excellent durability against extreme weather conditions',
                            'Breathable coating prevents moisture accumulation',
                            'Mold and mildew resistant formulation',
                            'Perfect for Mediterranean and traditional architectural styles'
                        ],
                        specs: [
                            'Texture: Natural stone and terracotta effects',
                            'Breathability: Excellent moisture vapor transmission',
                            'Weather Resistance: Superior protection against elements',
                            'Mold Resistance: Anti-microbial formulation',
                            'Application: Exterior walls, facades, architectural features'
                        ]
                    }
                }
            },
            'exterior-regular': {
                title: 'Exterior Regular Paint',
                items: {
                    'acrylic-exterior': {
                        name: 'Acrylic Exterior Paint',
                        image: 'images/Effect_Paint/silkcoat-acrylic-exterior.jpg',
                        features: [
                            '100% acrylic resin formulation for maximum durability',
                            'Excellent UV resistance and color retention',
                            'Waterproof and weather-resistant properties',
                            'Resists mold, mildew, and algae growth',
                            'Easy application and quick drying time'
                        ],
                        specs: [
                            'Coverage: 10-12 m²/L per coat',
                            'Drying Time: 2-4 hours',
                            'Recoat Time: 4-6 hours',
                            'Finish: Matte/Satin/Gloss available',
                            'Warranty: 10-year limited warranty'
                        ]
                    },
                    'weatherproof-enamel': {
                        name: 'Weatherproof Enamel',
                        image: 'images/Effect_Paint/silkcoat-enamel.jpg',
                        features: [
                            'High-gloss enamel finish for exterior trim and metal surfaces',
                            'Exceptional resistance to chipping, peeling, and fading',
                            'Rust-inhibitive properties for metal surfaces',
                            'Withstands extreme weather conditions',
                            'Easy cleanup with soap and water'
                        ],
                        specs: [
                            'Coverage: 12-14 m²/L per coat',
                            'Drying Time: 4-6 hours',
                            'Recoat Time: 16-24 hours',
                            'Finish: High gloss',
                            'Application: Wood, metal, previously painted surfaces'
                        ]
                    }
                }
            },
            'floor-paint': {
                title: 'Floor Paint',
                items: {
                    'epoxy-floor': {
                        name: 'Epoxy Floor Paint',
                        image: 'images/Effect_Paint/silkcoat-pearl.jpg',
                        features: [
                            'High-performance two-component epoxy system',
                            'Exceptional durability and chemical resistance',
                            'Seamless, easy-to-clean surface',
                            'Available in various colors and finishes',
                            'Suitable for industrial and commercial applications'
                        ],
                        specs: [
                            'Coverage: 6-8 m²/L depending on porosity',
                            'Pot Life: 45-60 minutes',
                            'Full Cure: 7 days',
                            'Finish: Gloss/Semi-gloss',
                            'Chemical Resistance: Excellent'
                        ]
                    },
                    'concrete-floor': {
                        name: 'Concrete Floor Paint',
                        image: 'images/Effect_Paint/silkcoat-velvetto.jpg',
                        features: [
                            'Single-component acrylic floor coating',
                            'Dust-proofing and wear resistance',
                            'Easy application and maintenance',
                            'Non-slip additives available',
                            'Suitable for warehouses and garages'
                        ],
                        specs: [
                            'Coverage: 8-10 m²/L per coat',
                            'Drying Time: 4-6 hours',
                            'Full Cure: 24-48 hours',
                            'Finish: Semi-gloss',
                            'Traffic: Light to medium foot traffic'
                        ]
                    }
                }
            },
            'car-paint': {
                title: 'Car Paint',
                items: {
                    'automotive-basecoat': {
                        name: 'Automotive Basecoat',
                        image: 'images/Effect_Paint/silkcoat-Metalico.jpg',
                        features: [
                            'High-quality automotive basecoat system',
                            'Excellent color matching capabilities',
                            'UV-resistant pigments prevent fading',
                            'Compatible with standard clearcoat systems',
                            'Professional automotive finish quality'
                        ],
                        specs: [
                            'Application: Spray gun only',
                            'Flash Time: 5-10 minutes between coats',
                            'Coverage: 6-8 m²/L',
                            'Color Match: Exact OEM specifications',
                            'Durability: Automotive grade'
                        ]
                    },
                    'automotive-clearcoat': {
                        name: 'Automotive Clearcoat',
                        image: 'images/Effect_Paint/silkcoat-MetalicoSoft.jpg',
                        features: [
                            '2K high-gloss clearcoat system',
                            'Exceptional UV protection and durability',
                            'High gloss retention over time',
                            'Scratch and chip resistance',
                            'Professional automotive finish'
                        ],
                        specs: [
                            'Mixing Ratio: 2:1 with hardener',
                            'Pot Life: 4-6 hours',
                            'Spray Application: Multiple thin coats',
                            'Full Cure: 7 days',
                            'Gloss Level: High gloss (90+ GU)'
                        ]
                    }
                }
            },
        },
        services: {
            'color-chart': {
                title: 'Color Chart',
                items: {
                    'interior-colors': {
                        name: 'Interior Paint',
                        image: 'images/Color_Chart/Interior/silkcoat_interior.jpg',
                        image_details: 'images/Color_Chart/Interior/interior_color_chart.jpg',
                        features: [
                            'Comprehensive palette of 200+ professionally curated interior colors',
                            'Harmonized color families designed for seamless room coordination',
                            'Lighting analysis tools to predict color performance in various conditions',
                            'Advanced spectrophotometer color matching for existing surfaces',
                            'Contemporary trend forecasting based on global design movements'
                        ],
                        specs: [
                            'Total Colors: 200+ verified formulations',
                            'Finish Variations: Matte, Eggshell, Satin, Semi-gloss',
                            'Recommended Use: Interior walls, ceilings, trim',
                            'Color Accuracy: ΔE<1 digital matching standard',
                            'Test Samples: 50ml architect specification bottles'
                        ]
                    },
                    'exterior-colors': {
                        name: 'Exterior Paint',
                        image: 'images/Color_Chart/Exterior/silkcoat_exterior.jpg',
                        image_details: 'images/Color_Chart/Exterior/exterior_color_chart.jpg',
                        features: [
                            'Climate-engineered formulations with enhanced UV protection',
                            'Lightfast pigment technology prevents color degradation over time',
                            'Advanced fade-resistance testing ensures 10+ year color retention',
                            'Regional climate optimization for Liberian weather conditions',
                            'Architectural color coordination systems for building exteriors'
                        ],
                        specs: [
                            'Color Selection: 150+ weather-tested options',
                            'UV Stability: ASTM G154 certified excellent rating',
                            'Weathering Performance: QUV 2000+ hour testing',
                            'Color Retention: 95%+ after 10 years exposure',
                            'Sample Size: 100ml field testing containers'
                        ]
                    },
                    'marmarito': {
                        name: 'Marmarito',
                        image: 'images/Color_Chart/Marmarito/silkcoat_marmarito.jpg',
                        image_details: 'images/Color_Chart/Marmarito/marmarito_color_chart.jpg',
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
                    'palace': {
                        name: 'Palace',
                        image: 'images/Color_Chart/Palace/silkcoat_palace.jpg',
                        image_details: 'images/Color_Chart/Palace/palace_color_chart.jpg',
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
                    },
                    'metalico': {
                        name: 'Metalico',
                        image: 'images/Color_Chart/Metalico/silkcoat_metalico.jpg',
                        image_details: 'images/Color_Chart/Metalico/metalico_color_chart.jpg',
                        features: [
                            'High-saturation color collection for dynamic visual impact',
                            'Bold contemporary palette designed for statement applications',
                            'Architectural accent colors optimized for lighting enhancement',
                            'Creative expression tools for modern interior design concepts',
                            'Specialty formulations for feature walls and artistic installations'
                        ],
                        specs: [
                            'Bold Selection: 60+ high-impact color options',
                            'Saturation Level: Maximum chroma intensity formulations',
                            'Visual Impact: Dramatic focal point applications',
                            'Optimal Use: Accent walls, artistic features, commercial spaces',
                            'Pairing System: Coordinated neutral backdrop colors available'
                        ]
                    },
                    'metalico-soft': {
                        name: 'Metalico Soft',
                        image: 'images/Color_Chart/Metalico_Soft/silkcoat_metalico_soft.jpg',
                        image_details: 'images/Color_Chart/Metalico_Soft/metalico_soft_color_chart.jpg',
                        features: [
                            'Refined pastel collection with subtle metallic undertones',
                            'Light-reflective properties create spacious, airy environments',
                            'Child-safe formulations ideal for nurseries and family spaces',
                            'Color therapy principles incorporated for stress relief and comfort',
                            'Timeless aesthetic appeal transcends temporary design trends'
                        ],
                        specs: [
                            'Gentle Palette: 70+ soft-toned options',
                            'Color Temperature: Cool and warm balanced selections',
                            'Light Reflection: Enhanced brightness and space perception',
                            'Family Spaces: Nursery, bedroom, relaxation area optimization',
                            'Longevity: Classic appeal with enduring beauty'
                        ]
                    },
                    'decortivo': {
                        name: 'Decortivo',
                        image: 'images/Color_Chart/Decortivo/silkcoat_decortivo.jpg',
                        image_details: 'images/Color_Chart/Decortivo/decortivo_color_chart.jpg',
                        features: [
                            'Sophisticated pearlescent color range with iridescent depth',
                            'Multi-dimensional finishes that change with lighting conditions',
                            'Elegant sophistication suitable for upscale residential applications',
                            'Advanced pearl pigment technology creates luxurious surface effects',
                            'Designer-grade finishes for premium interior environments'
                        ],
                        specs: [
                            'Pearlescent Range: 45+ iridescent color options',
                            'Finish Effect: Multi-dimensional pearl and shimmer',
                            'Lighting Response: Dynamic color shifts with angle and illumination',
                            'Premium Application: High-end residential and commercial projects',
                            'Surface Quality: Smooth, elegant, washable finish'
                        ]
                    },
                    'velvetto': {
                        name: 'Velvetto',
                        image: 'images/Color_Chart/Velvetto/silkcoat_velvetto.jpg',
                        image_details: 'images/Color_Chart/Velvetto/velvetto_color_chart.jpg',
                        features: [
                            'Luxurious silk-textured color collection with velvet-like appearance',
                            'Rich, saturated hues with exceptional color depth and warmth',
                            'Tactile surface quality that invites physical interaction',
                            'Acoustic benefits through texture-enhanced sound absorption',
                            'Premium residential applications for sophisticated living spaces'
                        ],
                        specs: [
                            'Velvet Collection: 55+ rich, tactile color options',
                            'Texture Quality: Silk-fiber enhanced surface depth',
                            'Color Depth: Maximum saturation with warm undertones',
                            'Acoustic Properties: Enhanced sound dampening characteristics',
                            'Application: Luxury residential, hospitality, retail environments'
                        ]
                    },
                    'velvetto_soft': {
                        name: 'Velvetto Soft',
                        image: 'images/Color_Chart/Velvetto_Soft/silkcoat_velvetto_soft.jpg',
                        image_details: 'images/Color_Chart/Velvetto_Soft/velvetto_soft_color_chart.jpg',
                        features: [
                            'Gentle velvet-textured palette with understated elegance',
                            'Muted color sophistication perfect for serene environments',
                            'Whisper-soft color tones that promote relaxation and comfort',
                            'Balanced neutral base with subtle warm and cool variations',
                            'Versatile coordination options for multi-room color schemes'
                        ],
                        specs: [
                            'Soft Velvet Range: 65+ muted sophisticated options',
                            'Color Intensity: Gentle, calming saturation levels',
                            'Environmental Impact: Peaceful, serene atmosphere creation',
                            'Coordination: Multi-room harmony and flow optimization',
                            'Texture: Refined velvet surface with subtle tactile appeal'
                        ]
                    },
                    'arteco': {
                        name: 'Arteco',
                        image: 'images/Color_Chart/Arteco/silkcoat_arteco.jpg',
                        image_details: 'images/Color_Chart/Arteco/arteco_color_chart.jpg',
                        features: [
                            'Artistic metallic color palette with professional-grade sophistication',
                            'Museum-quality pigment stability for long-term color integrity',
                            'Architectural metallic finishes suitable for commercial applications',
                            'Contemporary design integration with modern aesthetic principles',
                            'Professional specification standards for high-visibility projects'
                        ],
                        specs: [
                            'Metallic Artistic Range: 40+ professional-grade options',
                            'Pigment Quality: Museum-standard lightfastness rating',
                            'Commercial Grade: Architectural specification compliance',
                            'Design Integration: Modern aesthetic compatibility',
                            'Professional Standard: High-visibility project specifications'
                        ]
                    },
                    'pearl': {
                        name: 'Pearl',
                        image: 'images/Color_Chart/Pearl/silkcoat_pearl.jpg',
                        image_details: 'images/Color_Chart/Pearl/pearl_color_chart.jpg',
                        features: [
                            'Natural pearl-inspired color collection with organic luminescence',
                            'Silk fiber integration creates unique texture and light interaction',
                            'Sustainable natural materials with eco-friendly composition',
                            'Breathable surface technology promotes healthy indoor environments',
                            'Artisan-quality finishes with handcrafted appearance characteristics'
                        ],
                        specs: [
                            'Pearl Collection: 35+ natural luminescent options',
                            'Material Integration: Natural silk fiber enhancement',
                            'Environmental Impact: Sustainable, eco-friendly formulation',
                            'Indoor Air Quality: Breathable, non-toxic surface technology',
                            'Artisan Quality: Handcrafted texture and appearance'
                        ]
                    },
                    'magico': {
                        name: 'Magico',
                        image: 'images/Color_Chart/Magico/silkcoat_magico.jpg',
                        image_details: 'images/Color_Chart/Magico/magico_color_chart.jpg',
                        features: [
                            'Mystical copper and bronze metallic color range with antique patina',
                            'Time-weathered appearance creates historical design authenticity',
                            'Architectural restoration compatibility for heritage projects',
                            'Variable patina effects adapt to different lighting conditions',
                            'Professional antiquing techniques for authentic vintage aesthetics'
                        ],
                        specs: [
                            'Copper Bronze Range: 30+ antique patina variations',
                            'Patina Effect: Authentic time-weathered appearance',
                            'Heritage Compatibility: Architectural restoration appropriate',
                            'Lighting Adaptation: Variable appearance in different illumination',
                            'Authenticity: Professional antiquing and aging techniques'
                        ]
                    },
                    'cracos': {
                        name: 'Cracos',
                        image: 'images/Color_Chart/Cracos/silkcoat_cracos.jpg',
                        image_details: 'images/Color_Chart/Cracos/cracos_color_chart.jpg',
                        features: [
                            'Premium silver metallic collection with mirror-like brilliance',
                            'High-reflectance surface technology maximizes light distribution',
                            'Contemporary architectural applications for modern design schemes',
                            'Tarnish-resistant formulation maintains long-term appearance',
                            'Professional-grade finish quality for commercial installations'
                        ],
                        specs: [
                            'Silver Metallic Range: 25+ high-brilliance options',
                            'Reflectance Technology: Maximum light distribution enhancement',
                            'Modern Applications: Contemporary architectural compatibility',
                            'Tarnish Resistance: Long-term appearance preservation',
                            'Commercial Grade: Professional installation standards'
                        ]
                    },
                    'travertino': {
                        name: 'Travertino',
                        image: 'images/Color_Chart/Travertino/silkcoat_travertino.jpg',
                        image_details: 'images/Color_Chart/Travertino/travertino_color_chart.jpg',
                        features: [
                            'Natural stone-inspired color palette with travertine marble aesthetics',
                            'Organic mineral color variations replicate authentic stone characteristics',
                            'Luxury architectural finishes suitable for high-end residential projects',
                            'Dimensional color depth creates realistic stone texture appearance',
                            'Mediterranean design compatibility with classical architectural elements'
                        ],
                        specs: [
                            'Stone-Inspired Range: 40+ travertine marble variations',
                            'Natural Variation: Authentic mineral color characteristics',
                            'Luxury Application: High-end residential and commercial projects',
                            'Dimensional Quality: Realistic stone texture depth',
                            'Design Style: Mediterranean, classical architectural compatibility'
                        ]
                    },
                    'prestige': {
                        name: 'Prestige',
                        image: 'images/Color_Chart/Prestige/silkcoat_prestige.jpg',
                        image_details: 'images/Color_Chart/Prestige/prestige_color_chart.jpg',
                        features: [
                            'Ultra-premium color collection with exclusive formulation technology',
                            'Highest quality pigments ensure superior color performance',
                            'Executive-level applications for prestigious commercial projects',
                            'Signature color development for brand identity and corporate environments',
                            'Concierge color consultation service with premium project support'
                        ],
                        specs: [
                            'Premium Collection: 60+ exclusive ultra-quality options',
                            'Pigment Grade: Highest quality formulation standards',
                            'Executive Applications: Prestigious commercial environments',
                            'Custom Development: Signature brand color creation',
                            'Concierge Service: Premium consultation and project support'
                        ]
                    },
                    'stone': {
                        name: 'Stone',
                        image: 'images/Color_Chart/Stone/silkcoat_stone.jpg',
                        image_details: 'images/Color_Chart/Stone/stone_color_chart.jpg',
                        features: [
                            'Comprehensive natural stone color palette with geological authenticity',
                            'Regional stone types represented including granite, limestone, and sandstone',
                            'Architectural specification compatibility for stone veneer coordination',
                            'Weathering and aging effects simulate natural stone patina development',
                            'Professional masonry and architectural consultation available'
                        ],
                        specs: [
                            'Natural Stone Range: 85+ geological color variations',
                            'Stone Types: Granite, limestone, sandstone, marble representations',
                            'Architectural Use: Stone veneer coordination and specification',
                            'Weathering Effects: Natural patina and aging simulation',
                            'Professional Service: Masonry and architectural consultation'
                        ]
                    }
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
            // Dropdown navigation
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

                // Footer links
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

                // Back to category button
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
                {
                    key: 'decorative-paint',
                    title: 'Decorative Paint',
                    desc: 'Premium decorative paints with special effects and finishes',
                    icon: 'fas fa-magic'
                },
                {
                    key: 'plastic-paint',
                    title: 'Plastic Paint',
                    desc: 'High-quality plastic emulsion paints for interior walls',
                    icon: 'fas fa-paint-roller'
                },
                {
                    key: 'latex-paint',
                    title: 'Latex Paint',
                    desc: 'Superior latex formulations with excellent durability',
                    icon: 'fas fa-brush'
                },
                {
                    key: 'acrylic-paint',
                    title: 'Acrylic Paint',
                    desc: 'Premium acrylic paints for versatile applications',
                    icon: 'fas fa-palette'
                },
                {
                    key: 'exterior-paint',
                    title: 'Exterior Paint',
                    desc: 'Weather-resistant exterior coatings and stone finishes',
                    icon: 'fas fa-building'
                },
                {
                    key: 'exterior-regular',
                    title: 'Exterior Regular Paint',
                    desc: 'Standard exterior paints for general applications',
                    icon: 'fas fa-home'
                },
                {
                    key: 'floor-paint',
                    title: 'Floor Paint',
                    desc: 'Durable floor coatings for industrial and commercial use',
                    icon: 'fas fa-square'
                },
                {
                    key: 'car-paint',
                    title: 'Car Paint',
                    desc: 'Professional automotive paint systems and finishes',
                    icon: 'fas fa-car'
                }
            ];

            categories.forEach(category => {
                const col = document.createElement('div');
                col.className = 'col-lg-4 col-md-6 mb-4';
                col.innerHTML = `
                    <div class="category-item-card category-selection-card" data-category="${category.key}">
                        <div class="category-item-image">
                            <img src="public/images/interior_paint.jpg" alt="${category.title}" class="img-fluid">
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
                        <img src="public/images/interior_paint.jpg" alt="Color Chart" class="img-fluid">
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
            console.log('=== RENDER CATEGORY ITEMS DEBUG ===');
            console.log('Category:', category);
            console.log('Items count:', Object.keys(items).length);
            console.log('Items keys:', Object.keys(items));
            console.log('Container:', container);
            console.log('==============================');

            console.log('Items data:', items); // Check if data structure is the same

            container.innerHTML = '';
            
            const row = document.createElement('div');
            row.className = 'row justify-content-start g-4';
            
            Object.keys(items).forEach(itemKey => {
                const item = items[itemKey];
                const col = document.createElement('div');
                
                const itemCount = Object.keys(items).length;
                let colClass = 'col-lg-3 col-md-4 col-sm-6 col-6'; // Default for 5+ items
                
                if (itemCount === 1) {
                    colClass = 'col-12 col-md-6 col-lg-4'; // Centered appearance but left-aligned
                } else if (itemCount === 2) {
                    colClass = 'col-12 col-sm-6 col-lg-6'; // Two equal columns
                } else if (itemCount === 3) {
                    colClass = 'col-12 col-md-6 col-lg-4'; // Three equal columns
                } else if (itemCount === 4) {
                    colClass = 'col-12 col-sm-6 col-lg-3'; // Four equal columns - FIXED!
                }
                // 5+ items use the default
                
                col.className = colClass;
                col.innerHTML = `
                    <div class="category-item-card h-100" data-category="${category}" data-item="${itemKey}">
                        <div class="category-item-image">
                            <img src="${item.image}" alt="${item.name}" class="img-fluid">
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
                    <img src="${item.image}" alt="${item.name}" class="sidebar-item-image">
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
            
            // Get form data
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!firstName || !lastName || !email || !subject || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
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
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
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
    
    // Intersection Observer for counter animation
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
        // Close mobile menu when clicking regular nav links (not dropdown toggles or items)
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

        // Handle dropdown items - close menu only when clicking actual product/service links
        const dropdownItems = document.querySelectorAll('.dropdown-item:not(.dropdown-toggle)');
        dropdownItems.forEach(item => {
            item.addEventListener('click', () => {
                // Only close if it's a final link, not a submenu toggle
                if (!item.classList.contains('dropdown-toggle')) {
                    setTimeout(() => {
                        if (navbarCollapse.classList.contains('show')) {
                            navbarToggler.click();
                        }
                    }, 150);
                }
            });
        });
        
        // Prevent navbar collapse when clicking dropdown toggles on mobile
        document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth < 992) {
                    e.stopPropagation(); // Prevent event from reaching navbar collapse handler
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
    
    // Add CSS for animation
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
    animateOnScroll(); // Run once on load

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

// Smooth scroll to element
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Format date for local display
function formatDate(date) {
    return new Intl.DateTimeFormat('en-LR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show loading state
function showLoading(element) {
    element.classList.add('loading');
    element.disabled = true;
}

// Hide loading state
function hideLoading(element) {
    element.classList.remove('loading');
    element.disabled = false;
}

// Get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Set URL parameter without refresh
function setUrlParameter(name, value) {
    const url = new URL(window.location);
    url.searchParams.set(name, value);
    window.history.pushState({}, '', url);
}

// Remove URL parameter without refresh
function removeUrlParameter(name) {
    const url = new URL(window.location);
    url.searchParams.delete(name);
    window.history.pushState({}, '', url);
}