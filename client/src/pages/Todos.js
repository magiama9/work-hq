import React, { useState } from "react";
import Todos from "../components/Todos";

function TodoPage(props) {
  const [state, setState] = useState({ newTasks: [], tasks: [] });

  return (
    <div>
      {/* Render a todos component */}
      {/* UserID is passed down so that only the correct user's info is shown */}
      <Todos
        state={state}
        setState={setState}
        userID={props.userID}
        photoURL={props.photoURL}
      />
    </div>
  );
}

export default TodoPage;
