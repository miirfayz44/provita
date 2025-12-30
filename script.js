document.addEventListener('DOMContentLoaded', function() {
  // Get the hamburger menu elements
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const hamburgerIcon = document.querySelector('.hamburger-icon');
  const mainNav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.main-nav a');
  const body = document.body;
  const header = document.querySelector('.header');
  
  // Calculate menu height for smooth animation
  function calculateMenuHeight() {
    if (window.innerWidth <= 1024) {
      const navHeight = mainNav.scrollHeight;
      document.documentElement.style.setProperty('--menu-height', `${navHeight}px`);
    }
  }

  // Toggle menu function
  function toggleMenu() {
    hamburgerIcon.classList.toggle('active');
    mainNav.classList.toggle('active');
    body.classList.toggle('menu-open');
    
    // Add/remove padding to body when menu is open/closed
    if (mainNav.classList.contains('active')) {
      document.body.style.paddingTop = mainNav.offsetHeight + 'px';
    } else {
      document.body.style.paddingTop = '0';
    }
  }

  // Add click event to hamburger menu
  if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleMenu();
    });
  }

  // Close menu when clicking on a navigation link
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (hamburgerIcon.classList.contains('active')) {
        e.preventDefault();
        toggleMenu();
        // Wait for the menu to close before navigating
        setTimeout(() => {
          window.location.href = link.getAttribute('href');
        }, 400);
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (mainNav.classList.contains('active') && 
        !e.target.closest('.main-nav') && 
        !e.target.closest('.hamburger-menu')) {
      toggleMenu();
    }
  });

  // Close menu when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('active')) {
      toggleMenu();
    }
  });

  // Handle window resize
  function handleResize() {
    if (window.innerWidth > 1024) {
      // Reset styles when resizing to desktop
      hamburgerIcon.classList.remove('active');
      mainNav.classList.remove('active');
      body.classList.remove('menu-open');
      document.body.style.paddingTop = '0';
    } else {
      // Recalculate menu height on resize
      calculateMenuHeight();
    }
  }

  // Initial setup
  calculateMenuHeight();
  window.addEventListener('resize', handleResize);
  window.addEventListener('orientationchange', calculateMenuHeight);
});
