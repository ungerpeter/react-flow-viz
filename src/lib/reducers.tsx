import { PortSelections, Port, Pipeline } from "./interfaces";

export const pipelinesReducer: React.Reducer<any, any> = (state, action) => {
  const newMap = new Map(state);
  switch (action.type) {
    case 'add':
      action.pipelines.forEach((newPipeline: Pipeline) => {
        newMap.set(newPipeline.uid, newPipeline);
      });
      return newMap;
    case 'update pipelines':
      action.pipelines.forEach((pipelineUid: symbol) => {
        const updatedPipeline: Pipeline = state.get(pipelineUid);
        if (updatedPipeline) {
          updatedPipeline.data = action.data;
          newMap.set(pipelineUid, updatedPipeline);
        }
      });
      return newMap;
    default:
      throw new Error();
  }
}

export const portsReducer: React.Reducer<Map<symbol, Port>, any> = (state, action) => {
  switch (action.type) {
    case 'add':
      return new Map(state).set(action.port.uid, action.port);
    case 'set pipeline':
      action.ports.forEach((portUid: symbol) => {
        const _port = state.get(portUid);
        if (_port) {
          _port.pipelines ? _port.pipelines.add(action.pipelineUid) : _port.pipelines = new Set([action.pipelineUid]);
          state.set(portUid, _port);
        }
      });
      return new Map(state);
    default:
      throw new Error();
  }
}

export const selectionsReducer: React.Reducer<any, any> = (state, action) => {
  switch (action.type) {
    case 'add':
      state[action.mode].add(action.portUid);
      return constructPortSelections(state.input, state.output);
    case 'remove':
      state[action.mode].delete(action.portUid);
      return constructPortSelections(state.input, state.output);
    case 'clear':
      return constructPortSelections();
    default:
      throw new Error();
  }
}

const constructPortSelections = (input: Set<symbol> = new Set(), output: Set<symbol> = new Set()): PortSelections => ({ input, output });