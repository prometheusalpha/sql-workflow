import { FlowProps } from "@vue-flow/core";

export type XYPosition = [number, number];


export type Job = {
  name: string;
  description: string;
  nodes: FlowProps["nodes"];
  edges: FlowProps["edges"];
};
