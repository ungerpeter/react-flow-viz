import React from 'react';
import { PortConnection } from './interfaces';

export interface NodeProps {
  connection: PortConnection;
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
  return `M${start.x},${start.y} C${start.x + dist * 0.25},${start.y} ${end.x - dist * 0.75},${end.y}  ${end.x},${end.y}`;
}

const Spline: React.SFC<NodeProps> = (props: NodeProps) => {
  const inputPos: CenterPoint = getCenterPoint(props.connection.input.getPosition());
  const outputPos: CenterPoint = getCenterPoint(props.connection.output.getPosition());
  console.log("positions: ", inputPos, outputPos);
  const pathString = getPathString(outputPos, inputPos);

  return (
    <path stroke="#808080" fill="transparent" strokeWidth="3" d={pathString} />
  );
};

export default Spline;