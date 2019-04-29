import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./login.module.scss";
import { connect } from "react-redux";
import { default as a } from "../../actions";

const Finish = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const addUser = e => {
    props.dispatch({
      type: a.USERNAME,
      payload: username
    });
    props.dispatch({
      type: a.PASSWORD,
      payload: password
    });
  };

  return (
    <form className={styles.formCont}>
      <div className={styles.loginForm}>
        <label htmlFor={"username"}>
          {" "}
          <p>Username</p>
          <input
            name="username"
            id={"username"}
            onChange={e => setUsername(e.target.value)}
            value={username}
          />
        </label>
        <label htmlFor={"password"}>
          {" "}
          <p>Password</p>
          <input
            type="password"
            name="password"
            id={"password"}
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <Link to="/">
          <button onClick={() => addUser()}>Secure submit</button>
        </Link>
      </div>
    </form>
  );
};

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Finish);
