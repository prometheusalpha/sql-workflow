import { Job } from "@/interface";

export const job: Job = {
  name: "job",
  description: "job description",
  nodes: [
    {
      id: "a",
      name: "a name",
    },
    {
      id: "b",
      name: "b name",
    },
    {
      id: "c",
      name: "c name",
    },
  ],
  edges: [
    {
      source: "a",
      target: "b",
    },
    {
      source: "b",
      target: "c",
    },
  ],
};
