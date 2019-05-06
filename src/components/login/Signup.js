import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./login.module.scss";

import { connect } from "react-redux";
import { newSignUp } from "../../ducks/signup";
import { Button } from "reactstrap";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      image: "",

      username: "",
      password: ""
    };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;
    this.setState({
      [itemName]: itemValue
    });
  }

  handleNext(e) {
    const {
      firstName,
      lastName,
      image,

      username,
      password
    } = this.state;
    this.props.newSignUp(firstName, lastName, image, username, password);
  }

  render() {
    return (
      <form className={styles.formCont}>
        <div className={styles.loginForm}>
          <label htmlFor={"first"}>
            <p>Your first name</p>
            <input name="firstName" id={"first"} onChange={this.handleInput} />
          </label>
          <label htmlFor={"last"}>
            <p>Your last name</p>
            <input name="lastName" id={"last"} onChange={this.handleInput} />
          </label>
          <label htmlFor={"image"}>
            <p>Image</p>
            <input
              name="image"
              id={"image"}
              title=" "
              onChange={this.handleInput}
            />
          </label>
          <label />
          <label htmlFor={"username"}>
            <p>Username</p>
            <input
              name="username"
              id={"username"}
              onChange={this.handleInput}
            />
          </label>
          <label htmlFor={"password"}>
            <p>Password</p>
            <input
              name="password"
              id={"password"}
              onChange={this.handleInput}
              type={"password"}
            />
          </label>
          <Link to="/">
            <Button color="warning" onClick={() => this.handleNext()}>
              Secure submit
            </Button>
          </Link>
        </div>
      </form>
    );
  }
}

const mapStateToProps = reduxState => reduxState;

export default connect(
  mapStateToProps,
  { newSignUp }
)(Signup);
