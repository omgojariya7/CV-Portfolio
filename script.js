document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links li');

  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  // Close menu when clicking on nav items (mobile)
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Calculate the scroll position, accounting for fixed header
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
          document.body.classList.remove('no-scroll');
        }
      }
    });
  });

  // Form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Here you would typically send the form data to a server
      // For this example, we'll just show an alert
      alert('Thank you for your message! I will get back to you soon.');
      this.reset();
    });
  }

  // Add active class to current section in navigation
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links a');

  function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const headerHeight = document.querySelector('header').offsetHeight;
      
      if (window.pageYOffset >= (sectionTop - headerHeight - 50)) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  }

  // Run once on load
  updateActiveNav();
  
  // Then on scroll
  window.addEventListener('scroll', updateActiveNav);

  // Touch device detection and adjustments
  function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints;
  }

  if (isTouchDevice()) {
    document.body.classList.add('touch-device');
    
    // Make flip cards work on touch devices
    const flipCards = document.querySelectorAll('.skill-flip-card');
    flipCards.forEach(card => {
      card.addEventListener('click', function() {
        this.querySelector('.skill-flip-inner').classList.toggle('flipped');
      });
    });
  }
});