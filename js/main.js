// MRM Advocates LLP - Premium JavaScript Functionality
// ================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS Animation Library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 50
    });

    // Navigation Functionality
    initializeNavigation();
    
    // Testimonials Slider
    initializeTestimonials();
    
    // Services Navigation (for services page)
    initializeServicesNav();
    
    // Contact Form
    initializeContactForm();
    
    // FAQ Functionality
    initializeFAQ();
    
    // Smooth Scrolling
    initializeSmoothScroll();
    
    // Navbar Scroll Effect
    initializeNavbarScroll();
    
    // Loading Animation
    initializePageLoad();
});

// Navigation Functionality
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Testimonials Slider Functionality
function initializeTestimonials() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    if (testimonialCards.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = testimonialCards.length;
    
    // Function to show specific slide
    function showSlide(index) {
        // Hide all slides
        testimonialCards.forEach(card => {
            card.classList.remove('active');
        });
        
        // Remove active from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide
        if (testimonialCards[index]) {
            testimonialCards[index].classList.add('active');
        }
        
        // Activate current dot
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
    }
    
    // Next slide function
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Previous slide function
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // Auto-play testimonials
    setInterval(nextSlide, 6000); // Change slide every 6 seconds
    
    // Initialize first slide
    showSlide(0);
}

// Services Navigation (for services page)
function initializeServicesNav() {
    const serviceNavBtns = document.querySelectorAll('.service-nav-btn');
    const serviceSections = document.querySelectorAll('.service-section');
    
    if (serviceNavBtns.length === 0) return;
    
    serviceNavBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetService = this.dataset.service;
            
            // Remove active class from all buttons
            serviceNavBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all service sections
            serviceSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target service section
            const targetSection = document.getElementById(targetService);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Handle URL hash navigation
    function handleHashNavigation() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const targetBtn = document.querySelector(`[data-service="${hash}"]`);
            if (targetBtn) {
                targetBtn.click();
            }
        }
    }
    
    // Check hash on page load
    handleHashNavigation();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashNavigation);
}

// Contact Form Functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Validate required fields
        const requiredFields = ['firstName', 'lastName', 'email', 'service', 'subject', 'message'];
        let isValid = true;
        
        requiredFields.forEach(field => {
            const input = contactForm.querySelector(`[name="${field}"]`);
            if (!data[field] || data[field].trim() === '') {
                showFieldError(input, 'This field is required');
                isValid = false;
            } else {
                clearFieldError(input);
            }
        });
        
        // Validate email
        if (data.email && !isValidEmail(data.email)) {
            const emailInput = contactForm.querySelector('[name="email"]');
            showFieldError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Check consent checkbox
        if (!data.consent) {
            const consentInput = contactForm.querySelector('[name="consent"]');
            showFieldError(consentInput, 'You must agree to the privacy policy');
            isValid = false;
        }
        
        if (isValid) {
            // Simulate form submission
            showFormSuccess();
            
            // In a real application, you would send the data to your server
            console.log('Form submitted with data:', data);
            
            // Reset form after successful submission
            setTimeout(() => {
                contactForm.reset();
                hideFormMessages();
            }, 3000);
        }
    });
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

// Form validation helper functions
function validateField(field) {
    const value = field.value.trim();
    const isRequired = field.hasAttribute('required');
    
    if (isRequired && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    clearFieldError(field);
    return true;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = '#e53e3e';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#e53e3e';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.style.borderColor = '';
    
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormSuccess() {
    // Remove any existing messages
    hideFormMessages();
    
    const contactForm = document.getElementById('contactForm');
    const successDiv = document.createElement('div');
    successDiv.id = 'form-success';
    successDiv.className = 'form-message success';
    successDiv.innerHTML = `
        <div style="background: #48bb78; color: white; padding: 1rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
            <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
            Thank you for your message! We'll get back to you within 24 hours.
        </div>
    `;
    
    contactForm.parentNode.insertBefore(successDiv, contactForm);
}

function hideFormMessages() {
    const existingMessage = document.getElementById('form-success');
    if (existingMessage) {
        existingMessage.remove();
    }
}

// FAQ Functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                // Close other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
}

// Smooth Scrolling for Anchor Links
function initializeSmoothScroll() {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const offsetTop = targetElement.offsetTop - 100; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar Scroll Effect
function initializeNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    if (!navbar) return;
    
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        // Hide navbar when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Page Load Animation
function initializePageLoad() {
    // Add loaded class to body after page loads
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger AOS refresh to ensure animations work
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    });
    
    // Preload critical images
    preloadImages([
        'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ]);
}

// Utility function to preload images
function preloadImages(imageUrls) {
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Utility function for debouncing
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

// Stats Counter Animation (for hero stats)
function initializeStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const number = parseInt(text.replace(/\D/g, ''));
    const suffix = text.replace(/\d/g, '');
    
    let current = 0;
    const increment = number / 50; // Animation duration
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= number) {
            element.textContent = number + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 40); // Update every 40ms
}

// Initialize stats counter after DOM load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeStatsCounter, 1000); // Delay to ensure AOS animations complete
});

// Enhanced scroll-triggered animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-scroll-animate]');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Call scroll animations on page load
document.addEventListener('DOMContentLoaded', initializeScrollAnimations);

// Enhanced mobile navigation with gesture support
function enhanceMobileNav() {
    const navMenu = document.getElementById('nav-menu');
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    if (!navMenu) return;
    
    // Touch events for swipe-to-close
    navMenu.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    navMenu.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        
        currentX = e.touches[0].clientX;
        const diffX = startX - currentX;
        
        // If swiping left significantly, close menu
        if (diffX > 50) {
            const hamburger = document.getElementById('hamburger');
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    navMenu.addEventListener('touchend', function() {
        isDragging = false;
    });
}

// Initialize enhanced mobile navigation
document.addEventListener('DOMContentLoaded', enhanceMobileNav);

// Performance optimization: Lazy load non-critical images
function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// Add keyboard navigation support
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape') {
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');
            
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
        
        // Arrow keys for testimonial navigation
        if (e.key === 'ArrowLeft') {
            const prevBtn = document.querySelector('.prev-btn');
            if (prevBtn) prevBtn.click();
        }
        
        if (e.key === 'ArrowRight') {
            const nextBtn = document.querySelector('.next-btn');
            if (nextBtn) nextBtn.click();
        }
    });
}

// Initialize keyboard navigation
document.addEventListener('DOMContentLoaded', initializeKeyboardNavigation);

// Add loading states for better UX
function showLoading(element) {
    element.style.opacity = '0.6';
    element.style.pointerEvents = 'none';
    
    // Add loading spinner if it doesn't exist
    if (!element.querySelector('.loading-spinner')) {
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        spinner.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        spinner.style.position = 'absolute';
        spinner.style.top = '50%';
        spinner.style.left = '50%';
        spinner.style.transform = 'translate(-50%, -50%)';
        spinner.style.fontSize = '1.5rem';
        spinner.style.color = 'var(--primary-color)';
        
        element.style.position = 'relative';
        element.appendChild(spinner);
    }
}

function hideLoading(element) {
    element.style.opacity = '';
    element.style.pointerEvents = '';
    
    const spinner = element.querySelector('.loading-spinner');
    if (spinner) {
        spinner.remove();
    }
}

// Export functions for potential external use
window.MRMAdvocates = {
    showLoading,
    hideLoading,
    debounce,
    preloadImages
};