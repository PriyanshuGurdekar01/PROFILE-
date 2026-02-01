// ===== PORTFOLIO JAVASCRIPT - SYSTEMATIC ORGANIZATION =====

// ===== GLOBAL VARIABLES =====
const CONFIG = {
    TYPING_SPEED: 100,
    DELETE_SPEED: 50,
    PAUSE_DURATION: 2000,
    LOADING_DURATION: 2000,
    SCROLL_THRESHOLD: 100,
    ANIMATION_DELAY: 100
};

const TYPING_TEXTS = [
    'Computer Science Student',
    'Web Developer',
    'Frontend Developer', 
    'Problem Solver',
    'Tech Enthusiast'
];

// DOM Elements
const DOM = {
    loadingScreen: null,
    navbar: null,
    navMenu: null,
    hamburger: null,
    themeToggle: null,
    typingText: null,
    backToTop: null,
    contactForm: null,
    filterBtns: null,
    projectCards: null,
    statNumbers: null,
    skillBars: null,
    navLinks: null
};

// State Management
const STATE = {
    currentTypingIndex: 0,
    currentCharIndex: 0,
    isDeleting: false,
    isDarkMode: true,
    isMenuOpen: false,
    hasAnimated: {
        stats: false,
        skills: false
    }
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', initializePortfolio);

function initializePortfolio() {
    console.log('🚀 Initializing Priyanshu\'s Portfolio...');
    
    // Cache DOM elements
    cacheDOMElements();
    
    // Initialize all modules
    initializeLoading();
    initializeNavigation();
    initializeTypingAnimation();
    initializeScrollEffects();
    initializeTheme();
    initializeAnimations();
    initializeProjects();
    initializeContactForm();
    initializeBackToTop();
    initializeProfileImage(); // Add profile image handling
    
    console.log('✅ Portfolio initialized successfully!');
}

// ===== PROFILE IMAGE HANDLING =====
function initializeProfileImage() {
    const profileImg = document.querySelector('.profile-img');
    if (!profileImg) return;
    
    profileImg.addEventListener('load', function() {
        console.log('✅ Profile image loaded successfully');
        this.style.opacity = '1';
    });
    
    profileImg.addEventListener('error', function() {
        console.log('❌ Profile image failed to load, showing fallback');
        // Create fallback placeholder
        const placeholder = document.createElement('div');
        placeholder.className = 'image-placeholder';
        placeholder.innerHTML = '<i class="fas fa-user-graduate"></i>';
        
        // Replace image with placeholder
        this.parentNode.replaceChild(placeholder, this);
    });
    
    // Set initial opacity to 0 for smooth loading
    profileImg.style.opacity = '0';
    profileImg.style.transition = 'opacity 0.5s ease';
}

function cacheDOMElements() {
    DOM.loadingScreen = document.getElementById('loading-screen');
    DOM.navbar = document.getElementById('navbar');
    DOM.navMenu = document.querySelector('.nav-menu');
    DOM.hamburger = document.querySelector('.hamburger');
    DOM.themeToggle = document.querySelector('.theme-toggle');
    DOM.typingText = document.getElementById('typing-text');
    DOM.backToTop = document.getElementById('backToTop');
    DOM.contactForm = document.getElementById('contactForm');
    DOM.filterBtns = document.querySelectorAll('.filter-btn');
    DOM.projectCards = document.querySelectorAll('.project-card');
    DOM.statNumbers = document.querySelectorAll('.stat-number');
    DOM.skillBars = document.querySelectorAll('.skill-progress');
    DOM.navLinks = document.querySelectorAll('.nav-link');
}

// ===== LOADING SCREEN MODULE =====
function initializeLoading() {
    if (!DOM.loadingScreen) return;
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            DOM.loadingScreen.style.opacity = '0';
            setTimeout(() => {
                DOM.loadingScreen.style.display = 'none';
            }, 500);
        }, CONFIG.LOADING_DURATION);
    });
}

