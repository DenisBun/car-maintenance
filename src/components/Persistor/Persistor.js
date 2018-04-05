import React, { Component } from 'react';
import { persistStore } from 'redux-persist';
import { store } from '../../config/store';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from 'material-ui/styles';
import { muiTheme } from '../../config/muiTheme';
import App from '../App/App';

export default class Persistor extends Component {

  state = {
    isRehydrated: false,
  };

  componentDidMount() {
    persistStore(
      store,
      {},
      () => {
        this.setState({ isRehydrated: true })
      }
    )
  }

  render() {
    return this.state.isRehydrated
      ? (
        <MuiThemeProvider theme={muiTheme}>
          <Provider store={store}>
            <App />
          </Provider>
        </MuiThemeProvider> 
      )
      : (<div>Spinner</div>)
  }
}