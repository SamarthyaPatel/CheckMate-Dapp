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

    console.log("Shipments => ", shipments)

    function Shipments() {
        return (
            shipments.map((shipment) => 
                <AddLocation product={shipment} key={shipment[0]}/>
            )
        )
    }

    return(
        <div className="card mt-4 p-5">
            <h2 className="my-2">My Shipments</h2>
            {
                shipments === undefined ? <></> :
                    Object.keys(shipments).length === 0 ? <h4 className="text-center mt-3">You have no shipments! <br /> Time to rest 😴 </h4> :
                        <Shipments/>
            }
        </div>
    )
}

export default Supplier;