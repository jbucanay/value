import { default as a } from "../actions";

const initialState = {
  messages: []
};

export function getMessage(message) {
  return {
    type: a.MESSAGE,
    payload: message
  };
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case a.MESSAGE:
      return {
        ...state,
        messages: [...initialState.messages, payload]
      };
    default:
      return state;
  }
}
