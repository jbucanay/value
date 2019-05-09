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
          <p className={styles.head}>
            <i className="fas fa-comment-alt" /> Chat Rooms
          </p>

          <p className={styles.one}>
            {" "}
            <i className="fas fa-seedling" /> Ideas
          </p>
          <p className={styles.two}>
            <i className="fab fa-slideshare"> Collaboration </i>
          </p>
          <p className={styles.three}>
            <i className="fab fa-stack-overflow"> Share </i>
          </p>

          <p className={styles.four}>
            <i className="far fa-clock"> Calendar </i>
          </p>
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
                      <p>Chat</p>
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
