<script setup lang="ts">
import dot from "@/assets/dot.svg";
import { job } from "@/utils/sampleJob.ts";
import "@vue-flow/controls/dist/style.css";
import { Element, VueFlow } from "@vue-flow/core";
import { Controls } from "@vue-flow/controls";
import { ref } from "vue";

const jobRef = ref(job);
const elements = ref<Element[]>([
  { id: "1", type: "input", label: "Node 1", position: { x: 250, y: 5 } },

  // Default nodes, you can omit `type: 'default'`
  { id: "2", label: "Node 2", position: { x: 100, y: 100 } },
  { id: "3", label: "Node 3", position: { x: 400, y: 100 } },

  // An output node, specified by using `type: 'output'`
  { id: "4", type: "output", label: "Node 4", position: { x: 400, y: 200 } },

  // Edges
  // Most basic edge, only consists of an id, source-id and target-id
  { id: "e1-3", source: "1", target: "3" },

  // An animated edge
  { id: "e1-2", source: "1", target: "2", animated: true },
]);
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
      <!-- <el-button type="primary" @click="addNode()">Add node</el-button>
      <el-button type="danger" @click="deleteNode()">Delete node</el-button> -->
    </el-row>
    <div
      class="grow bg-white bg-repeat bg-center overflow-hidden"
      :style="`background-image: url(${dot})`"
    >
      <VueFlow fit-view-on-init v-model="elements"> <Controls /></VueFlow>
    </div>
  </div>
</template>

<style></style>
