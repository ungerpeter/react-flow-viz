export as namespace reactFlowViz;

import { Dispatch, SetStateAction } from "react";

export interface Port {
  uid: symbol;
  identifier: string;
  pipelines?: Set<symbol>;
  position?: DOMRect;
}

export interface Pipeline {
  [mode: string]: symbol;
  uid: symbol;
  input: symbol;
  output: symbol;
  data?: any;
}

export interface PortSelections {
  [mode: string]: Set<symbol>;
  input: Set<symbol>;
  output: Set<symbol>;
}

export interface EditorContext {
  connections: Map<Port, Set<Pipeline>>;
  selections: PortSelections;
  setConnections: Dispatch<SetStateAction<Map<Port, Set<Pipeline>>>>;
  setSelections: Dispatch<SetStateAction<PortSelections>>;
}

export interface NodeInput {
  name?: string;
  type?: string;
  connection?: Pipeline;
}

export interface NodeOutput extends NodeInput {}

export interface NodeSpecification {
  type: string;
  activationFunction: Function;
  sideEffectsComponent?: React.Component<any> | React.FunctionComponent<any>;
  initialNodeState?: any;
  inputs?: any;
  outputs?: any;
}

export interface NodeState<T> {
  getState: T;
  setState: Function;
}

export interface SEC<I, T> extends NodeState<T> {
  inputs: I;
  localState: T;
}