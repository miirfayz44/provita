// Wait for the entire page to load
window.addEventListener('load', function() {
  // Get all components
  const components = document.querySelectorAll('[class^="component-"]');
  
  // Function to check if element is in viewport
  const isInViewport = function(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
    );
  };

  // Function to handle scroll events with debounce
  let isScrolling = false;
  const handleScroll = function() {
    if (!isScrolling) {
      window.requestAnimationFrame(function() {
        components.forEach(function(component) {
          if (isInViewport(component)) {
            component.classList.add('visible');
          }
        });
        isScrolling = false;
      });
      isScrolling = true;
    }
  };

  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);
  
  // Initial check
  handleScroll();
});
