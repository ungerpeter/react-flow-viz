import React, { useState } from 'react';
import styled from 'styled-components';
import Node from './Node';
import { NodeSpecification } from './interfaces';
import implementations from './implementations';

interface FlowVizProps {
  initialNodes?: Node[],
  initialConnections?: any[],
  specs?: NodeSpecification[]
}

const Container = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400');
  height: 100%;
  background-color: #fafafa;
  font-family: 'Open Sans', sans-serif;
`;

const ControlGroup = styled.div`
  position: fixed;
  bottom: 2em;
  left: 2em;
`;

const FlowViz: React.SFC<FlowVizProps> = (props) => {

  const [nodeCounter, setNodeCounter] = useState<number>(0);
  const [nodes, setNodes] = useState<any[]>(props.initialNodes!);
  // const [connections, setConnections] = useState<any[]>(props.initialConnections!);

  const addNode = (nodeType: string) => {
    const spec: NodeSpecification | undefined = props.specs!.find((spec: NodeSpecification) => spec.type === nodeType);
    if (spec) {
      const node: { spec: NodeSpecification, uid: string } = { spec, uid: `${nodeCounter}-${spec.type}-${Date.now()}` }
      setNodes((prevNodes) => {
        return [...prevNodes, node];
      });
      setNodeCounter(nodeCounter+1);
    } else {
      console.error("Node type not found", nodeType);
    }
  }
  return (
    <Container>
      {nodes.map((n) => <Node {...n} key={n.uid} ></Node>)}
      <ControlGroup>
        <button onClick={() => addNode('emit-number')}>Add Number Node</button>
        <button onClick={() => addNode('addition')}>Add Addition Node</button>
      </ControlGroup>
    </Container>
  );
};

FlowViz.defaultProps = {
  initialNodes: [],
  initialConnections: [],
  specs: implementations
}

export default FlowViz;