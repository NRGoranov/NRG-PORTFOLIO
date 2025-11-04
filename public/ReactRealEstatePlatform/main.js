// Real Estate Website - Main JavaScript
// Core functionality for property search, filtering, animations, and interactions

// Property Database
const properties = [
    {
        id: 1,
        title: "Modern Luxury Villa",
        price: 1250000,
        type: "House",
        bedrooms: 4,
        bathrooms: 3.5,
        sqft: 3200,
        address: "123 Hillside Drive, Beverly Hills, CA 90210",
        lat: 34.0901,
        lng: -118.4065,
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600210491892-03d54c0aafb3?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600607688201-4e2a09cf159d?w=800&h=600&fit=crop"
        ],
        amenities: ["Pool", "Garage", "Garden", "Gym"],
        description: "Stunning modern villa with panoramic city views, featuring an open-concept design, premium finishes, and resort-style backyard.",
        agent: "Sarah Johnson",
        agentPhone: "(555) 123-4567",
        agentEmail: "sarah@luxuryrealty.com"
    },
    {
        id: 2,
        title: "Downtown Penthouse",
        price: 890000,
        type: "Condo",
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1800,
        address: "456 Main Street, Los Angeles, CA 90015",
        lat: 34.0522,
        lng: -118.2437,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600585153490-76fb20a326cc?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600585153071-8c2d5e6e6b3b?w=800&h=600&fit=crop"
        ],
        amenities: ["Gym", "Concierge", "Rooftop Deck"],
        description: "Sophisticated penthouse in the heart of downtown with floor-to-ceiling windows and premium building amenities.",
        agent: "Michael Chen",
        agentPhone: "(555) 234-5678",
        agentEmail: "michael@luxuryrealty.com"
    },
    {
        id: 3,
        title: "Waterfront Townhouse",
        price: 750000,
        type: "Townhouse",
        bedrooms: 3,
        bathrooms: 2.5,
        sqft: 2200,
        address: "789 Marina Blvd, Marina del Rey, CA 90292",
        lat: 33.9681,
        lng: -118.4513,
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600607688069-2c0b0a0a0a0a?w=800&h=600&fit=crop"
        ],
        amenities: ["Waterfront", "Balcony", "Garage"],
        description: "Charming waterfront townhouse with stunning marina views and private patio perfect for entertaining.",
        agent: "Emily Rodriguez",
        agentPhone: "(555) 345-6789",
        agentEmail: "emily@luxuryrealty.com"
    },
    {
        id: 4,
        title: "Modern Family Home",
        price: 680000,
        type: "House",
        bedrooms: 3,
        bathrooms: 2,
        sqft: 2100,
        address: "321 Oak Avenue, Pasadena, CA 91101",
        lat: 34.1478,
        lng: -118.1445,
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600566753086-5f62d21f8d83?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600240644453-484edb135597?w=800&h=600&fit=crop"
        ],
        amenities: ["Garden", "Garage", "Fireplace"],
        description: "Beautiful family home in quiet Pasadena neighborhood with updated kitchen and spacious backyard.",
        agent: "David Thompson",
        agentPhone: "(555) 456-7890",
        agentEmail: "david@luxuryrealty.com"
    },
    {
        id: 5,
        title: "Luxury Condo with Views",
        price: 950000,
        type: "Condo",
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1600,
        address: "987 Ocean Drive, Santa Monica, CA 90401",
        lat: 34.0195,
        lng: -118.4912,
        image: "https://images.unsplash.com/photo-1600585152915-d38becbb1e0c?w=800&h=600&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1600585152915-d38becbb1e0c?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600585153071-8c2d5e6e6b3b?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600607688201-4e2a09cf159d?w=800&h=600&fit=crop"
        ],
        amenities: ["Ocean Views", "Balcony", "Gym", "Pool"],
        description: "Stunning oceanfront condo with panoramic views and luxury amenities in prime Santa Monica location.",
        agent: "Lisa Park",
        agentPhone: "(555) 567-8901",
        agentEmail: "lisa@luxuryrealty.com"
    },
    {
        id: 6,
        title: "Contemporary Architectural Gem",
        price: 1450000,
        type: "House",
        bedrooms: 4,
        bathrooms: 3,
        sqft: 2800,
        address: "654 Canyon Road, Hollywood Hills, CA 90068",
        lat: 34.1184,
        lng: -118.3432,
        image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600047509807-ba8f99d478cd?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600607688069-2c0b0a0a0a0a?w=800&h=600&fit=crop"
        ],
        amenities: ["City Views", "Infinity Pool", "Home Theater", "Wine Cellar"],
        description: "Architectural masterpiece in the Hollywood Hills with stunning city views and premium finishes throughout.",
        agent: "James Wilson",
        agentPhone: "(555) 678-9012",
        agentEmail: "james@luxuryrealty.com"
    },
    {
        id: 7,
        title: "Charming Craftsman Home",
        price: 590000,
        type: "House",
        bedrooms: 3,
        bathrooms: 2,
        sqft: 1850,
        address: "147 Maple Street, Glendale, CA 91205",
        lat: 34.1425,
        lng: -118.2551,
        image: "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&h=600&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600240644453-484edb135597?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600585153490-76fb20a326cc?w=800&h=600&fit=crop"
        ],
        amenities: ["Hardwood Floors", "Fireplace", "Patio"],
        description: "Beautiful Craftsman home with original details and modern updates in desirable Glendale neighborhood.",
        agent: "Anna Martinez",
        agentPhone: "(555) 789-0123",
        agentEmail: "anna@luxuryrealty.com"
    },
    {
        id: 8,
        title: "Sleek Modern Townhouse",
        price: 820000,
        type: "Townhouse",
        bedrooms: 3,
        bathrooms: 2.5,
        sqft: 1950,
        address: "258 Modern Way, Culver City, CA 90232",
        lat: 34.0211,
        lng: -118.3965,
        image: "https://images.unsplash.com/photo-1600585154526-990dbe4eb0a3?w=800&h=600&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1600585154526-990dbe4eb0a3?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600566753086-5f62d21f8d83?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
        ],
        amenities: ["Modern Kitchen", "Rooftop Deck", "Garage"],
        description: "Contemporary townhouse with sleek design and premium finishes in trendy Culver City location.",
        agent: "Robert Kim",
        agentPhone: "(555) 890-1234",
        agentEmail: "robert@luxuryrealty.com"
    }
];

