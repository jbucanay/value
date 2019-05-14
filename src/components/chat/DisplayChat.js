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
        {/* {this.props.temp
          ? this.props.temp.map((item, index) => {
              return (
                <div key={index} className={styles.person}>
                  <p className={styles.very}>
                    {`${item.time.substr(10, 6)}`}

                    <small className={styles.choose}>
                      <Select />
                    </small>
                  </p>

                  <div>
                    <img
                      src={item.image}
                      alt="people"
                      className={styles.chatImage}
                    />

                    <div>
                      <div className={styles.timeName}>
                        <p>{`${item.first_name} ${item.last_name}`}</p>
                      </div>
                      <small className={styles.smalls}>{item.message}</small>
                    </div>
                  </div>
                </div>
              );
            })
          : null} */}
        {this.state.peopleMessages.map((item, index) => {
          return (
            <div key={index} className={styles.person}>
              <p className={styles.top}>live...</p>
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
                  <small className={styles.smalls}>{item[0].msg.message}</small>
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
