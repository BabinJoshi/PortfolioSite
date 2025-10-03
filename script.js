// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize core functionality
    initMobileMenu();
    initHeaderScroll();
    initScrollAnimations();
    initSmoothScroll();
    initFormHandling();
    initActiveNavigation();
    initBlogCarousel();
    initProjectsCarousel();
    // initAnimatedBackground();
    initTypingAnimation();
});
// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        
        // Animate menu button
        const svg = mobileMenuBtn.querySelector('svg');
        svg.style.transform = mobileMenu.classList.contains('hidden') 
            ? 'rotate(0deg)' 
            : 'rotate(90deg)';
        svg.style.transition = 'transform 0.3s ease';
    });
    
    // Close mobile menu when clicking on links
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const svg = mobileMenuBtn.querySelector('svg');
            svg.style.transform = 'rotate(0deg)';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
            const svg = mobileMenuBtn.querySelector('svg');
            svg.style.transform = 'rotate(0deg)';
        }
    });
}

// Header Shadow on Scroll with Active Navigation
function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;
    
    let ticking = false;
    
    function updateHeader() {
        if (window.scrollY > 50) {
            header.classList.add('shadow-md');
            header.style.backgroundColor = 'rgba(255, 251, 245, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.classList.remove('shadow-md');
            header.style.backgroundColor = 'rgba(255, 251, 245, 0.8)';
            header.style.backdropFilter = 'blur(5px)';
        }
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}

// Active Navigation Highlighting
function initActiveNavigation() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-20% 0px -70% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const navLink = document.querySelector(`nav a[href="#${id}"]`);
            
            if (entry.isIntersecting && navLink) {
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('text-accent', 'font-bold');
                    link.classList.add('text-primary-text');
                });
                
                // Add active class to current nav link
                navLink.classList.add('text-accent', 'font-bold');
                navLink.classList.remove('text-primary-text');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
}

// Enhanced Scroll Animations with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Fade in animations
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(el => fadeObserver.observe(el));
    
    // Slide up animations with staggered timing
    const slideElements = document.querySelectorAll('.slide-up');
    const slideObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                slideObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    slideElements.forEach(el => slideObserver.observe(el));
    
    // Timeline animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                timelineObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    timelineItems.forEach(el => timelineObserver.observe(el));
}

// Smooth Scroll for Navigation Links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.getElementById('header')?.offsetHeight || 80;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Add ripple effect to clicked link
                createRippleEffect(link, e);
            }
        });
    });
}

// Create ripple effect for buttons and links
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Enhanced Form Handling with Validation
function initFormHandling() {
    const form = document.querySelector('form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Add focus animations and validation to inputs
    inputs.forEach(input => {
        const label = input.previousElementSibling;
        
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'scale(1.02)';
            input.parentElement.style.transition = 'transform 0.3s ease';
            if (label) {
                label.style.color = '#F97316';
                label.style.transform = 'translateY(-2px)';
            }
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'scale(1)';
            if (label && !input.value) {
                label.style.color = '';
                label.style.transform = '';
            }
            validateInput(input);
        });
        
        input.addEventListener('input', () => {
            validateInput(input);
        });
    });
    
    // Form submission with enhanced animation
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!validateForm(form)) {
            shakeForm(form);
            return;
        }
        
        const originalText = submitBtn.innerHTML;
        
        // Animate button
        submitBtn.innerHTML = '<span class="animate-spin inline-block">⏳</span> Sending...';
        submitBtn.style.transform = 'scale(0.98)';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.innerHTML = '✅ Message Sent!';
            submitBtn.style.backgroundColor = '#10B981';
            submitBtn.style.transform = 'scale(1.05)';
            
            // Success animation
            form.style.animation = 'pulse 0.5s ease';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.style.transform = 'scale(1)';
                submitBtn.disabled = false;
                form.style.animation = '';
                form.reset();
                
                // Reset label styles
                inputs.forEach(input => {
                    const label = input.previousElementSibling;
                    if (label) {
                        label.style.color = '';
                        label.style.transform = '';
                    }
                });
            }, 3000);
        }, 2000);
    });
}

