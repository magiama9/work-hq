import React, { useState } from "react";
import Board from "../components/Board";
import Form from "../components/Form";

function Home(props) {
  const [state, setState] = useState({ newApplications: [], tasks: [] });
  const userID = props.userID;

  return (
    <div>
      <h1>Work HQ - Your Job Search Launchpad</h1>
      <Form state={state} setState={setState} />
      <Board state={state} userID={props.userID} />
    </div>
  );
}

export default Home;
