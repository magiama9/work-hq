import React,{useState} from "react";
import Board from "../components/Board/";
import Form from "../components/Form";

function Home() {
  const [state,setState] = useState({newApplications:[]})
  return (
    <div>
      <h1>Work HQ - Your Job Search Launchpad</h1>
      <Form state={state} setState={setState} />
      <Board state={state} />
    </div>
  );
}

export default Home;
