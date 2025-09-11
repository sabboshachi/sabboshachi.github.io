// Loading Screen Control
window.addEventListener('load', function() {
  const loadingScreen = document.getElementById('loadingScreen');
  
  // Maximum loading time to show the rocket animation (2 seconds)
  const maxLoadTime = 2000;
  const startTime = Date.now();
  
  function hideLoadingScreen() {
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, maxLoadTime - elapsedTime);
    
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      
      // Remove the loading screen from DOM after transition
      setTimeout(() => {
        if (loadingScreen.parentNode) {
          loadingScreen.parentNode.removeChild(loadingScreen);
        }
      }, 800); // Match the CSS transition duration
    }, remainingTime);
  }
  
  // Hide loading screen when everything is loaded
  hideLoadingScreen();
});

// Animations
AOS.init({
  anchorPlacement: 'top-left',
  duration: 1000,
  once: true // Animate only once when scrolled into view
});

// Enhanced Fixed Navbar with scroll effects
document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.getElementById('navbar-sticky');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  
  // Add scroll effect to navbar
  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', handleScroll);
  
  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove('active'));
      // Add active class to clicked link
      this.classList.add('active');
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const navbarHeight = navbar ? navbar.offsetHeight : 80;
        const offsetTop = targetElement.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Smooth scrolling for brand name link (to top)
  const brandLink = document.querySelector('.brand-link');
  if (brandLink) {
    brandLink.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all nav links when going to top
      navLinks.forEach(l => l.classList.remove('active'));
      
      // Scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Navbar scroll effects
  let lastScrollTop = 0;
  let ticking = false;
  
  function updateNavbar() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (navbar) {
      // Add scrolled class when user scrolls down
      if (scrollTop > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      // Highlight active section
      highlightActiveSection();
    }
    
    lastScrollTop = scrollTop;
    ticking = false;
  }
  
  function highlightActiveSection() {
    const sections = document.querySelectorAll('[id]');
    const navbarHeight = navbar ? navbar.offsetHeight : 80;
    let activeSection = null;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - navbarHeight - 50;
      const sectionBottom = sectionTop + section.offsetHeight;
      const scrollPos = window.pageYOffset;
      
      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        const id = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${id}"]`);
        
        if (correspondingLink) {
          activeSection = correspondingLink;
        }
      }
    });
    
    // Remove active class from all links first
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Only add active class if we found a specific section
    if (activeSection) {
      activeSection.classList.add('active');
    }
    // If we're at the very top (landing page), don't highlight any nav item
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick);
  
  // Initial call
  updateNavbar();
  
  // Scroll to Top Button Functionality
  const scrollToTopBtn = document.getElementById('scrollToTop');
  
  if (scrollToTopBtn) {
    // Show/hide scroll to top button based on scroll position
    function toggleScrollToTopButton() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > 300) {
        scrollToTopBtn.classList.add('show');
      } else {
        scrollToTopBtn.classList.remove('show');
      }
    }
    
    // Scroll to top functionality
    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    
    // Event listeners
    window.addEventListener('scroll', toggleScrollToTopButton);
    scrollToTopBtn.addEventListener('click', scrollToTop);
    
  // Initial call
  toggleScrollToTopButton();
  }

  // ===============================
  // MOBILE HAMBURGER MENU FUNCTIONALITY
  // ===============================
  
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  const body = document.body;
  
  if (mobileMenuBtn && navMenu && mobileMenuOverlay) {
    // Toggle mobile menu
    function toggleMobileMenu() {
      const isOpen = navMenu.classList.contains('mobile-open');
      
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    }
    
    // Open mobile menu
    function openMobileMenu() {
      // Reset any previous animations
      navMenu.style.animation = '';
      
      // Add classes for opening
      mobileMenuBtn.classList.add('active');
      mobileMenuOverlay.classList.add('active');
      body.style.overflow = 'hidden'; // Prevent background scrolling
      
      // Show the menu first
      navMenu.style.display = 'flex';
      
      // Force reflow before adding the animation class
      navMenu.offsetHeight;
      
      // Add mobile-open class to trigger animations
      navMenu.classList.add('mobile-open');
      
      // Ensure slide-in animation
      navMenu.style.transform = 'translateX(0)';
    }
    
    // Close mobile menu
    function closeMobileMenu() {
      // Remove active states
      mobileMenuBtn.classList.remove('active');
      mobileMenuOverlay.classList.remove('active');
      body.style.overflow = ''; // Restore scrolling
      
      // Add slide-out animation
      navMenu.style.animation = 'slideOutToRight 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards';
      navMenu.style.transform = 'translateX(100%)';
      
      // Remove mobile-open class immediately to stop item animations
      navMenu.classList.remove('mobile-open');
      
      // Hide menu after animation completes
      setTimeout(() => {
        navMenu.style.display = 'none';
        navMenu.style.animation = '';
      }, 400);
    }
    
    // Event listeners
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    
    // Close menu when clicking on navigation links
    const mobileNavLinks = navMenu.querySelectorAll('.nav-link');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });
    
    // Close menu on window resize if screen becomes larger
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        closeMobileMenu();
      }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('mobile-open')) {
        closeMobileMenu();
      }
    });
  }
});// Add your additional javascript here