// Input validation function
function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    
    // Remove existing error styling
    input.classList.remove('border-red-500', 'bg-red-50');
    input.classList.add('border-orange-200', 'bg-orange-50');
    
    // Check validation rules
    if (input.required && !value) {
        isValid = false;
    } else if (input.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
    }
    
    // Apply error styling if invalid
    if (!isValid) {
        input.classList.remove('border-orange-200', 'bg-orange-50');
        input.classList.add('border-red-500', 'bg-red-50');
    }
    
    return isValid;
}

// Validate entire form
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Email validation
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Shake animation for form errors
function shakeForm(form) {
    form.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        form.style.animation = '';
    }, 500);
}















// Modern Animated Background System
function initAnimatedBackground() {
    const backgroundContainer = document.getElementById('animated-bg');
    if (!backgroundContainer) {
        console.error('Animated background container not found!');
        return;
    }

    console.log('Initializing animated background...');
    console.log('Background container found:', backgroundContainer);
    
    // Start animations immediately without delays
    createGradientOrbs();
    createFloatingParticles();
    initInteractiveGlow();
    
    console.log('Modern animated background initialized successfully');
}



function createGradientOrbs() {
    const orbsContainer = document.querySelector('.gradient-orbs');
    if (!orbsContainer) {
        console.error('Gradient orbs container not found!');
        return;
    }
    
    console.log('Creating gradient orbs with immediate positioning...');
    
    // Create orbs that are already positioned at different stages of animation
    for (let i = 0; i < 8; i++) {
        createSingleOrb(orbsContainer, i, true);
    }
    
    // Continuously create new orbs from bottom
    setInterval(() => {
        createSingleOrb(orbsContainer, 0, false);
    }, 3000);
}

function createSingleOrb(container, index = 0, immediate = false) {
    const orb = document.createElement('div');
    
    // Medium size between 100px and 180px
    const size = Math.random() * 80 + 100;
    orb.style.width = size + 'px';
    orb.style.height = size + 'px';
    
    // Apply styling directly without CSS class initially
    orb.style.position = 'absolute';
    orb.style.borderRadius = '50%';
    orb.style.background = 'radial-gradient(circle, rgba(249, 115, 22, 0.2), rgba(249, 115, 22, 0.1) 70%, transparent)';
    orb.style.filter = 'blur(30px)';
    orb.style.willChange = 'transform';
    orb.style.pointerEvents = 'none';
    orb.style.opacity = '0'; // Start completely invisible
    
    // Special orbs with different gradients
    if (Math.random() > 0.5) {
        orb.style.background = 'radial-gradient(circle, rgba(249, 115, 22, 0.3), rgba(255, 165, 0, 0.15) 40%, rgba(249, 115, 22, 0.08) 70%, transparent)';
        orb.style.filter = 'blur(35px)';
    }
    
    // Random starting position and movement parameters
    const startX = Math.random() * 100;
    const bounceX1 = (Math.random() - 0.5) * 50;
    const bounceX2 = (Math.random() - 0.5) * 40;
    const bounceX3 = (Math.random() - 0.5) * 30;
    const bounceX4 = (Math.random() - 0.5) * 20;
    
    const duration = (Math.random() * 6 + 8) * 1000; // Convert to milliseconds
    
    // Always start positioned off-screen initially
    orb.style.left = startX + '%';
    orb.style.top = '120vh'; // Start below viewport
    
    container.appendChild(orb);
    
    // Start animation immediately after DOM insertion
    requestAnimationFrame(() => {
        if (immediate) {
            // For immediate orbs, calculate where they should be and start from there
            const progress = Math.random();
            startManualOrbAnimation(orb, startX, bounceX1, bounceX2, bounceX3, bounceX4, duration, progress);
        } else {
            // For new orbs, start from beginning with small delay
            setTimeout(() => {
                startManualOrbAnimation(orb, startX, bounceX1, bounceX2, bounceX3, bounceX4, duration, 0);
            }, Math.random() * 1000);
        }
    });
    
    console.log('Created manually animated orb, starting animation...', 'Immediate:', immediate);
    
    // Remove orb after animation
    setTimeout(() => {
        if (orb.parentNode) {
            orb.parentNode.removeChild(orb);
        }
    }, duration + 2000);
}

