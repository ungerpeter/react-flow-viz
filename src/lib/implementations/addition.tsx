import React from 'react';
import { NodeSpecification } from "../interfaces";

export interface AdditionInputs {
  var_a: Set<number>,
  var_b: Set<number>
}

export interface AdditionOutputs {
  sum: number
}

const activationFunction = (inputs: AdditionInputs): AdditionOutputs => {
  if (inputs.var_a && inputs.var_a.size > 0 && inputs.var_b && inputs.var_b.size > 0) {
    const var_a = [...inputs.var_a.values()].reduce((a,b) => a+b);
    const var_b = [...inputs.var_b.values()].reduce((a,b) => a+b);
    const sum = var_a + var_b;
    return {
      sum: sum
    }
  }
  
  return {
    sum: 0
  };
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