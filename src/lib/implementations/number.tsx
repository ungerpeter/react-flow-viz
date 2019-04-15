import React from 'react';
import { NodeSpecification, NodeState } from "../interfaces";

export interface NumberInputs {}
export interface NumberOutputs {
  number: number
}
export interface NumberState {
  number: number
}

const activationFunction = (__inputs: NumberInputs, state: NumberState): NumberOutputs => {
  return { number: state.number };
}

const sideEffectsComponent: React.SFC<NodeState<NumberState>> = (props) => {
  return (
    <>
      <p>Emit number:</p>
      <input type="number" value={props.getState.number} onChange={(e) => props.setState({ ...props.getState, number: parseFloat(e.target.value) })} />
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
      label: 'emit',
      type: 'number'
    }
  }
}

export default specification;