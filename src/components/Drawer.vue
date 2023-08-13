<script lang="ts" setup>
import { Setting } from "@element-plus/icons-vue";
import { ref } from 'vue'

const drawer = ref(false)
const openDrawer = () => drawer.value = true

interface JobMetadata{
  name: string
  description: string
}

defineProps<JobMetadata>()
</script>

<template>
  <el-button text @click="openDrawer">
    <el-icon>
      <Setting />
    </el-icon>
  </el-button>
  <el-drawer v-model="drawer" :with-header="false">
    <span>Hi there!</span>
    {{ name }}
    {{ description }}
  </el-drawer>
</template>
