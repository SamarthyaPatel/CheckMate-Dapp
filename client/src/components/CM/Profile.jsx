import { useState } from "react";

function Profile() {

    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [wallet, setWallet] = useState("");

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

    // const read = async () => {
    //     const value = await contract.methods.getProduct(product_id).call({ from: accounts[0] });
    //     const state = await contract.methods.fetchStates(product_id).call({ from: accounts[0] });
    //     const nth = await contract.methods.getNumber().call({ from: accounts[0] });
    //     console.log(state)
    //     console.log(nth)
    //     console.log("Metamask: " + window.ethereum.selectedAddress)
    //     const ethereum = window['ethereum'];
    //     setUser(ethereum['selectedAddress']);
    //     setValue(value);
    //   };

    function Form() {
        if(!form) {
            return(
                <>
                    <div className="card-body">
                        <form action="" className="row g-3">
                            <div className="col-md-6">
                                <label class="">Name: </label>
                                <p class="form-control m-0">Samarthya Patel</p>
                            </div>
                            <div className="col-md-6">
                                <label class="">Email: </label>
                                <p class="form-control m-0">samarthya@checkmate.com</p>
                            </div>
                            <div class="col-12">
                                <label class="">Wallet Address: </label>
                                <p class="form-control m-0">0x001001010212314233534549013284785</p>
                            </div>
                        </form>
                    </div>
                    <button className="m-3 btn btn-light" onClick={updateForm}>{buttonValue}</button>
                </>
            );
        } else {
            return(
                <>
                    <div className="card-body">
                        <form action="" className="row g-3">
                            <div className="col-md-6">
                                <label class="">Name: </label>
                                <input class="form-control" type="text" value="Samarthya Patel"/>
                            </div>
                            <div className="col-md-6">
                                <label class="">Email: </label>
                                <input class="form-control" type="text" value="samarthya@checkmate.com"/>
                            </div>
                            <div class="col-12">
                                <label class="">Wallet Address: </label>
                                <input class="form-control" type="text" value="0x001001010212314233534549013284785"/>
                            </div>
                        </form>
                    </div>
                    <button className="m-3 btn btn-success" onClick={updateForm}>{buttonValue}</button>
                </>
            );
        }
    }


    return (
    <div className="card mt-4 p-2">
        <Form />
        
    </div>)
}

export default Profile;



        
        