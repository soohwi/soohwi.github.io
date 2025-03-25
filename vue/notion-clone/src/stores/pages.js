/*
  * 컨텐츠
  * src/stores/pages.js
*/


import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { nanoid } from 'nanoid';

export const usePagesStore = defineStore('pages', () => {

  // 초기 데이터 로드
  const savedPages = JSON.parse(localStorage.getItem('memo-pages') || '[]');
  const savedCurrentId = localStorage.getItem('memo-currentPageId');

  const pages = ref(savedPages.length ? savedPages : [
    { id: nanoid(), title: '새 페이지 1', content: '' }
  ]);
  const currentPageId = ref(savedCurrentId || pages.value[0].id);

  // 새 페이지 추가
  function addPage() {
    const newPage = {
      id: nanoid(),
      title: `새 페이지 ${pages.value.length + 1}`,
      content: ''
    }
    pages.value.push(newPage);
    currentPageId.value = newPage.id;
  }

  // 페이지 제목 수정
  function updatePageTitle(id, newTitle) {
    const page = pages.value.find(p => p.id === id);
    if (page) page.title = newTitle;
  }

  // 현재 페이지 ID 설정
  function setCurrentPage(id) {
    currentPageId.value = id;
  }

  // 페이지 내용 업데이트
  function updatePageContent(id, newContent) {
    const page = pages.value.find(p => p.id === id);
    if (page) page.content = newContent;
  }

  // 페이지 삭제
  function deletePage(id) {
    const index = pages.value.findIndex(p => p.id === id);
    if (index !== -1) {
      pages.value.splice(index, 1);
      if (currentPageId.value === id) {
        currentPageId.value = pages.value[0]?.id || null;
      }
    }
  }

  // localStorage 저장: 반응형으로 자동 감지
  watch([pages, currentPageId], () => {
    localStorage.setItem('memo-pages', JSON.stringify(pages.value));
    localStorage.setItem('memo-currentPageId', currentPageId.value || '');
  }, { deep: true })

  return {
    pages,
    currentPageId,
    addPage,
    updatePageTitle,
    updatePageContent,
    setCurrentPage,
    deletePage
  }
})
