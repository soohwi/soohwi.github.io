// *****************************
// header.js
// *****************************


gsap.registerPlugin(ScrollTrigger);

window.addEventListener('DOMContentLoaded', () => {

  const $btnMenu = document.querySelector('.btn-menu');
  const $btnClose = document.querySelector('.mobile-nav .btn-close');
  const $mobileNav = document.querySelector('.mobile-nav');
  const CLASS_ON = 'on';

  // 메뉴 열기
  $btnMenu.addEventListener('click', () => {
    $mobileNav.classList.add(CLASS_ON);
    document.body.style.overflow = 'hidden'; // 스크롤 차단
  });

  // 메뉴 닫기
  $btnClose.addEventListener('click', () => {
    closeMobileNav();
  });

  // 메뉴 바깥 클릭 시 닫기
  document.addEventListener('click', (e) => {
    const isMenuOpen = $mobileNav.classList.contains(CLASS_ON);
    const isInsideMenu = $mobileNav.contains(e.target);
    const isMenuButton = e.target.closest('.btn-menu');

    if (isMenuOpen && !isInsideMenu && !isMenuButton) {
      closeMobileNav();
    }
  });

  // 공통 닫기 함수
  function closeMobileNav() {
    $mobileNav.classList.remove(CLASS_ON);
    document.body.style.overflow = ''; // 스크롤 복원
  }

  // nav "on" 클래스 제어
  const sections = [
    { id: "#pf_main-home", navSelector: 'a[href="#pf_main-home"]' },
    { id: "#pf_main-about", navSelector: 'a[href="#pf_main-about"]' },
    { id: "#pf_main-work", navSelector: 'a[href="#pf_main-work"]' },
  ];

  sections.forEach(({ id, navSelector }) => {
    const section = document.querySelector(id);
    const navItems = document.querySelectorAll(navSelector); // PC, Mobile nav 둘 다

    if (section && navItems.length) {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveNav(navItems),
        onEnterBack: () => setActiveNav(navItems),
      });
    }
  });

  function setActiveNav(activeItems) {
    document.querySelectorAll('nav a').forEach(a => a.classList.remove(CLASS_ON));
    activeItems.forEach(item => item.classList.add(CLASS_ON));
  }

});