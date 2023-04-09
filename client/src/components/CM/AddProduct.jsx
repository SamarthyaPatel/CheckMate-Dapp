import useEth from "../../contexts/EthContext/useEth";
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

    console.log("Suppliers: ", sup)

    const addProduct = async () => {
        console.log(name, batch, sup)
        await contract.methods.registerProduct(name, batch, sup).send({ from: accounts[0] });
        setForm(false);
        getProducts();
    };

    const label = {
        fontSize: "17px",
    }

    return(
        <div className="card">
            <div className="card-body">
                <form className="">
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
                <div className="d-flex justify-content-around">
                    <button className="col-3 mt-5 btn btn-danger" onClick={() => {setForm(false)}}>Cancel</button>
                    <button className="col-3 mt-5 btn btn-success" onClick={addProduct}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default AddProduct;