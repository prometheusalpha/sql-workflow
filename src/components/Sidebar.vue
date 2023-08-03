<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>Navigator One</span>
      </template>
      <el-menu-item-group>
        <template #title><span>Group One</span></template>
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">item three</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title><span>item four</span></template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <template #title>Navigator Two</template>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon><document /></el-icon>
      <template #title>Navigator Three</template>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <template #title>Navigator Four</template>
    </el-menu-item>
    <el-menu-item @click="toggleCollapse()">
      <el-icon v-if="isCollapse"><ArrowRight /></el-icon>
      <el-icon v-if="!isCollapse"><ArrowLeft /></el-icon>
      <template #title>Toggle collapse</template>
    </el-menu-item>
    <el-menu-item @click="toggleDark()">
      <el-icon v-if="isDark"><Sunny /></el-icon>
      <el-icon v-if="!isDark"><Moon /></el-icon>
      <template #title>{{ isDark ? "Light" : "Dark" }}</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  ArrowRight,
  ArrowLeft,
  Sunny,
  Moon,
} from "@element-plus/icons-vue";
import { useDark, useToggle } from "@vueuse/core";

const isCollapse = ref(true);
const toggleCollapse = useToggle(isCollapse);

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
