import React, { useState } from "react";
import Materials from "../components/Materials";

function MaterialsPage(props) {
  const [state, setState] = useState({ resLinks: [], covLinks: [] });
  const userID = props.userID;


  return (
    <div>
      <Materials state={state} setState={setState} userID={props.userID} />
    </div>

  );
}

export default MaterialsPage;
