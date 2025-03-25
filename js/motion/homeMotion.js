// *****************************
// homeMotion.js
// *****************************

gsap.registerPlugin(ScrollTrigger);

export default function homeMotion() {

  const mm = gsap.matchMedia();

  const gsapHomeMotion = ({
    xTop, xBottom, xSub, ySub, yLine, xFrontCenter
  }) => {
    const homeTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".pf_main-home",
        start: "top top",
        end: "90%",
        scrub: 1,
        markers: true,
      },
    });

    homeTl
      .addLabel('intro')
      .to('.pf_main-home-title', {
        xPercent: -100,
        duration: 4,
        ease: "power2.inOut"
      }, 'intro')
      .to('.type-circle', {
        x: -8, y: 10,
        duration: 4,
        ease: "power2.inOut"
      }, 'intro')
      .to('.motion-line', {
        xPercent: -100,
        duration: 4,
        ease: "power2.inOut"
      }, 'intro')
      .to('.text-top', {
        yPercent: 120,
        duration: 4,
        ease: "power2.inOut"
      }, 'intro')
      .to('.text-bottom', {
        yPercent: -50,
        duration: 4,
        ease: "power2.inOut"
      }, 'intro')
      .fromTo('.motion-text', {
        opacity: 0
      }, {
        opacity: 1,
        duration: 2.5,
        ease: "power2.inOut"
      }, 'intro')

      .addLabel('rotate')
      .to('.motion-line', {
        rotate: 90,
        duration: 4,
        ease: "power2.inOut"
      }, 'rotate')
      .to('.text-top', {
        xPercent: xTop,
        yPercent: 200,
        opacity: 0.5,
        duration: 4,
        ease: "power2.inOut"
      }, 'rotate')
      .to('.text-bottom', {
        xPercent: xBottom,
        yPercent: -150,
        duration: 4,
        ease: "power2.inOut"
      }, 'rotate')

      .addLabel('rotate180')
      .to('.motion-line', {
        y: yLine,
        rotate: 180,
        duration: 0.5,
        ease: "power3.out"
      }, 'rotate180')
      .to('.type-circle', {
        opacity: 0,
        duration: 0.5,
        ease: "power3.out"
      }, 'rotate180')
      .to('.text-top', {
        opacity: 0,
        duration: 4,
        ease: "power2.inOut"
      }, 'rotate180')
      .to('.text-bottom', {
        xPercent: xFrontCenter,
        duration: 4,
        ease: "power2.inOut"
      }, 'rotate180')

      .to('.motion-text .text-sub', {
        opacity: 1,
        x: xSub,
        y: ySub,
        duration: 2.5,
        ease: "power2.out"
      }, 'rotate180+=3')

      .to('.motion-line', {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
      }, 'rotate180+=6')
      .to('.motion-text', {
        opacity: 0,
        y: -100,
        duration: 2,
        ease: "power2.out",
        onComplete: () => {
          document.querySelector('.motion-text')?.style.setProperty('pointer-events', 'none');
          document.querySelector('.motion-line')?.style.setProperty('pointer-events', 'none');
        }
      }, 'rotate180+=6');
  };

  // 데스크탑
  mm.add("(min-width: 1024px)", () => {
    gsapHomeMotion({
      xTop: -100,
      xBottom: 50,
      xSub: 0,
      ySub: 70,
      yLine: 50,
      xFrontCenter: 0
    });
  });

  // 태블릿
  mm.add("(max-width: 1023px)", () => {
    gsapHomeMotion({
      xTop: -50,
      xBottom: 0,
      xSub: -180,
      ySub: 70,
      yLine: 50,
      xFrontCenter: -50
    });
  });

  // 모바일
  mm.add("(max-width: 767px)", () => {
    gsapHomeMotion({
      xTop: -100,
      xBottom: 0,
      xSub: -170,
      ySub: 60,
      yLine: 50,
      xFrontCenter: -50
    });
  });

  // 소형 모바일
  mm.add("(max-width: 479px)", () => {
    gsapHomeMotion({
      xTop: -50,
      xBottom: 0,
      xSub: -170,
      ySub: 40,
      yLine: 30,
      xFrontCenter: -50
    });
  });

}