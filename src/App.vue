<script setup lang="ts">
// import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <div class="dark:bg-[#141414] dark:text-[#E5EAF3] w-screen min-h-screen flex">
    <router-view name="sidebar"></router-view>
    <div class="p-5 grow">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped></style>
