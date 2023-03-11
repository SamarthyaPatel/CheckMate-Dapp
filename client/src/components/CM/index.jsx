import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Title from "./Title";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import Profile from "./Profile";
import Home from "./Home";
import Messages from "./Messages";

function CM() {
  const { state } = useEth();
//   const [value, setValue] = useState("?");
  const [component, setComponent] = useState(1);

  function Component() {
    if (component === 1) {
        return <Profile />
    } else if(component === 2){
        return <Home />
    } else if(component === 3) {
        return <Messages />
    }
  }

  return (
    <div className="container">
        <Title/>
        <div className="d-flex justify-content-around mt-4">
            <button className="btn btn-warning " onClick={() =>{setComponent(1)}}>Profile</button>
            <button className="btn btn-warning " onClick={() =>{setComponent(2)}}>Home</button>
            <button className="btn btn-warning " onClick={() =>{setComponent(3)}}>Messages</button>
        </div>
        {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
            <Component/>
        }
    </div>
  );
}

export default CM;
