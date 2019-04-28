import React, { Component } from "react";
import styles from "./login.module.scss";

export default class Login extends Component {
  state = {
    username: "",
    password: ""
  };
  render() {
    return (
      <form className={styles.formCont}>
        <div className={styles.loginForm}>
          Sign in
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
          <button>Login</button>
          <p>New people</p>
          <button>Create acount</button>
        </div>
      </form>
    );
  }
}
