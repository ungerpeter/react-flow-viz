import React, { useState } from 'react';
import Node from './Node';
import { NodeSpecification } from './interfaces';
import styled from 'styled-components';

export interface NodeProps {
  specs: Array<NodeSpecification>
}

const ControlGroup = styled.div`
  position: fixed;
  bottom: 2em;
  left: 2em;
`;

const Nodes: React.SFC<NodeProps> = (props: NodeProps) => {
  const [nodes, setNodes] = useState<any[]>([]);
  const [nodeCounter, setNodeCounter] = useState<number>(0);
  const handleNodeDrag = () => {
    // setLastUiRender(Date.now());
  }
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
    <>
      {nodes.map((n) => <Node {...n} key={n.uid} onDragEvent={handleNodeDrag} />)}
      <ControlGroup>
        <button onClick={() => addNode('emit-number')}>Add Number Node</button>
        <button onClick={() => addNode('addition')}>Add Addition Node</button>
        <button onClick={() => addNode('tap')}>Add Tap Node</button>
      </ControlGroup>
    </>
  );
};

export default Nodes;