// Blog Articles
const blogArticles = [
    {
        id: 1,
        title: "2024 Real Estate Market Trends: What Buyers Need to Know",
        excerpt: "Discover the latest market trends and insights to make informed decisions in today's competitive real estate landscape.",
        category: "Market Trends",
        readTime: "5 min read",
        date: "2024-09-15",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
        content: "The 2024 real estate market continues to evolve with changing interest rates, inventory levels, and buyer preferences. This comprehensive analysis explores key trends including the shift toward suburban properties, the impact of remote work on housing choices, and emerging technologies in real estate transactions. Learn how these factors affect pricing, timing, and negotiation strategies for both buyers and sellers."
    },
    {
        id: 2,
        title: "Essential Checklist for First-Time Home Buyers",
        excerpt: "Navigate the home buying process with confidence using our comprehensive checklist and expert tips.",
        category: "Buying Guide",
        readTime: "8 min read",
        date: "2024-09-10",
        image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
        content: "Buying your first home can be overwhelming, but proper preparation makes all the difference. This guide covers everything from financial preparation and mortgage pre-approval to house hunting strategies and closing procedures. Learn about common pitfalls to avoid, questions to ask during viewings, and how to work effectively with real estate professionals."
    },
    {
        id: 3,
        title: "Maximizing Your Home's Value: Staging Tips That Work",
        excerpt: "Professional staging secrets to help your property sell faster and for top dollar.",
        category: "Selling Tips",
        readTime: "6 min read",
        date: "2024-09-05",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
        content: "Effective home staging can significantly impact your property's selling price and time on market. This article reveals professional staging techniques that create emotional connections with buyers, highlight your home's best features, and minimize potential drawbacks. From decluttering and depersonalizing to strategic furniture placement and lighting improvements."
    },
    {
        id: 4,
        title: "Understanding Property Taxes and Assessments",
        excerpt: "A comprehensive guide to property taxes, assessments, and how they impact your investment.",
        category: "Market Trends",
        readTime: "7 min read",
        date: "2024-08-28",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
        content: "Property taxes are a significant ongoing cost of homeownership that many buyers underestimate. This guide explains how property assessments work, what factors influence tax rates, and strategies for appealing excessive assessments. Learn about tax deductions, exemptions, and how to budget for this important expense."
    }
];

// Global variables
let currentProperties = [...properties];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let map;
let markers = [];

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize navigation
    initializeNavigation();
    
    // Initialize page-specific functionality
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'index.html':
        case '':
            initializeHomePage();
            break;
        case 'listings.html':
            initializeListingsPage();
            break;
        case 'map.html':
            initializeMapPage();
            break;
        case 'contact.html':
            initializeContactPage();
            break;
        case 'blog.html':
            initializeBlogPage();
            break;
    }
    
    // Initialize common components
    initializeAnimations();
    initializeScrollEffects();
}

