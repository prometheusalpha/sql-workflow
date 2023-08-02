<script setup lang="ts">
import Sidebar from "./components/sidebar.vue";
</script>

<template>
  <div class="dark:bg-[#141414] dark:text-[#E5EAF3] w-screen min-h-screen flex">
    <Sidebar />
    <div class="p-5 grow">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
