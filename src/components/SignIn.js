import React from 'react';
import { RaisedButton, FontIcon } from 'material-ui';


const SignIn = () => (<RaisedButton
  label="Sign in with Google"
  labelColor="#ffffff"
  backgroundColor="#dd4b39"
  icon={<FontIcon className="fa fa-google-plus" />}
/>);

export default (SignIn);
