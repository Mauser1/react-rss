import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { blue800 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Root from './Root';
import '../node_modules/toastr/build/toastr.min.css';

const muiTheme = getMuiTheme({
  appBar: { height: 40 },
  palette: {
    primary1Color: blue800,
  },

});
const Index = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
      <Root />
    </div>
  </MuiThemeProvider>
);

render(<Index />, document.getElementById('root'));

module.hot.accept();
