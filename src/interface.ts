export type XYPosition = [number, number];

export type NodeData = {
  id: string;
  name: string;
};

export type EdgeData = {
  source: string;
  target: string;
};

export type Job = {
  name: string;
  description: string;
  nodes: NodeData[];
  edges: EdgeData[];
};
