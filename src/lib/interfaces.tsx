export interface PortConnection {
  uid: string;
  port: number;
}

export interface EditorContext {
  nodes: Array<any>
  connections: Array<{ from: PortConnection, to: PortConnection }>
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
  sideEffectsComponent?: React.Component<any> | React.SFC<any>;
  initialNodeState?: any;
  inputs?: any;
  outputs?: any;
}

export interface NodeState<T> {
  get: T;
  setState: Function;
}