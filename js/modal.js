window.addEventListener("load", () => {
  const $pfDetails = document.querySelectorAll('.btn-detail');

  $pfDetails.forEach($btn => {
    $btn.addEventListener('click', async (e) => {
      const modalTitle = e.currentTarget.dataset.modalTitle;
      const modalSrc = e.currentTarget.dataset.modalSrc;

      try {
        // HTML 파일 불러오기
        const response = await fetch(modalSrc);
        const modalContent = await response.text();
        const CLASS_ON = 'modal-on';

        const $main = document.querySelector('main');
        const $modalBox = document.createElement('div');

        // 모달 생성
        $modalBox.classList.add('pf_modal');
        $modalBox.innerHTML = `
          <div class="pf_modal-dim"></div>
          <div class="pf_modal-container">
            <div class="pf_modal-header">
              <h3>${modalTitle}</h3>
              <button type="button" class="btn-close" title="닫기"><i class="icon-close"></i></button>
            </div>
            <div class="pf_modal-body">
              <div class="pf_modal-body-inner">${modalContent}</div>
            </div>
          </div>`;

        $main.after($modalBox);
        document.body.style.overflow = 'hidden';// 모달 외 스크롤 방지

        setTimeout(() => {
          $modalBox.classList.add(CLASS_ON);
        }, 50);

        // 모달 닫기
        const closeModal = () => {
          $modalBox.classList.remove(CLASS_ON);
          setTimeout(() => {
            $modalBox.remove();
            document.body.style.overflow = '';
          }, 400);
        };

        $modalBox.querySelector('.pf_modal-dim').addEventListener('click', closeModal);
        $modalBox.querySelector('.btn-close').addEventListener('click', closeModal);
      } catch (error) {
        console.error('모달 불러오기 오류:', error);
      }
    });
  });
});