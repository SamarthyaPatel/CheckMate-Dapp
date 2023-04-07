import useEth from "../../contexts/EthContext/useEth";
import { useState } from "react";
import AddProduct from "./AddProduct.jsx";
import GetLocations from "./GetLocations.jsx";

function Manufacturer() {

    const { state: { contract, accounts } } = useEth();
    const [form, setForm] = useState(false);
    const [products, setProducts] = useState();
    const [suppliers, setSuppliers] = useState();

    const updateForm = () =>  {
        if(!form) {
            setForm(true)
        } else {
            setForm(false)
        }
    };

    function Product() {
        return(
            <div className="d-flex">
                <h2>Add Products</h2>
                <button className="btn btn-light ms-5" onClick={updateForm}> ➕ </button>
            </div>
        )
    }

    const getProducts = async () => {
        const products = await contract.methods.getCreatedProducts().call({ from: accounts[0] });
        setProducts(products);
        // await console.log("Get Method =>" + products)
    };

    const getSuppliers = async () => {
        const suppliers = await contract.methods.getSuppliers().call({ from: accounts[0] });
        setSuppliers(suppliers);
    }

    function Display() {
        return(
            products.map((product) =>
                <GetLocations product={product} key={product[0]}/>
            )
        )
    }
    
    if(products === undefined) {
        getProducts();
        getSuppliers();
    }

    return(
        <div className="card mt-4 p-5">
            {
                !form ? <Product />: 
                    <AddProduct updateForm={updateForm} getProducts={getProducts} suppliers={suppliers} />
            }
            <div>
                <div className="d-flex">
                    <h2 className="mt-5">My Products</h2>
                </div>
                <br />
                {
                    !products ? <></> :
                        <Display />
                }
            </div>
        </div>
    )
}

export default Manufacturer;