// *****************************
// aboutMotion.js
// *****************************


gsap.registerPlugin(ScrollTrigger);

export default function aboutMotion() {

  const $aboutSection = document.querySelector('.pf_main-about-inner');
  // const $aboutContent = document.querySelector('.pf_main-about-content');
  const $aboutList = document.querySelector('.pf_main-about-list');

  function setupAboutScroll() {
    const aboutWidth = $aboutList.scrollWidth + 100;

    gsap.to($aboutList, {
      scrollTrigger: {
        trigger: $aboutSection,
        start: "top top",
        end: () => `+=${aboutWidth}`, // 리스트 너비 기반으로 스크롤 길이 설정
        scrub: 0.3,
        // scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
      x: () => `-${aboutWidth - window.innerWidth}px`,
    });
  }

  setupAboutScroll();

  // Resize 대응 - 트리거 초기화 및 재등록
  window.addEventListener('resize', () => {

    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    setupAboutScroll();
    ScrollTrigger.refresh();

  });

}