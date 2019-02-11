import React, { useState } from 'react';
import styled from 'styled-components';
import Node from './Node';

const Container = styled.div`
  height: 100%;
  background-color: #fafafa;
`;

const AddNodeBtn = styled.button`
  position: fixed;
  bottom: 2em;
  left: 2em;
`;

const FlowViz = () => {
  const [nodes, setNodes] = useState<any[]>([]);
  return (
    <Container>
      {nodes.map(() => <Node></Node>)}
      <AddNodeBtn onClick={() => setNodes([...nodes, {id: nodes.length}])}>Add Node</AddNodeBtn>
    </Container>
  );
};

export default FlowViz;