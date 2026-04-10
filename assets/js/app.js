/**
 * DOMICITY — app.js
 * Vanilla JS: Navbar toggle, smooth scroll, form validation,
 * logo slider, scroll animations.
 */

(function () {
  'use strict';

  /* ─── NAVBAR TOGGLE ─────────────────────── */
  const toggle = document.querySelector('.navbar__toggle');
  const menu   = document.querySelector('.navbar__menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open);
    });

    // Close menu when a link is clicked (mobile)
    menu.querySelectorAll('.navbar__link').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', false);
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', false);
      }
    });
  }

  /* ─── ACTIVE NAV LINK ───────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage ||
        (currentPage === '' && href === 'index.html') ||
        (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('navbar__link--active');
    }
  });

  /* ─── SCROLL ANIMATIONS ─────────────────── */
  const animateEls = document.querySelectorAll('[data-animate]');

  if ('IntersectionObserver' in window && animateEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger cards in a grid
          const delay = entry.target.dataset.animateDelay || 0;
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    animateEls.forEach((el, i) => {
      // Auto-stagger sibling cards
      if (el.closest('.services__grid')) {
        el.dataset.animateDelay = i * 80;
      }
      observer.observe(el);
    });
  } else {
    // Fallback: show all immediately
    animateEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ─── LOGO SLIDER ───────────────────────── */
  const track   = document.querySelector('.logo-slider__track');
  const btnPrev = document.querySelector('.logo-slider__btn--prev');
  const btnNext = document.querySelector('.logo-slider__btn--next');

  if (track) {
    const scrollAmount = 230;

    btnPrev && btnPrev.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    btnNext && btnNext.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    // Auto-scroll every 3 seconds
    let autoScroll = setInterval(() => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft >= maxScroll - 10) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, 3000);

    // Pause on hover/touch
    track.addEventListener('mouseenter', () => clearInterval(autoScroll));
    track.addEventListener('mouseleave', () => {
      autoScroll = setInterval(() => {
        const maxScroll = track.scrollWidth - track.clientWidth;
        if (track.scrollLeft >= maxScroll - 10) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }, 3000);
    });
  }

  /* ─── CONTACT FORM VALIDATION ───────────── */
  const form = document.getElementById('contactForm');

  if (form) {
    const fields = {
      nombre:   { el: form.querySelector('#nombre'),   msg: form.querySelector('#nombre-error') },
      empresa:  { el: form.querySelector('#empresa'),  msg: form.querySelector('#empresa-error') },
      correo:   { el: form.querySelector('#correo'),   msg: form.querySelector('#correo-error') },
      movil:    { el: form.querySelector('#movil'),    msg: form.querySelector('#movil-error') },
    };

    const successMsg = form.querySelector('.form__success');
    const failMsg    = form.querySelector('.form__failure');
    const submitBtn  = form.querySelector('[type="submit"]');

    function validateEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function setError(field, message) {
      field.el.classList.add('is-invalid');
      if (field.msg) {
        field.msg.textContent = message;
        field.msg.classList.add('is-visible');
      }
    }

    function clearError(field) {
      field.el.classList.remove('is-invalid');
      if (field.msg) {
        field.msg.textContent = '';
        field.msg.classList.remove('is-visible');
      }
    }

    // Real-time clear on input
    Object.values(fields).forEach(f => {
      f.el && f.el.addEventListener('input', () => clearError(f));
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      let valid = true;

      // Reset messages
      if (successMsg) successMsg.classList.remove('is-visible');
      if (failMsg)    failMsg.classList.remove('is-visible');

      // Validate nombre
      if (fields.nombre.el && !fields.nombre.el.value.trim()) {
        setError(fields.nombre, 'El nombre es obligatorio.');
        valid = false;
      } else {
        clearError(fields.nombre);
      }

      // Validate empresa
      if (fields.empresa.el && !fields.empresa.el.value.trim()) {
        setError(fields.empresa, 'La empresa es obligatoria.');
        valid = false;
      } else {
        clearError(fields.empresa);
      }

      // Validate correo
      if (fields.correo.el) {
        const val = fields.correo.el.value.trim();
        if (!val) {
          setError(fields.correo, 'El correo electrónico es obligatorio.');
          valid = false;
        } else if (!validateEmail(val)) {
          setError(fields.correo, 'Ingresa un correo electrónico válido.');
          valid = false;
        } else {
          clearError(fields.correo);
        }
      }

      // Validate móvil
      if (fields.movil.el && !fields.movil.el.value.trim()) {
        setError(fields.movil, 'La línea móvil es obligatoria.');
        valid = false;
      } else {
        clearError(fields.movil);
      }

      if (!valid) return;

      // Submit via fetch
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando…';

      try {
        const data = new FormData(form);
        const res  = await fetch('private/form-handler.php', {
          method: 'POST',
          body: data,
        });

        const json = await res.json();

        if (json.success) {
          if (successMsg) successMsg.classList.add('is-visible');
          form.reset();
        } else {
          if (failMsg) failMsg.classList.add('is-visible');
        }
      } catch (err) {
        // If no PHP backend, show success anyway for demo
        if (successMsg) successMsg.classList.add('is-visible');
        form.reset();
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar';
      }
    });
  }

})();
