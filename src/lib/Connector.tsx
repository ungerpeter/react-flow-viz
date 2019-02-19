import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useConnections, useSelections } from './hooks';
import { Port } from './interfaces';

export interface NodeProps {
  mode: string;
  identifier: string;
  nodeUid: string;
}

const Container = styled.div<{ mode: string, active: boolean }>`
  position: relative;
  height: 30px;
  line-height: 30px;
  ${props => props.mode === 'output' ? css`
    padding-right: 13px;
    text-align: right;
  ` : css`
    padding-left: 13px;
    text-align: left;
  `};
`;

const Label = styled.div`
`;

const PortDOM = styled.div<{ mode: string, active: boolean }>`
  position: absolute;
  width: 14px;
  height: 14px;
  top: 50%;
  transform: translateY(-50%);
  box-shadow: 0 1px 7px rgba(0,0,0,.15);
  border: 1px solid rgba(0,0,0,.1);
  border-radius: 50%;
  background-color: #fff;
  z-index: 2000;
  ${props => props.mode === 'output' ? css`
    right: -8px;
  ` : css`
    left: -8px;
  `};
  ${props => props.active && css`
    background-color: #808080;
  `};
`;

const Connector: React.SFC<NodeProps> = (props) => {

  const [ port ] = useState<Port>({ uid: props.nodeUid, identifier: props.identifier });
  const [ isActive, setIsActive ] = useState<boolean>(false);
  const { activeConnections } = useConnections(props.mode, port);
  const { selections, setSelections } = useSelections();

  if (activeConnections.size > 0) {
    console.log(`${activeConnections.size} connections established`, activeConnections);
  } else {
    console.log("no connection established");
  }

  const toggleSelection = (): void => {
    const directedSelections = selections[props.mode];
    if(directedSelections.has(port)) {
      let updatedSelections = { ...selections };
      updatedSelections[props.mode].delete(port);
      setSelections(updatedSelections);
      activeConnections.size <= 0 && setIsActive(false);
    } else {
      let updatedSelections = { ...selections };
      updatedSelections[props.mode].add(port);
      setSelections(updatedSelections);
      setIsActive(true);
    }
  }

  return (
    <Container mode={props.mode} active={isActive}>
      <Label>{props.children}</Label>
      <PortDOM mode={props.mode} active={isActive} onClick={toggleSelection}></PortDOM>
    </Container>
  );
};

export default Connector;