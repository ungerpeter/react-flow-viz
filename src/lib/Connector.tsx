import React from 'react';
import styled, { css } from 'styled-components';

export interface NodeProps {
  mode: string;
}

const Container = styled.div<{ mode: string }>`
  position: relative;
  height: 30px;
  line-height: 30px;
  ${props => props.mode === 'out' ? css`
    padding-right: 13px;
    text-align: right;
  ` : css`
    padding-left: 13px;
    text-align: left;
  `};
`;

const Label = styled.div`
`;

const Port = styled.div<{ mode: string }>`
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
  ${props => props.mode === 'out' ? css`
    right: -8px;
  ` : css`
    left: -8px;
  `};
`;

const Connector: React.SFC<NodeProps> = (props) => {

  return (
    <Container mode={props.mode}>
      <Label>{props.children}</Label>
      <Port mode={props.mode}></Port>
    </Container>
  );
};

export default Connector;