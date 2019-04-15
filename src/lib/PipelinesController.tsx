import React, { useContext } from 'react';
import { SelectionsContext, PipelinesContext, PortsContext } from './contexts';
import { PortSelections, Pipeline } from './interfaces';
import { cartesianProduct } from './utilities';

type PipelineFactory = (input: symbol, output: symbol, data?: any) => Pipeline;

const canCreatePipeline = (selections: PortSelections): boolean => {
  return (selections.input.size > 0) && (selections.output.size > 0) ? true : false;
};

const createPipelines = (pairs: Array<Array<symbol>>, pipelines: any, selections: any) => {
  const newPipelines: Array<Pipeline> = pairs.map((pair: Array<symbol>) => {
    const [ input, output ] = pair;
    return createPipeline(input, output);
  });
  if (newPipelines.length > 0) {
    pipelines.dispatch!({ type: 'add', pipelines: newPipelines });
    selections.dispatch!({ type: 'clear' });
  }
  return newPipelines;
};

const createPipeline: PipelineFactory = (input, output, data = null) => {
  return { uid: Symbol('Pipeline'), input, output, data };
};

const connectPortsToPipelines = (newPipelines: Array<Pipeline>, ports: any) => {
  newPipelines.forEach((pipeline) => {
    const { uid, input, output } = pipeline;
    ports.dispatch!({ type: 'set pipeline', pipelineUid: uid, ports: [input, output] });
  });
};

const PipelinesController: React.FC<{}> = () => {
  const pipelines = useContext(PipelinesContext);
  const selections = useContext(SelectionsContext);
  const ports = useContext(PortsContext);

  if (canCreatePipeline(selections.state)) {
    const newPipelines = createPipelines(
      cartesianProduct([...selections.state.input], [...selections.state.output]),
      pipelines,
      selections
    );
    if (newPipelines.length > 0) {
      connectPortsToPipelines(newPipelines, ports);
    }
  }
  return (
    <></>
  );
};

export default PipelinesController;