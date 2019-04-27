import React, { useState } from "react";
import styles from "./navbar.module.scss";
import { Button } from "reactstrap";
const Navbar = () => {
  return (
    <nav className={styles.navCont}>
      <header>
        <img
          src="https://i.postimg.cc/rp33P2ND/logo-via-logohub-5.png"
          alt="logo"
        />
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
