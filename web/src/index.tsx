import React from 'react';
import ReactDOM from 'react-dom';
import { Application } from './Application';
import { ChakraProvider, ThemeProvider, ColorModeProvider, CSSReset, theme } from "@chakra-ui/react"
import  {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *:focus {
    outline: none !important;
    box-shadow: none !important;
  }
  body {
    background: #f9f9f9;;
  }
`

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <ThemeProvider theme={theme} >
          <ColorModeProvider options={{}} />
          <GlobalStyle />
          <CSSReset />
          <Application />
      
      </ThemeProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
