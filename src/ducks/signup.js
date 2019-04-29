// initial state
import { default as a } from "../actions";

const people = {
  firstName: "",
  lastName: "",
  image: "",
  username: "",
  password: "",
  admin: ""
};

/// make people for posting

// export function makePeople() {
//   return {
//     type: actions.FIRSTNAME,
//     payload:
//   };
// }

export default function reducer(state = people, action) {
  switch (action.type) {
    case a.FIRSTNAME:
      return {
        ...state,
        firstName: action.payload
      };
    case a.LASTNAME:
      return {
        ...state,
        lastName: action.payload
      };
    case a.IMAGE:
      return {
        ...state,
        image: action.payload
      };
    case a.USERNAME:
      return {
        ...state,
        username: action.payload
      };
    case a.PASSWORD:
      return {
        ...state,
        password: action.payload
      };
    case a.ADMIN:
      return {
        ...state,
        admin: action.payload
      };

    default:
      return state;
  }
}
