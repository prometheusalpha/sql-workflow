<script setup lang="ts">
import dot from "@/assets/dot.svg";
import { job } from "@/utils/sampleJob.ts";
import { Controls } from "@vue-flow/controls";
import "@vue-flow/controls/dist/style.css";
import { Edge, VueFlow, useVueFlow } from "@vue-flow/core";
import { v4 as uuidv4 } from "uuid";
import { HandleProps } from "@vue-flow/core";
import { ref } from "vue";

const jobRef = ref(job);

const { addEdges, addNodes, fitView } = useVueFlow({
  nodes: [{ id: "1", label: "Node 1", position: { x: 250, y: 5 } },

  // Default nodes, you can omit `type: 'default'`
  { id: "2", label: "Node 2", position: { x: 100, y: 100 } },
  { id: "3", label: "Node 3", position: { x: 400, y: 100 } },

  // An output node, specified by using `type: 'output'`
  { id: "5", label: "Node 5", position: { x: 100, y: 200 } },
  { id: "4", label: "Node 4", position: { x: 400, y: 300 } },
  ],
  edges: [
    { id: "e1-3", source: "1", target: "3", sourceHandle: "right" },
    {
      id: "e4-5",
      source: "5",
      target: "4",
    },

    // An animated edge
    { id: "e1-2", source: "1", target: "2", animated: true },
    { id: "e3-4", source: "3", target: "4", animated: true },
    { id: "e2-5", source: "2", target: "5", animated: true },
  ]
})

const connectStart = (payload: any) => {
  addEdges({
    id: uuidv4(),
    source: payload.source,
    sourceHandle: payload.sourceHandle,
    target: payload.target,
    targetHandle: payload.targetHandle,
    animated: true,
  } as Edge);
};

const addNode = () => {
  addNodes({
    id: uuidv4(),
    label: "Node 6",
    position: { x: 100, y: 400 },
  });
  fitView();
};

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
    <el-row class="absolute">
      <el-button type="primary" @click="addNode()">Add node</el-button>
      <!-- <el-button type="danger" @click="deleteNode()">Delete node</el-button> -->
    </el-row>
    <div class="grow bg-white bg-repeat bg-center overflow-hidden" :style="`background-image: url(${dot})`">
      <VueFlow fit-view-on-init v-on:connect="connectStart">
        <Controls />
      </VueFlow>
    </div>
  </div>
</template>

<style>
</style>
