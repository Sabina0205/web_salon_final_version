// GLOBAL FLAG FOR REDUCED MOTION
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// LOADER - 5. ANIMATION
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (!prefersReducedMotion) {
        loader.classList.add("opacity-0");
        setTimeout(() => {
            loader.style.display = "none";
        }, 500);
    } else {
        loader.style.display = "none";
    }
});


// MOBILE MENU
const toggleBtn = document.querySelector(".toggle-button");
const dropdown = document.querySelector(".dropdown-menu");
const dropdownLinks = document.querySelectorAll(".dropdown-menu a");

toggleBtn.addEventListener("click", () => {
    dropdown.classList.toggle("hidden");
});

dropdownLinks.forEach((link) => {
    link.addEventListener("click", () => {
        dropdown.classList.add("hidden");
    });
});

// YEAR OF WORK
document.addEventListener('DOMContentLoaded', () => {
    const startYear = 2016;
    const currentYear = new Date().getFullYear();
    const years = currentYear - startYear; // 2026 = 10

    const pocetEl = document.querySelector('.rok-pocet');
    if (pocetEl) {
        pocetEl.textContent = years; // 10
    }
});

// ABOUT-SCROLL
document.addEventListener("DOMContentLoaded", () => {
    const aboutEls = document.querySelectorAll(".about-scroll");

    aboutEls.forEach(el => {
        el.style.opacity = prefersReducedMotion ? 1 : 0;
        el.style.transform = prefersReducedMotion ? "translateY(0)" : "translateY(40px)";
        if (!prefersReducedMotion) {
            el.style.transition = "opacity 1s ease-out, transform 1s ease-out";
        }
    });

    if (!prefersReducedMotion) {
        function revealOnScroll() {
            const windowHeight = window.innerHeight;
            aboutEls.forEach(el => {
                const rect = el.getBoundingClientRect();
                const visible = rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.3;
                el.style.opacity = visible ? 1 : 0;
                el.style.transform = visible ? "translateY(0)" : "translateY(40px)";
            });
        }
        window.addEventListener("scroll", revealOnScroll);
        revealOnScroll();
    }
});

// SERVICES PHOTO CHANGE
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("[data-section]");
    const pictures = document.querySelectorAll("picture[data-img]");

    function switchImage() {
        let current = 1;
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
                current = section.dataset.section;
            }
        });

        pictures.forEach(pic => {
            if (prefersReducedMotion) {
                pic.classList.remove("opacity-0");
            } else {
                if (pic.dataset.img === current) {
                    pic.classList.remove("opacity-0");
                    pic.classList.add("opacity-100");
                } else {
                    pic.classList.remove("opacity-100");
                    pic.classList.add("opacity-0");
                }
            }
        });
    }

    if (!prefersReducedMotion) {
        window.addEventListener("scroll", switchImage);
    }
    switchImage();
});

// PRICES ANIMATION - 2. ANIMATION
const panel = document.querySelector('.panel');
panel.style.transform = prefersReducedMotion ? 'scale(1)' : 'scale(0.75)';

['#s', '#m', '#l', '#xl', '#xxl'].forEach(id => {
    const checkbox = document.querySelector(id);
    checkbox.addEventListener('change', function () {
        if (!prefersReducedMotion && this.checked) {
            panel.animate(
                [{ transform: 'scale(0.75)' }, { transform: 'scale(1)' }],
                { duration: 1000, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', fill: 'forwards' }
            );
        } else {
            panel.style.transform = 'scale(1)';
        }
    });
});

// AUTOMATIC GENERATING GALLERY
(() => {
    const firstSlide = document.querySelector('.slide');
    const numbers = [3, 4, 5, 7, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34];

    numbers.forEach(num => {
        const newSlide = firstSlide.cloneNode(true);
        newSlide.querySelectorAll('[srcset*="2"], img[src*="2"]').forEach(el => {
            el.srcset = el.srcset.replace(/2(-mobile)?(\.webp|\.jpg)/g, num + '$1$2');
            if (el.tagName === 'IMG') el.src = `./images/gallery/${num}.jpg`;
            el.alt = `Psí salón ${num}`;
        });
        firstSlide.after(newSlide);
    });
})();
/*
// INFINITE GALLERY - 3. ANIMATION
const track = document.querySelector('.slide-track');
const slides = document.querySelectorAll('.slide img');

if (!prefersReducedMotion) {
    let speed = 0.5;
    let position = 0;

    function animate() {
        position -= speed;
        if (Math.abs(position) >= track.scrollWidth / 2) position = 0;
        track.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(animate);
    }

    track.addEventListener('mouseenter', () => speed = 0);
    track.addEventListener('mouseleave', () => speed = 0.5);

    slides.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transition = 'transform 0.5s ease-out';
            img.style.transform = 'scale(1.1)';
        });
        img.addEventListener('mouseleave', () => {
            img.style.transition = 'transform 0.5s ease-out';
            img.style.transform = 'scale(1)';
        });
    });

    animate();
} else {
    track.style.transform = 'none';
    track.style.display = 'flex';     
    track.style.flexWrap = 'wrap';
    slides.forEach(img => {
        img.style.transform = 'none';
        img.style.transition = 'none';
    });
}*/