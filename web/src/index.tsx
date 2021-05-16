import React from 'react';
import ReactDOM from 'react-dom';
import { Application } from './Application';
import { ChakraProvider, ThemeProvider, ColorModeProvider, CSSReset, theme } from "@chakra-ui/react"


ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
  <ThemeProvider theme={theme}>
      <ColorModeProvider options={{}} />
      <CSSReset />
      <Application />
   
  </ThemeProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
