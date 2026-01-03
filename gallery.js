// Initialize AOS with enhanced settings
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: false,
    mirror: true
});

// Fixed Controls Logic
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const backToTop = document.getElementById('back-to-top');
    const body = document.body;

    // Initialize dark mode based on user preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('night-mode');
        body.classList.remove('day-mode');
        darkModeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
    }

    // Dark Mode Toggle
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('night-mode');
        body.classList.toggle('day-mode');
        
        const icon = darkModeToggle.querySelector('i');
        if (body.classList.contains('night-mode')) {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('darkMode', null);
        }
    });

    // Back to Top Functionality
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
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

    // Enhanced Gallery Navigation with Animations
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryGrid = document.getElementById('gallery-grid');

    // Add masonry layout effect
    const updateLayout = () => {
        const items = document.querySelectorAll('.gallery-item:not([style*="display: none"])');
        let heightOffset = 0;
        items.forEach((item, index) => {
            if (index % 3 === 0) heightOffset = 0;
            item.style.transform = `translateY(${heightOffset}px)`;
            heightOffset += 20;
        });
    };

    // Enhanced category switching with animations
    galleryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.category;
            
            // Remove active class from all tabs with animation
            galleryTabs.forEach(t => {
                t.classList.remove('active');
                t.style.transform = 'scale(1)';
            });
            
            // Add active class to clicked tab with animation
            tab.classList.add('active');
            tab.style.transform = 'scale(1.1)';

            // Filter items with enhanced animations
            galleryItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInScale 0.5s ease-out forwards';
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    item.style.animation = 'fadeOutScale 0.5s ease-out forwards';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 500);
                }
            });

            // Update layout and refresh AOS
            setTimeout(updateLayout, 600);
            AOS.refresh();
        });
    });

    // Add hover effects and lazy loading
    galleryItems.forEach(item => {
        // Lazy load images
        const img = item.querySelector('img');
        if (img) {
            img.loading = 'lazy';
        }

        // Add 3D hover effect
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = ((x / rect.width) - 0.5) * 20;
            const yPercent = ((y / rect.height) - 0.5) * 20;
            
            item.style.transform = `
                perspective(1000px)
                rotateX(${-yPercent}deg)
                rotateY(${xPercent}deg)
                scale3d(1.05, 1.05, 1.05)
            `;
        });

        // Reset transform on mouse leave
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Add scroll-based parallax effect
    window.addEventListener('scroll', () => {
        requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            galleryItems.forEach(item => {
                const speed = 0.05;
                const yPos = -(scrolled * speed);
                item.style.backgroundPositionY = yPos + 'px';
            });
        });
    });

    // Initialize layout
    updateLayout();
});

// Add new animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInScale {
        from { opacity: 0; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1); }
    }

    @keyframes fadeOutScale {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.8); }
    }
`;
document.head.appendChild(style);
