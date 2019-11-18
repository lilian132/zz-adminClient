/* eslint-disable */

// Actions
const UPDATE = 'UPDATE'

// Reducer
const initState = {
  lan: '',
}

export const globalReducer = (state = initState, action) => {
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
const update = params => ({
  payload: params,
  type: UPDATE,
})

// Action export
export const globalAction = {
  update,
};