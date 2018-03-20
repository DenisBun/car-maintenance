import {
  SEARCH_CAR_REQUSET,
  SEARCH_CAR_SUCCESS,
  SEARCH_CAR_FAILURE
} from '../../actions/buyCar/buyCar';

const initialState = {
  isFetching: false,
  cars: [],
};

const buyCar = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_CAR_REQUSET:
      return {
        ...state,
        isFetching: true,
      };
    case SEARCH_CAR_SUCCESS:
      return {
        ...state,
        cars: action.cars,
        isFetching: false,
      };
    case SEARCH_CAR_FAILURE:
      return {
        ...state,
        cars: null,
        isFetching: false
      };
    default:
      return state;
  }
};

export default buyCar;
