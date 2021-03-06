import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import PullRequest from "../PullRequest/index";
import Load from "../Load";
import githubService from "../../services/GithubService";
import "./styles.css";

export default class User extends Component {
  state = {
    loading: true
  };
  async componentDidMount() {
    const { user } = this.props.match.params;

    try {
      const response = await githubService.getIssues(user);
      this.setState({ data: response.data, loading: false });
    } catch (err) {
      console.log(err);
      alert("There is something wrong, open log for more information!");
      this.props.history.push("/");
    }
  }
  render() {
    console.log(this.props);
    if (this.state.loading) { return (<Load />); };
    const { items } = this.state.data;
    const { user } = this.props.match.params;
    return items.length === 0
      ? (
        <Col className="Col Empty-PR" xs={10} sm={8} md={4}>
          There are <strong>no pull requests</strong> associated with user <strong>{user}</strong>
        </Col>
      )
      : (
        <Row>
          {this.state.data.items.map((pullrequest, idx) => {
            return <PullRequest data={pullrequest} key={idx} />;
          })}
        </Row>
      );
  }
}
