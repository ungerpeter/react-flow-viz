import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Node from './Node';
import { NodeSpecification, PortSelections, PortConnection, Port } from './interfaces';
import implementations from './implementations';
import Context from './EditorContext';
import Spline from './Spline';
import Splines from './Splines';
import { domainToASCII } from 'url';

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

const ControlGroup = styled.div`
  position: fixed;
  bottom: 2em;
  left: 2em;
`;

const initialSelections = () => ({ input: new Set(), output: new Set() }) as PortSelections;

const renderConnections = (connections: Map<Port, Set<PortConnection>>) => {
  
}

const FlowViz: React.SFC<FlowVizProps> = (props) => {

  const [nodeCounter, setNodeCounter] = useState<number>(0);
  const [lastUiRender, setLastUiRender] = useState<number>(0);
  const [nodes, setNodes] = useState<any[]>(props.initialNodes!);
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
    setLastUiRender(Date.now());
  };

  const addNode = (nodeType: string) => {
    const spec: NodeSpecification | undefined = props.specs!.find((spec: NodeSpecification) => spec.type === nodeType);
    if (spec) {
      const node: { spec: NodeSpecification, uid: string } = { spec, uid: `${nodeCounter}-${spec.type}-${Date.now()}` }
      setNodes((prevNodes) => {
        return [...prevNodes, node];
      });
      setNodeCounter(nodeCounter+1);
    } else {
      console.error("Node type not found", nodeType);
    }
  }

  const handleNodeDrag = () => {
    setLastUiRender(Date.now());
  }

  return (
    <Context.Provider value={{ connections, setConnections, selections, setSelections }}>
      <Container>
        {nodes.map((n) => <Node {...n} key={n.uid} onDragEvent={handleNodeDrag} />)}
        <Splines connections={connections} />
        <ControlGroup>
          <button onClick={() => addNode('emit-number')}>Add Number Node</button>
          <button onClick={() => addNode('addition')}>Add Addition Node</button>
          <button onClick={() => addNode('tap')}>Add Tap Node</button>
        </ControlGroup>
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