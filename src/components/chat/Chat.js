import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "reactstrap";
import styles from "./chat.module.scss";
import { setUser } from "../../ducks/peopleChat";
import { getUser } from "../../ducks/signup";
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
      online: ""
      // filter: ""
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

    const { socket } = this.state;

    if (this.props.firstName && this.props.firstName) {
      const logged = {
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        image: this.props.image,
        people_id: this.state.people_id
      };

      socket.on("connect", () => {
        socket.emit("new_user", logged);
        socket.on("visitors", online => {
          this.setState({ online });
        });
      });
    }
  }

  makeMessage = e => {
    this.setState({
      message: e.target.value
    });
  };

  render() {
    // if (this.state.online) {
    //   const filter = this.state.online.filter(item => item !== null);
    //   this.setState({
    //     filter
    //   });
    // }
    // console.log(this.state.filter);
    return (
      <div className={styles.chatCont}>
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
          <DisplayChat />
          <form
            onSubmit={e => {
              e.preventDefault();

              this.setState({ message: "" });
            }}
          >
            <input
              placeholder={
                this.state.status === "connected" && this.props.firstName
                  ? `${this.props.firstName} you are ${
                      this.state.status
                    } type....`
                  : `you are disconnected ... `
              }
              onChange={this.makeMessage}
            />
          </form>
        </Card>
        <Card className={styles.cardAbout}>
          <p>online</p>
          {this.state.online &&
            this.state.online
              .filter(item => item !== null)
              .map(item => {
                return (
                  <div>
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
    people_id: reduxState.signup.people_id
  };
};

export default connect(
  mapStateToProps,
  { setUser, getUser }
)(Chat);
