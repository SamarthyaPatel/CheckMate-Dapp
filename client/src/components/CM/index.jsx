import useEth from "../../contexts/EthContext/useEth";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import Interface from "./Interface";
import { useState, useEffect } from "react";
import RegisterUser from "./RegisterUser";

function CM() {
  const { state } = useEth();
  const { state: { contract, accounts } } = useEth();
  const [user, setValue] = useState();
  
  const checkUser = async () => {
    const res = await contract.methods.getUser().call({ from: accounts[0] })
    setValue(res[4])
  }

  useEffect(() => {
    checkUser();
    if(user) {
      console.log(user.role);
    }
  });

  console.log("index.jsx \nUser => ", user)
  
  function Page() {
    if(user === undefined || user === "") {
      return <RegisterUser setValue={setValue}/>
    } else {
      return <Interface role={user}/>
    }
  }

  return (
    <div className="container">
        {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
                <Page/>
        }
    </div>
  );
}

export default CM;
