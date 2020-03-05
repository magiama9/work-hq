import React, { Component } from "react";
import Board from "../components/Board";
import jobFetch from "../utils/jobFetch";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobList: []
    };
  }
  getAllJobs = () => {
    jobFetch.fetchAll().then(res => {
      console.log(res.data)
      this.setState({
        jobList: res.data
      });
    });
  };

  componentDidMount() {
    this.getAllJobs();
  }

  render() {
    return (
      <div>
        <h1>Work HQ - Your Job Search Launchpad</h1>
        <Board jobList={this.state.jobList} />
      </div>
    );
  }
}

export default Dashboard;
