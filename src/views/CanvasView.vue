<script setup lang="ts">
import dot from "@/assets/dot.svg";
import Drawer from "@/components/Drawer.vue";
import { job } from "@/utils/sampleJob.ts";
import { Controls } from "@vue-flow/controls";
import "@vue-flow/controls/dist/style.css";
import Node from "@/components/Node.vue";
import { Edge, VueFlow, useVueFlow } from "@vue-flow/core";
import { v4 as uuidv4 } from "uuid";
import { ref } from "vue";

const jobRef = ref(job);

const {
  addEdges,
  addNodes,
  fitView,
  removeNodes,
  getSelectedNodes,
  removeEdges,
  getSelectedEdges,
} = useVueFlow({
  nodes: jobRef.value.nodes,
  edges: jobRef.value.edges,
});

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

const deleteNode = () => {
  removeNodes(getSelectedNodes.value);
  removeEdges(getSelectedEdges.value);
  fitView();
};

</script>

<template>
  <div class="flex flex-col gap-4 h-full">
    <div class="flex items-center gap-5">
      <span>Name</span>
      {{ jobRef.name }}
      <Drawer :name="jobRef.name" :description="jobRef.description" />
    </div>
    <el-row class="absolute">
      <el-button type="primary" @click="addNode()">Add node</el-button>
      <el-button type="danger" @click="deleteNode()">Delete node</el-button>
    </el-row>
    <div class="grow bg-white bg-repeat bg-center overflow-hidden" :style="`background-image: url(${dot})`">
      <VueFlow fit-view-on-init v-on:connect="connectStart">
        <template #node-custom="nodeProps">
          <Node :data="nodeProps.data" :label="nodeProps.label?.toString() || ''" :deleteNode="deleteNode" />
        </template>
        <Controls />
      </VueFlow>
    </div>
  </div>
</template>

<style>
</style>
