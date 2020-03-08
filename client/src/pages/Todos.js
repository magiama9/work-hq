import React, { useState } from "react";
import Todos from "../components/Todos";

function TodoPage(props) {
  const [state, setState] = useState({ newApplications: [], tasks: [] });
  const userID = props.userID;

  return (
    <div>
      <Todos state={state} userID={props.userID} />
    </div>
  );
}

export default TodoPage;
