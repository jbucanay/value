import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "reactstrap";
import styles from "./chat.module.scss";
import { addMessage, serverSaid, getStatus } from "../../ducks/peopleChat";
import DisplayChat from "./DisplayChat";

const URL = "ws://localhost:3030";

class Chat extends Component {
  state = {
    message: "",
    status: ""
  };

  ws = new WebSocket(URL);

  componentDidMount() {
    this.ws.onopen = () => {
      this.props.getStatus("connected");
      this.setState({ status: "connected" });

      console.log("connected");
    };

    this.ws.onmessage = evt => {
      const message = JSON.parse(evt.data);
      this.props.serverSaid(message);
    };

    this.ws.onclose = () => {
      this.setState({ status: "disconnected", ws: new WebSocket(URL) });
      this.props.getStatus("disconnected");
    };
  }

  makeMessage = e => {
    this.setState({
      message: e.target.value
    });
  };

  submitMessage = typed => {
    let userSaid = {
      message: typed,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      image: this.props.image
    };
    this.ws.send(JSON.stringify(typed));

    this.props.addMessage(userSaid);
  };

  render() {
    return (
      <div className={styles.chatCont}>
        <Card className={styles.card}>
          <DisplayChat />
          <form onSubmit={e => this.submitMessage(this.state.message)}>
            <input
              placeholder={`Welcome ${this.props.firstName}, ${
                this.props.lastName
              } you are ${this.state.status}`}
              onChange={this.makeMessage}
            />
          </form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    firstName: reduxState.signup.firstName,
    lastName: reduxState.signup.lastName,
    image: reduxState.signup.image
  };
};

export default connect(
  mapStateToProps,
  { addMessage, serverSaid, getStatus }
)(Chat);
