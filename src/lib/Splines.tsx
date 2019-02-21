import React from 'react';
import styled from 'styled-components';
import { PortConnection, Port } from './interfaces';
import Spline from './Spline';

export interface NodeProps {
  connections: Map<Port, Set<PortConnection>>;
}

const Svg = styled.svg`
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 3000;
  pointer-events: none;
  width: 100%;
  height: 100%;
`;

const Splines: React.SFC<NodeProps> = (props: NodeProps) => {
  let drawnConnections: Set<PortConnection> = new Set();
  let connections: Array<PortConnection> = [];
  for (const portConnections of props.connections.values()) {
    for (const portConnection of portConnections) {
      if (!drawnConnections.has(portConnection)) {
        connections.push(portConnection);
        drawnConnections.add(portConnection);
      }
    }
  }
  return (
    <Svg>
      {connections.map((con, idx) => <Spline key={idx} connection={con} />)}
    </Svg>
  );
};

export default Splines;