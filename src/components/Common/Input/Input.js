import React from 'react';
import { Input as InputField, InputLabel } from 'material-ui';
import { FormControl, FormHelperText } from 'material-ui/Form';
import injectSheet from 'react-jss';
import { darkGray, white, BLUE, GRAY, GREEN, WHITE } from '../../../constants/colors';
import { getColorConfig } from '../../../utils/utils';
import { isEmpty } from 'lodash';


const styles = {
  inputLabelFocused: {
    color: ({ colorConfig }) => getColorConfig(colorConfig),
  },
  inputLabel: {
    fontFamily: 'Source Sans Pro, sans-serif',
  },
  inputInkbar: {
    '&:after': {
      backgroundColor: ({ colorConfig }) => getColorConfig(colorConfig),
    },
  },
  inputRoot: {
    marginBottom: '0px',
  },
  errorText: {
    marginBottom: ({ marginBottom }) => `${marginBottom || 0}px`,
  },
  input: {
    '-moz-appearance': 'textfield',
    fontFamily: 'Oswald, sans-serif',
  },
  underline: {
    '&:before': {
      backgroundColor: '#ccc',
    },
  },
};

const Input = ({
  classes, error, colorConfig, classNameFControl,
  inputLabel, fullWidth, shrink, marginBottom, placeholder,
  defaultValue, value, ...rest
}) => (
  <div className={classNameFControl}>
    <FormControl
      fullWidth={fullWidth}
      error={!isEmpty(error)}
      color={colorConfig}
    >
      {inputLabel
        ? <InputLabel
          FormControlClasses={{
            focused: classes.inputLabelFocused,
            root: classes.inputLabel,
          }}
          required={rest.required}
        >
          {inputLabel}
        </InputLabel>
        : null
      }
      <InputField
        classes={{
          root: classes.inputRoot,
          inkbar: classes.inputInkbar,
          input: classes.input,
          underline: classes.underline,
        }}
        defaultValue={defaultValue}
        placeholder={placeholder}
        value={value}
        {...rest}
      />
      <FormHelperText
        classes={{
          root: classes.errorText,
        }}
      >
        {error}
      </FormHelperText>
    </FormControl>
  </div>
);


export default injectSheet(styles)(Input);
