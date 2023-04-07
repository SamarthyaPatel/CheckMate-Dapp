import useEth from "../../contexts/EthContext/useEth";

function UpdateProfile( {name, email, wallet, updateForm, setName, setEmail} ) {

    const { state: { contract, accounts } } = useEth();

    const handleName = event => {
        setName(event.target.value);
    };

    const handleEmail = event => {
        setEmail(event.target.value);
    };

    const update = async () => {
        await contract.methods.updateUser(name, email).send({ from: accounts[0] });
        updateForm();
    };

    return(
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
                    <div className="col-12">
                        <label className="">Wallet Address: </label>
                        <p className="form-control m-0"> {wallet} </p>
                    </div>
                </form>
                <div className="d-flex justify-content-around">
                    <button className="col-3 mt-5 btn btn-danger" onClick={updateForm}>Cancel</button>
                    <button className="col-3 mt-5 btn btn-success" onClick={update}>Save</button>
                </div>
            </div>
            
        </div>
    );
}

export default UpdateProfile;