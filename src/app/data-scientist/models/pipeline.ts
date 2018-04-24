import { PipelineParameters } from "./pipeline-parameters";

export interface Pipeline {
  id: string;
  algorithmId: string;
  algorithmName: string;
  algorithmDescription: string;
  name: string;
  description: string;
  numberOfContainers: number;
  result: string;
  parameters: PipelineParameters[];
}