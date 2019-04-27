import React, { useState } from "react";
import styles from "./navbar.module.scss";
import { Button } from "reactstrap";
const Navbar = () => {
  return (
    <nav className={styles.navCont}>
      <header>
        <img
          src="https://i.postimg.cc/FKfpBPpz/android-chrome-312x312.png"
          alt="logo"
        />
        <span>alue</span>
        <svg height="70" width="10">
          {/* width="3" height="31" */}
          <g fill="none" stroke="#f9ba32">
            <path
              stroke-width="1"
              d="M1 60V4"
              stroke-linecap="round"
              stroke-width=".5"
            />
          </g>
        </svg>
        <h1>People</h1>
      </header>
      <ul>
        <Button color="warning">People</Button>{" "}
        <Button color="warning">Leadership</Button>{" "}
        <Button color="warning">Shop</Button>{" "}
        <Button color="secondary" className={styles.black}>
          Login
        </Button>
      </ul>
    </nav>
  );
};

export default Navbar;
