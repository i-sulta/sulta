document.addEventListener('DOMContentLoaded', () => {

    // Hamburger menu toggle functionality
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Smooth scrolling for navigation links
    const navLinksSmooth = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinksSmooth.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Scroll-to-top button functionality
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Simple scroll reveal animation for sections
    const sections = document.querySelectorAll('.content-section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // Animated roles typing effect
    const roles = ["Full-Stack Developer", "Cybersecurity", "Information Security"];
    let roleIndex = 0;
    let charIndex = 0;
    const roleElement = document.querySelector('.animated-role');

    function typeRole() {
        if (roleElement && charIndex < roles[roleIndex].length) {
            roleElement.textContent += roles[roleIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeRole, 100);
        } else {
            setTimeout(eraseRole, 2000);
        }
    }

    function eraseRole() {
        if (roleElement && charIndex > 0) {
            roleElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseRole, 50);
        } else {
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeRole, 500);
        }
    }

    if (roleElement) {
        typeRole();
    }

    // Contact Form Validation for Email/Phone
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const emailInput = contactForm.querySelector('input[name="email"]');
        const phoneInput = contactForm.querySelector('input[name="phone"]');

        contactForm.addEventListener('submit', function(event) {
            // Check if both email and phone are empty
            if (!emailInput.value.trim() && !phoneInput.value.trim()) {
                event.preventDefault(); // Stop the form from submitting
                // Set a custom validation message on the phone field
                phoneInput.setCustomValidity('Please provide either your email or phone number.');
                // Trigger the browser's validation UI
                phoneInput.reportValidity();
            } else {
                // Clear any custom validation message if one of them is filled
                phoneInput.setCustomValidity('');
            }
        });

        // Add event listeners to clear the custom message as soon as the user starts typing
        const clearValidation = () => {
            phoneInput.setCustomValidity('');
        };

        emailInput.addEventListener('input', clearValidation);
        phoneInput.addEventListener('input', clearValidation);
    }

});
