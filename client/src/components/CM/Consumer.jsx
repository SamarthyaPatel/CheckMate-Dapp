import useEth from "../../contexts/EthContext/useEth";
import { useState } from "react";
import GetLocations from "./GetLocations.jsx";

function Consumer({user}) {

    const { state: { contract, accounts } } = useEth();
    const [product, setProduct] = useState();
    const [mb, setMB] = useState();
    const [id, setID] = useState('');

    const verifyProduct = async () => {
        if(id !== "") {
            try {
                const product = await contract.methods.getProduct(id-1).call({ from: accounts[0] });
                setProduct(product);
            } catch(err) {
                console.log(err);
                setProduct("unauthorised");
            }
            console.log("Product => ",product);
        } else {
            alert("Please enter product code to verify.");
        }
        
    };

    const addToBelongings = async () => {
        const res = await contract.methods.addToBelongings(id-1).send({ from: accounts[0] });
        console.log(res)
    }

    const getBelongings = async () => {
        const belongings = await contract.methods.getBelongings().call({ from: accounts[0] });
        console.log("Belonging => ", belongings)
        setMB(belongings)
    }

    const handleID = event => {
        setID(event.target.value);
    };

    function GetBelongings() {
        return (
            <div className="">
                {
                    Object.keys(mb).length === 0 ? 
                    <div className="text-center">
                        <div className="d-flex justify-content-center mb-2">
                            <h4> Let's buy new product! </h4>
                            <lord-icon
                                src="https://cdn.lordicon.com/qzwudxpy.json"
                                trigger="loop"
                                delay="2000"
                                style={{width: "30px", height: "30px"}}>
                            </lord-icon>
                        </div>
                        {/* <iframe name="myframe" src="https://giphy.com/embed/i8dbwev03O4o5HZ6oc" width="480" height="268" title="GIF"></iframe> */}
                    </div> :
                        <div className="">
                            {
                                mb.map((product) => 
                                    <GetLocations product={product} key={product[0]}/>
                                )
                            }
                        </div>
                }
            </div>
        )
        
    }

    function Display() {
        return(
            <div className="text-center">
                <GetLocations product={product} key={product[0]}/>
                {
                    product.owner !== user.wallet && !product.isOwned ? <button className="btn btn-success col-4" onClick={addToBelongings}> Add to Belongings </button> :
                        product.owner !== user.wallet ? <button className="btn btn-light col-4" disabled> {product.owner} owns this. </button> :
                            <button className="btn btn-light col-4" disabled> You own this product. </button>
                }
            </div>
        )
    }

    function Output() {
        return (
            product === undefined ? <></> :
                product === "unauthorised" ? <div className="text-center card m-5 p-5"><div className="display-1">❌</div><h1 className="display-5">The product is Unauthorised and Fake.</h1></div> :
                    <Display />
        )
    }

    function FetchData() {
        getBelongings();
    }

    const label = {
        fontSize: "17px",
    }

    console.log(id)

    return(
        <div className="card mt-4 p-2" style={{backgroundColor: "skyblue"}}>
            <div className="card-body">
                {
                    user.totalBelongings === 0 ? <h1> My Belongings </h1> :
                    <h1> My Belongings [{user.totalBelongings}] </h1>
                }
                <div className="mt-4" style={{backgroundColor: "skyblue"}}>
                    {
                        mb === undefined ? <FetchData /> :
                            <GetBelongings />
                    }
                </div>
                <br />
                <br />
                <h1>Verify Product</h1>
                <div className="d-flex justify-content-around">
                    <div className="form-floating my-4 p-0 d-flex col-5">
                        <input type="number" className="form-control" placeholder="Product Code" value={id} onChange={handleID}/>
                        <label style={label} >Product code</label>
                    </div>
                    <button className="btn btn-light col-3 p-0 my-4" onClick={verifyProduct}> <b>Verify</b> </button>
                </div>
                <Output />
            </div>
        </div>
    )
}

export default Consumer;