import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "reactstrap";
import styles from "./chat.module.scss";

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      message: ""
    };
    this.makeMessage = this.makeMessage.bind(this);
  }

  makeMessage(e) {
    this.setState({
      message: e.target.value
    });
  }

  render() {
    return (
      <div className={styles.chatCont}>
        <Card className={styles.card}>
          <p>{this.state.message}</p>
          <input
            placeholder={`Welcome ${this.props.firstName}, ${
              this.props.lastName
            } chat with your people....`}
            onChange={this.makeMessage}
          />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    firstName: reduxState.signup.firstName,
    lastName: reduxState.signup.lastName
  };
};

export default connect(mapStateToProps)(Chat);
