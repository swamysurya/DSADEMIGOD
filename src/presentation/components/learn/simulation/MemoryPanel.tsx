"use client";

import React from "react";
import { MemoryPanelProps } from "./types";
import VariableMemoryVisualizer from "./VariableMemoryVisualizer";
import ArrayMemoryVisualizer from "./ArrayMemoryVisualizer";

export default function MemoryPanel({
  visualizer,
  variables,
  showAddress,
  changedVariables
}: MemoryPanelProps) {
  // Select the appropriate memory visualizer component.
  switch (visualizer) {
    case "array":
      return (
        <ArrayMemoryVisualizer
          variables={variables}
          showAddress={showAddress}
          changedVariables={changedVariables}
        />
      );
    case "variables":
    default:
      return (
        <VariableMemoryVisualizer
          variables={variables}
          showAddress={showAddress}
          changedVariables={changedVariables}
        />
      );
  }
}
