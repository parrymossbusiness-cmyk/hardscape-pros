(function () {
  var header = document.getElementById('site-header');
  var hamburger = document.getElementById('hamburger-btn');
  var mobileNav = document.getElementById('mobile-nav');
  var navScrim = document.getElementById('nav-scrim');
  var mobileClose = document.getElementById('mobile-nav-close');

  function onScroll() {
    if (!header) return;
    if (window.scrollY > 12) {
      header.classList.add('is-solid');
    } else {
      header.classList.remove('is-solid');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function openMenu() {
    mobileNav.classList.add('is-open');
    navScrim.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobileNav.classList.remove('is-open');
    navScrim.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      var isOpen = mobileNav.classList.contains('is-open');
      if (isOpen) { closeMenu(); } else { openMenu(); }
    });
  }
  if (mobileClose) { mobileClose.addEventListener('click', closeMenu); }
  if (navScrim) { navScrim.addEventListener('click', closeMenu); }

  /* Close the mobile panel after a real link navigation is already underway;
     this never calls preventDefault so taps always navigate. */
  if (mobileNav) {
    var mobileLinks = mobileNav.querySelectorAll('a[href]');
    for (var i = 0; i < mobileLinks.length; i++) {
      mobileLinks[i].addEventListener('click', function () {
        window.setTimeout(closeMenu, 0);
      });
    }
  }

  /* The hero/banner image and web fonts load asynchronously and shift page
     height, which can leave the browser's native scroll-to-fragment short of
     its target. Re-run it once everything has settled. */
  function scrollToHash() {
    if (!location.hash) return;
    var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) { target.scrollIntoView({ behavior: 'instant', block: 'start' }); }
  }
  if (document.readyState === 'complete') {
    scrollToHash();
    window.setTimeout(scrollToHash, 300);
  } else {
    window.addEventListener('load', function () {
      scrollToHash();
      window.setTimeout(scrollToHash, 300);
    });
  }
})();
