import React, { useState } from "react";
import { connect } from "react-redux";
import styles from "./people.module.scss";
import { Redirect } from "react-router-dom";
import { deleteAccount, logout, update } from "../../ducks/signup";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";

const Profile = props => {
  const [name, setName] = useState("");
  const [last, setLast] = useState("");

  const [yes, setYes] = useState(true);

  return (
    <div className={styles.peopleCont}>
      {!props.signup.logedin && <Redirect to="/login" />}
      <img
        className={styles.ham}
        src="https://i.postimg.cc/mkFGCFCV/logo-via-logohub-7.png"
        alt="logo"
      />
      <div>{/* <p></p> */}</div>
      <div className={styles.card}>
        <Card>
          <CardImg top width="100%" src={props.signup.image} alt="people" />
          <CardBody>
            <CardTitle>{`${props.signup.firstName} ${
              props.signup.lastName
            }`}</CardTitle>
            <CardSubtitle>
              <Button
                color="danger"
                onClick={() => {
                  props.deleteAccount(props.signup.people_id);
                  props.logout();
                }}
              >
                Delete account
              </Button>{" "}
              {yes ? (
                <Button color="success" onClick={() => setYes(!yes)}>
                  Done
                </Button>
              ) : (
                <Button color="success" onClick={() => setYes(!yes)}>
                  Edit account
                </Button>
              )}
            </CardSubtitle>
          </CardBody>
        </Card>
        {yes ? (
          <form className={styles.formCont}>
            <div className={styles.loginForm}>
              <label htmlFor={"first"}>
                <p>New first name</p>
                <input
                  value={name}
                  placeholder={`change ${props.signup.firstName}`}
                  name="firstName"
                  id={"first"}
                  onChange={e => setName(e.target.value)}
                />
              </label>
              <label htmlFor={"last"}>
                <p>New last name</p>
                <input
                  value={last}
                  placeholder={`change ${props.signup.lastName}`}
                  name="lastName"
                  id={"last"}
                  onChange={e => setLast(e.target.value)}
                />
              </label>

              <Button
                color="success"
                onClick={() => {
                  props.update(props.signup.people_id, name, last);

                  setName("");
                  setLast("");
                }}
              >
                Update
              </Button>
            </div>
          </form>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToprops = reduxState => reduxState;

export default connect(
  mapStateToprops,
  { deleteAccount, logout, update }
)(Profile);

// onClick={() => this.handleImage()}
