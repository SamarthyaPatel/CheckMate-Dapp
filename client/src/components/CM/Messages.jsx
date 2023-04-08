import useEth from "../../contexts/EthContext/useEth";
import { useState } from "react";

function Messages() {

    const { state: { contract, accounts } } = useEth();
    const [pro, setPro] = useState();

    const getProducts = async () => {
        const creations = await contract.methods.getCreatedProducts().call({ from: accounts[0] });
        const user = await contract.methods.getUser().call({ from: accounts[0] });
        setPro(creations);
        console.log("User Belongings: ", user['totalBelongings'])
        console.log("Get Creations =>", creations, "\n" + typeof(creations), "\n", Object.keys(creations).length)
    };

    return(
    <div className="card mt-4 p-2">
        <div className="card-body">
            <h1>Messages</h1>
            <button className="btn btn-dark" onClick={getProducts}>Get Products</button>
            <p> {pro} </p>
        </div>
    </div>
    );
}

export default Messages;