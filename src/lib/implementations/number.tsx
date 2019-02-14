import React from 'react';
import { NodeSpecification, NodeState } from "../interfaces";

export interface NumberInputs {}
export interface NumberOutputs {
  number: number
}
export interface NumberState {
  number: number
}

const activationFunction = (inputs: NumberInputs, state: NodeState<NumberState>): NumberOutputs => {
  return { number: state.get.number };
}

const sideEffectsComponent: React.SFC<NodeState<NumberState>> = (props) => {
  return (
    <>
      <p>Emit number:</p>
      <input type="number" value={props.get.number} onChange={(e) => props.setState({ number: e.target.value })} />
    </>
  );
}

const specification: NodeSpecification = {
  type: 'emit-number',
  activationFunction,
  sideEffectsComponent,
  initialNodeState: {
    number: 1
  },
  inputs: {},
  outputs: {
    number: {
      name: 'emit',
      type: 'number'
    }
  }
}

export default specification;