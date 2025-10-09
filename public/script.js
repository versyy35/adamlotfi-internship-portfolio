// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Navbar background on scroll
const navbar = document.getElementById("navbar")
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.5)"
  } else {
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.3)"
  }
})

// Timeline animation on scroll
const timelineItems = document.querySelectorAll(".timeline-item")

const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

timelineItems.forEach((item) => {
  observer.observe(item)
})

// Active navigation highlighting
const sections = document.querySelectorAll("section")
const navLinks = document.querySelectorAll(".nav-links a")

window.addEventListener("scroll", () => {
  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.style.color = ""
    if (link.getAttribute("href").slice(1) === current) {
      link.style.color = "var(--accent)"
    }
  })
})

// Mobile menu toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
const navLinksContainer = document.querySelector(".nav-links")

mobileMenuBtn.addEventListener("click", () => {
  navLinksContainer.style.display = navLinksContainer.style.display === "flex" ? "none" : "flex"
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY
  const hero = document.querySelector("#hero .hero-content")
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.3}px)`
    hero.style.opacity = 1 - scrolled / 600
  }
})

// Lightbox functionality for viewing images
function openLightbox(imageSrc) {
  const lightbox = document.getElementById("lightbox")
  const lightboxImg = document.getElementById("lightbox-img")
  lightbox.classList.add("active")
  lightboxImg.src = imageSrc
  document.body.style.overflow = "hidden"
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox")
  lightbox.classList.remove("active")
  document.body.style.overflow = "auto"
}

// Prevent lightbox from closing when clicking on the image
document.getElementById("lightbox-img").addEventListener("click", (e) => {
  e.stopPropagation()
})

// Close lightbox with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeLightbox()
  }
})
