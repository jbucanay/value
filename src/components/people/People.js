import React, { Component } from "react";
import Axios from "axios";
import { Card, CardImg, CardBody, CardTitle } from "reactstrap";

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
        <img
          className={styles.ham}
          src="https://i.postimg.cc/mkFGCFCV/logo-via-logohub-7.png"
          alt="logo"
        />

        <Card className={styles.cardNav}>
          <p className={styles.head}>
            <i className="fas fa-comment-alt" /> Live chat for..
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
                </CardBody>
              </Card>
            );
          })}
        </div>
        <Card className={styles.cardNav}>
          <p>Creator</p>
          <small>
            <a
              href="https://www.linkedin.com/in/gilbert-baracka-641346141/"
              target="_blank"
              rel="noopener noreferrer"
            >
              @ Gilbert Baracka{" "}
            </a>
          </small>
        </Card>
      </div>
    );
  }
}
