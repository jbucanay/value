import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./chat.module.scss";

class DisplayChat extends Component {
  state = {
    peopleMessages: []
  };

  componentDidUpdate(prevProps) {
    if (prevProps.peopleSay !== this.props.peopleSay) {
      this.setState({
        peopleMessages: [...this.state.peopleMessages, this.props.peopleSay]
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.peopleMessages.map((item, index) => {
          return (
            <div key={index} className={styles.person}>
              <p className={styles.top}>{`${item[0].day}`} </p>
              <div>
                <img
                  src={item[0].msg.image}
                  alt="people"
                  className={styles.chatImage}
                />

                <div>
                  <div className={styles.timeName}>
                    <p>{`${item[0].msg.firstName} ${item[0].msg.lastName}`}</p>
                    <span>{item[0].time}</span>
                  </div>
                  <pre>{item[0].msg.message}</pre>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapState = reduxState => {
  return {
    peopleSay: reduxState.peopleChat.messages,
    people_id: reduxState.signup.people_id,
    day: reduxState.peopleChat.messages,
    message: reduxState.peopleChat.messages
  };
};

export default connect(mapState)(DisplayChat);