function startManualOrbAnimation(orb, startX, bounceX1, bounceX2, bounceX3, bounceX4, duration, startProgress = 0) {
    const startTime = Date.now() - (duration * startProgress);
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        if (progress >= 1) {
            // Animation complete, fade out
            orb.style.opacity = '0';
            return;
        }
        
        // Calculate current position
        const currentY = 100 - (progress * 120); // 100vh to -20vh
        
        let currentXOffset = 0;
        if (progress < 0.25) {
            currentXOffset = bounceX1 * (progress / 0.25);
        } else if (progress < 0.5) {
            currentXOffset = bounceX1 + (bounceX2 - bounceX1) * ((progress - 0.25) / 0.25);
        } else if (progress < 0.75) {
            currentXOffset = bounceX2 + (bounceX3 - bounceX2) * ((progress - 0.5) / 0.25);
        } else {
            currentXOffset = bounceX3 + (bounceX4 - bounceX3) * ((progress - 0.75) / 0.25);
        }
        
        const currentX = startX + currentXOffset;
        
        // Calculate scale
        let scale = 0.8;
        if (progress < 0.25) {
            scale = 0.8 + (0.2 * (progress / 0.25));
        } else if (progress < 0.5) {
            scale = 1 - (0.1 * ((progress - 0.25) / 0.25));
        } else if (progress < 0.75) {
            scale = 0.9 + (0.2 * ((progress - 0.5) / 0.25));
        } else {
            scale = 1.1 - (0.4 * ((progress - 0.75) / 0.25));
        }
        
        // Apply transform and make visible
        orb.style.left = currentX + '%';
        orb.style.top = currentY + 'vh';
        orb.style.transform = `scale(${scale})`;
        orb.style.opacity = progress < 0.95 ? '1' : ((1 - progress) * 20); // Visible during animation, fade out at end
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

function createFloatingParticles() {
    const particlesContainer = document.querySelector('.floating-particles');
    if (!particlesContainer) {
        console.error('Floating particles container not found!');
        return;
    }
    
    console.log('Creating floating particles with immediate positioning...');
    
    // Create particles that are already positioned at different stages of animation
    for (let i = 0; i < 12; i++) {
        createSingleParticle(particlesContainer, true);
    }
    
    // Continuously create new particles from bottom
    setInterval(() => {
        createSingleParticle(particlesContainer, false);
    }, 1500);
}

function createSingleParticle(container, immediate = false) {
    const particle = document.createElement('div');
    
    // Apply styling directly without CSS class initially
    particle.style.position = 'absolute';
    particle.style.borderRadius = '50%';
    particle.style.filter = 'blur(2px)';
    particle.style.willChange = 'transform';
    particle.style.pointerEvents = 'none';
    particle.style.opacity = '0'; // Start completely invisible
    
    // Random particle types with better distribution
    const rand = Math.random();
    if (rand > 0.7) {
        particle.style.width = '18px';
        particle.style.height = '18px';
        particle.style.background = 'rgba(249, 115, 22, 0.5)';
        particle.style.filter = 'blur(3px)';
        particle.style.boxShadow = '0 0 12px rgba(249, 115, 22, 0.3)';
    } else if (rand > 0.4) {
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.background = 'rgba(249, 115, 22, 0.7)';
        particle.style.filter = 'blur(1px)';
        particle.style.boxShadow = '0 0 6px rgba(249, 115, 22, 0.5)';
    } else {
        particle.style.width = '12px';
        particle.style.height = '12px';
        particle.style.background = 'rgba(249, 115, 22, 0.6)';
        particle.style.filter = 'blur(2px)';
        particle.style.boxShadow = '0 0 8px rgba(249, 115, 22, 0.4)';
    }
    
    // Special pulsing particles
    const isPulsing = Math.random() > 0.8;
    
    // Random horizontal position and drift
    const startX = Math.random() * 100;
    const drift = (Math.random() - 0.5) * 150;
    
    const duration = (Math.random() * 6 + 6) * 1000; // Convert to milliseconds
    
    // Always start positioned off-screen initially
    particle.style.left = startX + '%';
    particle.style.top = '120vh'; // Start below viewport
    
    container.appendChild(particle);
    
    // Start animation immediately after DOM insertion
    requestAnimationFrame(() => {
        if (immediate) {
            // For immediate particles, calculate where they should be and start from there
            const progress = Math.random();
            startManualParticleAnimation(particle, startX, drift, duration, progress, isPulsing);
        } else {
            // For new particles, start from beginning with small delay
            setTimeout(() => {
                startManualParticleAnimation(particle, startX, drift, duration, 0, isPulsing);
            }, Math.random() * 1000);
        }
    });
    
    console.log('Created manually animated particle, starting animation...', 'Immediate:', immediate);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, duration + 2000);
}

