import React from 'react';
import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset, ThemeProvider } from '@material-ui/styles';
import ResponsiveDrawer from './layouts/Drawer';
import { BrowserRouter } from 'react-router-dom'

import { createMuiTheme } from '@material-ui/core';
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const theme = createMuiTheme({
  direction: 'ltr',
});
function App() {
  return (
    <div dir="ltr">
      <BrowserRouter
>
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ResponsiveDrawer />
    </ThemeProvider>
      </StylesProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
