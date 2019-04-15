import React, { useContext } from 'react';
import styled from 'styled-components';
import { Pipeline } from './interfaces';
import Spline from './Spline';
import { PipelinesContext } from './contexts';

const Svg = styled.svg`
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 3000;
  pointer-events: none;
  width: 100%;
  height: 100%;
`;

const Splines: React.SFC<{}> = () => {
  const pipelines = useContext(PipelinesContext);
  let connections: Array<Pipeline> = [];
  for (const pipeline of pipelines.state.values()) {
      connections.push(pipeline);
  }
  return (
    <Svg>
      {connections.map((con, idx) => <Spline key={idx} connection={con} />)}
    </Svg>
  );
};

export default Splines;