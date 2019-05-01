import React from "react";
import { connect } from "react-redux";
import styles from "./people.module.scss";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";

const Profile = props => {
  console.log(props);
  return (
    <div className={styles.peopleCont}>
      <di>{/* <p></p> */}</di>
      <div className={styles.card}>
        <Card>
          <CardImg top width="100%" src={props.signup.image} alt="people" />
          <CardBody>
            <CardTitle>{`${props.signup.firstName} ${
              props.signup.lastName
            }`}</CardTitle>
            <CardSubtitle>
              “Somewhere in this small world, you can find a place where
              everyone appreciates you more than you think you deserve.”
            </CardSubtitle>
            <CardText>{props.signup.points} points</CardText>
            <Button color="warning">Appreciate</Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

const mapStateToprops = reduxState => reduxState;

export default connect(mapStateToprops)(Profile);
