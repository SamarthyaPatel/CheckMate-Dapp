import { useState } from "react";

function ComposeMessage({role, item, contract, accounts, getMessage}) {

    const [form, setForm] = useState(false);
    const [message, setMessage] = useState("");

    const handleMessage = event => {
        setMessage(event.target.value)
    }

    const sendAlert = async () => {
        if(message !== "") {
            console.log("Enters")
            const date = new Date();
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const timeStamp = await date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear() + " | " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            await contract.methods.alertProductOwners(item.batchID, "[" + item.productName + "] " + message, timeStamp).send( {from: accounts[0]} );
            setForm(false)
            getMessage();
        }
        else {
            alert("Please enter message to send.");
        }
    }

    const sendMessage = async () => {
        if(message !== "") {
            const date = new Date();
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const timeStamp = await date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear() + " | " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            await contract.methods.postMessage(item.creator, "[" + item.productName + "] " + message, timeStamp).send( {from: accounts[0]} );
            setForm(false)
            getMessage();
        }
        else {
            alert("Please enter message to send.");
        }
    }

    if(role === "manufacturer") {
        return(
            <div className="shadow mt-3 p-3 d-flex justify-content-between" key={item.productID}>
                <label> Product: {item.productName} </label>
                {
                    !form ? <button className="btn text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3" onClick={() => {setForm(true)}}>Alert Owners</button> :
                        <div className="d-flex">
                            <button className="btn text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3" onClick={() => {setForm(false)}}>Cancel</button>
                            <input type="text" value={message} onChange={handleMessage} className="form-control mx-2"/>
                            <button className="btn text-success-emphasis bg-success-subtle border border-success-subtle rounded-3" onClick={sendAlert}>Send</button>
                        </div>
                } 
            </div>
        )
    } else if(role === "supplier") {
        return(
            <div className="shadow mt-3 p-3 d-flex justify-content-between" key={item.productID}>
                <label> Shipment: {item.productName} </label>
                {
                    !form ? <button className="btn text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3" onClick={() => {setForm(true)}}>Send Message</button> :
                        <div className="d-flex">
                            <button className="btn text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3" onClick={() => {setForm(false)}}>Cancel</button>
                            <input type="text" value={message} onChange={handleMessage} className="form-control mx-2"/>
                            <button className="btn text-success-emphasis bg-success-subtle border border-success-subtle rounded-3" onClick={sendMessage}>Send</button>
                        </div>
                } 
            </div>
        )
    } else if(role === "consumer") {
        return(
            <div className="shadow mt-3 p-3 d-flex justify-content-between" key={item.productID}>
                <label> Product: {item.productName} </label>
                {
                    !form ? <button className="btn text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3" onClick={() => {setForm(true)}}>Report Manufacturer</button> :
                        <div className="d-flex">
                            <button className="btn text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3" onClick={() => {setForm(false)}}>Cancel</button>
                            <input type="text" value={message} onChange={handleMessage} className="form-control mx-2"/>
                            <button className="btn text-success-emphasis bg-success-subtle border border-success-subtle rounded-3" onClick={sendMessage}>Send</button>
                        </div>
                } 
            </div>  
        )
    }
}

export default ComposeMessage;