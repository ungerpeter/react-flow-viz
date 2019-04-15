import React from 'react';
import { NodeSpecification } from "../interfaces";

export interface AdditionInputs {
  var_a: number,
  var_b: number
}

export interface AdditionOutputs {
  sum: number
}

const activationFunction = (inputs: AdditionInputs): AdditionOutputs => {
  const sum = inputs.var_a + inputs.var_b;
  return {
    sum: sum
  }
}

const sideEffectsComponent: React.SFC<any> = (props) => {
  return (
    <>
      <p>Got inputs:</p>
      <ul>
        {Object.keys(props.inputs).map((key: string, i: number) => (<li key={i}>{key}: {props.inputs[key]}</li>))}
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
      label: 'var a',
      type: 'number'
    },
    var_b: {
      label: 'var b',
      type: 'number'
    }
  },
  outputs: {
    sum: {
      label: 'a + b',
      type: 'number'
    }
  }
}

export default specification;