import useEth from "../../contexts/EthContext/useEth";
import { useState } from "react";
import AddProduct from "./AddProduct.jsx";

function Manufacturer() {

    const { state: { contract, accounts } } = useEth();
    const [form, setForm] = useState(false);
    const [display, setDisplay] = useState(false);
    const [products, setProducts] = useState();

    const updateForm = () =>  {
        if(!form) {
            setForm(true)
        } else {
            setForm(false)
        }
    };

    const getProducts = async () => {
        const products = await contract.methods.getCreatedProducts().call({ from: accounts[0] });
        setProducts(products);
        setDisplay(true)
        console.log(products)
    };

    function Button() {
        
        return (
            <div>
                <br />
                {
                    products.map( (product) => 
                    <div className="card p-4 mb-4">
                        <p className="m-0">Product Name: <span className="fw-bold">{product[1]}</span> </p>
                        <p className="m-0">Batch ID: <span className="fw-bold">{product[2]}</span> </p>
                        <p className="m-0">Creator: <span className="">{product[3]}</span> </p>
                        <p className="m-0">Locations: <span className="">{product[4]}</span> </p>
                        <p className="m-0">Owner: <span className="">{product[5]}</span> </p>
                    </div>
                    )
                }
            </div>
        )
    }

    function GetProducts() {
        if(!display) {
            return(
                <div>

                </div>
            )
        } else {
            return (
                <div className="d-flex">
                    <Button/>
                </div>
            )
        }
    }

    function Product() {
        return(
            <div className="d-flex">
                <h1>Add Products</h1>
                <button className="btn btn-light ms-5" onClick={updateForm}> ➕ </button>
            </div>
        )
    }

    return(
        <div className="card mt-4 p-2">
            <div className="card-body">

                <h1>My Products</h1>
                <button onClick={getProducts} className="btn btn-primary "> Refresh </button>
                <div className="card-body">
                        <GetProducts />
                </div>

                <br /><br /><br />

                <div>
                    {
                        !form ? <Product />: 
                            <AddProduct updateForm={updateForm} />
                    }
                </div>
            </div>
        </div>
    )
}