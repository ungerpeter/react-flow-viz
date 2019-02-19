import React from "react";
import { EditorContext } from "./interfaces";

const defaultContext: EditorContext = {
  connections: new Map(),
  selections: {
    input: new Set(),
    output: new Set()
  },
  setConnections: () => {},
  setSelections: () => {}
};
const Context = React.createContext(defaultContext);

export default Context;