// Navigation functionality
function initializeNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Home page initialization
function initializeHomePage() {
    initializeHeroAnimations();
    initializeSearchForm();
    initializeFeaturedProperties();
    initializeMarketStats();
}

// Hero animations
function initializeHeroAnimations() {
    // Typewriter effect for hero text
    if (typeof Typed !== 'undefined') {
        new Typed('#hero-typed-text', {
            strings: [
                'Find Your Dream Home',
                'Discover Luxury Properties',
                'Your Perfect Investment Awaits'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
    
    // Initialize particle background
    initializeParticleBackground();
}

// Particle background using p5.js
function initializeParticleBackground() {
    if (typeof p5 !== 'undefined') {
        new p5((sketch) => {
            let particles = [];
            
            sketch.setup = () => {
                const canvas = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
                canvas.parent('particle-background');
                canvas.style('position', 'absolute');
                canvas.style('top', '0');
                canvas.style('left', '0');
                canvas.style('z-index', '-1');
                
                // Create particles
                for (let i = 0; i < 50; i++) {
                    particles.push({
                        x: sketch.random(sketch.width),
                        y: sketch.random(sketch.height),
                        vx: sketch.random(-0.5, 0.5),
                        vy: sketch.random(-0.5, 0.5),
                        size: sketch.random(2, 6)
                    });
                }
            };
            
            sketch.draw = () => {
                sketch.clear();
                
                // Update and draw particles
                particles.forEach(particle => {
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    
                    // Wrap around edges
                    if (particle.x < 0) particle.x = sketch.width;
                    if (particle.x > sketch.width) particle.x = 0;
                    if (particle.y < 0) particle.y = sketch.height;
                    if (particle.y > sketch.height) particle.y = 0;
                    
                    // Draw particle
                    sketch.fill(255, 255, 255, 100);
                    sketch.noStroke();
                    sketch.ellipse(particle.x, particle.y, particle.size);
                });
            };
            
            sketch.windowResized = () => {
                sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
            };
        });
    }
}

// Search form functionality
function initializeSearchForm() {
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearch);
    }
    
    // Initialize price range slider
    initializePriceSlider();
}

function handleSearch(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const searchParams = {
        location: formData.get('location'),
        minPrice: formData.get('minPrice'),
        maxPrice: formData.get('maxPrice'),
        propertyType: formData.get('propertyType'),
        bedrooms: formData.get('bedrooms')
    };
    
    // Store search parameters and redirect to listings page
    localStorage.setItem('searchParams', JSON.stringify(searchParams));
    window.location.href = 'listings.html';
}

function initializePriceSlider() {
    const minPriceSlider = document.getElementById('min-price');
    const maxPriceSlider = document.getElementById('max-price');
    const minPriceDisplay = document.getElementById('min-price-display');
    const maxPriceDisplay = document.getElementById('max-price-display');
    
    if (minPriceSlider && maxPriceSlider) {
        minPriceSlider.addEventListener('input', (e) => {
            minPriceDisplay.textContent = formatPrice(e.target.value);
        });
        
        maxPriceSlider.addEventListener('input', (e) => {
            maxPriceDisplay.textContent = formatPrice(e.target.value);
        });
    }
}

// Featured properties carousel
function initializeFeaturedProperties() {
    // Check if properties array exists and has data
    if (!properties || properties.length === 0) {
        console.error('Properties array is empty or undefined');
        return;
    }
    
    const featuredProperties = properties.slice(0, 6);
    console.log('Featured properties:', featuredProperties.length, featuredProperties);
    
    const container = document.querySelector('.featured-section .container');
    if (!container) {
        console.warn('Featured section container not found');
        return;
    }
    
    const splideContainer = document.querySelector('#featured-properties');
    const splideList = splideContainer ? splideContainer.querySelector('.splide__list') : null;
    
    // Always render properties first - use grid as primary, carousel as enhancement
    function renderPropertiesGrid() {
        // Check if grid already exists
        let grid = container.querySelector('.property-grid-fallback');
        if (!grid) {
            grid = document.createElement('div');
            grid.className = 'property-grid property-grid-fallback';
            container.insertBefore(grid, splideContainer ? splideContainer : container.querySelector('.section-header').nextSibling);
        }
        
        grid.innerHTML = featuredProperties.map(property => `
            <div class="property-card" data-property-id="${property.id}">
                <div class="property-image">
                    <img src="${property.image}" alt="${property.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'" style="width: 100%; height: 100%; object-fit: cover;">
                    <button class="favorite-btn ${favorites.includes(property.id) ? 'active' : ''}" onclick="toggleFavorite(${property.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                <div class="property-info">
                    <h3>${property.title}</h3>
                    <p class="price">${formatPrice(property.price)}</p>
                    <p class="address">${property.address}</p>
                    <div class="property-specs">
                        <span>${property.bedrooms} beds</span>
                        <span>${property.bathrooms} baths</span>
                        <span>${property.sqft.toLocaleString()} sqft</span>
                    </div>
                    <button class="btn btn-primary" onclick="viewProperty(${property.id})">View Details</button>
                </div>
            </div>
        `).join('');
        
        // Hide splide container if grid is shown
        if (splideContainer) {
            splideContainer.style.display = 'none';
        }
    }
    
    // Render grid immediately
    renderPropertiesGrid();
    
    // Try to initialize carousel as enhancement (optional)
    if (splideContainer && splideList) {
        // Clear existing content
        splideList.innerHTML = '';
        
        // Add properties to the list
        featuredProperties.forEach(property => {
            const li = document.createElement('li');
            li.className = 'splide__slide';
            li.innerHTML = `
                <div class="property-card" data-property-id="${property.id}">
                    <div class="property-image">
                        <img src="${property.image}" alt="${property.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'" style="width: 100%; height: 100%; object-fit: cover;">
                        <button class="favorite-btn ${favorites.includes(property.id) ? 'active' : ''}" onclick="toggleFavorite(${property.id})">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                    <div class="property-info">
                        <h3>${property.title}</h3>
                        <p class="price">${formatPrice(property.price)}</p>
                        <p class="address">${property.address}</p>
                        <div class="property-specs">
                            <span>${property.bedrooms} beds</span>
                            <span>${property.bathrooms} baths</span>
                            <span>${property.sqft.toLocaleString()} sqft</span>
                        </div>
                        <button class="btn btn-primary" onclick="viewProperty(${property.id})">View Details</button>
                    </div>
                </div>
            `;
            splideList.appendChild(li);
        });
        
        // Initialize carousel after content is added and Splide is loaded
        function initCarousel() {
            if (typeof Splide !== 'undefined') {
                try {
                    // Destroy existing instance if any
                    if (splideContainer.splideInstance) {
                        splideContainer.splideInstance.destroy();
                    }
                    
                    const splide = new Splide('#featured-properties', {
                        type: 'loop',
                        perPage: 3,
                        perMove: 1,
                        gap: '2rem',
                        autoplay: true,
                        interval: 4000,
                        pagination: true,
                        arrows: true,
                        breakpoints: {
                            768: {
                                perPage: 1
                            },
                            1024: {
                                perPage: 2
                            }
                        }
                    });
                    
                    splide.mount();
                    splideContainer.splideInstance = splide;
                    
                    // Show carousel and hide grid if carousel works
                    const grid = container.querySelector('.property-grid-fallback');
                    if (grid) {
                        grid.style.display = 'none';
                    }
                    splideContainer.style.display = 'block';
                    console.log('Splide carousel initialized successfully');
                } catch (error) {
                    console.error('Error initializing Splide:', error);
                    // Keep grid visible
                }
            } else {
                // Retry after a delay if Splide isn't loaded yet
                setTimeout(initCarousel, 200);
            }
        }
        
        // Try to initialize carousel
        setTimeout(initCarousel, 100);
        setTimeout(initCarousel, 500);
    }
}

// Market statistics visualization
function initializeMarketStats() {
    const chartContainer = document.getElementById('market-chart');
    if (!chartContainer || typeof echarts === 'undefined') return;
    
    const chart = echarts.init(chartContainer);
    
    const option = {
        title: {
            text: 'Market Trends',
            textStyle: {
                color: '#2D3748',
                fontSize: 24,
                fontWeight: 'bold'
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['Average Price', 'Properties Sold']
        },
        xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
        },
        yAxis: [
            {
                type: 'value',
                name: 'Price ($)',
                axisLabel: {
                    formatter: '${value}K'
                }
            },
            {
                type: 'value',
                name: 'Properties',
                axisLabel: {
                    formatter: '{value}'
                }
            }
        ],
        series: [
            {
                name: 'Average Price',
                type: 'line',
                data: [650, 680, 720, 750, 780, 820],
                smooth: true,
                lineStyle: {
                    color: '#D69E2E',
                    width: 3
                }
            },
            {
                name: 'Properties Sold',
                type: 'bar',
                yAxisIndex: 1,
                data: [45, 52, 48, 58, 62, 55],
                itemStyle: {
                    color: '#68D391'
                }
            }
        ]
    };
    
    chart.setOption(option);
    
    // Resize chart on window resize
    window.addEventListener('resize', () => {
        chart.resize();
    });
}

// Listings page initialization
function initializeListingsPage() {
    loadSearchParams();
    renderPropertyGrid();
    initializeFilters();
    initializeSortOptions();
}

function loadSearchParams() {
    const searchParams = JSON.parse(localStorage.getItem('searchParams'));
    if (searchParams) {
        // Apply search parameters to filters
        applyFilters(searchParams);
        localStorage.removeItem('searchParams');
    }
}

function renderPropertyGrid() {
    const gridContainer = document.getElementById('property-grid');
    if (!gridContainer) return;
    
    // Ensure all properties are shown if no filters are applied
    if (currentProperties.length === 0) {
        currentProperties = [...properties];
    }
    
    gridContainer.innerHTML = currentProperties.map(property => `
        <div class="property-card" data-property-id="${property.id}">
            <div class="property-image">
                <img src="${property.image}" alt="${property.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'">
                <span class="property-type">${property.type}</span>
                <button class="favorite-btn ${favorites.includes(property.id) ? 'active' : ''}" onclick="toggleFavorite(${property.id})">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            <div class="property-info">
                <h3>${property.title}</h3>
                <p class="price">${formatPrice(property.price)}</p>
                <p class="address">${property.address}</p>
                <div class="property-specs">
                    <span>${property.bedrooms} beds</span>
                    <span>${property.bathrooms} baths</span>
                    <span>${property.sqft.toLocaleString()} sqft</span>
                </div>
                <div class="amenities">
                    ${property.amenities.slice(0, 3).map(amenity => `
                        <span class="amenity-tag">${amenity}</span>
                    `).join('')}
                </div>
                <button class="btn btn-primary" onclick="viewProperty(${property.id})">View Details</button>
            </div>
        </div>
    `).join('');
    
    // Animate property cards
    animatePropertyCards();
}

function initializeFilters() {
    const filterForm = document.getElementById('filter-form');
    if (filterForm) {
        filterForm.addEventListener('change', handleFilterChange);
    }
    
    // Initialize price range sliders
    const minPriceFilter = document.getElementById('min-price-filter');
    const maxPriceFilter = document.getElementById('max-price-filter');
    const minPriceFilterDisplay = document.getElementById('min-price-filter-display');
    const maxPriceFilterDisplay = document.getElementById('max-price-filter-display');
    
    if (minPriceFilter && maxPriceFilter) {
        minPriceFilter.addEventListener('input', (e) => {
            minPriceFilterDisplay.textContent = formatPrice(e.target.value);
            handleFilterChange();
        });
        
        maxPriceFilter.addEventListener('input', (e) => {
            maxPriceFilterDisplay.textContent = formatPrice(e.target.value);
            handleFilterChange();
        });
    }
}

function handleFilterChange() {
    const filterForm = document.getElementById('filter-form');
    if (!filterForm) return;
    
    const formData = new FormData(filterForm);
    const propertyTypes = formData.getAll('propertyType');
    const minPrice = document.getElementById('min-price-filter')?.value;
    const maxPrice = document.getElementById('max-price-filter')?.value;
    const bedrooms = formData.get('bedrooms');
    const bathrooms = formData.get('bathrooms');
    
    const filters = {
        propertyType: propertyTypes,
        minPrice: minPrice || 0,
        maxPrice: maxPrice || 5000000,
        bedrooms: bedrooms,
        bathrooms: bathrooms
    };
    
    applyFilters(filters);
}

function applyFilters(filters) {
    // If no filters provided, show all properties
    if (!filters) {
        currentProperties = [...properties];
        renderPropertyGrid();
        updateResultsCount();
        return;
    }
    
    const minPrice = parseInt(filters.minPrice) || 0;
    const maxPrice = parseInt(filters.maxPrice) || 5000000;
    const hasPropertyTypeFilter = filters.propertyType && filters.propertyType.length > 0;
    const hasBedroomFilter = filters.bedrooms && filters.bedrooms !== '';
    const hasBathroomFilter = filters.bathrooms && filters.bathrooms !== '';
    const hasPriceFilter = minPrice > 0 || maxPrice < 5000000;
    
    // If no active filters, show all properties
    if (!hasPropertyTypeFilter && !hasPriceFilter && !hasBedroomFilter && !hasBathroomFilter) {
        currentProperties = [...properties];
        renderPropertyGrid();
        updateResultsCount();
        return;
    }
    
    currentProperties = properties.filter(property => {
        // Property type filter
        if (hasPropertyTypeFilter && !filters.propertyType.includes(property.type)) {
            return false;
        }
        
        // Price range filter
        if (hasPriceFilter && (property.price < minPrice || property.price > maxPrice)) {
            return false;
        }
        
        // Bedrooms filter
        if (hasBedroomFilter && property.bedrooms < parseInt(filters.bedrooms)) {
            return false;
        }
        
        // Bathrooms filter
        if (hasBathroomFilter && property.bathrooms < parseFloat(filters.bathrooms)) {
            return false;
        }
        
        return true;
    });
    
    renderPropertyGrid();
    updateResultsCount();
}

function initializeSortOptions() {
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSortChange);
    }
}

