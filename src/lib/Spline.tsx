import React from 'react';
import { Pipeline } from './interfaces';
import { usePort } from './hooks';

export interface NodeProps {
  connection: Pipeline;
}

export interface CenterPoint {
  x: number;
  y: number;
}

const getCenterPoint = (domRect: DOMRect): CenterPoint => {
  const x = domRect.x + domRect.width / 2;
  const y = domRect.y + domRect.height / 2;
  return { x, y };
}

const getPathString = (start: CenterPoint, end: CenterPoint) => {
  const dist = Math.sqrt(Math.pow((end.x - start.x), 2) + Math.pow((end.y - start.y), 2));
  return `M${start.x},${start.y} C${start.x + dist * 0.25},${start.y} ${end.x - dist * 0.25},${end.y}  ${end.x},${end.y}`;
}

const Spline: React.SFC<NodeProps> = (props: NodeProps) => {
  const inputPort = usePort(props.connection.input);
  const outputPort = usePort(props.connection.output);

  if (!(inputPort && inputPort.position && outputPort && outputPort.position)) {
    return (<></>);
  }

  const inputPos: CenterPoint = getCenterPoint(inputPort.position);
  const outputPos: CenterPoint = getCenterPoint(outputPort.position);
  const pathString = getPathString(outputPos, inputPos);
  

  return (
    <>
      <path stroke="#808080" fill="transparent" strokeWidth="3" d={pathString} />
      <text x={inputPos.x+((outputPos.x - inputPos.x)/2)} y={inputPos.y+((outputPos.y - inputPos.y)/2)}>{typeof props.connection.data === 'object' ? '{OBJ}' : props.connection.data}</text>
    </>
  );
};

export default Spline;