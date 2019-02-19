import { Dispatch, SetStateAction } from "react";

export interface Port {
  uid: string;
  identifier: string;
}

export interface PortConnection {
  [mode: string]: Port;
  input: Port;
  output: Port;
  data?: any;
}

export interface PortSelections {
  [mode: string]: Set<Port>;
  input: Set<Port>;
  output: Set<Port>;
};

export interface EditorContext {
  connections: Map<Port, Set<PortConnection>>;
  selections: PortSelections;
  setConnections: Dispatch<SetStateAction<Map<Port, Set<PortConnection>>>>;
  setSelections: Dispatch<SetStateAction<PortSelections>>;
}

export interface NodeInput {
  name?: string;
  type?: string;
  connection?: PortConnection;
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