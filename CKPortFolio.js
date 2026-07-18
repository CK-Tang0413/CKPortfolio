/* =========================================
   GLOBAL THEME TOGGLER
========================================= */
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
});

/* =========================================
   MOBILE HAMBURGER MENU
========================================= */
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.querySelector('.nav-links');

// Toggle menu on click
if (menuIcon) {
    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Optional: Change icon from hamburger to 'X'
        const icon = menuIcon.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('bx-menu', 'bx-x');
        } else {
            icon.classList.replace('bx-x', 'bx-menu');
        }
    });
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuIcon.querySelector('i');
        icon.classList.replace('bx-x', 'bx-menu');
    });
});


/* =========================================
   HOME SECTION (Typewriter Effect)
========================================= */
const typeTextSpan = document.querySelector('.type-text');
const words = ["AI Student", "Developer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typeTextSpan.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeTextSpan.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 80 : 150;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; 
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length; 
        typeSpeed = 500; 
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start typing effect after page load animations
setTimeout(typeEffect, 1500);


/* =========================================
   ABOUT ME SECTION (Scroll Animations)
========================================= */
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3 
};

const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        } else {
            entry.target.classList.remove('in-view'); 
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.scroll-slide-left, .scroll-fade-up');
animatedElements.forEach(el => scrollObserver.observe(el));


/* =========================================
   EXPERIENCE & EDUCATION SECTION (Timeline Toggler)
========================================= */
const btnExperience = document.getElementById('btn-experience');
const btnEducation = document.getElementById('btn-education');
const contentExperience = document.getElementById('content-experience');
const contentEducation = document.getElementById('content-education');
const timelineTitle = document.getElementById('timeline-title');

function switchTab(activeBtn, inactiveBtn, showContent, hideContent, newTitle) {
    activeBtn.classList.add('active');
    inactiveBtn.classList.remove('active');
    
    timelineTitle.classList.add('fade-out');
    hideContent.classList.add('fade-out');
    
    setTimeout(() => {
        hideContent.style.display = 'none';
        hideContent.classList.remove('active');
        
        showContent.style.display = 'block';
        showContent.classList.add('active');
        
        timelineTitle.innerHTML = newTitle;
        
        setTimeout(() => {
            timelineTitle.classList.remove('fade-out');
            showContent.classList.remove('fade-out');
        }, 50);
        
    }, 400); 
}

btnExperience.addEventListener('click', () => {
    if(!btnExperience.classList.contains('active')) {
        // Injects the gradient span into the new title
        switchTab(btnExperience, btnEducation, contentExperience, contentEducation, 'My <br><span class="highlight-gradient">Work Experience</span>');
    }
});

btnEducation.addEventListener('click', () => {
    if(!btnEducation.classList.contains('active')) {
        // Injects the gradient span into the new title
        switchTab(btnEducation, btnExperience, contentEducation, contentExperience, 'My <br><span class="highlight-gradient">Education</span>');
    }
});

/* =========================================
   ACHIEVEMENTS (Swiper & Lightbox)
========================================= */
// 1. Initialize Swiper
const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1, // Default (Mobile screens under 768px)
    spaceBetween: 20,
    loop: true,
    speed: 800, 
    autoplay: {
        delay: 2500, 
        disableOnInteraction: false, 
        pauseOnMouseEnter: true, 
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    // NEW: Updated Responsive Breakpoints
    breakpoints: {
        // When screen is >=430px (Moblie)
        430: {
            slidesPerView: 1
        },
        // When screen is >= 768px (Tablets)
        768: {
            slidesPerView: 2, /* Changed to 2 cards for better spacing */
            spaceBetween: 25,
        },
        // When screen is >= 1024px (Laptops and Desktops)
        1024: {
            slidesPerView: 3, /* Shows 3 cards only when there is enough room */
            spaceBetween: 30,
        }
    }
});

// We must define swiperEl so the click listener knows where to look!
const swiperEl = document.querySelector(".mySwiper");

// 2. Lightbox Modal Variables
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const closeModalBtn = document.querySelector('.close-modal');
const prevBtn = document.querySelector('.modal-nav.prev');
const nextBtn = document.querySelector('.modal-nav.next');
let currentGallery = [];
let currentImageIndex = 0;

// 3. Event Delegation for Image Clicks (Required because Swiper clones slides)
if (swiperEl && modal) {
    swiperEl.addEventListener('click', function(e) {
        // Check if what was clicked was an image inside our card
        const img = e.target.closest('.card-img-container img');
        
        if (img) {
            modal.classList.add('show');
            swiper.autoplay.stop(); // Stop carousel when viewing image
            
            // Define galleries based on image clicked
            if (img.classList.contains('redhat-cert')) {
                currentGallery = ['img/RedHat Part 1 Cert.png', 'img/RedHat Part 2 Cert.png'];
            } else {
                currentGallery = [img.src];
            }
            
            currentImageIndex = 0;
            modalImg.src = currentGallery[currentImageIndex];
            
            // Show/Hide navigation arrows based on gallery size
            if (currentGallery.length > 1) {
                prevBtn.classList.add('show-nav');
                nextBtn.classList.add('show-nav');
            } else {
                prevBtn.classList.remove('show-nav');
                nextBtn.classList.remove('show-nav');
            }
        }
    });

    // 4. Slider Arrow Logic
    window.changeImage = function(direction) {
        currentImageIndex = (currentImageIndex + direction + currentGallery.length) % currentGallery.length;
        modalImg.src = currentGallery[currentImageIndex];
    };

    // 5. Close Modal Logic
    const closeModal = () => {
        modal.classList.remove('show');
        swiper.autoplay.start(); // Resume carousel
    };

    closeModalBtn.addEventListener('click', closeModal);
    
    // Close when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

/* =========================================
   ACADEMIC PROJECTS (Accordion Logic)
========================================= */
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');

    header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Optional UX Feature: Close all other open accordions before opening the clicked one
        accordionItems.forEach(otherItem => {
            otherItem.classList.remove('active');
            otherItem.querySelector('.accordion-content').style.maxHeight = null;
        });

        // Toggle the clicked item
        if (!isActive) {
            item.classList.add('active');
            // scrollHeight dynamically gets the exact pixel height needed for the hidden text
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});

/* =========================================
   BACK TO TOP VISIBILITY
========================================= */
const backToTopBtn = document.getElementById('back-to-top');
const homeSection = document.getElementById('home');

const showBtnObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // If Home is NOT in view, show the button
        if (!entry.isIntersecting) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
}, { threshold: 0.1 }); // Trigger when 10% of Home has scrolled out

if (homeSection) {
    showBtnObserver.observe(homeSection);
}

// Smooth scroll back to top
backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* =========================================
   PREVENT OVERLAP WITH FOOTER
========================================= */
window.addEventListener('scroll', () => {
    const footer = document.querySelector('footer');
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (footer && backToTopBtn) {
        const footerRect = footer.getBoundingClientRect();
        const scrollPosition = window.innerHeight;

        // If the top of the footer is within the viewport
        if (footerRect.top < scrollPosition) {
            // Calculate how much the footer is overlapping the bottom 30px margin
            const overlap = scrollPosition - footerRect.top + 20; 
            backToTopBtn.style.bottom = `${overlap}px`;
        } else {
            // Reset to original position when not near footer
            backToTopBtn.style.bottom = '30px';
        }
    }
});