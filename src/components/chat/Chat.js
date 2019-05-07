import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import styles from "./chat.module.scss";
import { othersSay, getStatus } from "../../ducks/peopleChat";
import DisplayChat from "./DisplayChat";
import { getUser } from "../../ducks/signup";
import Axios from "axios";

const URL = "ws://localhost:3030";

class Chat extends Component {
  state = {
    message: "",
    status: "",
    people: ""
  };

  ws = new WebSocket(URL);

  componentDidMount() {
    this.ws.onopen = () => {
      this.props.getStatus("connected");
      this.setState({ status: "connected" });
      console.log("connected");

      Axios.get("/api/people").then(results =>
        this.setState({
          people: results.data
        })
      );
    };

    this.ws.onclose = () => {
      this.setState({ status: "disconnected", ws: new WebSocket(URL) });
      this.props.getStatus("disconnected");
    };

    this.ws.onmessage = message => {
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
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
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
      people_id: this.props.people_id,
      date
    };
    this.ws.send(JSON.stringify(userSaid));
  };

  render() {
    return (
      <div className={styles.chatCont}>
        <Card className={styles.cardNav}>
          <h2 className={styles.title}>People</h2>
          <div className={styles.innerNav}>
            {this.state.people
              ? this.state.people.map(item => {
                  return (
                    <Card key={item.people_id} className={styles.cardPeople}>
                      <CardImg top width="100%" src={item.image} alt="people" />
                      <CardBody>
                        <CardTitle>
                          {`${item.first_name} ${item.last_name}`}
                        </CardTitle>
                        <CardTitle>
                          <CardSubtitle>
                            {/* “Somewhere in this small world, you can find a place
                            where everyone appreciates you more than you think
                            you deserve.” */}
                          </CardSubtitle>
                        </CardTitle>
                      </CardBody>
                    </Card>
                  );
                })
              : null}
          </div>
        </Card>

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
                  ? `${this.props.firstName} you are ${
                      this.state.status
                    } type....`
                  : `you are disconnected ... `
              }
              onChange={this.makeMessage}
            />
          </form>
        </Card>
        {/* <Card className={styles.cardNav}>
          <p>Profile</p>
        </Card> */}
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
  { othersSay, getStatus, getUser }
)(Chat);
