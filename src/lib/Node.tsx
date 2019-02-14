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

const renderConnectors = (connectors: Array<NodeInput | NodeOutput>, mode: string = 'in'): Array<NodeInput | NodeOutput> => {
  return Object.keys(connectors).map((key: string, index) => {
    const connector = connectors[key];
    return (<Connector key={index} mode={mode} {...connector}>{connector.name}</Connector>)
  });
}

const Node: React.SFC<NodeProps> = (props) => {

  return (
    <Draggable>
      <NodeElement>
        <Head>{props.spec.type}</Head>
        <Connectors>
          <div>
            {renderConnectors(props.spec.inputs, 'in')}
          </div>
          <div>
            {renderConnectors(props.spec.outputs, 'out')}
          </div>
        </Connectors>
      </NodeElement>
    </Draggable>
  );
};

export default Node;