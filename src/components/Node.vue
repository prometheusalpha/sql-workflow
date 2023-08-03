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
    class="cursor-pointer rounded bg-white border dark:text-gray-950 h-20 w-20 absolute flex items-center justify-center"
  >
    {{ name }}
  </div>
</template>
