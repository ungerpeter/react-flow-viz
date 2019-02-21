import { useContext } from 'react';
import Context from './EditorContext';
import { PortConnection, EditorContext, Port } from './interfaces';

export const useConnections = (mode: string = 'input', port: Port) => {
  const { connections, setConnections } = useContext<EditorContext>(Context);
  let activeConnections: Set<PortConnection> = connections.get(port) || new Set();
  const setActiveConnections = (newConnections: Set<PortConnection>) => {
    connections.set(port, newConnections);
    setConnections(connections);
  };
  return { activeConnections, setActiveConnections };
};

export const useSelections = () => {
  const { selections, setSelections } = useContext<EditorContext>(Context);
  return { selections, setSelections };
}