import React from 'react';
import { Button as MuiButton } from 'material-ui';

 import { darkGray, white, BLUE, GRAY, GREEN, WHITE } from '../../../constants/colors';
 import { getColorConfig } from '../../../utils/utils';




export const getStyles = (color, fullWidth, isFlat) => ({
  color: isFlat ? color : color === white ? darkGray : white,
  background: isFlat ? '' : color,
  width: fullWidth ? '100%' : '',
});

const Button = ({ colorConfig, fullWidth, isRaised = false, isFlat, ...rest }) => (
  <MuiButton
    raised={isRaised.toString()}
    style={{
      ...getStyles(getColorConfig(colorConfig), fullWidth, isFlat),
    }}
    {...rest}
  />
);

export default Button;
