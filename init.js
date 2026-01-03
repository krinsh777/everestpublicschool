// Initialize AOS
AOS.init();

// Initialize Swiper with navigation and sliding effect
const swiper = new Swiper('.swiper-container', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    speed: 800,
    slidesPerView: 1,
    spaceBetween: 30,
    grabCursor: true,
    centeredSlides: true,
    navigation: {
        nextEl: '.slider-btn.next',
        prevEl: '.slider-btn.prev',
    },
    keyboard: {
        enabled: true,
        onlyInViewport: false,
    },
    mousewheel:
    {
        enabled: false
    }
});

// Add active state styling
const sliderBtns = document.querySelectorAll('.slider-btn');
sliderBtns.forEach(btn => {
    btn.addEventListener('mousedown', () => {
        btn.style.transform = 'scale(0.95)';
    });
    btn.addEventListener('mouseup', () => {
        btn.style.transform = 'scale(1)';
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'scale(1)';
    });
});
