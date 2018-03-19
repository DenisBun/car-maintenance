
 import { cond, isEqual, eq, constant, stubTrue } from 'lodash/fp';
 import { darkGray, blue, greenLime, white, BLUE, GRAY, GREEN, WHITE } from '../constants/colors';
 import { store } from '../config/store';



export const getColorConfig = cond([
  [(color) => isEqual(color, BLUE), constant(blue)],
  [(color) => isEqual(color, GREEN), constant(greenLime)],
  [(color) => isEqual(color, GRAY), constant(darkGray)],
  [() => stubTrue, constant(blue)],
]);

export const checkPaginationChanges = (props, nextProps) =>
  !eq(props.page, nextProps.page) ||
  !eq(props.count, nextProps.count) ||
  !eq(props.sortOrder, nextProps.sortOrder) ||
  !eq(props.sortField, nextProps.sortField)
;

export const isValid = validationResultArray =>
  !validationResultArray.some(validationResult => validationResult === false);

export function isLoggedIn() {
  return store.getState().user.isAuthenticated;
}
