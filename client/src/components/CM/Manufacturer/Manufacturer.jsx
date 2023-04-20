import useEth from "../../../contexts/EthContext/useEth";
import { useState } from "react";
import AddProduct from "./AddProduct.jsx";
import GetLocations from "../GetLocations.jsx";

function Manufacturer() {

    const { state: { contract, accounts } } = useEth();
    const [form, setForm] = useState(false);
    const [products, setProducts] = useState();
    const [suppliers, setSuppliers] = useState();

    const getProducts = async () => {
        try {
            const creations = await contract.methods.getCreatedProducts().call({ from: accounts[0] });
            setProducts(creations);
            console.log("Creations: ", creations)
        } catch (error) {}
    };

    const getSuppliers = async () => {
        try {
            const suppliers = await contract.methods.getSuppliers().call({ from: accounts[0] });
            setSuppliers(suppliers);
        } catch (error) {}
    }

    function Product() {
        return(
            <div className="text-center">
                <button className="btn btn-light m-5" onClick={() => {setForm(true)}}> <h4 className="px-2"> Register Product on Blockchain <b>+</b> </h4>  </button>
            </div>
        )
    }

    function Display() {
        return(
            products.map((product) =>
                <GetLocations product={product} key={product['productID']}/>
            )
        )
    }

    if(products === undefined) {
        getProducts();
        console.log("Got products => ", products)
    }
    if(suppliers === undefined) {
        getSuppliers();
        console.log("Got suppliers")
    }

    return(
        <div className="mt-4 p-2">
            <div className="card-body">
            <h2 className="p-3 text-success-emphasis bg-success-subtle border border-success-subtle rounded-3"> Add Product </h2>
                {
                    !form ? <Product />:
                        <AddProduct setForm={setForm} suppliers={suppliers} getProducts={getProducts}/>
                }
                <br />
                <h2 className="p-3 text-info-emphasis bg-info-subtle border border-info-subtle rounded-3">My created Products</h2>
                <div className="mt-4">
                    {
                        products === undefined ? <></> :
                            Object.keys(products).length === 0 ? <h4 className="text-center mt-4">Let's create an amazing Product! 📦 </h4> :
                                <Display />
                    }  
                </div>
            </div>
        </div>
    )
}

export default Manufacturer;