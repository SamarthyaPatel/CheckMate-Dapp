import useEth from "../../contexts/EthContext/useEth";
import { useState } from "react";
import AddProduct from "./AddProduct.jsx";
import GetLocations from "./GetLocations.jsx";

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
                <button className="btn ms-5" onClick={() => {setForm(true)}} style={{backgroundColor: "Aquamarine"}}> <h3 className="px-2">Add Products <b>+</b> </h3>  </button>
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
        <div className="card mt-4 p-5">
            {
                !form ? <Product />:
                    <AddProduct setForm={setForm} suppliers={suppliers} getProducts={getProducts}/>
            }
            <div className="mt-5 p-2 pt-4">
                <h2 className="">My Products</h2>
                {
                    products === undefined ? <></> :
                        Object.keys(products).length === 0 ? <h4 className="text-center mt-4">Let's create an amazing Product! 📦 </h4> :
                            <Display />
                }
            </div>
        </div>
    )
}

export default Manufacturer;