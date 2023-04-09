import useEth from "../../contexts/EthContext/useEth";
import { useState } from "react";

function Messages() {

    const { state: { contract, accounts } } = useEth();
    const [pro, setPro] = useState();
    const [message, setMessage] = useState("");
    const [mails, setMails] = useState([]);

    const getProducts = async () => {
        const creations = await contract.methods.getCreatedProducts().call({ from: accounts[0] });
        const user = await contract.methods.getUser().call({ from: accounts[0] });
        setPro(creations);
        console.log("User Belongings: ", user['totalBelongings'])
        console.log("Get Creations =>", creations, "\n" + typeof(creations), "\n", Object.keys(creations).length)
    };

    const handleMessage = event => {
        setMessage(event.target.value)
    }

    console.log(typeof(message), " => ", message)

    const sendMessage = async () => {
        if(message !== "") {
            console.log("Enters")
            const date = new Date();
            const timestamp = date.getDate() + date.getMonth() + date.getFullYear() + " | " + date.getHours() + date.getMinutes();
            await contract.methods.alertProductOwners(2, message, timestamp).send( {from: accounts[0]} );
            return
        }
        alert("Please enter message to send.");
    }

    const getMessage = async () => {
        const data = await contract.methods.getMails().call( {from: accounts[0]} );
        setMails(data)
    }

    if(mails === undefined) {
        getMessage();
    }

    // console.log("Mails => ", typeof(mails), "\n", mails)

    return(
    <div className="card mt-4 p-2">
        <div className="card-body">
            <h1>Messages</h1>
            <button className="btn btn-dark" onClick={getProducts}>Get Products</button>
            <div className="m-5">
                <div>
                    <input type="text" value={message} onChange={handleMessage} />
                    <button className="btn" onClick={sendMessage}>Send message</button>
                </div>

                <button className="btn" onClick={getMessage}>Get message</button>
                {
                    Object.keys(mails).length === 0 ? <></> : 
                        mails.map((mail) => 
                            <div>
                                <p>To: {mail.to}</p>
                                <p>From: {mail.from}</p>
                                <p>Message: <b>{mail.message}</b> </p>
                                <p>Time: {mail.dateAndTime} </p>
                                <br />
                            </div>
                        )
                }
                
            </div>
        </div>
    </div>
    );
}

export default Messages;