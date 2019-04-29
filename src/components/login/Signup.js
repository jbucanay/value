import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./login.module.scss";
import { CustomInput } from "reactstrap";
import { connect } from "react-redux";
// import { makePeople } from "../../ducks/signup"; use for posting
import { default as a } from "../../actions";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      image: "",
      admin: false
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

  handleNext() {
    const { firstName, lastName, image, admin } = this.state;
    this.props.dispatch({
      type: a.FIRSTNAME,
      payload: firstName
    });
    this.props.dispatch({
      type: a.LASTNAME,
      payload: lastName
    });
    this.props.dispatch({
      type: a.IMAGE,
      payload: image
    });
    this.props.dispatch({
      type: a.ADMIN,
      payload: admin
    });
  }

  render() {
    return (
      <form className={styles.formCont}>
        <div className={styles.loginForm}>
          Create Account
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
          <label>
            <p>Admin</p>
            <CustomInput
              type="switch"
              id="exampleCustomSwitch"
              name="admin"
              value={this.state.admin}
              onClick={() =>
                this.setState({
                  admin: !this.state.admin
                })
              }
            />
          </label>
          <Link to="/finish">
            <button onClick={() => this.handleNext()}>Next</button>
          </Link>
        </div>
      </form>
    );
  }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Signup);
