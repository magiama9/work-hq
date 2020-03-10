import React, { useState } from "react";
import Board from "../components/Board";

function Dashboard(props) {
  const [state, setState] = useState({
    newApplications: [],
    tasks: [],
    resources: []
  });

  return (
    <div>
      {/* Render a board component */}
      {/* UserID is passed down so that only the correct user's info is shown */}
      <Board
        state={state}
        setState={setState}
        userID={props.userID}
        photoURL={props.photoURL}
      />
    </div>
  );
}

export default Dashboard;
