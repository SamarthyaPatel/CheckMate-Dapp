import { useState } from "react";
import Title from "./Title";
import Profile from "./Profile";
import Home from "./Home";
import Messages from "./Messages";
import useEth from "../../contexts/EthContext/useEth";

function Interface({role}) {

    const [component, setComponent] = useState(2);
    const { state: { contract, accounts } } = useEth();
    const [user, setUser] = useState("");

    const fetchUser = async () => {
            const res = await contract.methods.getUser().call({ from: accounts[0] });
            await setUser(res)
        };
    
    if(user === "") {
        fetchUser();
    }
    
    function Component() {
        if (component === 1) {
            return <Profile user={user}/>
        } else if(component === 2){
            return <Home role={role}/>
        } else if(component === 3) {
            return <Messages />
        }
    }

    return (
        <div>
            <Title/>
            <div className="d-flex justify-content-around mt-4">
                <button className="btn btn-warning" onClick={() => {setComponent(1)}}>Profile</button>
                <button className="btn btn-warning" onClick={() => {setComponent(2)}}>Home</button>
                <button className="btn btn-warning" onClick={() => {setComponent(3)}}>Messages</button>
            </div>
            <Component/>
        </div>
    )
}

export default Interface;