function startManualParticleAnimation(particle, startX, drift, duration, startProgress = 0, isPulsing = false) {
    const startTime = Date.now() - (duration * startProgress);
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        if (progress >= 1) {
            // Animation complete, fade out
            particle.style.opacity = '0';
            return;
        }
        
        // Calculate current position
        const currentY = 100 - (progress * 110); // 100vh to -10vh
        
        // Calculate drift
        const driftProgress = drift * progress;
        const currentX = startX + (driftProgress / window.innerWidth * 100);
        
        // Calculate rotation
        const rotation = progress * 360;
        
        // Apply transform and make visible
        particle.style.left = currentX + '%';
        particle.style.top = currentY + 'vh';
        particle.style.transform = `rotate(${rotation}deg)`;
        
        // Pulsing effect
        if (isPulsing) {
            const pulseScale = 1 + Math.sin(elapsed * 0.01) * 0.5;
            particle.style.transform += ` scale(${pulseScale})`;
        }
        
        // Set visibility - visible during animation, fade out at end
        particle.style.opacity = progress < 0.95 ? '1' : ((1 - progress) * 20);
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

function initInteractiveGlow() {
    const glowElement = document.querySelector('.interactive-glow');
    const backgroundContainer = document.getElementById('animated-bg');
    
    if (!glowElement || !backgroundContainer) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let isVisible = false;
    
    // Smooth mouse tracking
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!isVisible) {
            glowElement.style.opacity = '1';
            isVisible = true;
        }
        
        // Smooth movement with slight delay
        requestAnimationFrame(() => {
            glowElement.style.left = mouseX + 'px';
            glowElement.style.top = mouseY + 'px';
        });
    });
    
    // Hide glow when mouse leaves window
    document.addEventListener('mouseleave', () => {
        glowElement.style.opacity = '0';
        isVisible = false;
    });
    
    // Show glow when mouse enters window
    document.addEventListener('mouseenter', () => {
        if (mouseX > 0 || mouseY > 0) {
            glowElement.style.opacity = '1';
            isVisible = true;
        }
    });
}
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(249, 115, 22, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

document.head.appendChild(additionalStyles);

// Performance optimization: Throttle scroll and resize events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events for better performance
window.addEventListener('scroll', throttle(() => {
    // Any additional scroll-based animations can be added here
}, 16)); // ~60fps


// Blog Carousel Functionality
function initBlogCarousel() {
    const carousel = document.getElementById('blog-carousel');
    const track = document.getElementById('blog-track');
    const prevBtn = document.getElementById('blog-prev');
    const nextBtn = document.getElementById('blog-next');
    const indicatorsContainer = document.getElementById('blog-indicators');
    
    if (!carousel || !track || !prevBtn || !nextBtn) return;
    
    const cards = track.querySelectorAll('.blog-card');
    let currentIndex = 0;
    let cardsPerView = 3;
    
    // Responsive cards per view
    function updateCardsPerView() {
        if (window.innerWidth < 768) {
            cardsPerView = 1;
        } else if (window.innerWidth < 1024) {
            cardsPerView = 2;
        } else {
            cardsPerView = 3;
        }
        updateCarousel();
        createIndicators();
    }
    
    // Create indicators
    function createIndicators() {
        const totalSlides = Math.ceil(cards.length / cardsPerView);
        indicatorsContainer.innerHTML = '';
        
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('button');
            indicator.classList.add('w-3', 'h-3', 'rounded-full', 'transition-all', 'duration-300');
            indicator.classList.add(i === currentIndex ? 'bg-accent' : 'bg-gray-300');
            indicator.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }
    }
    
    // Update carousel position
    function updateCarousel() {
        const cardWidth = 100 / cardsPerView;
        const translateX = -(currentIndex * cardWidth);
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        const indicators = indicatorsContainer.querySelectorAll('button');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('bg-accent', index === currentIndex);
            indicator.classList.toggle('bg-gray-300', index !== currentIndex);
        });
    }
    
    // Go to specific slide
    function goToSlide(index) {
        const maxIndex = Math.ceil(cards.length / cardsPerView) - 1;
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        updateCarousel();
    }
    
    // Next slide
    function nextSlide() {
        const maxIndex = Math.ceil(cards.length / cardsPerView) - 1;
        currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
        updateCarousel();
    }
    
    // Previous slide
    function prevSlide() {
        const maxIndex = Math.ceil(cards.length / cardsPerView) - 1;
        currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
        updateCarousel();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto-play (optional)
    let autoPlay = setInterval(nextSlide, 5000);
    
    // Pause auto-play on hover
    carousel.addEventListener('mouseenter', () => clearInterval(autoPlay));
    carousel.addEventListener('mouseleave', () => {
        autoPlay = setInterval(nextSlide, 5000);
    });
    
    // Handle resize
    window.addEventListener('resize', updateCardsPerView);
    
    // Initialize
    updateCardsPerView();
}


