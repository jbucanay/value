import React, { Component } from "react";

import styles from "./login.module.scss";
import { storage } from "../../firebase";
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
      url: "",
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
    this.handleImage = this.handleImage.bind(this);
  }

  handleImage = e => {
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {},
      error => {
        console.log(error);
      },
      () => {
        /// complete function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            this.setState({ url }, () => this.handleNext());
          });
      }
    );
  };

  handleNext(e) {
    const { firstName, lastName, username, url, password } = this.state;
    console.log(url);
    this.props
      .newSignUp(firstName, lastName, username, url, password)
      .then(() => {
        console.log("REROUTE");
        this.props.history.push("/");
      });
  }

  render() {
    console.log(this.state.password);
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
            <p>Profile image</p>
            <input
              type="file"
              name="image"
              id={"image"}
              title=" "
              onChange={e => {
                if (e.target.files[0]) {
                  const image = e.target.files[0];
                  this.setState({ image });
                }
              }}
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

          <Button color="warning" onClick={() => this.handleImage()}>
            Secure submit
          </Button>
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
