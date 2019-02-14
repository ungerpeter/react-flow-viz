import React from 'react';
import { NodeSpecification, NodeInput } from "../interfaces";

export interface AdditionInputs {
  var_a: number,
  var_b: number
}

export interface AdditionOutputs {
  sum: number
}

const activationFunction = (inputs: AdditionInputs): AdditionOutputs => {
  const sum = inputs.var_a + inputs.var_b;
  return { sum };
}

const sideEffectsComponent: React.SFC<any> = (props) => {
  return (
    <>
      <h1>Got inputs:</h1>
      <ul>
        {props.inputs.map((input: NodeInput) => (<li>{input.name}</li>))}
      </ul>
    </>
  );
}

const specification: NodeSpecification = {
  type: 'addition',
  activationFunction,
  sideEffectsComponent,
  inputs: {
    var_a: {
      name: 'var a',
      type: 'number'
    },
    var_b: {
      name: 'var b',
      type: 'number'
    }
  },
  outputs: {
    sum: {
      name: 'a + b',
      type: 'number'
    }
  }
}

export default specification;