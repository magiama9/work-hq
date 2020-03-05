import React, { useState } from "react";
import Board from "../components/Board";
import Form from "../components/Form";

// class Dashboard extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       newApplications: [],
//       jobList: [],
//       title: "",
//       company: "",
//       salary: "",
//       location: "",
//       description: ""
//     };
//   }
//   getAllJobs = () => {
//     jobFetch.fetchAll().then(res => {
//       console.log(res.data);
//       this.setState({
//         jobList: res.data
//       });
//     });
//   };

//   componentDidMount() {
//     this.getAllJobs();
//   }

//   render() {
//     return (
//       <div>
//         <h1>Work HQ - Your Job Search Launchpad</h1>
//         <Form state={this.state} setState={this.setState} />
//         <Board state={this.state} />
//       </div>
//     );
//   }
// }

// export default Dashboard;

function Home() {
  const [state, setState] = useState({ newApplications: [], tasks: [] });

  return (
    <div>
      <h1>Work HQ - Your Job Search Launchpad</h1>
      <Form state={state} setState={setState} />
      <Board state={state} />
    </div>
  );
}

export default Home;
