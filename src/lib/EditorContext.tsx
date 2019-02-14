import React from "react";
import { EditorContext } from "./interfaces";

const defaultContext: EditorContext = {
  nodes: [],
  connections: [],
  outputs: {},
  setConnections: () => {},
  setOutputs: () => {}
}
const Context = React.createContext(defaultContext);

export default Context;