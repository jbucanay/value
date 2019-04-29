import React, { Component } from "react";
import styles from "./login.module.scss";
import { Link } from "react-router-dom";

export default class Login extends Component {
  state = {
    username: "",
    password: ""
  };
  render() {
    return (
      <form className={styles.formCont}>
        <div className={styles.loginForm}>
          Log in
          <label htmlFor={"username"}>
            {" "}
            <p>Username</p>
            <input name="username" id={"username"} />
          </label>
          <label htmlFor={"password"}>
            {" "}
            <p>Password</p>
            <input name="password" id={"password"} />
          </label>
          <button>Log in</button>
          <p>New people</p>
          <Link to="/signup">
            {" "}
            <button>Create acount</button>
          </Link>
        </div>
      </form>
    );
  }
}
