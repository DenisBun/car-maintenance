import { createMuiTheme } from 'material-ui/styles';

export const muiTheme = createMuiTheme({
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
    MuiBadge: {
      badge: {
        fontSize: '0.9rem',
        backgroundColor: '#03A9F4',
      },
    },
    MuiTableCell: {
      typeHead: {
        fontSize: '1rem',
      },
      typeBody: {
        fontSize: '1rem',
      },
    },
  },
});