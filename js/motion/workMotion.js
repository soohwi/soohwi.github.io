// *****************************
// workMotion.js
// *****************************


gsap.registerPlugin(ScrollTrigger);

export default function workMotion() {

  const CLASS_ON = 'on';
  const $workTitle = document.querySelector('.pf_main-work-title .text-title');
  const $workListItems = document.querySelectorAll('.pf_main-work-list li');
  const $textComp = document.querySelectorAll('.text-comp li');

  let isHovering = false;

  // 그룹 인덱스 반환 함수 (0 = 개인 스터디, 1~2 = 휴먼컨설팅그룹, 그 외 = 엠몬스타)
  const getGroupIndex = (idx) => {
    if (idx === 0) return 0;
    else if (idx <= 2) return 1;
    else return 2;
  };

  // 클래스 토글 함수
  const toggleClass = ($targets, index) => {
    Array.from($targets).forEach(el => el.classList.remove(CLASS_ON));
    $targets[index]?.classList.add(CLASS_ON);
  };

  // 타이틀 애니메이션
  const workIntro = gsap.timeline({
    scrollTrigger: {
      trigger: ".pf_main-work-title",
      start: "10%",
      end: "80%",
      scrub: 1,
    },
  });

  workIntro
    .from($workTitle, {
      duration: 2,
      bottom: `26vh`,
      left: `50%`,
      x: `-50%`,
      y: `50%`,
      fontSize: `17vw`,
    })
    .to($workTitle, { duration: 0.1, opacity: 0 });

  // hover 시 클래스 토글
  $workListItems.forEach((item, idx) => {
    item.addEventListener('mouseenter', () => {
      isHovering = true;
      toggleClass($textComp, getGroupIndex(idx));
    });

    item.addEventListener('mouseleave', () => {
      isHovering = false;
    });
  });

  // Intersection Observer 설정
  const observeIntersection = (targets, callback) => {
    const options = { threshold: 1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) callback(entry);
      });
    }, options);
    targets.forEach(target => observer.observe(target));
  };

  // 스크롤 위치로 그룹 활성화 (hover 중이 아닐 때만)
  const updateActiveGroup = (entry) => {
    if (isHovering) return;
    const idx = Array.from(entry.target.parentNode.children).indexOf(entry.target);
    toggleClass($textComp, getGroupIndex(idx));
  };

  observeIntersection($workListItems, updateActiveGroup);
}