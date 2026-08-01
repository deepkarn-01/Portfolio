// ---- Preloader ----
  const preloader = document.getElementById('preloader');
  preloader.addEventListener('click', () => {
    preloader.classList.add('hidden');
    startAnimations();
  });

  // ---- Custom Cursor ----
  const cursor = document.getElementById('cursor');
  document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
  });
  document.querySelectorAll('a, .project-card, .skill-row, .skill-badge, .preloader, .hero-photo').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('expand'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('expand'));
  });

  // ---- Lenis Smooth Scroll ----
  let lenis;
  if (window.Lenis) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // ---- GSAP Animations ----
  function startAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero timeline
    // Animate preloader name & hint
    gsap.fromTo('.pl-name', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, delay: 1.5, ease: 'power3.out' });
    gsap.fromTo('.pl-hint', { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 2, ease: 'power3.out' });

    const heroTl = gsap.timeline();
    heroTl
      .to('.hero .gsap-fade', { opacity: 1, duration: 0.8, ease: 'power3.out' })
      .to('#hero-photo', { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }, '-=0.6')
      .to('.hero .gsap-fade-up', { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }, '-=0.8');

    // Section fade-ups
    gsap.utils.toArray('section .gsap-fade-up, section .gsap-fade').forEach(el => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      });
    });

    // Animated counters
    document.querySelectorAll('.stat-num').forEach(el => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          const target = parseInt(el.dataset.target);
          gsap.to(el, {
            innerText: target,
            duration: 2,
            snap: { innerText: 1 },
            ease: 'power2.out',
          });
        }
      });
    });

    // Navbar shrink on scroll
    const navbar = document.getElementById('navbar');
    ScrollTrigger.create({
      start: 'top -50',
      end: 99999,
      onUpdate: (self) => {
        if (self.scroll() > 50) {
          navbar.classList.add('py-3');
          navbar.classList.remove('py-5');
        } else {
          navbar.classList.add('py-5');
          navbar.classList.remove('py-3');
        }
      }
    });
  }

  // ---- Live IST Clock ----
  function updateClock() {
    const now = new Date();
    const ist = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const h = String(ist.getHours()).padStart(2, '0');
    const m = String(ist.getMinutes()).padStart(2, '0');
    const s = String(ist.getSeconds()).padStart(2, '0');
    document.getElementById('footer-time').textContent = h + ':' + m + ':' + s + ' IST';
  }
  setInterval(updateClock, 1000);
  updateClock();