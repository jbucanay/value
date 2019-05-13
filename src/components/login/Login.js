import React, { Component } from "react";
import styles from "./login.module.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../ducks/signup";
import { Button } from "reactstrap";

class Login extends Component {
  constructor() {
    super();

    this.state = {
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

  handleLogin(e) {
    this.props.loginUser(this.state.username, this.state.password);
  }

  render() {
    return (
      <form className={styles.formCont}>
        <img
          className={styles.ham}
          src="https://i.postimg.cc/mkFGCFCV/logo-via-logohub-7.png"
          alt="logo"
        />
        <div className={styles.loginForm}>
          <label htmlFor={"username"}>
            {" "}
            <p>Username</p>
            <input
              name="username"
              id={"username"}
              onChange={this.handleInput}
              value={this.state.username}
            />
          </label>
          <label htmlFor={"password"}>
            {" "}
            <p>Password</p>
            <input
              name="password"
              id={"password"}
              onChange={this.handleInput}
              value={this.state.password}
              type={"password"}
            />
          </label>

          <Link to="/">
            <Button
              color="warning"
              onClick={() => this.handleLogin()}
              className={styles.loginBtn}
            >
              Log in
            </Button>{" "}
          </Link>

          <p className={styles.p}>.</p>
          <Link to="/signup">
            {" "}
            <Button color="warning">Create acount</Button>
          </Link>
        </div>
      </form>
    );
  }
}

const mapStateToProps = reduxState => reduxState;

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
