import React, { Component } from "react";
import styles from "./login.module.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../ducks/signup";

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
        <div className={styles.loginForm}>
          Log in
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
            />
          </label>
          <button onClick={() => this.handleLogin()}>Log in</button>{" "}
          <p>New people</p>
          <Link to="/signup">
            {" "}
            <button>Create acount</button>
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
