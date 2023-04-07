import useEth from "../../contexts/EthContext/useEth";
import { useState } from "react";

function GetLocations({product}) {

    const { state: { contract, accounts } } = useEth();
    const [locations, setLocation] = useState();
    const [supplier, setSupplier] = useState();
    const [id, setID] = useState(parseInt(product['productID']));
    
    
    const getLocations = async () => {
        const locs = await contract.methods.fetchStates(id).call({ from: accounts[0] });
        setLocation(locs);
        const supplier = await contract.methods.getSuppliers().call({ from: accounts[0] });
        setSupplier(supplier);
    };

    if(locations === undefined) {
        getLocations();
    }
    
    // console.log("locatoins =>", locations);

    const values = {
        color: 'blue',
        fontFamily: 'monospace',
        fontSize: '15px',
    }

    function Values(text, num) {
        const values = text.split("|");
        return values[num]
    }

    function GetSupplierName(address) {
        let name = "";
        if(supplier !== undefined) {
            supplier.map((sup) => {
                if(sup[3] === address) {
                    name = sup[1];
                }
            })
        }
        return name;
    }

    const P = {
        fontSize: '15px'
    }

    function Print() {
        return (
            locations === undefined ? <></>:
                <div className="mt-2">
                    <details>
                        <summary className="">Location History</summary>
                        <div className="d-flex g-2">
                            {
                                locations.map((location) => 
                                <div key={location[0]} className="ms-4 card p-2">
                                    <p style={P}> <span style={values}>{product[1]}</span> reached <span style={values}>{location[1]}</span> <br /> on <span style={values}>{Values(location[3], 0)}</span> <br /> at <span style={values}>{Values(location[3], 1)}</span>. 
                                    <br /> Delivered by <span style={values}>{GetSupplierName(location[2])}</span>. </p>
                                </div>
                                )
                            }
                        </div>
                    </details>
                </div>
        )
    }

    return(
        <div className="card p-4 mb-4" key={product[0]}>
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