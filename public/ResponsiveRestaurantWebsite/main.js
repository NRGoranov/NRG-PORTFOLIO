// Belle Époque Restaurant - Main JavaScript File

// Global variables
let currentDate = new Date();
let selectedDate = null;
let selectedTime = null;
let currentImageIndex = 0;
let galleryImages = [];

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeNavigation();
    initializeMenuPage();
    initializeReservationPage();
    initializeGalleryPage();
    initializeTestimonialSlider();
    initializeP5Background();
});

// Animation System
function initializeAnimations() {
    // Scroll animations removed per user request
    // All reveal-text elements are visible immediately
    document.querySelectorAll('.reveal-text').forEach(el => {
        el.classList.add('revealed');
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
}

// Navigation System
function initializeNavigation() {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.md\\:hidden button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            // Mobile menu functionality would go here
            alert('Mobile menu - Coming soon!');
        });
    }
    
    // Smooth scroll for anchor links
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

// Menu Page Functionality
function initializeMenuPage() {
    if (!document.getElementById('menu-search')) return;
    
    // Category tabs
    const categoryTabs = document.querySelectorAll('.category-tab');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active tab
            categoryTabs.forEach(t => {
                t.classList.remove('active');
                t.classList.add('bg-gray-100', 'text-gray-700');
            });
            this.classList.add('active');
            this.classList.remove('bg-gray-100', 'text-gray-700');
            
            // Show/hide categories
            menuCategories.forEach(cat => {
                cat.classList.add('hidden');
            });
            document.getElementById(category).classList.remove('hidden');
            
            // Animate items
            anime({
                targets: `#${category} .menu-item`,
                opacity: [0, 1],
                translateY: [20, 0],
                delay: anime.stagger(100),
                duration: 500,
                easing: 'easeOutCubic'
            });
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('menu-search');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const menuItems = document.querySelectorAll('.menu-item');
        
        menuItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
    
    // Dietary filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active filter
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            const menuItems = document.querySelectorAll('.menu-item');
            menuItems.forEach(item => {
                if (filter === 'all') {
                    item.classList.remove('hidden');
                } else {
                    const tags = item.dataset.tags;
                    if (tags && tags.includes(filter)) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                }
            });
        });
    });
    
    // Add to order buttons
    document.querySelectorAll('.menu-card button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const itemName = this.closest('.menu-card').querySelector('h3').textContent;
            
            // Show confirmation
            this.textContent = 'Added!';
            this.style.background = '#10B981';
            this.style.color = 'white';
            
            setTimeout(() => {
                this.textContent = 'Add to Order';
                this.style.background = '';
                this.style.color = '';
            }, 2000);
        });
    });
}

// Reservation Page Functionality
function initializeReservationPage() {
    if (!document.getElementById('calendar')) return;
    
    initializeCalendar();
    initializeTimeSlots();
    initializeReservationForm();
}

function initializeCalendar() {
    const calendarDays = document.getElementById('calendar-days');
    const calendarMonth = document.getElementById('calendar-month');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    
    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        // Update month display
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        calendarMonth.textContent = `${monthNames[month]} ${year}`;
        
        // Clear previous days
        calendarDays.innerHTML = '';
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();
        
        // Add empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            calendarDays.appendChild(emptyDay);
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day text-center py-2 rounded cursor-pointer';
            dayElement.textContent = day;
            
            const dayDate = new Date(year, month, day);
            
            // Check if day is available (not past, not Monday)
            if (dayDate < today || dayDate.getDay() === 1) {
                dayElement.classList.add('unavailable');
            } else {
                dayElement.classList.add('available');
                dayElement.addEventListener('click', function() {
                    // Remove previous selection
                    document.querySelectorAll('.calendar-day.selected').forEach(d => {
                        d.classList.remove('selected');
                    });
                    
                    // Select this day
                    this.classList.add('selected');
                    selectedDate = new Date(year, month, day);
                    
                    // Show time selection
                    document.getElementById('time-selection').classList.remove('hidden');
                    generateTimeSlots();
                });
            }
            
            calendarDays.appendChild(dayElement);
        }
    }
    
    // Navigation buttons
    prevMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
    
    nextMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
    
    // Initial render
    renderCalendar();
}

function generateTimeSlots() {
    const timeSlotsContainer = document.getElementById('time-slots');
    timeSlotsContainer.innerHTML = '';
    
    const timeSlots = [
        '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM',
        '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM'
    ];
    
    timeSlots.forEach(time => {
        const timeSlot = document.createElement('div');
        timeSlot.className = 'time-slot p-3 text-center rounded-lg border-2 border-gray-200 cursor-pointer';
        timeSlot.textContent = time;
        
        // Randomly make some slots unavailable for demo
        if (Math.random() > 0.7) {
            timeSlot.classList.add('unavailable');
            timeSlot.textContent += ' (Booked)';
        } else {
            timeSlot.addEventListener('click', function() {
                // Remove previous selection
                document.querySelectorAll('.time-slot.selected').forEach(slot => {
                    slot.classList.remove('selected');
                });
                
                // Select this slot
                this.classList.add('selected');
                selectedTime = time;
            });
        }
        
        timeSlotsContainer.appendChild(timeSlot);
    });
}

function initializeReservationForm() {
    const form = document.getElementById('reservation-form');
    const modal = document.getElementById('confirmation-modal');
    const closeModal = document.getElementById('close-modal');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!selectedDate || !selectedTime) {
            alert('Please select a date and time for your reservation.');
            return;
        }
        
        // Get form data
        const formData = {
            partySize: document.getElementById('party-size').value,
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            specialRequests: document.getElementById('special-requests').value,
            date: selectedDate,
            time: selectedTime
        };
        
        // Show confirmation modal
        showReservationConfirmation(formData);
    });
    
    closeModal.addEventListener('click', function() {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    });
    
    // Close modal on backdrop click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    });
}

