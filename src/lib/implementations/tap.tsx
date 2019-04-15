import React from 'react';
import { NodeSpecification, SEC } from "../interfaces";

export interface TapInputs {
  [inputKey: string]: any
}
export interface TapOutputs {}
export interface TapState {}

const activationFunction = (): TapOutputs => {
  return {};
}

const sideEffectsComponent: React.SFC<SEC<TapInputs, TapState>> = (props) => {
  return (
    <ul>
      {Object.keys(props.inputs).map((inputKey, index) => (
        <li key={index}>{inputKey}: {props.inputs[inputKey]}</li>
      ))}
    </ul>
  );
}

const specification: NodeSpecification = {
  type: 'tap',
  activationFunction,
  sideEffectsComponent,
  initialNodeState: {},
  inputs: {
    input: {
      label: 'in',
      type: 'any'
    }
  },
  outputs: {}
}

export default specification;