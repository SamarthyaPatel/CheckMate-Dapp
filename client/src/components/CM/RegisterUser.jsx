import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function RegisterUser( {setValue} ){

    const { state: { contract, accounts } } = useEth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleName = event => {
        setName(event.target.value)
    }

    const handleEmail = event => {
        setEmail(event.target.value)
    }

    const addUser = async e =>  {
        await contract.methods.addUser(name, email).send({ from: accounts[0] });
        setValue(true);
    };

    return (
        <div className="container my-5 text-center">
            <h2>Welcome to CheckMate</h2>
            <div>
                <div className="card-body">
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="">Name: </label>
                            <input className="form-control" type="text" value={name} onChange={handleName}/>
                        </div>
                        <div className="col-md-6">
                            <label className="">Email: </label>
                            <input className="form-control" type="text" value={email} onChange={handleEmail}/>
                        </div>
                        <button onClick={addUser} className=" btn btn-success">Save</button>
                    </form>
                    
                </div>
                
            </div>
        </div>
    )
}

export default RegisterUser;