import { XYPosition } from "@/interface";
import { CONNECTOR_ARROW_OVERLAYS, CONNECTOR_FLOWCHART_TYPE, GRID_SIZE } from "@/utils/canvasUtils";
import {
  BrowserJsPlumbInstance,
  Connection,
  Connectors,
  EndpointFactory,
  uuid,
  newInstance,
  BeforeStartEventParams,
  DragStopEventParams,
  PointXY,
} from "@jsplumb/browser-ui";
import { tr } from "element-plus/es/locale/index.js";
import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

export const useCanvasStore = defineStore("canvas", () => {
  const workflowStore = useWorkflowsStore();
  const nodeTypesStore = useNodeTypesStore();
  const uiStore = useUIStore();
  const historyStore = useHistoryStore();

  const jsPlumbInstanceRef = ref<BrowserJsPlumbInstance>();
  const isDragging = ref<boolean>(false);
  const lastSelectedConnection = ref<Connection | null>(null);
  const newNodeInsertPosition = ref<XYPosition | null>(null);

  const nodes = computed<INodeUi[]>(() => workflowStore.allNodes);
  const triggerNodes = computed<INodeUi[]>(() =>
    nodes.value.filter(
      (node) =>
        node.type === START_NODE_TYPE || nodeTypesStore.isTriggerNode(node.type)
    )
  );
  const isDemo = ref<boolean>(false);
  const nodeViewScale = ref<number>(1);
  const canvasAddButtonPosition = ref<XYPosition>([1, 1]);

  Connectors.register(N8nConnector.type, N8nConnector);
  N8nPlusEndpointRenderer.register();
  EndpointFactory.registerHandler(N8nPlusEndpointHandler);

  const setRecenteredCanvasAddButtonPosition = (offset?: XYPosition) => {
    const position = getMidCanvasPosition(
      nodeViewScale.value,
      offset || [0, 0]
    );

    position[0] -= PLACEHOLDER_TRIGGER_NODE_SIZE / 2;
    position[1] -= PLACEHOLDER_TRIGGER_NODE_SIZE / 2;

    canvasAddButtonPosition.value = getNewNodePosition(nodes.value, position);
  };

  const getPlaceholderTriggerNodeUI = (): INodeUi => {
    setRecenteredCanvasAddButtonPosition();

    return {
      id: uuid(),
      ...DEFAULT_PLACEHOLDER_TRIGGER_BUTTON,
      position: canvasAddButtonPosition.value,
    };
  };

  const getNodesWithPlaceholderNode = (): INodeUi[] =>
    triggerNodes.value.length > 0
      ? nodes.value
      : [getPlaceholderTriggerNodeUI(), ...nodes.value];

  const setZoomLevel = (zoomLevel: number, offset: XYPosition) => {
    nodeViewScale.value = zoomLevel;
    jsPlumbInstanceRef.value?.setZoom(zoomLevel);
    uiStore.nodeViewOffsetPosition = offset;
  };

  const resetZoom = () => {
    const { scale, offset } = scaleReset({
      scale: nodeViewScale.value,
      offset: uiStore.nodeViewOffsetPosition,
    });
    setZoomLevel(scale, offset);
  };

  const zoomIn = () => {
    const { scale, offset } = scaleBigger({
      scale: nodeViewScale.value,
      offset: uiStore.nodeViewOffsetPosition,
    });
    setZoomLevel(scale, offset);
  };

  const zoomOut = () => {
    const { scale, offset } = scaleSmaller({
      scale: nodeViewScale.value,
      offset: uiStore.nodeViewOffsetPosition,
    });
    setZoomLevel(scale, offset);
  };

  const zoomToFit = () => {
    const nodes = getNodesWithPlaceholderNode();
    if (!nodes.length) {
      // some unknown workflow executions
      return;
    }
    const { zoomLevel, offset } = getZoomToFit(nodes, !isDemo.value);
    setZoomLevel(zoomLevel, offset);
  };

  const wheelMoveWorkflow = (e: WheelEvent) => {
    const normalized = normalizeWheel(e);
    const offsetPosition = uiStore.nodeViewOffsetPosition;
    const nodeViewOffsetPositionX =
      offsetPosition[0] - (e.shiftKey ? normalized.pixelY : normalized.pixelX);
    const nodeViewOffsetPositionY =
      offsetPosition[1] - (e.shiftKey ? normalized.pixelX : normalized.pixelY);
    uiStore.nodeViewOffsetPosition = [
      nodeViewOffsetPositionX,
      nodeViewOffsetPositionY,
    ];
  };

  const wheelScroll = (e: WheelEvent) => {
    //* Control + scroll zoom
    if (e.ctrlKey) {
      if (e.deltaY > 0) {
        zoomOut();
      } else {
        zoomIn();
      }

      e.preventDefault();
      return;
    }
    wheelMoveWorkflow(e);
  };

  function initInstance(container: Element) {
    // Make sure to clean-up previous instance if it exists
    if (jsPlumbInstanceRef.value) {
      jsPlumbInstanceRef.value.destroy();
      jsPlumbInstanceRef.value.reset();
      jsPlumbInstanceRef.value = undefined;
    }

    jsPlumbInstanceRef.value = newInstance({
      container,
      connector: CONNECTOR_FLOWCHART_TYPE,
      resizeObserver: false,
      endpoint: {
        type: "Dot",
        options: { radius: 5 },
      },
      // paintStyle: CONNECTOR_PAINT_STYLE_DEFAULT,
      // hoverPaintStyle: CONNECTOR_PAINT_STYLE_PRIMARY,
      connectionOverlays: CONNECTOR_ARROW_OVERLAYS,
      elementsDraggable: true,
      dragOptions: {
        cursor: "pointer",
        grid: { w: GRID_SIZE, h: GRID_SIZE },
        start: (params: BeforeStartEventParams) => {},
        stop: (params: DragStopEventParams) => {},
        filter:
          ".node-description, .node-description .node-name, .node-description .node-subtitle",
      },
    });
  }

  const jsPlumbInstance = computed(
    () => jsPlumbInstanceRef.value as BrowserJsPlumbInstance
  );
  return {
    isDemo,
    nodeViewScale,
    canvasAddButtonPosition,
    lastSelectedConnection,
    newNodeInsertPosition,
    jsPlumbInstance,
    setRecenteredCanvasAddButtonPosition,
    getNodesWithPlaceholderNode,
    setZoomLevel,
    resetZoom,
    zoomIn,
    zoomOut,
    zoomToFit,
    wheelScroll,
    initInstance,
  };
});
