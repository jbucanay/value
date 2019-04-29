// initial state
import actions from "../actions";

const people = {
  firstName: "",
  lastName: "",
  image: "",
  username: "",
  password: "",
  admin: false
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
    case actions.FIRSTNAME:
      return {
        ...state,
        firstName: action.payload.name
      };
    default:
      return state;
  }
}
