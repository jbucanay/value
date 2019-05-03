import { default as a } from "../actions";

const initial = {
  messages: [],

  status: ""
};

export function othersSay(something) {
  return {
    type: a.USERS,
    payload: something
  };
}

export function getStatus(webSocketStatus) {
  return {
    type: a.STATUS,
    payload: webSocketStatus
  };
}

export default function reducer(state = initial, action) {
  switch (action.type) {
    case a.USERS:
      console.log(JSON.parse(action.payload.data));
      return {
        ...state,
        messages: [...initial.messages, JSON.parse(action.payload.data)]
      };

    case a.STATUS:
      return {
        ...state,
        status: action.payload
      };

    default:
      return state;
  }
}
