import React from 'react';
import { NodeSpecification, SEC } from "../interfaces";

export interface TapInputs {
  input: any
}
export interface TapOutputs {}
export interface TapState {}

const activationFunction = (): TapOutputs => {
  return {};
}

const sideEffectsComponent: React.SFC<SEC<TapInputs, TapState>> = (props) => {
  let data = props.inputs.input || '';
  if (typeof data === 'object') {
    data = JSON.stringify(data);
  }
  return (
    <>
      <p>Data:</p>
      <textarea value={data} readOnly></textarea>
    </>
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