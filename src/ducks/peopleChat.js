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
      // let list = [];
      // list.push(action.payload);
      // console.log(list);
      console.log(action.payload);
      return {
        ...state,
        messages: [...initial.messages, action.payload]
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
