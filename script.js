// script.js

// Cache all triggers and their associated images upfront
const triggers = document.querySelectorAll('.trigger');
const triggerMap = new Map(); // Maps trigger element to its images array
let activeTrigger = null; // Track currently active trigger

// Build the trigger-image mapping once
triggers.forEach(trigger => {
  const targetSet = trigger.getAttribute('data-hover');
  const targetImages = Array.from(document.querySelectorAll(`.${targetSet}`));
  triggerMap.set(trigger, targetImages);
});

// Helper function to hide an image set
function hideImageSet(trigger) {
  const images = triggerMap.get(trigger);
  if (images) {
    trigger.classList.remove('clicked');
    images.forEach(img => {
      img.classList.remove('is-active', 'show-piece');
    });
  }
}

// Helper function to show an image set
function showImageSet(trigger) {
  const images = triggerMap.get(trigger);
  if (images) {
    trigger.classList.add('clicked');
    images.forEach(img => {
      img.classList.add('is-active', 'show-piece');
    });
  }
}

// Helper function to hide all image sets except a specific one
function hideAllExcept(exceptTrigger) {
  triggers.forEach(otherTrigger => {
    if (otherTrigger !== exceptTrigger) {
      const images = triggerMap.get(otherTrigger);
      images.forEach(img => {
        img.classList.remove('show-piece', 'is-active');
      });
    }
  });
}

// Set up event listeners for each trigger
triggers.forEach(trigger => {
  const targetImages = triggerMap.get(trigger);

  // 1. Mouse Enter: Hide all other images (including clicked ones), show only this trigger's images
  trigger.addEventListener('mouseenter', () => {
    // Hide all other image sets (including clicked ones)
    hideAllExcept(trigger);
    // Show this trigger's images
    targetImages.forEach(img => {
      img.classList.add('show-piece');
    });
  });

  // 2. Mouse Leave: Hide this trigger's images if not clicked, restore clicked set if exists
  trigger.addEventListener('mouseleave', () => {
    // If this trigger is not the active one, hide its images
    if (trigger !== activeTrigger) {
      targetImages.forEach(img => {
        img.classList.remove('show-piece');
      });
      // Restore the active trigger's images if one exists
      if (activeTrigger) {
        showImageSet(activeTrigger);
      }
    }
  });

  // 3. Click: The Master Toggle
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Hide previously active trigger if different
    if (activeTrigger && activeTrigger !== trigger) {
      hideImageSet(activeTrigger);
    }
    
    // Toggle current trigger
    const isCurrentlyActive = trigger === activeTrigger;
    if (isCurrentlyActive) {
      hideImageSet(trigger);
      activeTrigger = null;
    } else {
      showImageSet(trigger);
      activeTrigger = trigger;
    }
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

// Handle clicks on underlined text (for non-trigger elements)
document.querySelectorAll('u:not(.trigger)').forEach(uElement => {
  uElement.addEventListener('click', () => {
    uElement.classList.toggle('clicked');
  });
});

// Collapsible left sidebar (used on technical-blog page)
window.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.sidebar');
  const toggle = document.querySelector('.sidebar-toggle');

  if (!sidebar || !toggle) return;

  toggle.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
});

// Choose initial image set on page load in order (excluding the "describe" one)
window.addEventListener('DOMContentLoaded', () => {
  const eligibleTriggers = Array.from(triggers).filter(
    trigger => trigger.getAttribute('data-hover') !== 'describe-piece'
  );

  if (eligibleTriggers.length > 0) {
    // Remember where we left off across page loads
    const storageKey = 'mehek-initial-trigger-index';
    const lastIndex = parseInt(localStorage.getItem(storageKey) || '0', 10);
    const nextIndex = Number.isNaN(lastIndex)
      ? 0
      : (lastIndex + 1) % eligibleTriggers.length;

    const chosenTrigger = eligibleTriggers[nextIndex];
    localStorage.setItem(storageKey, String(nextIndex));

    // Set this trigger as the active one and show its images
    if (activeTrigger && activeTrigger !== chosenTrigger) {
      hideImageSet(activeTrigger);
    }

    showImageSet(chosenTrigger);
    activeTrigger = chosenTrigger;
  }
});

