// Initialize Typed.js for hero text
document.addEventListener('DOMContentLoaded', function() {
    // Typed.js initialization
    if (typeof Typed !== 'undefined' && document.getElementById('hero-typed-text')) {
        new Typed('#hero-typed-text', {
            strings: ['Find Your Dream Home', 'Discover Luxury Properties', 'Your Perfect Home Awaits'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    }

    // Price range sliders
    const minPriceSlider = document.getElementById('min-price');
    const maxPriceSlider = document.getElementById('max-price');
    const minPriceDisplay = document.getElementById('min-price-display');
    const maxPriceDisplay = document.getElementById('max-price-display');

    function formatPrice(value) {
        if (value >= 1000000) {
            return '$' + (value / 1000000).toFixed(1) + 'M';
        } else if (value >= 1000) {
            return '$' + (value / 1000).toFixed(0) + 'K';
        }
        return '$' + value;
    }

    if (minPriceSlider && minPriceDisplay) {
        minPriceSlider.addEventListener('input', function() {
            minPriceDisplay.textContent = formatPrice(this.value);
            if (parseInt(this.value) > parseInt(maxPriceSlider.value)) {
                maxPriceSlider.value = this.value;
                maxPriceDisplay.textContent = formatPrice(this.value);
            }
        });
    }

    if (maxPriceSlider && maxPriceDisplay) {
        maxPriceSlider.addEventListener('input', function() {
            maxPriceDisplay.textContent = formatPrice(this.value);
            if (parseInt(this.value) < parseInt(minPriceSlider.value)) {
                minPriceSlider.value = this.value;
                minPriceDisplay.textContent = formatPrice(this.value);
            }
        });
    }

    // Search form submission
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const searchParams = new URLSearchParams(formData);
            // Scroll to featured properties section
            const targetSection = document.getElementById('featured-properties-section');
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            console.log('Search submitted:', Object.fromEntries(searchParams));
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all scroll-animate elements
    document.querySelectorAll('.scroll-animate, .fade-in').forEach(el => {
        observer.observe(el);
    });

    // Initialize Splide carousel for featured properties
    function initPropertyCarousel() {
        const featuredPropertiesEl = document.getElementById('featured-properties');
        if (!featuredPropertiesEl) {
            console.log('Featured properties element not found');
            return;
        }

        // Wait for Splide to be available
        if (typeof Splide === 'undefined') {
            console.log('Splide library not loaded yet, retrying...');
            setTimeout(initPropertyCarousel, 100);
            return;
        }

        // Sample properties data
        const properties = [
            {
                image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
                title: 'Modern Luxury Villa',
                price: '$2,450,000',
                address: '123 Ocean Drive, Miami, FL',
                beds: 4,
                baths: 3,
                sqft: '3,500'
            },
            {
                image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
                title: 'Downtown Penthouse',
                price: '$1,850,000',
                address: '456 Skyline Blvd, New York, NY',
                beds: 3,
                baths: 2,
                sqft: '2,800'
            },
            {
                image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
                title: 'Beachfront Estate',
                price: '$4,200,000',
                address: '789 Coastal Way, Malibu, CA',
                beds: 5,
                baths: 4,
                sqft: '5,200'
            },
            {
                image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
                title: 'Mountain View Estate',
                price: '$3,100,000',
                address: '321 Hillside Drive, Aspen, CO',
                beds: 4,
                baths: 3,
                sqft: '4,200'
            },
            {
                image: 'https://images.unsplash.com/photo-1600585152915-d38becbb1e0c?w=800&h=600&fit=crop',
                title: 'Urban Loft Apartment',
                price: '$1,200,000',
                address: '555 Downtown Ave, Seattle, WA',
                beds: 2,
                baths: 2,
                sqft: '2,100'
            }
        ];

        const splideList = document.querySelector('#featured-properties .splide__list');
        if (!splideList) {
            console.log('Splide list not found');
            return;
        }

        // Clear existing content
        splideList.innerHTML = '';

        // Add properties
        properties.forEach(property => {
            const li = document.createElement('li');
            li.className = 'splide__slide';
            li.innerHTML = `
                <div class="property-card">
                    <div class="property-image">
                        <img src="${property.image}" alt="${property.title}" crossorigin="anonymous" loading="lazy" onerror="this.src='https://via.placeholder.com/800x600?text=Property+Image'">
                        <button class="favorite-btn"><i class="fas fa-heart"></i></button>
                    </div>
                    <div class="property-info">
                        <h3>${property.title}</h3>
                        <div class="price">${property.price}</div>
                        <div class="address">${property.address}</div>
                        <div class="property-specs">
                            <span><i class="fas fa-bed"></i> ${property.beds} Beds</span>
                            <span><i class="fas fa-bath"></i> ${property.baths} Baths</span>
                            <span><i class="fas fa-ruler-combined"></i> ${property.sqft} sqft</span>
                        </div>
                    </div>
                </div>
            `;
            splideList.appendChild(li);
        });

        // Initialize Splide
        try {
            new Splide('#featured-properties', {
                type: 'loop',
                perPage: 3,
                perMove: 1,
                gap: '2rem',
                pagination: true,
                arrows: true,
                breakpoints: {
                    1024: {
                        perPage: 2
                    },
                    768: {
                        perPage: 1
                    }
                }
            }).mount();
            console.log('Splide carousel initialized successfully');
        } catch (error) {
            console.error('Error initializing Splide:', error);
        }
    }

    // Initialize carousel after a short delay to ensure libraries are loaded
    setTimeout(initPropertyCarousel, 500);

    // Initialize ECharts for market chart
    if (typeof echarts !== 'undefined' && document.getElementById('market-chart')) {
        const chart = echarts.init(document.getElementById('market-chart'));
        const option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['Average Price', 'Properties Sold']
            },
            xAxis: {
                type: 'category',
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Average Price',
                    type: 'line',
                    data: [720, 750, 780, 760, 800, 820, 780, 790, 810, 850, 830, 880],
                    smooth: true
                },
                {
                    name: 'Properties Sold',
                    type: 'bar',
                    data: [120, 135, 150, 145, 160, 170, 155, 165, 175, 180, 170, 190]
                }
            ]
        };
        chart.setOption(option);

        // Handle window resize
        window.addEventListener('resize', function() {
            chart.resize();
        });
    }

    // Initialize p5.js particle background
    if (typeof p5 !== 'undefined' && document.getElementById('particle-background')) {
        new p5(function(p) {
            const particles = [];
            const particleCount = 50;

            p.setup = function() {
                const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
                canvas.parent('particle-background');
                for (let i = 0; i < particleCount; i++) {
                    particles.push({
                        x: p.random(p.width),
                        y: p.random(p.height),
                        radius: p.random(2, 5),
                        speedX: p.random(-1, 1),
                        speedY: p.random(-1, 1)
                    });
                }
            };

            p.draw = function() {
                p.clear();
                p.stroke(214, 158, 46, 100);
                p.strokeWeight(1);
                p.noFill();

                for (let i = 0; i < particles.length; i++) {
                    const particle = particles[i];
                    particle.x += particle.speedX;
                    particle.y += particle.speedY;

                    if (particle.x < 0 || particle.x > p.width) particle.speedX *= -1;
                    if (particle.y < 0 || particle.y > p.height) particle.speedY *= -1;

                    p.circle(particle.x, particle.y, particle.radius);

                    for (let j = i + 1; j < particles.length; j++) {
                        const other = particles[j];
                        const distance = p.dist(particle.x, particle.y, other.x, other.y);
                        if (distance < 100) {
                            p.line(particle.x, particle.y, other.x, other.y);
                        }
                    }
                }
            };

            p.windowResized = function() {
                p.resizeCanvas(p.windowWidth, p.windowHeight);
            };
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        });
    }
});

