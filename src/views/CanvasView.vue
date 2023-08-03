<script setup lang="ts">
import dot from "@/assets/dot.svg";
import Node from "@/components/Node.vue";
import { useCanvas } from "@/composables/useCanvas";
import { job } from "@/utils/sampleJob.ts";
import { onMounted, ref } from "vue";

const jobRef = ref(job);
const canvas = ref<Element>();
const { init, nodesRef, els, addNode, deleteNode } = useCanvas(jobRef);

onMounted(() => {
  try {
    init(canvas.value!);
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <div class="flex flex-col gap-4 h-full">
    <div class="flex">
      <span class="pr-5">Name</span>
      <el-input v-model="jobRef.name" placeholder="Name" />
    </div>
    <div class="flex">
      <span class="pr-5">Description</span>
      <el-input v-model="jobRef.description" placeholder="Description" />
    </div>
    <el-row>
      <el-button type="primary" @click="addNode()">Add node</el-button>
      <el-button type="danger" @click="deleteNode()">Delete node</el-button>
    </el-row>
    <div class="grow bg-white bg-repeat bg-center overflow-hidden" :style="`background-image: url(${dot})`">
      <div :class="`relative grow`" ref="canvas">
        <Node :name="node.name" :id="node.id" v-for="node in els" ref="nodesRef" />
      </div>
    </div>
  </div>
</template>

<style>
</style>
