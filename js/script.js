// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    const header = document.querySelector('.main-header');
    const heroContent = document.querySelector('.hero-content');
    const projectCards = document.querySelectorAll('.project-card');

    
    const handleScroll = () => {
        /* ---
           1. Navbar Scroll Effect (Fade)
           --- */
        
        // Add '.scrolled' class to header after 50px scroll
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        /* ---
           2. Hero Parallax & Fade Effect
           --- */
        
        let scrollPosition = window.scrollY;
        
        // Only apply parallax if the hero section is somewhat in view
        if (scrollPosition < window.innerHeight) {
            // Move hero content up at 30% of scroll speed for depth
            heroContent.style.transform = `translateY(${scrollPosition * 0.3}px)`;
            
            // Fade out hero content as user scrolls down
            heroContent.style.opacity = 1 - (scrollPosition / (window.innerHeight / 1.5));
        }
    };

    // Attach the scroll listener for Navbar and Parallax
    window.addEventListener('scroll', handleScroll);


    /* ---
       3. Project Card Fade-in on View (Intersection Observer)
       --- */
    
    // This is more performant than listening to the scroll event for everything
    
    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // When the element is in view
            if (entry.isIntersecting) {
                // Add the 'visible' class to trigger the CSS animation
                entry.target.classList.add('visible');
                // Stop observing the element so the animation doesn't re-run
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe each project card
    projectCards.forEach(card => {
        observer.observe(card);
    });

});