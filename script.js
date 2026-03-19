/* ============================================
   CINEMATIC SCROLL INTERACTIONS
   ============================================ */

// Scroll event listener for parallax and animations
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
    }

    // Fade in story sections on scroll
    const sections = document.querySelectorAll('.story-section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const windowHeight = window.innerHeight;
        
        if (scrolled + windowHeight > sectionTop + 100) {
            section.style.opacity = '1';
        }
    });
});

// Smooth scroll for CTA buttons
document.querySelectorAll('.cta-button, .nav-cta').forEach(button => {
    button.addEventListener('click', (e) => {
        // Open phone call or navigate
        const phone = '1-800-266-2368';
        
        // On mobile, trigger phone call
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            window.location.href = `tel:${phone}`;
        } else {
            // On desktop, you could show a contact modal or alert
            alert(`Call Support: ${phone}`);
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 50) {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.85)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animable elements
document.querySelectorAll('.help-card, .compliance-card, .stat').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Mobile menu toggle (future expansion)
function setupMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const navCta = document.querySelector('.nav-cta');
    
    // Could add hamburger menu here for mobile
    if (window.innerWidth <= 768) {
        // Hide nav links on mobile
        if (navLinks) navLinks.style.display = 'none';
    }
}

window.addEventListener('load', setupMobileMenu);
window.addEventListener('resize', setupMobileMenu);

// Active nav link update
window.addEventListener('scroll', () => {
    const scrollPos = window.pageYOffset + 100;
    const sections = document.querySelectorAll('.story-section, .help-section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            // Update active nav if needed
        }
    });
});

// Lazy load images for performance
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
        images.forEach(img => {
            if (img.dataset.src) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            img.src = img.dataset.src;
                            observer.unobserve(img);
                        }
                    });
                });
                observer.observe(img);
            }
        });
    }
});

// Handle window resize for responsive adjustments
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        setupMobileMenu();
    }, 250);
});

// Prevent scroll on navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Performance optimization: Debounce scroll events
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const storyImages = document.querySelectorAll('.story-image');
    
    storyImages.forEach(img => {
        const offset = (scrolled - img.offsetTop) * 0.5;
        img.style.backgroundPosition = `center ${offset}px`;
    });
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

/* ============================================
   FAQ ACCORDION FUNCTIONALITY
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // FAQ accordion for homepage
    const faqItems = document.querySelectorAll('.faq-homepage-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-homepage-question');
        
        question.addEventListener('click', () => {
            // Close other items
            const wasActive = item.classList.contains('active');
            
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!wasActive) {
                item.classList.add('active');
            }
        });
    });

    // FAQ accordion for dedicated FAQ page
    const faqPageItems = document.querySelectorAll('.faq-item');
    
    faqPageItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        }
    });
});

/* ============================================
   TESTIMONIALS ANIMATIONS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Animate testimonials on scroll
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    const testimonialObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                testimonialObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    testimonialCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        testimonialObserver.observe(card);
    });
});

