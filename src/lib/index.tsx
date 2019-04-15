import React, { useReducer, useEffect, useState } from 'react';
import styled from 'styled-components';
import { NodeSpecification, PortSelections } from './interfaces';
import implementations from './implementations';
import Splines from './Splines';
import Nodes from './Nodes';
import { PipelinesContext, PortsContext, SelectionsContext } from './contexts';
import { pipelinesReducer, portsReducer, selectionsReducer } from './reducers';
import PipelinesController from './PipelinesController';

interface FlowVizProps {
  initialNodes?: Node[],
  initialConnections?: any[],
  specs?: NodeSpecification[]
}

const Container = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400');
  height: 100%;
  background-color: #fafafa;
  font-family: 'Open Sans', sans-serif;
`;

const FlowViz: React.SFC<FlowVizProps> = (props) => {

  const [ pipelinesState, pipelinesDispatch ] = useReducer(pipelinesReducer, new Map());
  const [ portsState, portsDispatch ] = useReducer(portsReducer, new Map());
  const [ selectionsState, selectionsDispatch ] = useReducer(selectionsReducer, {
    input: new Set(),
    output: new Set()
  } as PortSelections);
  // TODO: Find better solution for pushing the update cycle
  const setLastUiRender = useState(Date.now())[1];


  useEffect(() => {
    console.log('new pipelines state', pipelinesState);
  }, [pipelinesState]);
  useEffect(() => {
    console.log('new ports state', portsState);
  }, [portsState]);
  useEffect(() => {
    console.log('new selections state', selectionsState);
  }, [selectionsState]);


  return (
    <PipelinesContext.Provider value={{ state: pipelinesState, dispatch: pipelinesDispatch }}>
      <PortsContext.Provider value={{ state: portsState, dispatch: portsDispatch }}>
        <SelectionsContext.Provider value={{ state: selectionsState, dispatch: selectionsDispatch }}>
          <PipelinesController />
          <Container>
            <Nodes specs={props.specs!} onNodeDragged={setLastUiRender} />
            <Splines />
          </Container>
        </SelectionsContext.Provider>
      </PortsContext.Provider>
    </PipelinesContext.Provider>
  );
};

FlowViz.defaultProps = {
  initialNodes: [],
  initialConnections: [],
  specs: implementations
}

export default FlowViz;