import React from "react";
import { Pipeline, Port, PortSelections } from "./interfaces";

interface PipelinesContext {
  state: React.ReducerState<React.Reducer<Map<symbol, Pipeline>, any>>
  dispatch?: React.Dispatch<any>
};
interface PortsContext {
  state: React.ReducerState<React.Reducer<Map<symbol, Port>, any>>
  dispatch?: React.Dispatch<any>
};
interface SelectionsContext {
  state: React.ReducerState<React.Reducer<PortSelections, any>>
  dispatch?: React.Dispatch<any>
};

export const PipelinesContext: React.Context<PipelinesContext> = React.createContext({
  state: new Map()
});
export const PortsContext: React.Context<PortsContext> = React.createContext({
  state: new Map()
});
export const SelectionsContext: React.Context<SelectionsContext> = React.createContext({
  state: {
    input: new Set(),
    output: new Set()
  } as PortSelections
});