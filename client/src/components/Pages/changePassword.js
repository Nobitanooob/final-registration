import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline'

import FormPasswordReset from './helper/formPasswordReset'



function App(props) {
  return (
    <div className="App">
      <FormPasswordReset appBar={props.appBar} />
    </div>
  )
}

export default function ChangePassword(props){
  return (
    <CssBaseline>
      <App appBar={props.appBar} />
    </CssBaseline>
    );
}