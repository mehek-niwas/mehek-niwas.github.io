// script.js

// image upon hover
const triggers = document.querySelectorAll('.trigger');

triggers.forEach(trigger => {
  const targetSet = trigger.getAttribute('data-hover');
  const targetImages = document.querySelectorAll(`.${targetSet}`);

  // 1. Mouse Enter: Only show if not already sticky
  trigger.addEventListener('mouseenter', () => {
    targetImages.forEach(img => {
      if (!img.classList.contains('is-active')) {
        img.classList.add('show-piece');
      }
    });
  });

  // 2. Mouse Leave: Only hide if not already sticky
  trigger.addEventListener('mouseleave', () => {
    targetImages.forEach(img => {
      if (!img.classList.contains('is-active')) {
        img.classList.remove('show-piece');
      }
    });
  });

  // 3. Click: The Master Toggle
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    
    targetImages.forEach(img => {
      // If it's already sticky, remove everything to hide it
      if (img.classList.contains('is-active')) {
        img.classList.remove('is-active');
        img.classList.remove('show-piece');
      } else {
        // Otherwise, make it sticky
        img.classList.add('is-active');
        img.classList.add('show-piece');
      }
    });
  });
});


// nav button page links
document.querySelectorAll("nav button").forEach(btn => {
  btn.addEventListener("click", () => {
    alert(`navigate to ${btn.innerText}`);
  });
});

// Scroll to top button
const scrollToTopBtn = document.getElementById('scrollToTop');

// Show/hide button based on scroll position
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 200) {
    scrollToTopBtn.classList.add('visible');
  } else {
    scrollToTopBtn.classList.remove('visible');
  }
});

// Scroll to top when clicked
scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

