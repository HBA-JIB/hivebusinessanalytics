// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            form.reset();
            formMessage.style.display = 'block';
            formMessage.style.color = 'green';
            formMessage.textContent = 'Thank you! Your message has been sent.';
        } else {
            response.json().then(data => {
                formMessage.style.display = 'block';
                formMessage.style.color = 'red';
                formMessage.textContent = data.errors ? data.errors.map(err => err.message).join(", ") : 'Oops! Something went wrong.';
            });
        }
    }).catch(() => {
        formMessage.style.display = 'block';
        formMessage.style.color = 'red';
        formMessage.textContent = 'Oops! There was a problem submitting your form.';
    });
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    const body = document.body;
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking a nav link on mobile
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    body.classList.remove('menu-open');
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            const isClickInsideNav = navMenu.contains(e.target);
            const isClickOnHamburger = hamburger.contains(e.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }

    // Handle the contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // Form submission is handled by the handleSubmit function
        // which is defined separately and called in the form's onsubmit attribute
    }

    // Gallery functionality removed

    // Smooth scrolling for navigation links
    const navScrollLinks = document.querySelectorAll('nav a, .footer-links a, .footer-services a');
    navScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});