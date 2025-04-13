// Initialize AOS
AOS.init({
    duration: 1200,
    once: true,
    easing: 'ease-in-out'
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
});

// Load Theme Preference
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Active Navigation Link Highlight on Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Certificate Slider Auto-Scroll with Smooth Loop
const certificatesSlider = document.querySelector('.certificates-slider');
const scrollStep = 1;
const scrollInterval = 30;

function autoScroll() {
    const maxScroll = certificatesSlider.scrollWidth - certificatesSlider.clientWidth;

    if (certificatesSlider.scrollLeft >= maxScroll - 1) { // Account for rounding errors
        // Disable smooth scrolling for the reset to avoid visual jump
        certificatesSlider.style.scrollBehavior = 'auto';
        certificatesSlider.scrollLeft = 0;
        // Re-enable smooth scrolling after reset
        setTimeout(() => {
            certificatesSlider.style.scrollBehavior = 'smooth';
        }, 0);
    } else {
        certificatesSlider.scrollLeft += scrollStep;
    }
}

setInterval(autoScroll, scrollInterval);

// Add Intersection Observer for Animations
const elementsToAnimate = document.querySelectorAll('.certificate-wrapper');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.3 });

elementsToAnimate.forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(50px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(element);
});