function handleSortChange(e) {
    const sortBy = e.target.value;
    
    switch(sortBy) {
        case 'price-low':
            currentProperties.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            currentProperties.sort((a, b) => b.price - a.price);
            break;
        case 'sqft':
            currentProperties.sort((a, b) => b.sqft - a.sqft);
            break;
        case 'newest':
            currentProperties.sort((a, b) => b.id - a.id);
            break;
    }
    
    renderPropertyGrid();
}

// Map page initialization
function initializeMapPage() {
    initializeMap();
    initializeMapFilters();
}

function initializeMap() {
    if (typeof L === 'undefined') return;
    
    // Initialize Leaflet map
    map = L.map('property-map').setView([34.0522, -118.2437], 10);
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add property markers
    addMapMarkers();
}

function addMapMarkers() {
    if (!map) return;
    
    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    // Add new markers
    currentProperties.forEach(property => {
        const marker = L.marker([property.lat, property.lng])
            .addTo(map)
            .bindPopup(`
                <div class="map-popup">
                    <img src="${property.image}" alt="${property.title}">
                    <h3>${property.title}</h3>
                    <p class="price">${formatPrice(property.price)}</p>
                    <p class="address">${property.address}</p>
                    <button class="btn btn-primary" onclick="viewProperty(${property.id})">View Details</button>
                </div>
            `);
        
        markers.push(marker);
    });
}

