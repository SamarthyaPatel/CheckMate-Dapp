import { useState } from "react";
import UpdateProfile from "./UpdateProfile";

function Profile({user}) {

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const wallet = user.wallet;

    const [form, setForm] = useState(false);
    const [buttonValue, setButtonValue] = useState("Edit");

    const updateForm = () =>  {
        if(!form) {
            setForm(true)
            setButtonValue("Save")
        } else {
            setForm(false)
            setButtonValue("Edit")
        }
    };

    function Edit() {
        return(
            <div>
                <div className="card-body">
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="">Name: </label>
                            <p className="form-control m-0" type="text"> {name} </p>
                        </div>
                        <div className="col-md-6">
                            <label className="">Email: </label>
                            <p className="form-control m-0" type="text"> {email} </p>
                        </div>
                        <div className="col-12">
                            <label className="">Wallet Address: </label>
                            <p className="form-control m-0"> {wallet} </p>
                        </div>
                    </form>
                </div>
                <button className="m-3 btn btn-light" onClick={updateForm}>{buttonValue}</button>
            </div>
        );
    }

    return (
    <div className="card mt-4 p-2">
        {
            !form ? <Edit/> :
                <UpdateProfile name={name} setName={setName} email={email} setEmail={setEmail} wallet={wallet} updateForm={updateForm}/>
        }
    </div>)
}

export default Profile;



        
        