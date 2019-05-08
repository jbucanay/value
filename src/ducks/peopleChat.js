import { default as a } from "../actions";

const initialState = {
  user: null
};

export function setUser(userin) {
  return {
    type: a.USER_IN,
    payload: userin
  };
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case a.USER_IN:
      return {
        ...state,
        user: payload
      };
    default:
      return state;
  }
}
