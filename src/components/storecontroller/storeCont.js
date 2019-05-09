import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class storeCont extends Component {
  state = {
    people_id: "",
    day: "",
    message: ""
  };

  componentDidUpdate() {}

  render() {
    return <div>None</div>;
  }
}

const mapStateToProps = reduxState => {
  return {
    people_id: reduxState.signup.people_id,
    day: reduxState.peopleChatmessages[0].day,
    message: reduxState.peopleChatmessages[0].msg.message
  };
};

export default connect(mapStateToProps)(storeCont);
