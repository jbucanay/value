import React from "react";
import styles from "./navbar.module.scss";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className={styles.navCont}>
      <header>
        <img
          src="https://i.postimg.cc/5y7VP18Y/logo-via-logohub-6.png"
          alt="logo"
        />
        <svg height="70" width="10">
          {/* width="3" height="31" */}
          <g fill="none" stroke="#f9ba32">
            <path d="M1 60V4" strokeLinecap="round" strokeWidth=".5" />
          </g>
        </svg>
        <h1>People</h1>
      </header>
      <ul>
        <Button color="warning">People</Button>{" "}
        <Button color="warning">Leadership</Button>{" "}
        <Button color="warning">Shop</Button>{" "}
        <Link to="/login">
          <Button color="secondary" className={styles.black}>
            Login
          </Button>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
