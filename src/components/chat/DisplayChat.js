import React, { Component } from "react";
import { connect } from "react-redux";

class DisplayChat extends Component {
  state = {
    peopleMessages: []
  };
  componentDidMount() {
    this.state.peopleMessages.push(this.props.peopleSay);
  }

  render() {
    console.log("for checking sent array" + this.state.peopleMessages[0]);

    return (
      <div>
        <form onSubmit={this.props.submit} />
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
