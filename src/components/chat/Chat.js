import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "reactstrap";
import { getUser } from "../../ducks/signup";
import styles from "./chat.module.scss";
import { getMessage } from "../../ducks/peopleChat";
import { Redirect } from "react-router-dom";
import DisplayChat from "./DisplayChat";
import io from "socket.io-client";
import Axios from "axios";
const socketUri = "http://localhost:3131";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.statestate = {
      socket: null,
      message: "",
      status: "",
      people: [],
      online: "",
      temp: "",
      togle: true
    };
  }

  componentWillMount() {
    this.initSocket();
    this.setState({ status: "connected" });
  }

  initSocket = () => {
    const socket = io(socketUri);
    socket.on("connect", () => {
      console.log("conected");
    });
    this.setState({
      socket
    });
  };
  componentDidMount() {
    Axios.get("/api/people").then(results =>
      this.setState({
        people: results.data
      })
    );
    if (this.props.firstName !== "" && this.props.firstName !== "") {
      const { socket } = this.state;

      const logged = {
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        image: this.props.image
      };

      socket.on("connect", () => {
        socket.emit("new_user", logged);
        socket.on("visitors", online => {
          this.setState({ online });
        });
      });
    }
    const { socket } = this.state;
    socket.on("user_message", userMessage => {
      this.props.getMessage(userMessage);
    });
  }

  makeMessage = e => {
    this.setState({
      message: e.target.value
    });
  };

  togle = () => {
    this.setState({
      togle: !this.state.togle
    });
  };

  render() {
    console.log(this.state.togle);
    return (
      <div className={styles.chatCont}>
        {!this.props.login && <Redirect to="/login" />}
        <Card className={styles.cardNav}>
          <h4>People</h4>
          {this.state.people
            ? this.state.people.map(item => {
                return (
                  <Card key={item.people_id} className={styles.cardPeople}>
                    <p> {`${item.first_name} ${item.last_name}`}</p>
                  </Card>
                );
              })
            : null}
        </Card>
        <Card className={styles.card}>
          <DisplayChat temp={this.state.temp} />
          <form
            onSubmit={e => {
              const { socket } = this.state;

              const userMessage = {
                firstName: this.props.firstName,
                lastName: this.props.lastName,
                image: this.props.image,
                message: this.state.message
              };
              e.preventDefault();
              socket.emit("message", userMessage);

              if (this.props.people_id !== "") {
                let date = new Date().getDay();

                let days = [
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ];
                Axios.post("/api/message", {
                  people_id: this.props.people_id,
                  message: this.state.message,
                  day: days[date],
                  time: new Date().toLocaleString()
                }).then(res => {
                  this.setState({
                    temp: res.data
                  });
                });
                this.setState({
                  message: ""
                });
              }
            }}
          >
            <input
              placeholder={"  > Value chat..."}
              onChange={this.makeMessage}
              value={this.state.message}
            />
          </form>
        </Card>
        <Card className={styles.cardAbout}>
          <p>online </p>
          {this.state.online &&
            this.state.online
              .filter(item => item !== null)
              .map((item, index) => {
                return (
                  <div key={index}>
                    <p>
                      {item.firstName} {item.lastName}
                    </p>
                    <img src={item.image} alt="" />
                  </div>
                );
              })}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    firstName: reduxState.signup.firstName,
    lastName: reduxState.signup.lastName,
    image: reduxState.signup.image,
    people_id: reduxState.signup.people_id,
    login: reduxState.signup.logedin
  };
};

export default connect(
  mapStateToProps,
  { getMessage, getUser }
)(Chat);