function initializeMapFilters() {
    // Reuse filter functionality from listings page
    initializeFilters();
}

// Contact page initialization
function initializeContactPage() {
    initializeContactForm();
    initializeAgentProfiles();
}

function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Multi-step form functionality
    const nextBtns = document.querySelectorAll('.next-step');
    const prevBtns = document.querySelectorAll('.prev-step');
    
    nextBtns.forEach(btn => {
        btn.addEventListener('click', nextStep);
    });
    
    prevBtns.forEach(btn => {
        btn.addEventListener('click', prevStep);
    });
}

// Contact form step management - use window object to avoid conflicts
if (typeof window.contactFormStep === 'undefined') {
    window.contactFormStep = 1;
}
const totalSteps = 3;

function nextStep() {
    if (window.contactFormStep < totalSteps) {
        const currentStepEl = document.getElementById(`step-${window.contactFormStep}`);
        if (currentStepEl) {
            currentStepEl.classList.remove('active');
        }
        window.contactFormStep++;
        const nextStepEl = document.getElementById(`step-${window.contactFormStep}`);
        if (nextStepEl) {
            nextStepEl.classList.add('active');
        }
        updateProgressBar();
    }
}

function prevStep() {
    if (window.contactFormStep > 1) {
        const currentStepEl = document.getElementById(`step-${window.contactFormStep}`);
        if (currentStepEl) {
            currentStepEl.classList.remove('active');
        }
        window.contactFormStep--;
        const prevStepEl = document.getElementById(`step-${window.contactFormStep}`);
        if (prevStepEl) {
            prevStepEl.classList.add('active');
        }
        updateProgressBar();
    }
}

