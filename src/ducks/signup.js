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
  error: false,
  reload: ""
};

export function update(id, name, last) {
  return {
    type: a.UPDATE,
    payload: Axios.put(`/api/update/${id}`, {
      name,
      last
    }).then(result => {
      return result;
    })
  };
}

export function deleteAccount(id) {
  return {
    type: a.DELETE,
    payload: Axios.delete(`/api/delete/${id}`).then(res => {
      return res.data;
    })
  };
}

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
      console.log(action.payload);
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
        reload: (function() {
          window.location.reload();
        })()
      };
    case `${a.DELETE}_FULFILLED`:
      console.log(action.payload);
      return {
        ...state,
        logedin: false
      };
    case `${a.UPDATE}_FULFILLED`:
      console.log(action.payload);
      return {
        ...state,
        firstName: action.payload.data.first_name,
        lastName: action.payload.data.last_name,
        image: action.payload.data.image,
        people_id: action.payload.data.people_id
      };
    default:
      return state;
  }
}
