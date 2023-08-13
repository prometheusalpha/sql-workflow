import { Job } from "@/interface";

export const job: Job = {
  name: "job",
  description: "job description",
  nodes: [
    { id: "1", label: "Node 1", type: "custom", position: { x: 5, y: 200 } },
    { id: "2", label: "Node 2", type: "custom", position: { x: 200, y: 100 } },
    { id: "3", label: "Node 3", type: "custom", position: { x: 200, y: 400 } },
    { id: "4", label: "Node 4", type: "custom", position: { x: 400, y: 400 } },
    { id: "5", label: "Node 5", type: "custom", position: { x: 600, y: 200 } },
  ],
  edges: [
    { id: "e1-3", source: "1", target: "3", animated: true },
    {
      id: "e4-5",
      source: "4",
      target: "5",
      animated: true,
    },

    // An animated edge
    { id: "e1-2", source: "1", target: "2", animated: true },
    { id: "e3-4", source: "3", target: "4", animated: true },
    { id: "e2-5", source: "2", target: "5", animated: true },
  ],
};
