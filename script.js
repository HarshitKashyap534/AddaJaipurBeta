document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.fade-section, .slide-left-section');
    const header = document.getElementById('header');
    const slides = document.querySelector('.slides');
    const dots = document.querySelectorAll('.dot');
    let slideIndex = 0;

    const showSlides = () => {
        slides.style.transform = `translateX(${-slideIndex * 20}%)`;
        dots.forEach((dot, index) => {
            dot.style.backgroundColor = index === slideIndex ? '#717171' : '#bbb';
        });
    };

    const nextSlide = () => {
        slideIndex = (slideIndex + 1) % dots.length;
        showSlides();
    };

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            slideIndex = index;
            showSlides();
        });
    });

    setInterval(nextSlide, 2000);

    const sectionObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Adjusted threshold for earlier visibility
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
            } else {
                entry.target.style.opacity = 0;
            }
        });
    }, sectionObserverOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '12px 20px';
            header.querySelectorAll('i').forEach(icon => {
                icon.style.fontSize = '1.2em';
            });
            header.querySelector('.logo').style.height = '40px';
            header.querySelector('.search-bar').style.padding = '5px';
        } else {
            header.style.padding = '30px 20px';
            header.querySelectorAll('i').forEach(icon => {
                icon.style.fontSize = '2em';
            });
            header.querySelector('.logo').style.height = '70px';
            header.querySelector('.search-bar').style.padding = '10px';
        }
    });
});
