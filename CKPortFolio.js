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
   ACHIEVEMENTS (Unified Carousel & Dots Logic)
========================================= */
const carouselTrack = document.querySelector('.carousel-track');
const slider = document.querySelector('.achievements-slider'); 
const dots = document.querySelectorAll('.dot'); // Declared ONLY ONCE now!

// 1. CSS Animation Click Logic (If using the infinite scrolling track)
if (carouselTrack && dots.length > 0) {
    const totalAnimationTime = 25; 
    const totalUniqueCards = 4;
    const timePerCard = totalAnimationTime / totalUniqueCards;

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            dots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');

            const cardIndex = parseInt(dot.getAttribute('data-index'));
            
            // Shift the index back by 1 so the targeted card appears in the second slot.
            // The modulo (%) ensures that if cardIndex is 0, it wraps around to 3 (Card 4).
            const offsetIndex = (cardIndex - 1 + totalUniqueCards) % totalUniqueCards;
            
            const jumpTime = -(offsetIndex * timePerCard);

            carouselTrack.style.animation = 'none';
            void carouselTrack.offsetWidth; 
            
            carouselTrack.style.animation = `infiniteScroll ${totalAnimationTime}s linear infinite`;
            carouselTrack.style.animationDelay = `${jumpTime}s`;
        });
    });
}

// 2. Scroll Sync Logic (If using a swipeable/scrollable container)
if (slider && dots.length > 0) {
    
    // Update dots when user scrolls or swipes
    slider.addEventListener('scroll', () => {
        const scrollPosition = slider.scrollLeft;
        const cardWidth = slider.clientWidth;
        const activeIndex = Math.round(scrollPosition / cardWidth);

        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[activeIndex]) {
            dots[activeIndex].classList.add('active');
        }
    });

    // Allow users to click a dot to jump to a specific card (Scroll method)
    // NOTE: Only applies if you are NOT using the CSS animation track above
    if (!carouselTrack) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                slider.scrollTo({
                    left: index * slider.clientWidth,
                    behavior: 'smooth'
                });
            });
        });
    }
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
   IMAGE LIGHTBOX & ANIMATION PAUSE
========================================= */
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const closeModalBtn = document.querySelector('.close-modal');
// Targets all images inside your scrolling track
const cardImages = document.querySelectorAll('.carousel-track img'); 

if (modal && cardImages.length > 0) {
    // 1. Open Modal and Pause Animation
    cardImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.classList.add('show');
            modalImg.src = this.src; // Copies the clicked image's source to the modal
            
            // Pauses the looping track
            if (carouselTrack) {
                carouselTrack.classList.add('pause-animation');
            }
        });
    });

    // 2. Helper function to close modal and resume animation
    const closeModal = () => {
        modal.classList.remove('show');
        
        // Resumes the looping track
        if (carouselTrack) {
            carouselTrack.classList.remove('pause-animation');
        }
    };

    // 3. Close when clicking the 'X'
    closeModalBtn.addEventListener('click', closeModal);

    // 4. Close when clicking anywhere on the dark background outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

/* =========================================
   MODAL IMAGE SLIDER LOGIC
========================================= */
const prevBtn = document.querySelector('.modal-nav.prev');
const nextBtn = document.querySelector('.modal-nav.next');

function changeImage(direction) {
    currentImageIndex = (currentImageIndex + direction + currentGallery.length) % currentGallery.length;
    modalImg.src = currentGallery[currentImageIndex];
}

cardImages.forEach(img => {
    img.addEventListener('click', function() {
        modal.classList.add('show');
        
        // Define galleries
        if (this.classList.contains('redhat-cert')) {
            currentGallery = ['img/RedHat Part 1 Cert.png', 'img/RedHat Part 2 Cert.png'];
        } else {
            currentGallery = [this.src];
        }
        
        currentImageIndex = 0;
        modalImg.src = currentGallery[currentImageIndex];
        
        // Show/Hide navigation buttons based on gallery size
        if (currentGallery.length > 1) {
            prevBtn.classList.add('show-nav');
            nextBtn.classList.add('show-nav');
        } else {
            prevBtn.classList.remove('show-nav');
            nextBtn.classList.remove('show-nav');
        }
        
        if (carouselTrack) carouselTrack.classList.add('pause-animation');
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