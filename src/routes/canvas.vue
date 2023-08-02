<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  BrowserJsPlumbInstance,
  ContainmentType,
  newInstance,
} from "@jsplumb/browser-ui";
import { job } from "./sampleJob.ts";
import Node from "../components/Node.vue";
import dot from "../assets/dot.svg";

const name = ref(job.name);
const description = ref(job.description);
const canvas = ref<Element>();

const nodesRef = ref<InstanceType<typeof Node>[] | null>([]);

onMounted(() => {
  try {
    const instance: BrowserJsPlumbInstance = newInstance({
      container: canvas.value!,
      dragOptions: { containment: ContainmentType.notNegative },
    });
    nodesRef?.value?.forEach((node) => {
      instance.manage(node.$el!);
    });
    const edges = job.edges;
    edges.forEach((edge) => {
      instance.connect({
        source: nodesRef?.value?.find((node) => node.id === edge.source)!.$el!,
        target: nodesRef?.value?.find((node) => node.id === edge.target)!.$el!,
        anchor: "AutoDefault",
      });
    });
  } catch (error) {
    console.error(error);
  }
  // const edges = job.edges;
});
</script>

<template>
  <div class="flex flex-col gap-4 h-full">
    <div class="flex">
      <span class="pr-5">Name</span>
      <el-input v-model="name" placeholder="Name" />
    </div>
    <div class="flex">
      <span class="pr-5">Description</span>
      <el-input v-model="description" placeholder="Description" />
    </div>
    <div
      class="grow bg-white bg-repeat bg-center overflow-hidden"
      :style="`background-image: url(${dot})`"
    >
      <div :class="`relative grow`" ref="canvas">
        <Node
          :name="node.name"
          :id="node.id"
          v-for="node in job.nodes"
          ref="nodesRef"
        />
        <!-- <div class="absolute" v-for="node in nodes" ref="nodesRef">{{ node.name }}</div> -->
      </div>
    </div>
  </div>
</template>

<style></style>
