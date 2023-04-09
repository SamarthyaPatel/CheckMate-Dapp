import useEth from "../../contexts/EthContext/useEth";
import { useState } from "react";


function AddLocation({product}) {

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
        updateForm();
    };

    function Edit() {
        return (
            <div className="text-center">
                <button className="btn btn-primary col-md-4 mt-3" onClick={updateForm}>Add Location</button>
            </div>
        )
    }

    const handleStamp = async () => {
        const date = await new Date();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const timeStamp = await date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear() + " | " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        setDateTime(timeStamp)
    }

    const getButton = {
        background: 'lightgreen',
        borderRadius: '10px',
        padding: '0px 10px 0px 10px'
    };

    return(
        <div className="card p-4 mb-4">
            <p className="m-0">Product Name: <span className="fw-bold">{product[1]}</span> </p>
            <p className="m-0">Batch ID: <span className="fw-bold">{product[2]}</span> </p>
            {
                !form ? <Edit /> :
                    <div className="mt-3">
                        <form className="row g-3">
                            <div className="col-md-6">
                                <label className="mb-2 ms-1">Location </label>
                                <input className="form-control" type="text" placeholder="Swansea" value={location} onChange={handleLocation} />
                            </div>
                            <div className="col-md-6">
                                <label className="mb-2 ms-1" onClick={handleStamp} style={getButton}> Get Date & Time </label>
                                <input className="form-control" type="text" value={dateTime} onChange={handleStamp}/>
                            </div>
                        </form>
                        <div className="d-flex justify-content-around">
                            <button className="col-3 mt-5 btn btn-danger" onClick={updateForm}>Cancel</button>
                            <button className="col-3 mt-5 btn btn-success" onClick={addLocation}>Save</button>
                        </div>
                    </div>
            }
        </div>
    )
}

export default AddLocation;