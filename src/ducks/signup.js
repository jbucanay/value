// initial state
import { default as a } from "../actions";
import Axios from "axios";

const people = {
  firstName: "",
  lastName: "",
  image: "",
  username: "",
  password: "",
  admin: "",
  points: null,
  logedin: false,
  logout: false,
  error: false
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

export function loginUser(username, password) {
  return {
    type: a.LOGIN,
    payload: Axios.post("/auth/login", { username, password })
  };
}

export default function reducer(state = people, action) {
  switch (action.type) {
    case `${a.SIGNUP}_FULFILLED`:
      console.log(action.payload.data);
      return {
        ...state,
        firstName: action.payload.data.first,
        lastName: action.payload.data.second,
        image: action.payload.data.image,
        points: action.payload.data.points,
        logedin: true,
        error: false
      };
    case `${a.SIGNUP}_REJECTED`:
      console.log(action.payload);
      return {
        ...state,
        error: true
      };

    case `${a.LOGIN}_FUFILLED`:
      console.log(action.payload);
      return {
        ...state,
        logedin: true
      };

    case `${a.LOGIN}_REJECTED`:
      console.log(action.payload);
      return {
        ...state,
        error: true
      };

    default:
      return state;
  }
}
