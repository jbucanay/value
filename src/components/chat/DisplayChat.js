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
    if (this.state.peopleMessages.length) {
      console.log(this.state.peopleMessages[0][0]);
    }

    return (
      <div>
        {this.state.peopleMessages.map((item, index) => {
          return (
            <div key={index} className={styles.person}>
              <img
                src={item[0].image}
                alt="people"
                className={styles.chatImage}
              />
              <p>{`${item[0].firstName} ${item[0].lastName}`}</p>
              <p>{`${item[0].date.today} ${item[0].date.hours}:${
                item[0].date.minutes
              }`}</p>
              <pre>{item[0].message}</pre>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapState = reduxState => {
  return {
    peopleSay: reduxState.peopleChat.messages
  };
};

export default connect(mapState)(DisplayChat);
