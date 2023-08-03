import { ConnectorSpec, OverlaySpec } from "@jsplumb/browser-ui";

const JSPLUMB_FLOWCHART_STUB = 26;
const LOOPBACK_MINIMUM = 100;
export const GRID_SIZE = 20;
const NODE_SIZE = 140;

export const CONNECTOR_FLOWCHART_TYPE: ConnectorSpec = {
  type: "",
  options: {
    cornerRadius: 12,
    stub: JSPLUMB_FLOWCHART_STUB + 10,
    targetGap: 4,
    alwaysRespectStubs: false,
    loopbackVerticalLength: NODE_SIZE + GRID_SIZE, // height of vertical segment when looping
    loopbackMinimum: LOOPBACK_MINIMUM, // minimum length before flowchart loops around
  },
};

export const OVERLAY_MIDPOINT_ARROW_ID = "midpoint-arrow";
export const OVERLAY_ENDPOINT_ARROW_ID = "endpoint-arrow";

export const CONNECTOR_ARROW_OVERLAYS: OverlaySpec[] = [
  {
    type: "Arrow",
    options: {
      id: OVERLAY_ENDPOINT_ARROW_ID,
      location: 1,
      width: 12,
      foldback: 1,
      length: 10,
      visible: true,
    },
  },
  {
    type: "Arrow",
    options: {
      id: OVERLAY_MIDPOINT_ARROW_ID,
      location: 0.5,
      width: 12,
      foldback: 1,
      length: 10,
      visible: false,
    },
  },
];
