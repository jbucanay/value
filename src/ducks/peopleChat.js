import { default as a } from "../actions";

const initial = {
  serverSaid: "",
  messages: [],
  status: ""
};

export function addMessage(personSay) {
  return {
    type: a.ADDMESSAGE,
    payload: personSay
  };
}
export function serverSaid(input) {
  return {
    type: a.USERS,
    payload: input
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
    case a.ADDMESSAGE:
      return {
        ...state,
        messages: [action.payload]
      };
    case a.USERS:
      return {
        ...state,
        serverSaid: action.payload
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
