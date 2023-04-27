import useEth from "../../contexts/EthContext/useEth";
import { useState } from "react";

function GetLocations({product}) {

    const { state: { contract, accounts } } = useEth();
    const [locations, setLocation] = useState();
    const id = parseInt(product['productID']);
    
    
    const getLocations = async () => {
        const locs = await contract.methods.fetchStates(id).call({ from: accounts[0] });
        setLocation(locs);
    };

    if(locations === undefined) {
        getLocations();
    }

    function Values(text, num) {
        const values = text.split("|");
        return values[num];
    }

    let iterat = 0;
    function Increment() {
        iterat ++;
        if(iterat < (Object.keys(locations).length * 2)) {
            return( <h2>➡️</h2> )
        } else {
            return( <h2>⏸</h2> )
        }
    }

    function Print() {
        return (
            locations === undefined ? <></>:
                <div className="mt-2">
                    <details>
                        <summary className="text-info">Location History</summary>
                        <div className="row row-cols-1 row-cols-md-2 g-0 justify-content-between">
                            {
                                locations.map((location) => 
                                <div className="d-flex justify-content-between align-items-center" key={location[0]}>
                                    <div className="mt-3 card px-3 py-2">
                                        <p className=""> <code className="fw-bold">{product[1]}</code> reached <code className="fw-bold">{location[1]}</code> <br /> on <code className="fw-bold">{Values(location[4], 0)}</code> <br /> at <code className="fw-bold">{Values(location[4], 1)}</code>. 
                                        <hr className="m-1"/> Delivered by <code className="fw-bold">{location[2]}</code>. </p>
                                    </div>
                                    {
                                        <Increment />
                                    }
                                </div>
                                )
                            }
                        </div>
                    </details>
                </div>
        )
    }

    return(
        <div className="text-start shadow p-4 mb-4" key={product[0]}>
            <p className="m-0">Product Name: <span className="fw-bold">{product[1]}</span> </p>
            <p className="m-0">Batch ID: <span className="fw-bold">{product[2]}</span> </p>
            <p className="m-0">Creator: <span className="">{product[3]}</span> </p>
            <p className="m-0">Owner: <span className="">{product[5]}</span> </p>
            {
                product[4] === "0" ? <p className="m-0">Locations: Still at Warehouse. </p>:
                    <Print />
            }
        </div>
        
    )
}

export default GetLocations;