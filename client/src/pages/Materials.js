import React, { useState } from "react";
import Resources from "../components/Resources";

function MaterialsPage(props) {
  const [state, setState] = useState({
    newApplications: [],
    tasks: [],
    resLinks: [],
    covLinks: []
  });
  const userID = props.userID;

  return (
    <div>
      <Resources state={state} setState={setState} userID={props.userID} />
    </div>
  );
}

export default MaterialsPage;
