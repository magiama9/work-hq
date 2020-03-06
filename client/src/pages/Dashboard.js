import React, { useState } from "react";
import Board from "../components/Board";
import Form from "../components/Form";

function Home(props) {
  const [state, setState] = useState({ newApplications: [], tasks: [] });
  const userID = props.userID;

  return (
    <div>
      <Board state={state} userID={props.userID} />
      <Form state={state} setState={setState} />
    </div>
  );
}

export default Home;
