import React from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';

const NodeElement = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  min-width: 100px;
  min-height: 100px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 7px rgba(0,0,0,.05);
  border: 1px solid rgba(0,0,0,.04);
`;

const eventLogger = (e: MouseEvent, data: Object) => {
  console.log('Event: ', e);
  console.log('Data: ', data);
};

const Node = () => {
  return (
    <Draggable>
      <NodeElement>
        node
      </NodeElement>
    </Draggable>
  );
};

export default Node;