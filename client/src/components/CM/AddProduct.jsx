import useEth from "../../contexts/EthContext/useEth";
import { useState } from "react";


function AddProduct({updateForm, getProducts, suppliers}) {

    const { state: { contract, accounts } } = useEth();

    const [name, setName] = useState();
    const [batch, setBatch] = useState();
    const [sup, setSuppliers] = useState([]);

    const handleName = event => {
        setName(event.target.value);
    };

    const handleBatch = event => {
        setBatch(event.target.value);
    };

    const handleSupplier = event => {
        const {value, checked} = event.target

        if(checked) {
            setSuppliers(previous =>[...previous, value])
        } else {
            setSuppliers(previous => {
                return [...previous.filter(supplier => supplier !== value)] 
            })
        }
    }

    const addProduct = async () => {
        await contract.methods.registerProduct(name, batch, sup).send({ from: accounts[0] });
        updateForm();
        getProducts();
    };

    return(
        <div className="card">
            <div className="card-body">
                <form className="row g-3">
                    <div className="col-md-6">
                        <label className="">Name: </label>
                        <input className="form-control" type="text" value={name} onChange={handleName}/>
                    </div>
                    <div className="col-md-6">
                        <label className="">Batch number: </label>
                        <input className="form-control" type="text" value={batch} onChange={handleBatch}/>
                    </div>
                    <div>
                        <div className="form-check">
                            {
                                suppliers.map( (supplier) => 
                                <div key={supplier.userID}>
                                    <input type="checkbox" value={supplier.userID} onChange={handleSupplier}/> {supplier.name}
                                    <br />
                                </div>
                                )
                            }
                            
                        </div>
                    </div>
                </form>
                <div className="d-flex justify-content-around">
                    <button className="col-3 mt-5 btn btn-danger" onClick={updateForm}>Cancel</button>
                    <button className="col-3 mt-5 btn btn-success" onClick={addProduct}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default AddProduct;