// Typing Animation for Main Heading
function initTypingAnimation() {
    const titleElement = document.querySelector('h1 .text-accent');
    const subtitleElement = document.querySelector('h2.text-accent');
    
    if (!titleElement || !subtitleElement) return;
    
    const originalText = titleElement.textContent;
    
    // Set fixed width to prevent layout shift
    const tempSpan = document.createElement('span');
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.position = 'absolute';
    tempSpan.style.fontSize = window.getComputedStyle(titleElement).fontSize;
    tempSpan.style.fontWeight = window.getComputedStyle(titleElement).fontWeight;
    tempSpan.style.fontFamily = window.getComputedStyle(titleElement).fontFamily;
    tempSpan.textContent = originalText;
    document.body.appendChild(tempSpan);
    
    const textWidth = tempSpan.offsetWidth;
    document.body.removeChild(tempSpan);
    
    // Set minimum width to prevent text shifting
    titleElement.style.minWidth = textWidth + 'px';
    titleElement.style.display = 'inline-block';
    
    // Hide subtitle initially
    subtitleElement.style.opacity = '0';
    subtitleElement.style.transform = 'translateY(10px)';
    subtitleElement.style.transition = 'all 0.5s ease';
    
    // Start typing animation
    titleElement.textContent = '';
    titleElement.style.borderRight = '3px solid #F97316';
    titleElement.style.animation = 'blink 1s infinite';
    
    let i = 0;
    const typingSpeed = 100;
    
    function typeWriter() {
        if (i < originalText.length) {
            titleElement.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            // Remove cursor and show subtitle
            setTimeout(() => {
                titleElement.style.borderRight = 'none';
                titleElement.style.animation = 'none';
                
                // Animate in the subtitle
                subtitleElement.style.opacity = '1';
                subtitleElement.style.transform = 'translateY(0)';
            }, 1000);
        }
    }
    
    // Start typing after page loads
    setTimeout(typeWriter, 1000);
}

