import React, { useState } from "react";
import Resources from "../components/Resources";

function MaterialsPage(props) {
  const [state, setState] = useState({
    newResources: [],
    tasks: [],
    resLinks: [],
    covLinks: []
  });

  return (
    <div>
      <Resources
        state={state}
        setState={setState}
        displayName={props.displayName}
        userID={props.userID}
        photoURL={props.photoURL}
      />
    </div>
  );
}

export default MaterialsPage;
