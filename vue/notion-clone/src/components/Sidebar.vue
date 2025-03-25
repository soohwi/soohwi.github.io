<!--
  * 사이드바
  * src/components/Sidebar.vue
-->

<template>
  <aside class="sidebar">
    <!-- 사이드바 헤더 -->
    <div class="sidebar-header">
      <h2 class="main-title">Hwi Memo</h2>
      <button @click="toggleDarkMode" class="btn-mode">
        {{ isDark ? '☀️ Mode' : '🌙 Mode' }}
      </button>
    </div>
    <!-- 사이드바 헤더 //-->

    <!-- 페이지 리스트 -->
    <ul class="page-list">
      <li
        v-for="page in pages"
        :key="page.id"
        :class="{ active: page.id === currentPageId }"
      >
        <div class="page-item">
          <div class="page-item-title" @click="editId !== page.id && setCurrentPage(page.id)">
            <input
              v-if="editId === page.id"
              v-model="editTitle"
              class="title-input"
            />
            <span v-else class="title-text">{{ page.title }}</span>
          </div>

          <!-- 버튼 그룹 -->
          <div class="page-item-btn-group">
            <button
              v-if="editId === page.id"
              class="btn-edit"
              @click="saveTitle(page.id)"
              aria-label="저장"
            >
              💾
            </button>
            <button
              v-else
              class="btn-edit"
              @click="startEdit(page)"
              aria-label="수정"
            >
              ✏️
            </button>
            <button
              class="btn-delete"
              @click.stop="confirmDelete(page.id)"
              aria-label="삭제"
            >
              x
            </button>
          </div>
          <!-- 버튼 그룹 //-->
        </div>
      </li>
    </ul>
    <!-- 페이지 리스트 //-->

    <button class="btn-add" @click="addPage">+ 새 페이지</button>
  </aside>
</template>

<script setup>
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { usePagesStore } from '@/stores/pages';
  import { useDarkModeStore } from '@/stores/darkMode';

  const store = usePagesStore();
  const { pages, currentPageId } = storeToRefs(store); // storeToRefs로 추출
  const { setCurrentPage, updatePageTitle, addPage, deletePage } = store;

  const darkStore = useDarkModeStore();
  const { isDark } = storeToRefs(darkStore);
  const { toggleDarkMode } = darkStore;

  const editId = ref(null);
  const editTitle = ref('');

  const startEdit = (page) => {
    editId.value = page.id;
    editTitle.value = page.title;
  }

  const saveTitle = (id) => {
    updatePageTitle(id, editTitle.value.trim() || '제목 없음');
    editId.value = null;
  }

  const confirmDelete = (id) => {
    const page = pages.value.find(p => p.id === id);
    const ok = confirm(`'${page.title}' 페이지를 삭제하시겠습니까?`);

    if (ok) { deletePage(id); }
  }
</script>

<style scoped>
  .sidebar {
    flex: 0 0 24rem;
    padding: 1.5rem 0;
    color: var(--color-text);
    background-color: var(--color-bg);
  }

  .sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;

    .main-title {
      font-weight: 700;
      font-size: 3rem;
    }

    .btn-mode {
      padding: .5rem 1rem;
      color: var(--color-text);
      font-size: 1.2rem;
      border-radius: .4rem;
      background-color: var(--color-white);
    }
  }

  .page-list {
    li {
      margin-bottom: .5rem;
      border-radius: .4rem;
      user-select: none;
      cursor: pointer;
      transition: background 0.2s;

      &:hover {
        background-color: var(--color-main-lighter);
      }

      &.active {
        font-weight: 700;
        background-color: var(--color-main-light);
      }
    }
  }

  .page-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;

    .page-item-title {
      flex: 1;
      padding: 1rem;
      font-size: 1.4rem;
    }

    .title-input {
      width: 100%;
      height: 3rem;
      padding: .5rem;
      font-size: 1.4rem;
      background-color: transparent;
      border-bottom: .1rem solid #34383a;
      border-width: 0 0 .1rem 0;
    }

    .title-text {
      padding: 0 .5rem;
      height: 3rem;
      line-height: 3rem;
    }
  }

  /* 리스트 버튼그룹 */
  .page-item-btn-group {
    display: flex;
    gap: 0.3rem;
    padding: 0 .5rem;

    /* 편집/저장 */
    .btn-edit {
      width: 2.5rem;
      font-size: 1.4rem;
      text-align: center;
      cursor: pointer;
      transition: background 0.3s;
    }
    .btn-edit:hover {
      border-radius: .4rem;
      background-color: var(--color-white);
    }

    /* 삭제 */
    .btn-delete {
      width: 2.5rem;
      color: #999;
      font-size: 2rem;
      text-align: center;
      cursor: pointer;
      transition: background 0.3s;
    }
    .btn-delete:hover {
      color: var(--color-main);
      border-radius: .4rem;
      background-color: var(--color-white);
    }
  }

  .btn-add {
    margin-top: 3rem;
    padding: 1rem;
    width: 100%;
    color: var(--color-white);
    font-weight: 700;
    border-radius: .4rem;
    background-color: var(--color-main);
    cursor: pointer;
    transition: background 0.3s;
  }
  .btn-add:hover {
    background-color: var(--color-main-dark);
  }

  /* 다크모드 */
  .dark {
    .sidebar-header {
      .btn-mode {
        background-color: #000;
      }
    }
    .page-list {
      li {
        &.active {
          color: #34383a;
          .page-item {
            .title-input {
              border-color: #34383a;
            }
          }
        }

        .page-item {
          .title-input {
            border-color: #fff;
          }
        }
      }
    }

    .page-item-btn-group {
      .btn-delete {
        color: #5f676b;
      }
    }
  }
</style>
