/* ==========================================================================
   ZENTORA - EDITORIAL LIGHT WEBSITE LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================================================
  // 1. NAVIGATION SCROLL & HAMBURGER TOGGLE
  // ==========================================================================
  const header = document.querySelector('header');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky nav class on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu open/close
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });
  }

  // Close mobile navigation when links are clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navToggle.classList.contains('open')) {
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
      }
    });
  });

  // ==========================================================================
  // 2. SCROLL REVEALS (IntersectionObserver)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(element => {
    revealOnScroll.observe(element);
  });



  // ==========================================================================
  // 4. ₹399 PLAN EMAIL BOOKING FORM
  // ==========================================================================
  const planForm = document.querySelector('.plan-form');
  
  if (planForm) {
    planForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const clientName = document.querySelector('#plan-name').value.trim();
      const businessType = document.querySelector('#plan-business').value.trim();

      if (!clientName || !businessType) {
        alert("Please fill in both fields to request the plan.");
        return;
      }

      // Format direct mailto draft
      const emailSubject = `Order: ₹399 Website Plan - ${clientName}`;
      const emailBody = `Hi Zentora team,\n\nI would like to order the ₹399 Website Plan.\n\n- Name: ${clientName}\n- Business Type: ${businessType}\n\nPlease contact me to initiate the design process.`;
      
      const mailtoUrl = `mailto:zentora_X100@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      
      // Trigger client
      window.location.href = mailtoUrl;

      // Visual feedback
      const submitBtn = planForm.querySelector('.plan-submit-btn');
      const originalHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Brief Prepared! Opening mail client...</span>`;
      
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHtml;
        planForm.reset();
      }, 2500);
    });
  }

  // ==========================================================================
  // 5. FAQ ACCORDION
  // ==========================================================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-panel').style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  // ==========================================================================
  // 6. GENERAL CONTACT FORM SUBMISSION
  // ==========================================================================
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.querySelector('#name').value.trim();
      const email = document.querySelector('#email').value.trim();
      const service = document.querySelector('#service').value;
      const message = document.querySelector('#message').value.trim();

      if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
      }

      // Format direct mailto draft
      const emailSubject = `Zentora Service Brief: ${service} - ${name}`;
      const emailBody = `Name: ${name}\nEmail: ${email}\nService Brief: ${service}\n\nProject Notes:\n${message}`;
      
      const mailtoUrl = `mailto:zentora_X100@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      
      // Trigger client
      window.location.href = mailtoUrl;

      // Visual success button response
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Brief Prepared! Opening mail client...</span>`;
      
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
      }, 3000);
    });
  }
});