function updateProgressBar() {
    const progress = (window.contactFormStep / totalSteps) * 100;
    const progressBar = document.querySelector('.progress-fill') || document.getElementById('progress-fill');
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    // Show success message
    showSuccessMessage();
}

function showSuccessMessage() {
    const successModal = document.createElement('div');
    successModal.className = 'modal-overlay';
    successModal.innerHTML = `
        <div class="modal-content success-modal">
            <div class="success-animation">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2>Thank You!</h2>
            <p>Your message has been sent successfully. We'll get back to you soon.</p>
            <button class="btn btn-primary" onclick="closeModal()">Close</button>
        </div>
    `;
    
    document.body.appendChild(successModal);
    
    // Animate success
    if (typeof anime !== 'undefined') {
        anime({
            targets: '.success-animation i',
            scale: [0, 1.2, 1],
            duration: 800,
            easing: 'easeOutElastic(1, .8)'
        });
    }
}

function initializeAgentProfiles() {
    const agentsContainer = document.getElementById('agents-container');
    if (!agentsContainer) return;
    
    const agents = [
        {
            name: "Sarah Johnson",
            title: "Senior Real Estate Agent",
            phone: "(555) 123-4567",
            email: "sarah@luxuryrealty.com",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
            specialties: ["Luxury Homes", "Waterfront Properties"]
        },
        {
            name: "Michael Chen",
            title: "Real Estate Specialist",
            phone: "(555) 234-5678",
            email: "michael@luxuryrealty.com",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
            specialties: ["Condos", "Investment Properties"]
        },
        {
            name: "Emily Rodriguez",
            title: "Licensed Real Estate Agent",
            phone: "(555) 345-6789",
            email: "emily@luxuryrealty.com",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
            specialties: ["Family Homes", "First-Time Buyers"]
        }
    ];
    
    agentsContainer.innerHTML = agents.map(agent => `
        <div class="agent-card">
            <img src="${agent.image}" alt="${agent.name}" class="agent-photo">
            <div class="agent-info">
                <h3>${agent.name}</h3>
                <p class="agent-title">${agent.title}</p>
                <p class="agent-phone">${agent.phone}</p>
                <p class="agent-email">${agent.email}</p>
                <div class="agent-specialties">
                    ${agent.specialties.map(specialty => `
                        <span class="specialty-tag">${specialty}</span>
                    `).join('')}
                </div>
                <button class="btn btn-outline" onclick="contactAgent('${agent.email}')">Contact Agent</button>
            </div>
        </div>
    `).join('');
}

