import React from 'react';
import styled from 'styled-components';

const NodeElement = styled.div`
  display: flex;
  min-width: 100px;
  min-height: 100px;
  background-color: #fff;
  border-radius: 5px;
`;

const Node = () => {
  return (
    <NodeElement>
      node
    </NodeElement>
  );
};

export default Node;