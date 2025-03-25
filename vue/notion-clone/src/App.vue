<!--
  * App.vue
-->

<template>
  <div class="app">
    <Sidebar />
    <Editor />
  </div>
</template>

<script setup>
  import Sidebar from './components/Sidebar.vue'
  import Editor from './components/Editor.vue'
</script>

<style scoped>
  .app {
    display: flex;
    height: 100%;
  }
</style>