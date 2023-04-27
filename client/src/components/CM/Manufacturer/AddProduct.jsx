import useEth from "../../../contexts/EthContext/useEth";
import { useState } from "react";


function AddProduct({setForm, getProducts, suppliers}) {

    const { state: { contract, accounts } } = useEth();

    const [name, setName] = useState("");
    const [batch, setBatch] = useState("");
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
        if(name !== "" && batch !== "") {
            console.log(name, batch, sup)
            await contract.methods.registerProduct(name, batch, sup).send({ from: accounts[0] });
            setForm(false);
            getProducts();
        } else {
            if(name === "" && batch === "") {
                alert("Please enter name and batch code for product.")
            } else if(name === "") {
                alert("Please enter product name.");
            } else if(batch === "") {
                alert("Please enter product batch code.");
            }            
        }
    };

    const label = {
        fontSize: "17px",
    }

    return(
        <div className="shadow m-2 mt-3 p-2">
            <div className="card-body">
                <form className="m-3">
                    <div className="row g-3 justify-content-around">
                        <div className="form-floating my-4 p-0 d-flex col-md-5">
                            <input type="text" className="form-control" placeholder="Product Name" value={name} onChange={handleName}/>
                            <label style={label} >Product name</label>
                        </div>
                        <div className="form-floating my-4 p-0 d-flex col-md-5">
                            <input type="number" className="form-control" placeholder="Batch code" value={batch} onChange={handleBatch}/>
                            <label style={label} >Batch code</label>
                        </div>
                    </div>
                    <div className="form-check">
                        {
                            Object.keys(suppliers).length === 0 ? <div className="text-center card p-3 me-5"> 
                                    <h5 className="">⚠️ No Suppliers to add ⚠️<br /> Please inform your partnered suppliers to register on CheckMate.</h5> 
                                </div> :
                                suppliers.map( (supplier) => 
                                <div key={supplier.userID}>
                                    <input type="checkbox" value={supplier.userID} onChange={handleSupplier}/> <span style={{fontSize: "20px", marginLeft: "10px", fontWeight: "bold"}}>{supplier.name}</span>
                                    <br />
                                </div>
                                )
                        }
                    </div>
                </form>
                <div className="d-flex justify-content-center">
                    <button className="shadow col-2 mt-5 btn text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3" onClick={() => {setForm(false)}}>Cancel</button>
                    <button className="shadow col-2 offset-2 mt-5 btn text-success-emphasis bg-success-subtle border border-success-subtle rounded-3" onClick={addProduct}>Save</button>
                </div>
            </div>
            <br />
        </div>
    )
}

export default AddProduct;