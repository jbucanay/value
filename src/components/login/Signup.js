import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./login.module.scss";
import { CustomInput } from "reactstrap";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

export default class Signup extends Component {
  render() {
    return (
      <Form className={styles.formCont}>
        <div className={styles.loginForm}>
          Create Account
          <label htmlFor={"first"}>
            <p>Your first name</p>
            <input name="first" id={"first"} />
          </label>
          <label htmlFor={"last"}>
            <p>Your last name</p>
            <input name="last" id={"last"} />
          </label>
          <label htmlFor={"image"}>
            <p>Image</p>
            <input name="image" id={"image"} title=" " />
          </label>
          <label>
            <p>Admin</p>
            <CustomInput
              type="switch"
              id="exampleCustomSwitch"
              name="customSwitch"
            />
          </label>
          <Link to="/finish">
            <button>Next</button>
          </Link>
        </div>
      </Form>
    );
  }
}
