import useEth from "../../contexts/EthContext/useEth";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import Interface from "./Interface";
import { useState } from "react";
import RegisterUser from "./RegisterUser";

function CM() {
  const { state } = useEth();
  const { state: { contract, accounts } } = useEth();
  const [user, setValue] = useState();
  
  const checkUser = async () => { 
    const res = await contract.methods.checkUser().call({ from: accounts[0] })
    setValue(res)
    console.log(res)
  }
  
  function Page() {
    
    if(!user) {
        return <RegisterUser setValue={setValue}/>
    } else {
        return <Interface />
    }
    
  }

  return (
    <div className="container">
        <button onClick={checkUser}>Enter</button>
        {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
                <Page/>
        }
    </div>
  );
}

export default CM;
