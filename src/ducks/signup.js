// initial state
import { default as a } from "../actions";
import Axios from "axios";

const people = {
  firstName: "",
  lastName: "",
  image: "",
  username: "",
  password: "",

  people_id: "",
  logedin: false,
  logout: false,
  error: false
};

export function newSignUp(firstName, lastName, username, url, password) {
  console.log(url);
  return {
    type: a.SIGNUP,
    payload: Axios.post("/auth/signup", {
      firstName,
      lastName,
      url,
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

export function logout() {
  return {
    type: a.LOGOUT,
    payload: Axios.get("/")
  };
}

export function getUser() {
  return {
    type: a.GETUSER,
    payload: Axios.get("/api/user").then(res => {
      return res.data;
    })
  };
}

export default function reducer(state = people, action) {
  switch (action.type) {
    case `${a.SIGNUP}_FULFILLED`:
      return {
        ...state,
        firstName: action.payload.data.first,
        lastName: action.payload.data.second,
        image: action.payload.data.image,
        logedin: true,
        error: false
      };
    case `${a.SIGNUP}_REJECTED`:
      return {
        ...state,
        firstName: action.payload.data.first,
        lastName: action.payload.data.second,
        image: action.payload.data.image,
        logedin: true,
        error: false
      };

    case `${a.LOGIN}_FULFILLED`:
      return {
        ...state,
        firstName: action.payload.data.first,
        lastName: action.payload.data.second,
        image: action.payload.data.image,
        people_id: action.payload.data.people_id,
        logedin: true,
        error: false
      };

    case `${a.LOGIN}_REJECTED`:
      return {
        ...state,
        error: true
      };

    case `${a.GETUSER}_FULFILLED`:
      return {
        ...state,
        firstName: action.payload.data.first,
        lastName: action.payload.data.second,
        image: action.payload.data.image,
        people_id: action.payload.data.people_id,
        logedin: true,
        error: false
      };

    case `${a.LOGOUT}_FULFILLED`:
      return {
        function() {
          window.location.reload();
        }
      };

    default:
      return state;
  }
}
