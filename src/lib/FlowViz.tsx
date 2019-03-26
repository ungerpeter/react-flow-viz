import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NodeSpecification, PortSelections, PortConnection, Port } from './interfaces';
import implementations from './implementations';
import Context from './EditorContext';
import Splines from './Splines';
import Nodes from './Nodes';

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

const initialSelections = () => ({ input: new Set(), output: new Set() }) as PortSelections;

const FlowViz: React.SFC<FlowVizProps> = (props) => {
  // const [lastUiRender, setLastUiRender] = useState<number>(0);
  const [connections, setConnections] = useState<Map<Port, Set<PortConnection>>>(new Map());
  const [selections, setSelections] = useState<PortSelections>(initialSelections());

  useEffect(() => {
    if (selections.input.size > 0 && selections.output.size > 0) {
      const newConnections: Map<Port, Set<PortConnection>> = new Map();
      for (const input of selections.input.values()) {
        const inputConnections = connections.get(input) || new Set();
        for (const output of selections.output.values()) {
          const outputConnections = connections.get(output) || new Set();
          // TODO: check if portConnection already exists
          const newConnection: PortConnection = {input, output};
          inputConnections.add(newConnection);
          outputConnections.add(newConnection);
          newConnections.set(input, inputConnections);
          newConnections.set(output, outputConnections);
        }; 
      };
      // setConnections(new Map(function*() { yield* connections; yield* newConnections; }()));
      newConnections.forEach((v,k) => connections.set(k,v));
      setConnections(connections);
    }
  });

  useEffect(() => {
    if (selections.input.size > 0 && selections.output.size > 0) {
      setSelections(initialSelections());
    }
  });

  useEffect(() => {
    window.addEventListener('resize', handleResizeEvent);
    return () => {
      window.removeEventListener('resize', handleResizeEvent);
    }
  });

  const handleResizeEvent = (event: Event) => {
    // setLastUiRender(Date.now());
  };

  return (
    <Context.Provider value={{ connections, setConnections, selections, setSelections }}>
      <Container>
        <Nodes specs={props.specs!} />
        <Splines connections={connections} />
      </Container>
    </Context.Provider>
  );
};

FlowViz.defaultProps = {
  initialNodes: [],
  initialConnections: [],
  specs: implementations
}

export default FlowViz;