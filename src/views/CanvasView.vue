<script setup lang="ts">
import {
  BrowserJsPlumbInstance,
  ContainmentType,
  DragPayload,
  EVENT_DRAG_START,
  EVENT_ELEMENT_CLICK,
  OverlaySpec,
  newInstance,
} from "@jsplumb/browser-ui";
import { onMounted, ref, watchEffect } from "vue";
import dot from "@/assets/dot.svg";
import Node from "@/components/Node.vue";
import { job } from "@/utils/sampleJob.ts";

const name = ref(job.name);
const description = ref(job.description);
const canvas = ref<Element>();
const nodes = ref(job.nodes);
const nodesRef = ref<InstanceType<typeof Node>[] | null>([]);
const selectedElement = ref<Element>();

const addNode = () => {
  const node = {
    id: "node-1",
    name: "Node 1",
  };
  nodes.value.push(node);
};

const defaultArrow: OverlaySpec = {
  type: "PlainArrow",
  options: { width: 10, length: 10, location: 1 },
};

const findNodeById = (id: string): Element => {
  return nodesRef?.value?.find((node) => node.id === id)!.$el!;
};

watchEffect(() => {
  nodesRef?.value?.forEach((node) => {
    node.$el!.classList.remove("border-4", "border-blue-300");
  });
  selectedElement.value?.classList.add("border-4", "border-blue-300");
});

onMounted(() => {
  try {
    const instance: BrowserJsPlumbInstance = newInstance({
      container: canvas.value!,
      dragOptions: {
        containment: ContainmentType.notNegative,
        grid: { w: 20, h: 20 },
      },
    });
    watchEffect(() => {
      nodesRef?.value?.forEach((node) => {
        instance.manage(node.$el!);
        instance.addEndpoint(node.$el!, {
          source: true,
          target: true,
          endpoint: "Dot",
          reattachConnections: false,
          connectorOverlays: [defaultArrow],
        });
      });
    });
    instance.bind(EVENT_DRAG_START, (info: DragPayload) => {
      selectedElement.value = info.el as HTMLElement;
    });
    instance.bind(EVENT_ELEMENT_CLICK, (info: Element) => {
      selectedElement.value = info;
    });
    const edges = job.edges;
    edges.forEach((edge) => {
      instance.connect({
        source: findNodeById(edge.source),
        target: findNodeById(edge.target),
        anchor: "Continuous",
        overlays: [defaultArrow],
      });
    });
  } catch (error) {
    console.error(error);
  }
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
    <el-button type="primary" @click="addNode()">Add node</el-button>
    <div
      class="grow bg-white bg-repeat bg-center overflow-hidden"
      :style="`background-image: url(${dot})`"
    >
      <div :class="`relative grow`" ref="canvas">
        <Node
          :name="node.name"
          :id="node.id"
          v-for="node in nodes"
          ref="nodesRef"
        />
      </div>
    </div>
  </div>
</template>

<style></style>
