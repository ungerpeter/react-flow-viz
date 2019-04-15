import React, { useState } from 'react';
import Node from './Node';
import { NodeSpecification } from './interfaces';
import styled from 'styled-components';

export interface NodeProps {
  specs: Array<NodeSpecification>;
  onNodeDragged: Function;
}

const ControlGroup = styled.div`
  position: fixed;
  bottom: 2em;
  left: 2em;
`;

const Nodes: React.SFC<NodeProps> = (props: NodeProps) => {

  const [nodes, setNodes] = useState<any[]>([]);
  const handleNodeDrag = () => {
    props.onNodeDragged(Date.now());
  }

  const addNode = (nodeType: string) => {
    const spec: NodeSpecification | undefined = props.specs!.find((spec: NodeSpecification) => spec.type === nodeType);
    if (spec) {
      const node: { spec: NodeSpecification, uid: symbol } = { spec, uid: Symbol('node') }
      setNodes((prevNodes) => [...prevNodes, node]);
    } else {
      console.error("Node type not found", nodeType);
    }
  }

  return (
    <>
      {nodes.map((n, i) => <Node {...n} key={i} onDragEvent={handleNodeDrag} />)}
      <ControlGroup>
        <button onClick={() => addNode('emit-number')}>Add Number Node</button>
        <button onClick={() => addNode('addition')}>Add Addition Node</button>
        <button onClick={() => addNode('tap')}>Add Tap Node</button>
        <button onClick={() => addNode('fetch')}>Add Fetch Node</button>
      </ControlGroup>
    </>
  );
};

export default Nodes;