import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { useConnections, useSelections } from './hooks';
import { Port } from './interfaces';

export interface NodeProps {
  mode: string;
  identifier: string;
  nodeUid: string;
  value: any;
  updateValue: Function;
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

const valuesChanged = (array1: any[], array2: any[]): boolean => {
  if (array1.length !== array2.length) return true;
  let changed = false;
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      changed = true;
      break;
    }
  }
  return changed;
};

const Connector: React.SFC<NodeProps> = (props) => {
  const portRef = useRef<HTMLDivElement>(null);
  const getPosition = (): DOMRect | ClientRect => {
    return (portRef && portRef.current ? 
      portRef.current.getBoundingClientRect() :
      new DOMRect()
    );
  }
  const [ port ] = useState<Port>({ uid: props.nodeUid, identifier: props.identifier, getPosition: getPosition});
  const [ isActive, setIsActive ] = useState<boolean>(false);
  const { activeConnections } = useConnections(props.mode, port);
  const { selections, setSelections } = useSelections();

  const updateValues = () => {
    if (props.mode === 'input') {
      const connectionsData: Array<any> = [];
      for (const connection of activeConnections) {
        connectionsData.push(connection.data);
      }
      if (valuesChanged(connectionsData, props.value)) {
        console.log('update values', connectionsData, props);
        props.updateValue(connectionsData);
      }
    } else {
      for (let connection of activeConnections) {
        connection.data = props.value;
      }
      //setActiveConnections(activeConnections);
    }
  }
  
  if (activeConnections.size > 0) {
    updateValues();
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
      <PortDOM ref={portRef} mode={props.mode} active={isActive} onClick={toggleSelection}></PortDOM>
    </Container>
  );
};

export default Connector;