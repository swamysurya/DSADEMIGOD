import { SimulationData, SimulationStep, MemoryVariable } from "@/domain/models/lesson";

export interface SimulationEngineProps {
  data: SimulationData;
}

export interface SimulationToolbarProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onRunToggle: () => void;
  isRunning: boolean;
  showAddress: boolean;
  onAddressToggle: () => void;
  isMaximized: boolean;
  onMaximizeToggle: () => void;
}

export interface CodePanelProps {
  code: string;
  language: string;
  currentLine: number;
}

export interface MemoryPanelProps {
  visualizer: "variables" | "array" | "list";
  variables: MemoryVariable[];
  showAddress: boolean;
  changedVariables?: string[];
}

export interface VariableMemoryVisualizerProps {
  variables: MemoryVariable[];
  showAddress: boolean;
  changedVariables?: string[];
}

export interface StepExplanationPanelProps {
  explanation: string;
  currentStep: number;
  totalSteps: number;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export interface MemoryAddressToggleProps {
  showAddress: boolean;
  onToggle: () => void;
}

export interface ConsolePanelProps {
  output: string;
  isMaximized?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

