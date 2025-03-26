<!--
  * 내용 입력 (에디터)
  * src/components/Editor.vue
-->


<template>
  <section class="editor">
    <textarea
      v-model="currentPageContent"
      placeholder="내용을 입력하세요. (자동저장)"
    ></textarea>
  </section>
</template>

<script setup>
  import { computed } from 'vue';
  import { usePagesStore } from '@/stores/pages';

  const store = usePagesStore();

  // 현재 페이지 객체 가져오기
  const currentPage = computed(() =>
    store.pages.find((p) => p.id === store.currentPageId)
  )

  // v-model 바인딩용 computed getter/setter
  const currentPageContent = computed({
    get: () => currentPage.value?.content || '',
    set: (val) => {
      if (currentPage.value) currentPage.value.content = val;
    },
  })
</script>

<style scoped>
  .editor {
    flex: 1;
    padding: 1.5rem;
    min-width: 40rem;
  }

  textarea {
    width: 100%;
    height: 100%;
    padding: 1rem;
    font-size: 1.4rem;
    line-height: 1.5;
    border: .1rem solid #e7e7e7;
    border-radius: 1.2rem;
    resize: none;
  }

  .dark {
    .editor {
      textarea {
        border-color: #595959;
        background-color: #1b1b1b;
      }
    }
  }
</style>