function showReservationConfirmation(data) {
    const modal = document.getElementById('confirmation-modal');
    const details = document.getElementById('reservation-details');
    
    // Format date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = data.date.toLocaleDateString('en-US', options);
    
    details.innerHTML = `
        <div class="space-y-2">
            <div><strong>Name:</strong> ${data.firstName} ${data.lastName}</div>
            <div><strong>Date:</strong> ${formattedDate}</div>
            <div><strong>Time:</strong> ${data.time}</div>
            <div><strong>Party Size:</strong> ${data.partySize} guests</div>
            <div><strong>Email:</strong> ${data.email}</div>
            <div><strong>Phone:</strong> ${data.phone}</div>
            ${data.specialRequests ? `<div><strong>Special Requests:</strong> ${data.specialRequests}</div>` : ''}
        </div>
    `;
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    // Reset form
    document.getElementById('reservation-form').reset();
    selectedDate = null;
    selectedTime = null;
    document.getElementById('time-selection').classList.add('hidden');
    document.querySelectorAll('.calendar-day.selected, .time-slot.selected').forEach(el => {
        el.classList.remove('selected');
    });
}

// Gallery Page Functionality
function initializeGalleryPage() {
    if (!document.querySelector('.masonry-grid')) return;
    
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active filter
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
            
            // Animate visible items
            const visibleItems = document.querySelectorAll('.gallery-item:not(.hidden)');
            anime({
                targets: visibleItems,
                opacity: [0, 1],
                translateY: [20, 0],
                delay: anime.stagger(50),
                duration: 500,
                easing: 'easeOutCubic'
            });
        });
    });
    
    // Lightbox functionality
    initializeLightbox();
}

function initializeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const closeLightbox = document.getElementById('close-lightbox');
    const prevButton = document.getElementById('prev-image');
    const nextButton = document.getElementById('next-image');
    
    // Collect all gallery images
    galleryImages = Array.from(document.querySelectorAll('.gallery-item img')).map(img => ({
        src: img.src,
        title: img.alt,
        description: img.closest('.gallery-card').querySelector('p').textContent
    }));
    
    // Open lightbox on image click
    document.querySelectorAll('.gallery-card').forEach((card, index) => {
        card.addEventListener('click', function() {
            currentImageIndex = index;
            showLightboxImage(currentImageIndex);
            lightbox.classList.remove('hidden');
            lightbox.classList.add('flex');
        });
    });
    
    // Close lightbox
    closeLightbox.addEventListener('click', function() {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
    });
    
    // Close on backdrop click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.add('hidden');
            lightbox.classList.remove('flex');
        }
    });
    
    // Navigation
    prevButton.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showLightboxImage(currentImageIndex);
    });
    
    nextButton.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showLightboxImage(currentImageIndex);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('flex')) {
            if (e.key === 'Escape') {
                lightbox.classList.add('hidden');
                lightbox.classList.remove('flex');
            } else if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
                showLightboxImage(currentImageIndex);
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
                showLightboxImage(currentImageIndex);
            }
        }
    });
}

function showLightboxImage(index) {
    const image = galleryImages[index];
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    
    lightboxImage.src = image.src;
    lightboxImage.alt = image.title;
    lightboxTitle.textContent = image.title;
    lightboxDescription.textContent = image.description;
}

// Testimonial Slider
function initializeTestimonialSlider() {
    const slider = document.getElementById('testimonial-slider');
    if (!slider) return;
    
    new Splide(slider, {
        type: 'loop',
        autoplay: true,
        interval: 5000,
        pauseOnHover: true,
        arrows: false,
        pagination: true,
        perPage: 1,
        gap: '2rem',
        breakpoints: {
            768: {
                perPage: 1
            }
        }
    }).mount();
}

// P5.js Background Animation
function initializeP5Background() {
    const container = document.getElementById('p5-container');
    if (!container) return;
    
    new p5((p) => {
        let particles = [];
        
        p.setup = function() {
            const canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
            canvas.parent('p5-container');
            canvas.id('p5-canvas');
            
            // Create particles
            for (let i = 0; i < 50; i++) {
                particles.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    size: p.random(2, 6),
                    speedX: p.random(-0.5, 0.5),
                    speedY: p.random(-0.5, 0.5),
                    opacity: p.random(0.1, 0.3)
                });
            }
        };
        
        p.draw = function() {
            p.clear();
            
            // Update and draw particles
            particles.forEach(particle => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = p.width;
                if (particle.x > p.width) particle.x = 0;
                if (particle.y < 0) particle.y = p.height;
                if (particle.y > p.height) particle.y = 0;
                
                // Draw particle
                p.fill(139, 38, 53, particle.opacity * 255);
                p.noStroke();
                p.ellipse(particle.x, particle.y, particle.size);
            });
        };
        
        p.windowResized = function() {
            p.resizeCanvas(container.offsetWidth, container.offsetHeight);
        };
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scroll for reveal animations
window.addEventListener('scroll', debounce(() => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-shapes');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, 10));

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Recalculate any layout-dependent features
    if (typeof p5 !== 'undefined') {
        const container = document.getElementById('p5-container');
        if (container) {
            const canvas = document.getElementById('p5-canvas');
            if (canvas) {
                canvas.style.width = container.offsetWidth + 'px';
                canvas.style.height = container.offsetHeight + 'px';
            }
        }
    }
}, 250));