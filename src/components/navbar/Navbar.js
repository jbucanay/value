import React from "react";
import styles from "./navbar.module.scss";

import { Link } from "react-router-dom";

const Navbar = () => {
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
      <input />
      <ul>
        <li>People</li>
        <li>Leadership</li>
        <li>Shop</li>
        <Link to="/login">
          <li className={styles.black}>Log in</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
