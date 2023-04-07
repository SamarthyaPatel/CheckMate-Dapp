import useEth from "../../contexts/EthContext/useEth";
import { useState } from "react";
import AddLocation from "./AddLocation";

function Supplier() {

    const { state: { contract, accounts } } = useEth();
    const [shipments, setShipment] = useState();

    const getShipments = async () => {
        const shipments = await contract.methods.getShipments().call({ from: accounts[0] });
        await setShipment(shipments);
        console.log(shipments)
    }

    if(shipments === undefined) {
        getShipments();
    }

    function Shipments() {
        return (
            shipments.map((shipment) => 
                <AddLocation product={shipment} />
            )
        )
    }

    return(
        <div className="card mt-4 p-5">
            <h2 className="my-2">My Shipments</h2>
            <br />
            {
                !shipments ? <></> :
                    <Shipments/>
            }
        </div>
    )
}

export default Supplier;