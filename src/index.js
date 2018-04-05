import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Persistor from './components/Persistor/Persistor';


ReactDOM.render(
  (
    <Persistor /> 
  ), document.getElementById('root'));
registerServiceWorker();