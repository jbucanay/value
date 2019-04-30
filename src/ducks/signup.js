// initial state
import actions, { default as a } from "../actions";
import Axios from "axios";

const people = {
  firstName: "",
  lastName: "",
  image: "",
  username: "",
  password: "",
  admin: ""
};

export function newSignUp(
  firstName,
  lastName,
  image,
  admin,
  username,
  password
) {
  return {
    type: a.SIGNUP,
    payload: Axios.post("/auth/signup", {
      firstName,
      lastName,
      image,
      admin,
      username,
      password
    })
  };
}

export default function reducer(state = people, action) {
  switch (action.type) {
    case `${a.SIGNUP}_FULFILLED`:
      console.log(action.payload.data);
      return {
        ...state,
        firstName: action.payload.data.first_name,
        lastName: action.payload.data.last_name,
        image: actions.payload.data.image,
        admin: action.payload.data.is_admin,
        username: action.payload.data.username,
        password: action.payload.data.password
      };
    default:
      return state;
  }
}
