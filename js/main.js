// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const mobileNavToggle = document.createElement('button');
    mobileNavToggle.className = 'mobile-nav-toggle';
    mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const navLinks = document.querySelector('.nav-links');
    const topNav = document.querySelector('.top-nav');
    const mainHeader = document.querySelector('.main-header');
    
    if (topNav && navLinks) {
        topNav.insertBefore(mobileNavToggle, navLinks);
        
        mobileNavToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileNavToggle.classList.toggle('active');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll event listener for header
    if (mainHeader) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                mainHeader.classList.remove('scroll-up');
                return;
            }
            
            if (currentScroll > lastScroll && !mainHeader.classList.contains('scroll-down')) {
                // Scroll Down
                mainHeader.classList.remove('scroll-up');
                mainHeader.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && mainHeader.classList.contains('scroll-down')) {
                // Scroll Up
                mainHeader.classList.remove('scroll-down');
                mainHeader.classList.add('scroll-up');
            }
            lastScroll = currentScroll;
        });
    }

    // Add animation to feature cards on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });

    // Form validation for sign in and registration
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Here you would typically send the form data to your backend
            console.log('Form submitted:', formObject);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Form submitted successfully!';
            this.appendChild(successMessage);
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        });
    });

    // Add loading state to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                
                // Simulate loading state
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.innerHTML = this.getAttribute('data-original-text') || 'Submit';
                }, 2000);
            }
        });
    });
}); 
