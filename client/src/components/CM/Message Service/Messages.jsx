import useEth from "../../../contexts/EthContext/useEth";
import { useState, useEffect } from "react";
import ComposeMessage from "./ComposeMessage";

function Messages({role, user}) {

    const { state: { contract, accounts } } = useEth();
    const [items, setItems] = useState([]);
    const [mails, setMails] = useState([]);

    const getCreations = async () => {
        const creations = await contract.methods.getCreatedProducts().call({ from: accounts[0] });
        const user = await contract.methods.getUser().call({ from: accounts[0] });
        setItems(creations);
        console.log("User Creations: ", user['totalBelongings'])
        console.log("Get Creations =>", creations, "\n" + typeof(creations), "\n", Object.keys(creations).length)
    };

    const getShipments = async () => {
        const creations = await contract.methods.getShipments().call({ from: accounts[0] });
        const user = await contract.methods.getUser().call({ from: accounts[0] });
        setItems(creations);
        console.log("User Shipments: ", user['totalBelongings'])
        console.log("Get Shipments =>", creations, "\n" + typeof(creations), "\n", Object.keys(creations).length)
    };

    const getBelongings = async () => {
        const creations = await contract.methods.getBelongings().call({ from: accounts[0] });
        const user = await contract.methods.getUser().call({ from: accounts[0] });
        setItems(creations);
        console.log("User Belongings: ", user['totalBelongings'])
        console.log("Get Belongings =>", creations, "\n" + typeof(creations), "\n", Object.keys(creations).length)
    };

    console.log(typeof(items), " items => ", items)


    const getMessage = async () => {
        const data = await contract.methods.getMails().call( {from: accounts[0]} );
        setMails(data)
    }

    useEffect(() => {
        if(Object.keys(mails).length === 0) {
            getMessage();
        }
        if(Object.keys(mails).length === 0) {
            if(role === "manufacturer") {
                getCreations();
            } else if(role === "supplier") {
                getShipments();
            } else if(role === "consumer") {
                getBelongings();
            }
        }
    }, []);

    function DisplayMessage(mail) {
        const message = mail.mail;
        if(message.to === user.wallet) {
            console.log(message , user.wallet)
            return(
                <div className="col-8 mt-4">
                    <div className="shadow p-3 text-light-emphasis bg-light-subtle border border-light-subtle rounded-3">
                        <p className="fs-6"><b>↘️ From:</b> {message.from}</p>
                        <p> <b>✉️ {message.message}</b> </p>
                        <p className="text-end m-0 fs-6"> {message.dateAndTime} </p>
                    </div>
                </div>
                
            )
        } else {
            return(
                <div className="col-8 offset-4 mt-4">
                    <div className="shadow p-3 text-light-emphasis bg-light-subtle border border-light-subtle rounded-3">
                        <div className="d-flex justify-content-between">
                            <p className="fs-6"><b>To:</b> {message.to} </p>
                            <p className="fs-6"><b>&#8599;&#65039;</b></p>
                        </div>
                        <p> <b>✉️ {message.message}</b> </p>
                        <p className="text-end m-0 fs-6"> {message.dateAndTime} </p>
                    </div>
                </div>
            )
        }
    }

    return(
    <div className="mt-4 p-2">
        <div className="card-body">
            <h2 className="p-3 text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-3 align-middle">Send Message </h2>
            {
                Object.keys(items).length === 0 ? role === "supplier" ? <h4 className="text-center mt-5">You have no shipments 📦 </h4> : 
                    role === "manufacturer" ? <h4 className="text-center mt-5">You have no products 📦 </h4> : 
                        role === "consumer" ? <h4 className="text-center mt-5">You have no products 📦 </h4> : <></> :
                            items.map((item) => 
                                <ComposeMessage role={role} item={item} key={item} contract={contract} accounts={accounts} getMessage={getMessage}/>
                            )
            }
            <div className="mt-5">
                <h2 className="p-3 text-center text-dark-emphasis bg-dark-subtle border border-dark-subtle rounded-3">Messages</h2>
                {
                    Object.keys(mails).length === 0 ? <h4 className="text-center mt-5">You have no messages 📪 </h4>: 
                        mails.map((mail) => 
                            <div key={mail.messageID}>
                                <DisplayMessage mail={mail} />
                            </div>
                        )
                }
            </div>
        </div>
    </div>
    );
}

export default Messages;