// Projects Carousel Functionality
function initProjectsCarousel() {
    const carousel = document.getElementById('projects-carousel');
    const track = document.getElementById('projects-track');
    const prevBtn = document.getElementById('projects-prev');
    const nextBtn = document.getElementById('projects-next');
    const indicatorsContainer = document.getElementById('projects-indicators');
    
    if (!carousel || !track || !prevBtn || !nextBtn) return;
    
    const cards = track.querySelectorAll('.project-card');
    let currentIndex = 0;
    let cardsPerView = 3;
    
    // Responsive cards per view
    function updateCardsPerView() {
        if (window.innerWidth < 768) {
            cardsPerView = 1;
        } else if (window.innerWidth < 1024) {
            cardsPerView = 2;
        } else {
            cardsPerView = 3;
        }
        updateCarousel();
        createIndicators();
    }
    
    // Create indicators
    function createIndicators() {
        const totalSlides = Math.ceil(cards.length / cardsPerView);
        indicatorsContainer.innerHTML = '';
        
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('button');
            indicator.classList.add('w-3', 'h-3', 'rounded-full', 'transition-all', 'duration-300');
            indicator.classList.add(i === currentIndex ? 'bg-accent' : 'bg-gray-300');
            indicator.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }
    }
    
    // Update carousel position
    function updateCarousel() {
        const cardWidth = 100 / cardsPerView;
        const translateX = -(currentIndex * cardWidth);
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        const indicators = indicatorsContainer.querySelectorAll('button');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('bg-accent', index === currentIndex);
            indicator.classList.toggle('bg-gray-300', index !== currentIndex);
        });
    }
    
    // Go to specific slide
    function goToSlide(index) {
        const maxIndex = Math.ceil(cards.length / cardsPerView) - 1;
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        updateCarousel();
    }
    
    // Next slide
    function nextSlide() {
        const maxIndex = Math.ceil(cards.length / cardsPerView) - 1;
        currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
        updateCarousel();
    }
    
    // Previous slide
    function prevSlide() {
        const maxIndex = Math.ceil(cards.length / cardsPerView) - 1;
        currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
        updateCarousel();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto-play (optional) - less frequent than blogs
    let autoPlay = setInterval(nextSlide, 7000);
    
    // Pause auto-play on hover
    carousel.addEventListener('mouseenter', () => clearInterval(autoPlay));
    carousel.addEventListener('mouseleave', () => {
        autoPlay = setInterval(nextSlide, 7000);
    });
    
    // Handle resize
    window.addEventListener('resize', updateCardsPerView);
    
    // Initialize
    updateCardsPerView();
}

// Search Functionality for Projects and Blogs
function initSearch() {
    // Project Search
    const projectSearchInput = document.getElementById('project-search');
    if (projectSearchInput) {
        let searchTimeout;
        projectSearchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                searchProjects(e.target.value.toLowerCase());
            }, 300); // Debounce search for better performance
        });
    }

    // Blog Search
    const blogSearchInput = document.getElementById('blog-search');
    if (blogSearchInput) {
        let searchTimeout;
        blogSearchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                searchBlogs(e.target.value.toLowerCase());
            }, 300); // Debounce search for better performance
        });
    }
}

function searchProjects(searchTerm) {
    const projects = document.querySelectorAll('.project-post');
    const activeCategory = document.querySelector('.project-filter-btn.active')?.getAttribute('data-category') || 'all';
    
    projects.forEach(project => {
        const projectTitle = project.querySelector('.card-title')?.textContent.toLowerCase() || '';
        const projectDescription = project.querySelector('p')?.textContent.toLowerCase() || '';
        const projectCategory = project.getAttribute('data-category');
        
        // Check if project matches search term and current category filter
        const matchesSearch = searchTerm === '' || 
                            projectTitle.includes(searchTerm) || 
                            projectDescription.includes(searchTerm);
        const matchesCategory = activeCategory === 'all' || projectCategory === activeCategory;
        
        if (matchesSearch && matchesCategory) {
            project.style.display = 'flex';
            setTimeout(() => project.classList.add('visible'), 10);
        } else {
            project.classList.remove('visible');
            setTimeout(() => project.style.display = 'none', 300);
        }
    });
}

function searchBlogs(searchTerm) {
    const blogs = document.querySelectorAll('.blog-post');
    const activeCategory = document.querySelector('.blog-filter-btn.active')?.getAttribute('data-category') || 'all';
    
    blogs.forEach(blog => {
        const blogTitle = blog.querySelector('.card-title')?.textContent.toLowerCase() || '';
        const blogDescription = blog.querySelector('p')?.textContent.toLowerCase() || '';
        const blogCategory = blog.getAttribute('data-category');
        
        // Check if blog matches search term and current category filter
        const matchesSearch = searchTerm === '' || 
                            blogTitle.includes(searchTerm) || 
                            blogDescription.includes(searchTerm);
        const matchesCategory = activeCategory === 'all' || blogCategory === activeCategory;
        
        if (matchesSearch && matchesCategory) {
            blog.style.display = 'flex';
            setTimeout(() => blog.classList.add('visible'), 10);
        } else {
            blog.classList.remove('visible');
            setTimeout(() => blog.style.display = 'none', 300);
        }
    });
}

// Initialize search functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initSearch();
});
