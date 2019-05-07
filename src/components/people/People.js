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
        <Card className={styles.cardNav}>
          <p>Chat by day</p>
          <p>Monday</p>
          <p>Tuesday</p>
          <p>Wednesday</p>
          <p>Thursday</p>
          <p>Friday</p>
          <p>Saturday</p>
          <p>Sunday</p>
        </Card>
        <div className={styles.card}>
          {this.state.people.map(item => {
            return (
              <Card key={item.people_id} className={styles.cardPeople}>
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
        <Card className={styles.cardNav}>
          <p>Updates</p>
        </Card>
      </div>
    );
  }
}
