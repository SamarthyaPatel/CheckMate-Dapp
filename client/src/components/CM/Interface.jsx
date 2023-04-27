import { useState, useRef } from "react";
import Title from "../Title.jsx";
import Profile from "./Profile/Profile.jsx";
import Home from "./Home";
import Messages from "./Message Service/Messages.jsx";
import useEth from "../../contexts/EthContext/useEth";

function Interface({role}) {

    const [component, setComponent] = useState(2);
    const { state: { contract, accounts } } = useEth();
    const [user, setUser] = useState("");

    const profile = useRef();
    const home = useRef();
    const message = useRef();

    const fetchUser = async () => {
        const user = await contract.methods.getUser().call({ from: accounts[0] });
        await setUser(user)
    };
    
    if(user === "") {
        fetchUser();
    }
    
    function Component() {
        if (component === 1) {
            console.log(profile, home, message)
            if(profile.current !== undefined){
                profile.current.classList = "btn btn-dark border border-light-subtle rounded-3";
                home.current.classList = "btn btn-dark";
                message.current.classList = "btn btn-dark";
            }
            return <Profile user={user}/>
        } else if(component === 2){
            if(home.current !== undefined){
                home.current.classList = "btn btn-dark border border-light-subtle rounded-3";
                profile.current.classList = "btn btn-dark";
                message.current.classList = "btn btn-dark";
            }
            return <Home role={role} user={user} fetchUser={fetchUser}/>
        } else if(component === 3) {
            if(message.current !== undefined){
                message.current.classList = "btn btn-dark border border-light-subtle rounded-3";
                home.current.classList = "btn btn-dark";
                profile.current.classList = "btn btn-dark";
                
            }
            return <Messages role={role} user={user}/>
        }
    }

    return (
        <div>
            <Title/>
            <div className="navbar sticky-top navbar-dark bg-dark justify-content-around">
                <button ref={profile} className="btn btn-dark" onClick={() => {setComponent(1)}}> Profile </button>
                <button ref={home} className="btn btn-dark border border-light-subtle rounded-3" onClick={() => {setComponent(2)}}> Home </button>
                <button ref={message} className="btn btn-dark" onClick={() => {setComponent(3)}}> Messages </button>
            </div>
            <Component/>
        </div>
    )
}

export default Interface;