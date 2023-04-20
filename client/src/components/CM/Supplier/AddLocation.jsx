import useEth from "../../../contexts/EthContext/useEth";
import { useState } from "react";
import GetLocations from "../GetLocations";


function AddLocation({product, getShipments}) {

    const { state: { contract, accounts } } = useEth();

    const [location, setLocation] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [form, setForm] = useState();

    const updateForm = () =>  {
        if(!form) {
            setForm(true)
        } else {
            setForm(false)
        }
    };

    const handleLocation = event => {
        setLocation(event.target.value);
    };

    const addLocation = async () => {
        await contract.methods.addInterLocation(product[0], location, dateTime).send({ from: accounts[0] });
        getShipments();
        setTimeout(updateForm(), 3000);
    };

    function Edit() {
        return (
            <div className="text-center">
                <button className="btn btn-light col-md-2 mt-3" onClick={updateForm}>Add Location</button>
                <hr className="border border-success-subtle border-3 opacity-50"/>
            </div>
        )
    }

    const handleStamp = async () => {
        const date = await new Date();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const timeStamp = await date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear() + " | " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        setDateTime(timeStamp)
    }

    return(
        <div className="p-4 my-4">
            <GetLocations product={product} key={product['productID']}/>
            {
                !form ? <Edit /> :
                    <div className="mt-3">
                        <form className="row g-3">
                            <div className="col-md-6">
                                <label className="mb-2 ms-1">Location </label>
                                <input className="form-control" type="text" placeholder="E.g. Swansea" value={location} onChange={handleLocation} />
                            </div>
                            <div className="col-md-6">
                                <label className="mb-2 ms-1" onClick={handleStamp}> Get Timestamp <span id="getButton"> ⬇ </span> </label>
                                <input className="form-control" type="text" value={dateTime} onChange={handleStamp}/>
                            </div>
                        </form>
                        <div className="d-flex justify-content-around">
                            <button className="shadow col-2 mt-5 btn text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3" onClick={updateForm}>Cancel</button>
                            <button className="shadow col-2 mt-5 btn text-success-emphasis bg-success-subtle border border-success-subtle rounded-3" onClick={addLocation}>Save</button>
                        </div>
                        <hr className="border border-success-subtle border-3 opacity-50"/>
                    </div>
            }
        </div>
    )
}

export default AddLocation;