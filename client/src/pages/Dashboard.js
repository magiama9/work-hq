import React, { useState } from "react";
import Board from "../components/Board";

function Home(props) {
  const [state, setState] = useState({ newApplications: [], tasks: [] });
  const userID = props.userID;

  return (
    <div>
      <Board state={state} setState={setState} userID={props.userID} />
    </div>
  );
}

export default Home;
