import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "reactstrap";
import { loginUser } from "../../ducks/signup";
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
      online: "",
      temp: "",
      togle: true,
      slide: "yes",
      typer: ""
    };
  }

  componentWillMount() {
    this.initSocket();
    this.setState({ status: "connected" });
  }

  initSocket = () => {
    const socket = io(socketUri);
    socket.on("connect", () => {});
    this.setState({
      socket
    });
  };
  componentDidMount() {
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
      socket.on("incoming", typer => {
        this.setState({ typer });
      });
    }
    const { socket } = this.state;
    socket.on("user_message", userMessage => {
      this.props.getMessage(userMessage);
    });
  }

  makeMessage = e => {
    const { socket } = this.state;
    socket.emit("typing", this.props.firstName);
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
    console.log(this.props.login);
    return (
      <div className={styles.chatCont}>
        {!this.props.login && <Redirect to="/login" />}
        {this.state.togle ? (
          <p className={styles.ham} onClick={this.togle}>
            &#x58;
          </p>
        ) : (
          <p className={styles.ham} onClick={this.togle}>
            &#9776;
          </p>
        )}
        <Card className={styles.cardNav}>
          <h4>Etiquette</h4>
          <small>
            Etiquette means behaving yourself a little better than is absolutely
            essential <br />
            <strong> Will Cuppy</strong>
          </small>
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
              socket.emit("clear");

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
        <Card className={this.state.togle ? styles.yes : styles.cardAbout}>
          <p className={this.state.togle && styles.innerp}>
            online{" "}
            {this.state.online &&
              this.state.online.filter(item => item !== null).length}
          </p>
          {this.state.online &&
            this.state.online
              .filter(item => item !== null)
              .map((item, index) => {
                return (
                  <div key={index} className={this.state.togle && styles.names}>
                    <p>
                      {item.firstName} {item.lastName}
                    </p>
                    <img src={item.image} alt="" />
                  </div>
                );
              })}
          <p>{this.state.typer && `${this.state.typer}... is typing`}</p>
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
  { getMessage, loginUser }
)(Chat);
