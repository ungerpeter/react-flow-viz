import React, { Fragment } from 'react';
import { createGlobalStyle } from 'styled-components'
import FlowViz from './lib/';

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
`

export const App = () => (
  <Fragment>
    <GlobalStyle />
    <FlowViz />
  </Fragment>
);