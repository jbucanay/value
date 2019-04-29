import React from "react";
import { Link } from "react-router-dom";
import styles from "./login.module.scss";

const Finish = () => {
  return (
    <form className={styles.formCont}>
      <div className={styles.loginForm}>
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
        <Link to="/">
          <button>Secure submit</button>
        </Link>
      </div>
    </form>
  );
};

export default Finish;
