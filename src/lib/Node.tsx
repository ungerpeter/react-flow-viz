import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import { NodeSpecification } from './interfaces';
import { mapToObject, objectToMap } from './utilities';
import Connectors from './Connectors';

export interface NodeProps {
  spec: NodeSpecification,
  uid: symbol;
  onDragEvent?: Function;
}

const NodeElement = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  display: block;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 7px rgba(0,0,0,.15);
  border: 1px solid rgba(0,0,0,.1);
  z-index: 5000;
`;

const Head = styled.div`
  padding: 5px 1em;
  background-color: #808080;
  color: #fff;
  text-align: center;
  font-weight: bold;
  border-radius: 8px 8px 0 0;
`;

const ConnectorsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 1em;
  margin: 0;
`;

const getInitialState = (spec: any) => {
  const state = new Map<string, any>();
  Object.keys(spec).forEach((key) => {
    state.set(key, null);
  });
  return state;
};

const Node: React.SFC<NodeProps> = (props) => {

  const [nodeState, setNodeState] = useState<any>(props.spec.initialNodeState);
  const inputsState = useState<Map<string, Set<any>>>(getInitialState(props.spec.inputs));
  const outputsState = useState<Map<string, any>>(getInitialState(props.spec.outputs));

  const { sideEffectsComponent } = props.spec;
  const SEC = (Elem: any) => {
    return <Elem setState={setNodeState} getState={nodeState} inputs={mapToObject(inputsState[0])} />;
  }

  useEffect(() => {
    const newOutputs = props.spec.activationFunction(mapToObject(inputsState[0]), nodeState);
    outputsState[1](objectToMap(newOutputs));
  }, [inputsState[0], nodeState]);

  const handleDragEvent = () => {
    if (typeof props.onDragEvent === 'function') {
      props.onDragEvent(props.uid);
    }
  };

  const handleInputDataChanged = (identifier: string, inputData: Set<any>) => {
    inputsState[1](new Map([ ...inputsState[0].set(identifier, inputData) ]));
  };

  return (
    <Draggable onDrag={() => handleDragEvent()}>
      <NodeElement>
        <Head>{props.spec.type}</Head>
        <ConnectorsContainer>
          <div>{props.spec.inputs && <Connectors nodeUid={props.uid} portsSpec={props.spec.inputs} mode="input" onInputDataChanged={handleInputDataChanged} />}</div>
          <div>{props.spec.outputs && <Connectors nodeUid={props.uid} portsSpec={props.spec.outputs} mode="output" outputData={outputsState[0]} />}</div>
        </ConnectorsContainer>
        {SEC(sideEffectsComponent)}
      </NodeElement>
    </Draggable>
  );
};

export default Node;