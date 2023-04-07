import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function RegisterUser({user, setPresence}){

    const { state: { contract, accounts } } = useEth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("consumer");

    const handleName = event => {
        setName(event.target.value)
    }

    const handleEmail = event => {
        setEmail(event.target.value)
    }

    const handleRole = event => {
        setRole(event.target.value)
    }

    const addUser = async e =>  {
        if(name === "" && email ==="") {
            alert("Please enter the details to Register.")
            return;
        }
        await contract.methods.addUser(name, email, role).send({ from: accounts[0] });
        setPresence(true)
        console.log("User: " + user)
        return;
    };

    return (
        <div className="container my-5 text-center">
            <h2>Welcome to CheckMate</h2>
            <div>
                <div className="card-body">
                    <form className="row g-3 mt-5 justify-content-center">
                        <div className="col-md-4">
                            <label className="">Name </label>
                            <input className="form-control" type="text" value={name} onChange={handleName}/>
                        </div>
                        <div className="col-md-4">
                            <label className="">Email </label>
                            <input className="form-control" type="text" value={email} onChange={handleEmail}/>
                        </div>
                        <div className="col-md-4">
                            <label className="">Role </label>
                            <select className="form-select" onChange={handleRole}>
                                <option value="consumer">Consumer</option>
                                <option value="manufacturer">Manufacturer</option>
                                <option value="supplier">Supplier</option>s
                                <option value="admin">Adminitrator</option>
                            </select>
                        </div>
                        <button onClick={addUser} className="btn btn-success mt-5 col-md-3">Register</button>
                    </form>
                    
                </div>
                
            </div>
        </div>
    )
}

export default RegisterUser;