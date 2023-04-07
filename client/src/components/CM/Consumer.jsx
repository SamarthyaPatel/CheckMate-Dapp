import useEth from "../../contexts/EthContext/useEth";
import { useState } from "react";

function Consumer() {

    const { state: { contract, accounts } } = useEth();
    const [product, setProduct] = useState();
    const [belonging, setBelonging] = useState();
    const [mb, setMB] = useState();
    const [id, setID] = useState();

    const getProduct = async () => {
        const product = await contract.methods.getProduct(id-1).call({ from: accounts[0] });
        setProduct(product)
        console.log(product)
    };

    const addToMB = async () => {
        const res = await contract.methods.addToBelongings(id-1).send({ from: accounts[0] });
        console.log(res)
    }

    const getMyB = async () => {
        const belongings = await contract.methods.getBelongings().call({ from: accounts[0] });
        console.log(belongings)
        setMB(belongings)
        setBelonging(true)
    }

    const handleID = event => {
        setID(event.target.value);
    };

    function GetMB() {
        if(!belonging) {
            return (
                <div className="div">
                    <button onClick={getMyB}>Get Belongings</button>
                </div>
            )
        } else {
            return (
                <div className="card">
                    {
                        mb.map((product) => <div className="">
                            <label>Name: <span className="fw-bold mt-5">{product[1]}</span> </label>
                            <br />
                            <label>Batch ID: <span className="fw-bold mt-5">{product[2]}</span> </label>
                            <br /><br />
                            </div>
                        )
                    }
                </div>
            )
        }
    }

    function Output() {
        if(!product) {
            return (
                <div className="div">
                    <h1>Hi</h1>
                </div>
            )
        } else {
            return (
                <div className="card p-5">
                    <h1>{product[1]}</h1>
                    <h3>{product[2]}</h3>
                    <button onClick={addToMB}>Add to My Belongings</button>
                </div>
            )
        }
    }

    return(
        <div className="card mt-4 p-2">
            <div className="card-body">
                <h1>My Belongings</h1>
                <div className="card">
                    <div className="card-body">
                        <GetMB />
                    </div>
                </div>
                <hr />
                <h1>Verify Product</h1>
                <input type="number" value={id} onChange={handleID} />
                <button onClick={getProduct}>Get Product</button>
                <Output />
                <hr />
                <br />
                <h3>Scan</h3>
                <h3>Fetch Product or display Error message.</h3>
            </div>
        </div>
    )
}

export default Consumer;