import Node from "@/components/Node.vue";
import { EdgeData, Job, NodeData } from "@/interface";
import {
  BrowserJsPlumbInstance,
  ContainmentType,
  DragPayload,
  EVENT_DRAG_START,
  EVENT_ELEMENT_CLICK,
  OverlaySpec,
  newInstance,
} from "@jsplumb/browser-ui";
import { Ref, computed, ref, watchEffect } from "vue";

const defaultArrow: OverlaySpec = {
  type: "PlainArrow",
  options: { width: 10, length: 10, location: 1 },
};

export function useCanvas(jobRef: Ref<Job>) {
  const job = jobRef.value;
  const instanceRef = ref<BrowserJsPlumbInstance>();
  const selectedElement = ref<Element>();
  const els = ref(job.nodes);
  const nodesRef = ref<InstanceType<typeof Node>[] | null>([]);

  const addNode = () => {
    const node = {
      id: "node-1",
      name: "Node 1",
    };
    els.value.push(node);
  };

  const deleteNode = () => {
    console.log(selectedElement.value);
    const selectedElementId = selectedElement.value?.id;
    if (selectedElementId) {
      els.value = els.value.filter((el) => el.id !== selectedElementId);
    }
  };

  watchEffect(() => {
    nodesRef?.value?.forEach((node) => {
      node.$el!.classList.remove("border-4", "border-blue-300");
    });
    selectedElement.value?.classList.add("border-4", "border-blue-300");
  });

  const findNodeById = (id: string): Element => {
    return nodesRef?.value?.find((node) => node.id === id)!.$el!;
  };

  const init = (container: Element) => {
    instanceRef.value = newInstance({
      container: container!,
      dragOptions: {
        containment: ContainmentType.notNegative,
        grid: { w: 20, h: 20 },
      },
    });
    watchEffect(() => {
      nodesRef?.value?.forEach((node) => {
        instance.value.manage(node.$el!);
        instance.value.addEndpoint(node.$el!, {
          source: true,
          target: true,
          endpoint: "Dot",
          reattachConnections: false,
          connectorOverlays: [defaultArrow],
        });
      });
    });
    instanceRef.value.bind(EVENT_DRAG_START, (info: DragPayload) => {
      selectedElement.value = info.el as HTMLElement;
    });
    instanceRef.value.bind(EVENT_ELEMENT_CLICK, (info: Element) => {
      selectedElement.value = info;
    });
    const edges = job.edges;
    edges.forEach((edge) => {
      instanceRef.value?.connect({
        source: findNodeById(edge.source),
        target: findNodeById(edge.target),
        anchor: "Continuous",
        overlays: [defaultArrow],
      });
    });
  };

  const instance = computed(() => instanceRef.value as BrowserJsPlumbInstance);

  return {
    init,
    instance,
    selectedElement,
    nodesRef,
    els,
    addNode,
    deleteNode,
  };
}
