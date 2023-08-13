<script lang="ts" setup>
import { Setting } from "@element-plus/icons-vue";

const props = defineProps({
  opened: Boolean
})

import { ref } from 'vue'
const drawer = ref(props.opened)
const openDrawer = () => drawer.value = true
</script>

<template>
  <el-button text @click="openDrawer">
    <el-icon>
      <Setting />
    </el-icon>
  </el-button>
  <el-drawer v-model="drawer" :with-header="false">
    <span>Hi there!</span>
  </el-drawer>
</template>
