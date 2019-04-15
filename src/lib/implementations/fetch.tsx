import React from 'react';
import { NodeSpecification, NodeState } from "../interfaces";

export interface FetchInputs {}
export interface FetchOutputs {
  data: JSON
}
export interface FetchState {
  url: string
}

const activationFunction = async (__inputs: FetchInputs, state: FetchState): Promise<FetchOutputs> => {
  return await fetch(state.url).then((res) => res.json()).then((json) => ({ data: json }));
}

const sideEffectsComponent: React.FC<NodeState<FetchState>> = (props) => {
  return (
    <>
      <p>Fetch Url:</p>
      <input type="text" value={props.getState.url} onChange={(e) => props.setState({ ...props.getState, url: e.target.value })} />
    </>
  );
}

const specification: NodeSpecification = {
  type: 'fetch',
  activationFunction,
  sideEffectsComponent,
  initialNodeState: {
    url: ''
  },
  inputs: {},
  outputs: {
    data: {
      label: 'data',
      type: 'JSON'
    }
  }
}

export default specification;