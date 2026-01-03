// Main Script Initialization


// Back to top button functionality
const backToTop = document.getElementById('back-to-top'),
    darkModeToggle = document.getElementById('dark-mode-toggle'),
    icon = darkModeToggle.querySelector('i');

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    // Sticky Header functionality
    const navbarSection = document.querySelector('.navbar-section');
    if (window.pageYOffset > 50) {
        navbarSection.classList.add('sticky');
    } else {
        navbarSection.classList.remove('sticky');
    }
});

// Smooth scroll to top
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Counter Animation
const counters = document.querySelectorAll('.counter');

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 4000; // 4 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            counter.textContent = Math.round(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };

    updateCounter();
}

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// Theme Toggle with smooth transition
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('night-mode');
    document.body.classList.toggle('day-mode');

    // Update icon
    if (document.body.classList.contains('night-mode')) {
        icon.classList.replace('fa-sun', 'fa-moon');
    } else {
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    // Save preference
    localStorage.setItem('theme', document.body.classList.contains('night-mode') ? 'night' : 'day');
});

// Initialize theme from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'day';
    if (savedTheme === 'night') {
        document.body.classList.add('night-mode');
        document.body.classList.remove('day-mode');
        icon.classList.replace('fa-sun', 'fa-moon');
    }
});

// Initialize AOS with custom settings
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false,
    offset: 50,
    anchorPlacement: 'top-bottom'
});

// Add scroll behavior (removing smooth scroll)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'auto',
                block: 'start'
            });
        }
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(window.pageYOffset * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Overlay Navigation Logic
function openNav() {
    if (window.innerWidth > 768) {
        document.getElementById("mySidenav").style.width = "400px";
    } else {
        document.getElementById("mySidenav").style.width = "425px";
    }
    // Lock scrolling
    document.body.classList.add('modal-open');
    document.documentElement.style.overflow = 'hidden';
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    // Unlock scrolling
    document.body.classList.remove('modal-open');
    document.documentElement.style.overflow = '';
}

// Close menu when clicking outside
document.addEventListener('mousedown', (e) => {
    const sidenav = document.getElementById("mySidenav");
    const mobileToggle = document.querySelector('.mobile-toggle-btn');

    // If click is outside sidenav and not on the toggle button, close it
    if (sidenav && sidenav.style.width !== "0" && sidenav.style.width !== "" &&
        !sidenav.contains(e.target) &&
        (!mobileToggle || !mobileToggle.contains(e.target))) {
        closeNav();
    }
});

// Dark Mode Toggle Logic
function toggleDarkMode() {
    const isChecked = document.getElementById("checkbox").checked;
    if (isChecked) {
        document.body.classList.add("dark-theme");
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.remove("dark-theme");
        localStorage.setItem("theme", "light");
    }
}

// Initial Theme Selection on Load
window.addEventListener('DOMContentLoaded', () => {
    const currentTheme = localStorage.getItem("theme");
    const checkbox = document.getElementById("checkbox");
    if (currentTheme === "dark") {
        document.body.classList.add("dark-theme");
        if (checkbox) checkbox.checked = true;
    }
});

// Accordion Logic for Sidenav
document.addEventListener('DOMContentLoaded', () => {
    const accordions = document.querySelectorAll('.sidenav .accordion');

    accordions.forEach(acc => {
        const header = acc.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            // Close other accordions
            accordions.forEach(otherAcc => {
                if (otherAcc !== acc && otherAcc.classList.contains('active')) {
                    otherAcc.classList.remove('active');
                }
            });

            // Toggle current accordion
            acc.classList.toggle('active');
        });
    });
});
