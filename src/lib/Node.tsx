import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import { NodeSpecification, NodeInput, NodeOutput } from './interfaces';
import Connector from './Connector';

export interface NodeProps {
  input?: any[],
  output?: any[],
  spec: NodeSpecification,
  uid: string;
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

const Connectors = styled.div`
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

const objectToMap = (object: any): Map<string, any> => {
  const map = new Map();
  Object.keys(object).forEach((key) => {
    map.set(key, object[key]);
  });
  return map;
};

const mapToObject = (map: Map<string, any>): any => {
  const object: { [key: string]: any } = {};
  for (const key of map.keys()) {
    object[key] = map.get(key);
  }
  return object;
};

const Node: React.SFC<NodeProps> = (props) => {

  const [nodeState, setNodeState] = useState<any>(props.spec.initialNodeState);
  const inputsState = useState<Map<string, any[]>>(getInitialState(props.spec.inputs));
  const outputsState = useState<Map<string, any>>(getInitialState(props.spec.outputs));
  // const [connection, updateConnection] = useConnection();
  const { sideEffectsComponent } = props.spec;
  const SEC = (Elem: any) => {
    return <Elem setState={setNodeState} getState={nodeState} inputs={mapToObject(inputsState[0])} />;
  }

  const renderConnectors = (connectors: Array<NodeInput | NodeOutput>, state: [Map<string, any>, React.Dispatch<any>], mode: string = 'input'): Array<NodeInput | NodeOutput> => {
    const [ _state, setState ] = state;
    return Object.keys(connectors).map((key: string, index: number) => {
      const connector = connectors[key as any];
      const value = _state.get(key) || [];
      const updateValue = (value: Array<any>) => {
        _state.set(key, value);
        setState(_state);
      }
      return (<Connector 
        key={index}
        mode={mode}
        identifier={key}
        nodeUid={props.uid}
        value={value}
        updateValue={updateValue}
        {...connector}
        >{connector.name}</Connector>)
    });
  }

  useEffect(() => {
    const newOutputs = props.spec.activationFunction(mapToObject(inputsState[0]), nodeState);
    outputsState[1](objectToMap(newOutputs));
  }, [inputsState[0], nodeState]);

  useEffect(() => {
    // console.log(`${props.uid} states`, inputsState, outputsState, nodeState);
  });

  const handleDragEvent = () => {
    if (typeof props.onDragEvent === 'function') {
      props.onDragEvent(props.uid);
    }
  };

  return (
    <Draggable onDrag={() => handleDragEvent()}>
      <NodeElement>
        <Head>{props.spec.type}</Head>
        <Connectors>
          <div>
            {renderConnectors(props.spec.inputs, inputsState, 'input')}
          </div>
          <div>
            {renderConnectors(props.spec.outputs, outputsState, 'output')}
          </div>
        </Connectors>
        {SEC(sideEffectsComponent)}
      </NodeElement>
    </Draggable>
  );
};

export default Node;