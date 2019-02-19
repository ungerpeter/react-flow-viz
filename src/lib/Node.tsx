import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import { NodeSpecification, NodeInput, NodeOutput } from './interfaces';
import Connector from './Connector';

export interface NodeProps {
  input?: any[],
  output?: any[],
  spec: NodeSpecification,
  uid?: string;
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

const renderConnectors = (connectors: Array<NodeInput | NodeOutput>, nodeUid: string, mode: string = 'input'): Array<NodeInput | NodeOutput> => {
  return Object.keys(connectors).map((key: string, index) => {
    const connector = connectors[key as any];
    return (<Connector key={index} mode={mode} identifier={key} nodeUid={nodeUid} {...connector}>{connector.name}</Connector>)
  });
}

const Node: React.SFC<NodeProps> = (props) => {

  const [nodeState, setNodeState] = useState<any>(props.spec.initialNodeState);
  const [inputs, setInputs] = useState<any>({});
  const [outputs, setOutputs] = useState<any>({});
  // const [connection, updateConnection] = useConnection();
  const { sideEffectsComponent } = props.spec;
  const SEC = (Elem: any) => {
    return <Elem setState={setNodeState} getState={nodeState} inputs={[]} />;
  }

  useEffect(() => {
    // console.log('state updated', nodeState);
  });

  useEffect(() => {
    const newOutputs = props.spec.activationFunction(inputs, nodeState);
    setOutputs(newOutputs);
  }, [inputs, nodeState]);

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
            {renderConnectors(props.spec.inputs, props.uid!, 'input')}
          </div>
          <div>
            {renderConnectors(props.spec.outputs, props.uid!, 'output')}
          </div>
        </Connectors>
        {SEC(sideEffectsComponent)}
      </NodeElement>
    </Draggable>
  );
};

export default Node;