// initial state
import a from "../actions";

const people = {
  firstName: "",
  lastName: "",
  image: "",
  username: "",
  password: ""
};

export function makePeople() {
  return {
    addFirstName: function(name) {
      return {
        type: a.FIRSTNAME,
        payload: name
      };
    }
  };
}

export default function reducer(state = people, action) {
  switch (action.type) {
    case a.FIRSTNAME:
      return {
        ...state,
        firstName: action.payload
      };
    default:
      return state;
  }
}
