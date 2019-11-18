/* eslint-disable */

// Actions
const UPDATE = 'HOME_UPDATE'

// Reducer
const initState = {
  init: false,
}

export const homeReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

// Action Creators
const homeUpdate = params => ({
  payload: params,
  type: UPDATE,
})

// Action export
export const homeAction = {
  homeUpdate,
};