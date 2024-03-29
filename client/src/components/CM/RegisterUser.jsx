import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function RegisterUser({user, checkUser}){

    const { state: { contract, accounts } } = useEth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("consumer");

    const handleName = event => {
        setName(event.target.value);
    }

    const handleEmail = event => {
        setEmail(event.target.value);
    }

    const handleRole = event => {
        setRole(event.target.value);
    }

    const addUser = async () =>  {
        if(name === "" && email ==="") {
            alert("Please enter the details to Register.")
            checkUser();
            return;
        }
        await contract.methods.addUser(name, email, role).send({ from: accounts[0] });
        checkUser();
        console.log("User: " + user);
    };

    return (
        <div className="container my-5 text-center">
            <h2 className="shadow mt-5 p-3 text-dark-emphasis bg-dark-subtle border border-dark-subtle rounded-3">Welcome to CheckMate Dapp</h2>
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
                                <option value="supplier">Supplier</option>
                            </select>
                        </div>
                        <button onClick={addUser} className="shadow col-2 mt-5 btn text-success-emphasis bg-success-subtle border border-success-subtle rounded-3">Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterUser;