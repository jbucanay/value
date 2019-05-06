import React, { Component } from "react";
import Axios from "axios";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";

import styles from "./people.module.scss";

export default class People extends Component {
  constructor() {
    super();
    this.state = {
      people: []
    };
  }

  componentDidMount() {
    Axios.get("/api/people").then(results =>
      this.setState({
        people: results.data
      })
    );
  }

  render() {
    return (
      <div className={styles.peopleCont}>
        <div>{/* <h1>Profile pic</h1>
          <h1>Profile</h1> */}</div>
        <div className={styles.card}>
          {this.state.people.map(item => {
            return (
              <Card key={item.people_id}>
                <CardImg top width="100%" src={item.image} alt="people" />
                <CardBody>
                  <CardTitle>
                    {`${item.first_name} ${item.last_name}`}
                  </CardTitle>
                  <CardTitle>
                    <CardSubtitle>
                      “Somewhere in this small world, you can find a place where
                      everyone appreciates you more than you think you deserve.”
                    </CardSubtitle>
                  </CardTitle>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
}
