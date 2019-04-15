import React, { useState, useRef, useContext, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { usePort, useUniqueIdentifier, useSelection, usePipelines } from './hooks';
import { Port } from './interfaces';
import { PortsContext, SelectionsContext, PipelinesContext } from './contexts';

export interface ConnectorProps {
  mode: string;
  nodeUid: symbol;
  type: string;
  label: string;
  identifier: string;
  outputData?: any;
  onInputDataChanged?: Function;
}

type PortFactory = (uid: symbol, identifier: string) => Port;

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

const createPort: PortFactory = (uid, identifier) => {
  return { uid, identifier };
};

const Connector: React.FC<ConnectorProps> = (props) => {

  const [portUid] = useUniqueIdentifier('Port');
  const portRef = useRef<HTMLDivElement>(null);
  const port = usePort(portUid, portRef);
  const portsCtx = useContext(PortsContext);
  const selection = useSelection(portUid, props.mode);
  const selectionsCtx = useContext(SelectionsContext);
  const pipelines = usePipelines(port && port.pipelines || null);
  const pipelinesCtx = useContext(PipelinesContext);
  const [ cachedData, setCachedData ] = useState(new Map());
  const [ cachedPipelines, setCachedPipelines ] = useState(new Set());
  const [ isActive, setIsActive ] = useState(false);

  if (!port) {
    const _port = createPort(portUid, props.identifier);
    portsCtx.dispatch!({ type: 'add', port: _port });
  }

  if (!isActive && (selection.isSelected || (port && port.pipelines && port.pipelines.size > 0))) {
    setIsActive(true);
  }

  useEffect(() => {
    if (port && port.pipelines && port.pipelines.size > 0) {
      pipelinesCtx.dispatch!({ type: 'update pipelines', pipelines: port.pipelines, data: props.outputData });
    }
  }, [ props.outputData ]);

  useEffect(() => {
    if (pipelines && pipelines.size > cachedPipelines.size) {
      if (port && props.mode === 'output' && props.outputData) {
        pipelinesCtx.dispatch!({ type: 'update pipelines', pipelines: port.pipelines, data: props.outputData });
      }
      setCachedPipelines(pipelines);
    }
  }, [ pipelines ]);

  useEffect(() => {
    if (props.mode === 'input' && pipelines && pipelines.size > 0) {
      let cachedDataChanged = false;
      for (let pipeline of pipelines) {
        if (pipeline.data !== cachedData.get(pipeline.uid)) {
          cachedDataChanged = true;
          cachedData.set(pipeline.uid, pipeline.data);
        }
      }
      if (cachedDataChanged) {
        setCachedData(cachedData);
        if (typeof props.onInputDataChanged === 'function') {
          props.onInputDataChanged(props.identifier, new Set([...cachedData.values()]));
        }
      }
    }
  }, [ pipelines ]);



  const toggleSelection = (): void => {
    if (!(props.mode === 'input' && port && port.pipelines && port.pipelines.size > 0)) {
      if (selection.isSelected) {
        selectionsCtx.dispatch!({ type: 'remove', portUid, mode: props.mode });
      } else {
        selectionsCtx.dispatch!({ type: 'add', portUid, mode: props.mode });
      }
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