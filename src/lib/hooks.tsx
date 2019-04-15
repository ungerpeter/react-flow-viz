import { useContext, useState, SetStateAction, Dispatch } from 'react';
import { Port, Pipeline } from './interfaces';
import { PortsContext, SelectionsContext, PipelinesContext } from './contexts';
import { getPosition, isSetsEqual } from './utilities';

type UsePort = (portIdentifier: symbol, portRef?: React.RefObject<HTMLDivElement>) => Port | null;
type UseSelection = (portIdentifier: symbol, mode: string) => { isSelected: boolean };
type UsePipelines = (pipelinesIds: Set<symbol> | null) => Set<Pipeline> | null;
type UseUniqueIdentifier = (symbolName: string) => [symbol, Dispatch<SetStateAction<symbol>>];

export const usePort: UsePort = (portUid, portRef) => {
  const ports = useContext(PortsContext);
  if (ports.state.has(portUid)) {
    const port = ports.state.get(portUid)!;
    port.position = portRef ? getPosition(portRef) : port.position;
    return port;
  }
  return null;
};

export const useSelection: UseSelection = (portIdentifier, mode) => {
  const selections = useContext(SelectionsContext);
  let isSelected = false;
  if (selections.state[mode].has(portIdentifier)) {
    isSelected = true;
  }
  return { isSelected };
};

export const usePipelines: UsePipelines = (pipelineUids) => {
  const [selectedPipelines, setSelectedPipelines] = useState(new Set());
  const [selectedPipelinesData, setSelectedPipelinesData] = useState(new Set());
  const pipelines = useContext(PipelinesContext);
  if (!pipelineUids) {
    return null;
  }
  const newPipelines = new Set([...pipelineUids].map((pipelineId) => {
    return pipelines.state.get(pipelineId)!;
  }));
  const newPipelinesData = new Set([...newPipelines].map((pipeline) => {
    return pipeline.data;
  }));
  if (!isSetsEqual(selectedPipelines, newPipelines) || !isSetsEqual(selectedPipelinesData, newPipelinesData)) {
    setSelectedPipelinesData(newPipelinesData);
    setSelectedPipelines(newPipelines);
  }
  return selectedPipelines;
};

export const useUniqueIdentifier: UseUniqueIdentifier = (symbolName = '') => {
  const [ symbol, setSymbol ] = useState(Symbol(symbolName));
  return [ symbol, setSymbol ];
};