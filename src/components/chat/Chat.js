import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "reactstrap";
import styles from "./chat.module.scss";
import { othersSay, getStatus } from "../../ducks/peopleChat";
import DisplayChat from "./DisplayChat";
import { getUser } from "../../ducks/signup";

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

    this.ws.onclose = () => {
      this.setState({ status: "disconnected", ws: new WebSocket(URL) });
      this.props.getStatus("disconnected");
    };

    this.ws.onmessage = message => {
      console.log(message);
      this.props.othersSay(message);
    };
  }

  makeMessage = e => {
    this.setState({
      message: e.target.value
    });
  };

  submitMessage = typed => {
    const time = new Date();
    let days = [
      "",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];
    let day = time.getDay();
    let today = days[day];
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let thedate = time.getDate();
    let date = {
      today,
      hours,
      minutes,
      thedate
    };

    let userSaid = {
      message: typed,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      image: this.props.image,
      date
    };
    this.ws.send(JSON.stringify(userSaid));
  };

  render() {
    return (
      <div className={styles.chatCont}>
        <Card className={styles.card}>
          <DisplayChat />
          <form
            onSubmit={e => {
              this.submitMessage(this.state.message);
              this.setState({ message: "" });
            }}
          >
            <input
              placeholder={
                this.state.status === "connected" && this.props.firstName
                  ? `Welcome ${this.props.firstName}, ${
                      this.props.lastName
                    } you are ${this.state.status} type....`
                  : "please login to chat..."
              }
              onChange={this.makeMessage}
              value={this.state.message}
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
  { othersSay, getStatus, getUser }
)(Chat);
