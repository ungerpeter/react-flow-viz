import React, { useState, useEffect } from 'react';
import Connector, { ConnectorProps } from './Connector';
import { objectToMap } from './utilities';

export interface ConnectorsProps {
  portsSpec: Object,
  mode: string,
  nodeUid: symbol,
  outputData?: Map<string, any>,
  onInputDataChanged?: Function
}

const Connectors: React.FC<ConnectorsProps> = (props: ConnectorsProps) => {

  const [connectors, setConnectors] = useState<any[]>([]);

  const assembleConnectors = () => {
    const _connectors: Map<string, { type: string, label: string}> = objectToMap(props.portsSpec);
    const _newConnectors: Array<ConnectorProps> = [];
    for (var [key, value] of _connectors) {
      const _data = props.outputData ? props.outputData.get(key) : null;
      const _connector: ConnectorProps = { 
        mode: props.mode,
        nodeUid: props.nodeUid,
        type: value.type,
        label: value.label,
        identifier: key,
        outputData: _data,
        onInputDataChanged: props.onInputDataChanged
      }
      _newConnectors.push(_connector);
    }
    setConnectors(_newConnectors);
  };

  useEffect(() => {
    assembleConnectors();
  }, [ props.portsSpec, props.outputData ]);

  return (
    <>
      {connectors.map((c) => <Connector key={c.identifier} {...c}>{c.label}</Connector>)}
    </>
  );
};

export default Connectors;