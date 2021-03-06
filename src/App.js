import React from 'react';
import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset, ThemeProvider } from '@material-ui/styles';
import PanelBaseline from './layouts/PanelBaseline';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { createMuiTheme } from '@material-ui/core';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const theme = createMuiTheme({
  direction: 'ltr',
});
function App(props) {
  return (
    <div dir={theme.direction}>
      <BrowserRouter>
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
      <Switch>
        <Route path='/' render={() => <SignIn />} exact/>
        <Route path='/signin' render={() => <SignIn />} exact/>
        <Route path='/signup' render={() => <SignUp />} exact/>
        <Route path='/panel' render={() => <PanelBaseline {...props} />}/>
      </Switch>
    </ThemeProvider>
      </StylesProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
