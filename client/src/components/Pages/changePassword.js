import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline'

import FormPasswordReset from './helper/formPasswordReset'



function App() {
  return (
    <div className="App">
      <FormPasswordReset />
    </div>
  )
}

export default function changePassword(){
  return (
    <CssBaseline>
      <App />
    </CssBaseline>
    );
}