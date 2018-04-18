import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Root from './Root';

const Index = () => (
  <MuiThemeProvider>
    <div>
      <Root />
    </div>
  </MuiThemeProvider>
);

render(<Index />, document.getElementById('root'));

module.hot.accept();