// Blog page initialization
function initializeBlogPage() {
    renderBlogArticles();
    initializeBlogSearch();
    initializeBlogFilters();
}

function renderBlogArticles() {
    const articlesContainer = document.getElementById('blog-articles');
    if (!articlesContainer) return;
    
    articlesContainer.innerHTML = blogArticles.map(article => `
        <article class="blog-card">
            <div class="blog-image">
                <img src="${article.image}" alt="${article.title}" loading="lazy">
                <span class="blog-category">${article.category}</span>
            </div>
            <div class="blog-content">
                <h2>${article.title}</h2>
                <div class="blog-meta">
                    <span class="blog-date">${formatDate(article.date)}</span>
                    <span class="blog-read-time">${article.readTime}</span>
                </div>
                <p class="blog-excerpt">${article.excerpt}</p>
                <button class="btn btn-primary" onclick="readArticle(${article.id})">Read More</button>
            </div>
        </article>
    `).join('');
}

function initializeBlogSearch() {
    const searchInput = document.getElementById('blog-search');
    if (searchInput) {
        searchInput.addEventListener('input', handleBlogSearch);
    }
}

function handleBlogSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredArticles = blogArticles.filter(article => 
        article.title.toLowerCase().includes(searchTerm) ||
        article.excerpt.toLowerCase().includes(searchTerm) ||
        article.category.toLowerCase().includes(searchTerm)
    );
    
    renderFilteredBlogArticles(filteredArticles);
}

function initializeBlogFilters() {
    const categoryFilters = document.querySelectorAll('.category-filter');
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', handleCategoryFilter);
    });
}

function handleCategoryFilter(e) {
    const category = e.target.dataset.category;
    const filteredArticles = category === 'all' 
        ? blogArticles 
        : blogArticles.filter(article => article.category === category);
    
    renderFilteredBlogArticles(filteredArticles);
    
    // Update active filter
    document.querySelectorAll('.category-filter').forEach(f => f.classList.remove('active'));
    e.target.classList.add('active');
}

function renderFilteredBlogArticles(articles) {
    const articlesContainer = document.getElementById('blog-articles');
    if (!articlesContainer) return;
    
    articlesContainer.innerHTML = articles.map(article => `
        <article class="blog-card">
            <div class="blog-image">
                <img src="${article.image}" alt="${article.title}" loading="lazy">
                <span class="blog-category">${article.category}</span>
            </div>
            <div class="blog-content">
                <h2>${article.title}</h2>
                <div class="blog-meta">
                    <span class="blog-date">${formatDate(article.date)}</span>
                    <span class="blog-read-time">${article.readTime}</span>
                </div>
                <p class="blog-excerpt">${article.excerpt}</p>
                <button class="btn btn-primary" onclick="readArticle(${article.id})">Read More</button>
            </div>
        </article>
    `).join('');
}

