import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './config/store';

const store = configureStore();

const muiTheme = createMuiTheme({
  typography: {
    fontFamily: 'Oswald, sans-serif',
  },
  overrides: {
    MuiInput: {
      underline: {
        '&:hover:not($disabled):before': {
          backgroundColor: 'rgba(0, 0, 0, 0.42)',
          height: 1,
          bottom: 0,
        },
      },
      error: {
        '&:after': {
          backgroundColor: '#ff1744 !important',
        },
      },
    },
    MuiFormHelperText: {
      root: {
        marginTop: 5,
      },
      error: {
        marginBottom: 0,
      },
    },
    MuiButton: {
      root: {
        color: '#03A9F4',
      },
    },
    MuiTableHead: {
      root: {
        fontSize: '1rem',
      },
    },
    MuiTableBody: {
      root: {
        fontSize: '1rem',
      },
    },
    MuiTableSortLabel: {
      root: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
  },
});


ReactDOM.render(
  (<MuiThemeProvider theme={muiTheme}>
    <Provider store={store}>
      <Routes />
    </Provider>
    </MuiThemeProvider>  
  ), document.getElementById('root'));
registerServiceWorker();