// ===== NAVIGATION MODULE =====
function initializeNavigation() {
    if (!DOM.navbar || !DOM.hamburger || !DOM.navMenu) return;
    
    // Scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Mobile menu toggle
    DOM.hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking nav links
    DOM.navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Smooth scrolling and active link updates
    DOM.navLinks.forEach(link => {
        link.addEventListener('click', handleNavLinkClick);
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function handleNavbarScroll() {
    if (window.scrollY > CONFIG.SCROLL_THRESHOLD) {
        DOM.navbar.classList.add('scrolled');
    } else {
        DOM.navbar.classList.remove('scrolled');
    }
}

function toggleMobileMenu() {
    STATE.isMenuOpen = !STATE.isMenuOpen;
    DOM.navMenu.classList.toggle('active');
    DOM.hamburger.classList.toggle('active');
}

function closeMobileMenu() {
    STATE.isMenuOpen = false;
    DOM.navMenu.classList.remove('active');
    DOM.hamburger.classList.remove('active');
}

function handleNavLinkClick(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
    
    closeMobileMenu();
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            DOM.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== TYPING ANIMATION MODULE =====
function initializeTypingAnimation() {
    if (!DOM.typingText) return;
    
    setTimeout(startTypingAnimation, CONFIG.LOADING_DURATION + 500);
}

function startTypingAnimation() {
    const currentText = TYPING_TEXTS[STATE.currentTypingIndex];
    
    if (STATE.isDeleting) {
        DOM.typingText.textContent = currentText.substring(0, STATE.currentCharIndex - 1);
        STATE.currentCharIndex--;
    } else {
        DOM.typingText.textContent = currentText.substring(0, STATE.currentCharIndex + 1);
        STATE.currentCharIndex++;
    }
    
    let typeSpeed = STATE.isDeleting ? CONFIG.DELETE_SPEED : CONFIG.TYPING_SPEED;
    
    if (!STATE.isDeleting && STATE.currentCharIndex === currentText.length) {
        typeSpeed = CONFIG.PAUSE_DURATION;
        STATE.isDeleting = true;
    } else if (STATE.isDeleting && STATE.currentCharIndex === 0) {
        STATE.isDeleting = false;
        STATE.currentTypingIndex = (STATE.currentTypingIndex + 1) % TYPING_TEXTS.length;
        typeSpeed = 500;
    }
    
    setTimeout(startTypingAnimation, typeSpeed);
}

// ===== THEME MODULE =====
function initializeTheme() {
    if (!DOM.themeToggle) return;
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        STATE.isDarkMode = false;
        document.body.classList.add('light-theme');
        DOM.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    DOM.themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    STATE.isDarkMode = !STATE.isDarkMode;
    
    if (STATE.isDarkMode) {
        document.body.classList.remove('light-theme');
        DOM.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.add('light-theme');
        DOM.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
}

// ===== SCROLL EFFECTS MODULE =====
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.about-content, .timeline-item, .skills-category, .project-card, .contact-card'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger specific animations
            if (entry.target.closest('.about') && !STATE.hasAnimated.stats) {
                STATE.hasAnimated.stats = true;
                animateCounters();
            }
            
            if (entry.target.closest('.skills') && !STATE.hasAnimated.skills) {
                STATE.hasAnimated.skills = true;
                setTimeout(animateSkillBars, 500);
            }
        }
    });
}

// ===== ANIMATIONS MODULE =====
function initializeAnimations() {
    // Add entrance animations to elements
    const elements = document.querySelectorAll('section > *');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * CONFIG.ANIMATION_DELAY);
    });
}

function animateCounters() {
    DOM.statNumbers.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

function animateSkillBars() {
    DOM.skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
}

// ===== PROJECTS MODULE =====
function initializeProjects() {
    if (!DOM.filterBtns.length || !DOM.projectCards.length) return;
    
    DOM.filterBtns.forEach(btn => {
        btn.addEventListener('click', handleProjectFilter);
    });
}

function handleProjectFilter(e) {
    const filterValue = e.target.getAttribute('data-filter');
    
    // Update active filter button
    DOM.filterBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // Filter projects
    DOM.projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
            showProjectCard(card);
        } else {
            hideProjectCard(card);
        }
    });
}

function showProjectCard(card) {
    card.style.display = 'block';
    setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
    }, 100);
}

function hideProjectCard(card) {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.8)';
    setTimeout(() => {
        card.style.display = 'none';
    }, 300);
}

// ===== CONTACT FORM MODULE =====
function initializeContactForm() {
    if (!DOM.contactForm) return;
    
    DOM.contactForm.addEventListener('submit', handleFormSubmission);
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(DOM.contactForm);
    const data = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Validate form
    if (!validateForm(data)) return;
    
    // Simulate form submission
    submitForm(data);
}

function validateForm(data) {
    if (!data.fullName || !data.email || !data.subject || !data.message) {
        showNotification('Please fill in all required fields', 'error');
        return false;
    }
    
    if (!isValidEmail(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function submitForm(data) {
    const submitBtn = DOM.contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        DOM.contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    const notification = createNotificationElement(message, type);
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            removeNotification(notification);
        }
    }, 5000);
}

function createNotificationElement(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const colors = {
        success: '#4caf50',
        error: '#f44336',
        info: '#2196f3'
    };
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${icons[type]}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => removeNotification(notification));
    
    return notification;
}

function removeNotification(notification) {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => notification.remove(), 300);
}

// ===== BACK TO TOP MODULE =====
function initializeBackToTop() {
    if (!DOM.backToTop) return;
    
    window.addEventListener('scroll', handleBackToTopVisibility);
    DOM.backToTop.addEventListener('click', scrollToTop);
}

function handleBackToTopVisibility() {
    if (window.scrollY > 300) {
        DOM.backToTop.classList.add('show');
    } else {
        DOM.backToTop.classList.remove('show');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', handleKeyboardNavigation);

function handleKeyboardNavigation(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape' && STATE.isMenuOpen) {
        closeMobileMenu();
    }
    
    // Enter or Space on hamburger
    if ((e.key === 'Enter' || e.key === ' ') && e.target === DOM.hamburger) {
        e.preventDefault();
        toggleMobileMenu();
    }
}

// ===== PERFORMANCE OPTIMIZATION =====
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    updateActiveNavLink();
    handleBackToTopVisibility();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// ===== ACCESSIBILITY IMPROVEMENTS =====
function initializeAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s ease;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initializeAccessibility);

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Could send to error tracking service in production
});

// ===== SERVICE WORKER (PWA) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// ===== CSS ANIMATIONS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        transition: background 0.2s ease;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;
document.head.appendChild(style);

// ===== EXPORT FOR TESTING (if needed) =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CONFIG,
        STATE,
        initializePortfolio,
        toggleTheme,
        showNotification
    };
}