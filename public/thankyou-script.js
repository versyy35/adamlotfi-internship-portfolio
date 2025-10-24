// ============================================
// UTILITY FUNCTIONS
// ============================================

// Request Animation Frame wrapper for smoother animations
function smoothScroll(callback) {
    let ticking = false;
    return function(...args) {
        if (!ticking) {
            requestAnimationFrame(() => {
                callback.apply(this, args);
                ticking = false;
            });
            ticking = true;
        }
    };
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    });
});

// ============================================
// ELEGANT FADE-IN ON SCROLL
// ============================================
const fadeElements = document.querySelectorAll(
    '.intro-message, .thank-message, .memory-highlight, .academic-bridge, .final-words, .dept-card, .photo-frame, .credits-content'
);

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger the fade-in for a more elegant effect
            setTimeout(() => {
                requestAnimationFrame(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    // Clean up observer after animation
                    fadeObserver.unobserve(entry.target);
                });
            }, index * 50); // Small stagger delay
        }
    });
}, { 
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
});

// Set initial state and observe
fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    fadeObserver.observe(element);
});

// ============================================
// PHOTO FRAME HOVER EFFECTS
// ============================================
const photoFrames = document.querySelectorAll('.photo-frame');

photoFrames.forEach((frame) => {
    // Add smooth transitions
    frame.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease, filter 0.3s ease';
    
    frame.addEventListener('mouseenter', function() {
        requestAnimationFrame(() => {
            // Subtle lift and glow effect
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.filter = 'brightness(1.1)';
            this.style.boxShadow = '0 12px 40px rgba(100, 255, 218, 0.3), 0 0 20px rgba(100, 255, 218, 0.2)';
            this.style.zIndex = '10';
        });
    });

    frame.addEventListener('mouseleave', function() {
        requestAnimationFrame(() => {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.filter = 'brightness(1)';
            this.style.boxShadow = '';
            this.style.zIndex = '';
        });
    });
    
    // Prevent image dragging
    const img = frame.querySelector('img');
    if (img) {
        img.draggable = false;
        img.style.userSelect = 'none';
        img.style.pointerEvents = 'none';
    }
});

// ============================================
// CREDITS SECTION HOVER EFFECT
// ============================================
const creditsScroll = document.querySelector('.credits-scroll');
const creditsItems = document.querySelectorAll('.credits-scroll p, .credits-scroll h3');

creditsItems.forEach(item => {
    item.style.transition = 'color 0.3s ease, transform 0.3s ease';
    
    item.addEventListener('mouseenter', function() {
        requestAnimationFrame(() => {
            this.style.color = 'var(--accent, #64ffda)';
            this.style.transform = 'translateX(10px)';
        });
    });
    
    item.addEventListener('mouseleave', function() {
        requestAnimationFrame(() => {
            this.style.color = '';
            this.style.transform = 'translateX(0)';
        });
    });
});

// ============================================
// DEPARTMENT CARDS ELEGANT HOVER
// ============================================
const deptCards = document.querySelectorAll('.dept-card');

deptCards.forEach(card => {
    card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    
    card.addEventListener('mouseenter', function() {
        requestAnimationFrame(() => {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 10px 30px rgba(100, 255, 218, 0.2)';
        });
    });
    
    card.addEventListener('mouseleave', function() {
        requestAnimationFrame(() => {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
});

// ============================================
// SUBTLE PARALLAX FOR STARS
// ============================================
const stars = document.querySelector('.stars');
const stars2 = document.querySelector('.stars2');
const stars3 = document.querySelector('.stars3');

const handleParallax = smoothScroll(() => {
    const scrolled = window.scrollY;
    
    if (stars) stars.style.transform = `translate3d(0, ${scrolled * 0.2}px, 0)`;
    if (stars2) stars2.style.transform = `translate3d(0, ${scrolled * 0.3}px, 0)`;
    if (stars3) stars3.style.transform = `translate3d(0, ${scrolled * 0.4}px, 0)`;
});

window.addEventListener('scroll', handleParallax, { passive: true });

// ============================================
// SMOOTH IMAGE LOADING
// ============================================
const images = document.querySelectorAll('img');

images.forEach(img => {
    if (!img.complete) {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        img.addEventListener('load', function() {
            requestAnimationFrame(() => {
                this.style.opacity = '1';
            });
        });
    }
});

// ============================================
// SECTION HEADING EFFECTS
// ============================================
const headings = document.querySelectorAll('h1, h2, h3');

headings.forEach(heading => {
    heading.style.transition = 'color 0.3s ease';
    
    heading.addEventListener('mouseenter', function() {
        requestAnimationFrame(() => {
            this.style.color = 'var(--accent, #64ffda)';
        });
    });
    
    heading.addEventListener('mouseleave', function() {
        requestAnimationFrame(() => {
            this.style.color = '';
        });
    });
});

// ============================================
// KEYBOARD NAVIGATION
// ============================================
document.addEventListener('keydown', (e) => {
    // Escape key to go back
    if (e.key === 'Escape') {
        const backButton = document.querySelector('.back-home');
        if (backButton) {
            backButton.click();
        }
    }
});

// ============================================
// SMOOTH PAGE LOAD
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';
    
    requestAnimationFrame(() => {
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});

// ============================================
// BUTTON HOVER EFFECTS
// ============================================
const buttons = document.querySelectorAll('button, .back-home, a.button, .btn');

buttons.forEach(button => {
    button.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    
    button.addEventListener('mouseenter', function() {
        requestAnimationFrame(() => {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 5px 20px rgba(100, 255, 218, 0.4)';
        });
    });
    
    button.addEventListener('mouseleave', function() {
        requestAnimationFrame(() => {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '';
        });
    });
});

// ============================================
// RESPECT USER PREFERENCES
// ============================================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable transitions for users who prefer reduced motion
    const style = document.createElement('style');
    style.textContent = `
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// PERFORMANCE: PAUSE EFFECTS WHEN TAB HIDDEN
// ============================================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Remove event listeners when tab is hidden to save resources
        window.removeEventListener('scroll', handleParallax);
    } else {
        // Re-add when visible
        window.addEventListener('scroll', handleParallax, { passive: true });
    }
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c💙 Thank you for checking this page', 'color: #64ffda; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with gratitude and appreciation', 'color: #8892b0; font-size: 12px;');
console.log('%cSimple, elegant, and smooth', 'color: #64ffda; font-size: 10px;');