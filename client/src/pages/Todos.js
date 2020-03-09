import React, { useState } from "react";
import Todos from "../components/Todos";

function TodoPage(props) {
  const [state, setState] = useState({ newApplications: [], tasks: [] });

  return (
    <div>

      {/* Render a todos component */}
      {/* UserID is passed down so that only the correct user's info is shown */}
      <Todos state={state} setState={setState} userID={props.userID} />
    </div>
  );
}

export default TodoPage;
