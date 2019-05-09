import React from "react";
import { connect } from "react-redux";
import styles from "./people.module.scss";

import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";

const Profile = props => {
  return (
    <div className={styles.peopleCont}>
      <div>{/* <p></p> */}</div>
      <div className={styles.card}>
        <Card>
          <CardImg top width="100%" src={props.signup.image} alt="people" />
          <CardBody>
            <CardTitle>{`${props.signup.firstName} ${
              props.signup.lastName
            }`}</CardTitle>
            <CardSubtitle>
              <button>Edit Profile</button>
              <button>Delete Account</button>
            </CardSubtitle>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

const mapStateToprops = reduxState => reduxState;

export default connect(mapStateToprops)(Profile);
