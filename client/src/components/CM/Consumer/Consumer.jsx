import useEth from "../../../contexts/EthContext/useEth";
import { useState } from "react";
import GetLocations from "../GetLocations.jsx";

function Consumer({user, fetchUser}) {

    const { state: { contract, accounts } } = useEth();
    const [product, setProduct] = useState();
    const [mb, setMB] = useState(0);
    const [id, setID] = useState('');
    const [recommended, setRecommended] = useState(0);

    const verifyProduct = async () => {
        if(id !== "") {
            try {
                const product = await contract.methods.getProduct(id-1).call({ from: accounts[0] });
                setProduct(product);
            } catch(err) {
                console.log(err);
                setProduct("unauthorised");
            }
        } else {
            alert("Please enter product code to verify.");
        }
    };

    const addToBelongings = async () => {
        await contract.methods.addToBelongings(id-1).send({ from: accounts[0] });
        getBelongings();
        fetchUser();
    }

    const getBelongings = async () => {
        const belongings = await contract.methods.getBelongings().call({ from: accounts[0] });
        setMB(belongings)
        const recommends = await contract.methods.getAvailableProducts().call({ from: accounts[0] });
        setRecommended(recommends);
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
                    product.owner !== user.wallet && !product.isOwned ? <button className="btn text-success-emphasis bg-success-subtle border border-success-subtle rounded-3 shadow" onClick={addToBelongings}> Add to Belongings </button> :
                        product.owner !== user.wallet ? <button className="btn shadow" disabled> {product.owner} owns this. </button> :
                            <button className="btn  col-3 shadow" disabled> You own this product. </button>
                }
            </div>
        )
    }

    function Output() {
        return (
            product === undefined ? <></> :
                product === "unauthorised" ? <div className="text-center card m-5 p-5 shadow"><div className="display-1">❌</div><h1 className="display-5">The product is Unauthentic and Fake.</h1></div> :
                    <Display />
        )
    }

    function FetchData() {
        getBelongings();
    }

    const label = {
        fontSize: "17px",
    }

    function GetRecommendedProducts() {
        return (
            <div>
                <p className="text-center p-1 fw-bold fs-6">Products you may like!</p>
                <div className="mt-4">
                    {
                        recommended.map((product) => 
                            <div className="shadow p-2 mt-3 rounded-3" key={product} id="RecommendedProduct">
                                <p id="RecommendedProduct" className="fs-6 mb-0"> <code className="fs-5">{product.productName}</code> </p>
                                <p className="fs-6 my-0"> Product code: {Number(product.productID)+1}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }

    return(
        <div className="mt-4 p-2 d-flex">
            <div className="LEFT card-body">
                <h2 className="p-3 text-info-emphasis bg-info-subtle border border-info-subtle rounded-3">Verify Product</h2>
                <div className="d-flex justify-content-around">
                    <div className="form-floating my-4 p-0 d-flex col-5">
                        <input type="number" className="form-control" placeholder="Product Code" value={id} onChange={handleID}/>
                        <label style={label} >Product code</label>
                    </div>
                    <button className="btn btn-light col-3 p-0 my-4 shadow" onClick={verifyProduct}> <b>Verify</b> </button>
                </div>
                <Output />
                    <br /><br />
                    {
                    mb === 0 ? <h2 className="p-3 text-success-emphasis bg-success-subtle border border-success-subtle rounded-3"> My Belongings </h2> :
                    <h2 className="p-3 text-success-emphasis bg-success-subtle border border-success-subtle rounded-3"> My Belongings [{user.totalBelongings}] </h2>
                }
                <div className="mt-4">
                    {
                        mb === 0 ? <FetchData /> :
                            <GetBelongings />
                    }
                </div>
                <br />
                <br />
            </div>
            <div className="ms-2 ps-1 col-md-auto">
                <h4 className="head mt-0 p-2 rounded-3 text-center"> <span className="fs-5 m-0 p-0">AI-BC powered</span> <br /> Recommender System</h4>
                {
                    recommended === 0 ? <FetchData /> :
                        <GetRecommendedProducts />
                }
                <br />
                <div className="DISCLAIMER text-center m-0 py-1">
                <p className="fs-6 m-0 p-0" style={{lineHeight: 1.1, color: "grey",}}>This is just for</p>
                <p className="fs-6 m-0 p-0" style={{lineHeight: 1.1, color: "grey",}}>demonstration purpose.</p>
                </div>
            </div>
        </div>
    )
}

export default Consumer;