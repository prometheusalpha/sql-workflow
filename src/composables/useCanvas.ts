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
  const els = ref<NodeData[]>(job.nodes);
  const edges: EdgeData[] = job.edges;
  const nodesRef = ref<InstanceType<typeof Node>[] | null>([]);
  const instance = computed(() => instanceRef.value as BrowserJsPlumbInstance);

  const addNode = () => {
    const node = {
      id: "node-1",
      name: "New Node",
    };
    els.value.push(node);
  };

  const deleteNode = () => {
    nodesRef.value = nodesRef.value!.filter(
      (node) => node.$el !== selectedElement.value
    );
    instanceRef.value?.unmanage(selectedElement.value!);
    selectedElement.value?.remove();
  };

  watchEffect(() => {
    nodesRef?.value?.forEach((node) => {
      node.$el!.classList.remove("ring-8", "ring-gray-100");
    });
    selectedElement.value?.classList.add("ring-8", "ring-gray-100");
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
    instanceRef.value?.bind(EVENT_DRAG_START, (info: DragPayload) => {
      selectedElement.value = info.el as HTMLElement;
    });

    instanceRef.value?.bind(EVENT_ELEMENT_CLICK, (info: Element) => {
      selectedElement.value = info;
    });

    edges.forEach((edge) => {
      instanceRef.value?.connect({
        source: findNodeById(edge.source),
        target: findNodeById(edge.target),
        anchor: "Continuous",
        overlays: [defaultArrow],
      });
    });
  };

  watchEffect(() => {
    nodesRef?.value?.forEach((node) => {
      instance.value.manage(node.$el!);
      instance.value.addEndpoint(node.$el!, {
        target: true,
        anchor: "Left",
        endpoint: { type: "Rectangle", options: { width: 10, height: 25 } },
        reattachConnections: false,
        connectorOverlays: [defaultArrow],
      });
      instance.value.addEndpoint(node.$el!, {
        source: true,
        anchor: "Right",
        endpoint: { type: "Dot", options: { radius: 10 } },
        reattachConnections: false,
        connectorOverlays: [defaultArrow],
      });
    });
  });

  return {
    init,
    instanceRef,
    selectedElement,
    nodesRef,
    els,
    addNode,
    deleteNode,
  };
}
