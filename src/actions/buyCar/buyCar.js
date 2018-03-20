
import fetch from 'isomorphic-fetch';
export const SEARCH_CAR_REQUSET = 'SEARCH_CAR_REQUSET';
export const SEARCH_CAR_SUCCESS = 'SEARCH_CAR_SUCCESS';
export const SEARCH_CAR_FAILURE = 'SEARCH_CAR_FAILURE';


export const searchCarRequest = () => ({
  type: SEARCH_CAR_REQUSET,
  timestamp: Date.now(),
  isFetching: true,
});

export const searchCarSuccess = response => ({
  type: SEARCH_CAR_SUCCESS,
  timestamp: Date.now(),
  isFetching: false,
  cars: response,
});

export const searchCarFailure = response => ({
  type: SEARCH_CAR_FAILURE,
  timestamp: Date.now(),
  isFetching: false,
  // errorCode: response.code,
  // errorMessage: response.message,
});


export const searchCar = url => (dispatch => {
  dispatch(searchCarRequest());
  return fetch(url)
    .then(res => res.json())
    .then(({ listings }) => {
      if (listings.length > 0) {
        dispatch(
          searchCarSuccess(listings)
        );
      } else {
        dispatch(
          searchCarFailure(listings)
        );
      }
    });
});