// Animation functions
function initializeAnimations() {
    // Scroll animations removed per user request
    // All fade-in elements are visible immediately
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
}

function initializeScrollEffects() {
    // Scroll animations removed per user request
    // All elements are visible immediately
    document.querySelectorAll('.scroll-animate').forEach(el => {
        el.classList.add('animate-in');
    });
}

function animatePropertyCards() {
    // Scroll animations removed per user request
    // Property cards are visible immediately
    document.querySelectorAll('.property-card').forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });
}

// Utility functions
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function toggleFavorite(propertyId) {
    const index = favorites.indexOf(propertyId);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(propertyId);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // Update favorite button
    const favoriteBtn = document.querySelector(`[data-property-id="${propertyId}"] .favorite-btn`);
    if (favoriteBtn) {
        favoriteBtn.classList.toggle('active');
    }
}

function viewProperty(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;
    
    // Create property detail modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content property-modal">
            <button class="modal-close" onclick="closeModal()">&times;</button>
            <div class="property-detail">
                <div class="property-gallery">
                    ${property.images.map(img => `
                        <img src="${img}" alt="${property.title}" loading="lazy">
                    `).join('')}
                </div>
                <div class="property-info">
                    <h2>${property.title}</h2>
                    <p class="price">${formatPrice(property.price)}</p>
                    <p class="address">${property.address}</p>
                    <div class="property-specs">
                        <span>${property.bedrooms} beds</span>
                        <span>${property.bathrooms} baths</span>
                        <span>${property.sqft.toLocaleString()} sqft</span>
                    </div>
                    <div class="amenities">
                        <h4>Amenities</h4>
                        ${property.amenities.map(amenity => `
                            <span class="amenity-tag">${amenity}</span>
                        `).join('')}
                    </div>
                    <p class="description">${property.description}</p>
                    <div class="agent-info">
                        <h4>Contact Agent</h4>
                        <p><strong>${property.agent}</strong></p>
                        <p>${property.agentPhone}</p>
                        <p>${property.agentEmail}</p>
                        <button class="btn btn-primary" onclick="contactAgent('${property.agentEmail}')">Contact Now</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Initialize image gallery
    if (typeof Splide !== 'undefined') {
        new Splide('.property-gallery', {
            type: 'fade',
            autoplay: true,
            interval: 3000
        }).mount();
    }
}

function contactAgent(agentEmail) {
    window.location.href = `mailto:${agentEmail}?subject=Property Inquiry`;
}

function readArticle(articleId) {
    const article = blogArticles.find(a => a.id === articleId);
    if (!article) return;
    
    // Create article modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content article-modal">
            <button class="modal-close" onclick="closeModal()">&times;</button>
            <article class="full-article">
                <img src="${article.image}" alt="${article.title}" class="article-hero">
                <div class="article-content">
                    <span class="article-category">${article.category}</span>
                    <h1>${article.title}</h1>
                    <div class="article-meta">
                        <span class="article-date">${formatDate(article.date)}</span>
                        <span class="article-read-time">${article.readTime}</span>
                    </div>
                    <div class="article-body">
                        <p>${article.content}</p>
                    </div>
                    <div class="social-share">
                        <h4>Share this article</h4>
                        <div class="share-buttons">
                            <button class="share-btn facebook" onclick="shareArticle('facebook', ${article.id})">
                                <i class="fab fa-facebook"></i>
                            </button>
                            <button class="share-btn twitter" onclick="shareArticle('twitter', ${article.id})">
                                <i class="fab fa-twitter"></i>
                            </button>
                            <button class="share-btn linkedin" onclick="shareArticle('linkedin', ${article.id})">
                                <i class="fab fa-linkedin"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function shareArticle(platform, articleId) {
    const article = blogArticles.find(a => a.id === articleId);
    if (!article) return;
    
    const url = `${window.location.origin}/blog.html#article-${articleId}`;
    const text = `Check out this article: ${article.title}`;
    
    let shareUrl;
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

function updateResultsCount() {
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
        resultsCount.textContent = `${currentProperties.length} properties found`;
    }
}

// Initialize favorites on page load
function initializeFavorites() {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(btn => {
        const propertyId = parseInt(btn.closest('.property-card')?.dataset.propertyId);
        if (propertyId && favorites.includes(propertyId)) {
            btn.classList.add('active');
        }
    });
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        closeModal();
    }
});

// Keyboard navigation for modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});