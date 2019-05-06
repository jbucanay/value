import { default as a } from "../actions";
import Axios from "axios";

const initial = {
  messages: [],
  create: "",
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
      const chatMessage = JSON.parse(action.payload.data);
      const userSaid = chatMessage.message;
      const date = chatMessage.date.today;
      const id = chatMessage.people_id;
      return {
        ...state,
        messages: [...initial.messages, JSON.parse(action.payload.data)],
        create: (function() {
          Axios.post("/api/message", {
            message: userSaid,
            day: date,
            people_id: id
          });
        })()
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
