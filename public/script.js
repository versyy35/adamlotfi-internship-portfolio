// ============================================
// SMOOTH SCROLL FOR NAVIGATION
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});

// ============================================
// NAVBAR BACKGROUND ON SCROLL
// ============================================
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.5)";
    } else {
        navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.3)";
    }
});

// ============================================
// TIMELINE ANIMATION ON SCROLL
// ============================================
const timelineItems = document.querySelectorAll(".timeline-item");
const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, observerOptions);

timelineItems.forEach((item) => {
    observer.observe(item);
});

// ============================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ============================================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.style.color = "";
        if (link.getAttribute("href").slice(1) === current) {
            link.style.color = "var(--accent)";
        }
    });
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinksContainer = document.querySelector(".nav-links");

if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener("click", () => {
        navLinksContainer.style.display = navLinksContainer.style.display === "flex" ? "none" : "flex";
    });
}

// ============================================
// PARALLAX EFFECT FOR HERO SECTION
// ============================================
window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector("#hero .hero-content");
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - scrolled / 600;
    }
});

// ============================================
// LIGHTBOX FUNCTIONALITY
// ============================================
function openLightbox(imageSrc) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    if (lightbox && lightboxImg) {
        lightbox.classList.add("active");
        lightboxImg.src = imageSrc;
        document.body.style.overflow = "hidden";
    }
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    if (lightbox) {
        lightbox.classList.remove("active");
        document.body.style.overflow = "auto";
    }
}

// Prevent lightbox from closing when clicking on the image
const lightboxImg = document.getElementById("lightbox-img");
if (lightboxImg) {
    lightboxImg.addEventListener("click", (e) => {
        e.stopPropagation();
    });
}

// Close lightbox with Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeLightbox();
    }
});

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.prepend(scrollProgress);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// ============================================
// BACK TO TOP BUTTON
// ============================================
const backToTop = document.createElement('button');
backToTop.className = 'back-to-top';
backToTop.innerHTML = '↑';
backToTop.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// LOADING SCREEN
// ============================================
window.addEventListener('load', () => {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loader"></div>
        <div class="loading-text">LOADING PORTFOLIO...</div>
    `;
    document.body.prepend(loadingScreen);
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => loadingScreen.remove(), 500);
    }, 1500);
});

// ============================================
// ANIMATED STATISTICS COUNTER
// ============================================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.querySelector('.stat-number').textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.querySelector('.stat-number').textContent = target;
        }
    };
    
    updateCounter();
}

const statCards = document.querySelectorAll('.stat-card');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statCards.forEach(card => statsObserver.observe(card));

// ============================================
// ENHANCED SMOOTH SECTION FADE-IN
// ============================================
const allSections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

allSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    sectionObserver.observe(section);
});

// ============================================
// TECH BADGE INTERACTIVE EFFECTS
// ============================================
document.querySelectorAll('.tech-badge').forEach(badge => {
    badge.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    badge.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ============================================
// REFLECTION CARDS ANIMATION
// ============================================
const reflectionCards = document.querySelectorAll('.reflection-card');
const reflectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 150);
        }
    });
}, { threshold: 0.2 });

reflectionCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    reflectionObserver.observe(card);
});

// ============================================
// LEARNING CARDS STAGGERED ANIMATION
// ============================================
const learningCards = document.querySelectorAll('.learning-card');
const learningObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.3 });

learningCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    learningObserver.observe(card);
});

// ============================================
// PROJECT CARDS ANIMATION
// ============================================
const projectCards = document.querySelectorAll('.project-card');
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
}, { threshold: 0.2 });

projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    projectObserver.observe(card);
});

// ============================================
// ACTIVITY CARDS ANIMATION
// ============================================
const activityCards = document.querySelectorAll('.activity-card');
const activityObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 120);
        }
    });
}, { threshold: 0.2 });

activityCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    activityObserver.observe(card);
});

// ============================================
// KEYBOARD ACCESSIBILITY IMPROVEMENTS
// ============================================
document.addEventListener('keydown', (e) => {
    // Navigate with Tab key accessibility
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c👋 Hello! Thanks for checking out my portfolio!', 'color: #64ffda; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with ❤️ during my internship at HELP International School', 'color: #8892b0; font-size: 12px;');