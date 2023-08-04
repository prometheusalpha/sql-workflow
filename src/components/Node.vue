<script setup lang="ts">
import { ref } from "vue";

const props = defineProps(["name", "id"]);
const name = ref(props.name);
const id = ref(props.id);

defineExpose({
  name,
  id,
});
</script>

<template>
  <div
    class="cursor-pointer rounded-lg bg-white border border-green-500 dark:text-gray-950 h-24 w-24 absolute flex items-center justify-center"
  >
    {{ name }}
  </div>
</template>
