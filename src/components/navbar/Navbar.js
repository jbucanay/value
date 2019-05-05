import React from "react";
import styles from "./navbar.module.scss";
import { connect } from "react-redux";
import { logout } from "../../ducks/signup";

import { Link } from "react-router-dom";

const Navbar = props => {
  console.log(props.logIn, props.logOut);
  return (
    <nav className={styles.navCont}>
      <header>
        <img
          src="https://i.postimg.cc/mkFGCFCV/logo-via-logohub-7.png"
          alt="logo"
        />
        <svg height="70" width="10">
          {/* width="3" height="31" */}
          <g fill="#ffff" stroke="#ffff">
            <path d="M1 60V4" strokeLinecap="round" strokeWidth=".5" />
          </g>
        </svg>
        <h1>People</h1>
      </header>

      <ul>
        {props.logIn ? (
          <Link to="/profile">
            <li className={styles.black}>Profile</li>
          </Link>
        ) : null}

        <Link to="/">
          <li className={styles.black}>People</li>
        </Link>

        {props.logIn ? (
          <Link to="/chat">
            <li className={styles.black}>Chat</li>
          </Link>
        ) : null}
        {props.logIn ? (
          <li onClick={() => props.logout()}>Logout</li>
        ) : (
          <Link to="/login">
            <li className={styles.black}>Login</li>
          </Link>
        )}
      </ul>
    </nav>
  );
};

const mapStateToProps = reduxState => {
  return {
    logIn: reduxState.signup.logedin,
    logOut: reduxState.signup.logout
  };
};

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
