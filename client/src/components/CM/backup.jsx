import useEth from "../../contexts/EthContext/useEth";
import { useState } from "react";
import AddProduct from "./AddProduct.jsx";

function Manufacturer() {

    const { state: { contract, accounts } } = useEth();
    const [form, setForm] = useState(false);
    const [display, setDisplay] = useState(false);
    const [products, setProducts] = useState();

    const updateForm = () =>  {
        if(!form) {
            setForm(true)
        } else {
            setForm(false)
        }
    };

    const getProducts = async () => {
        const products = await contract.methods.getCreatedProducts().call({ from: accounts[0] });
        setProducts(products);
        setDisplay(true)
        console.log(products)
    };

    function Button() {
        
        return (
            <div>
                <br />
                {
                    products.map( (product) => 
                    <div className="card p-4 mb-4">
                        <p className="m-0">Product Name: <span className="fw-bold">{product[1]}</span> </p>
                        <p className="m-0">Batch ID: <span className="fw-bold">{product[2]}</span> </p>
                        <p className="m-0">Creator: <span className="">{product[3]}</span> </p>
                        <p className="m-0">Locations: <span className="">{product[4]}</span> </p>
                        <p className="m-0">Owner: <span className="">{product[5]}</span> </p>
                    </div>
                    )
                }
            </div>
        )
    }

    function GetProducts() {
        if(!display) {
            return(
                <div>

                </div>
            )
        } else {
            return (
                <div className="d-flex">
                    <Button/>
                </div>
            )
        }
    }

    function Product() {
        return(
            <div className="d-flex">
                <h1>Add Products</h1>
                <button className="btn btn-light ms-5" onClick={updateForm}> ➕ </button>
            </div>
        )
    }

    return(
        <div className="card mt-4 p-2">
            <div className="card-body">

                <h1>My Products</h1>
                <button onClick={getProducts} className="btn btn-primary "> Refresh </button>
                <div className="card-body">
                        <GetProducts />
                </div>

                <br /><br /><br />

                <div>
                    {
                        !form ? <Product />: 
                            <AddProduct updateForm={updateForm} />
                    }
                </div>
            </div>
        </div>
    )
}




// import useEth from "../../contexts/EthContext/useEth";
// import { useState, useRef } from "react";

// function ComposeMessage({product, compose, composer, setCompose, setForm, myRef}) {

//     const { state: { contract, accounts } } = useEth();
//     // const [compose, setCompose] = useState(false);
//     const [message, setMessage] = useState();
//     // const composer = useRef(null);

//     const label = {
//         fontSize: "17px",
//     };

//     const sendMessage = async () => {
//         const date = await new Date();
//         const months = ["January", "February", "March", "April", 
//                         "May", "June", "July", "August", 
//                         "September", "October", "November", "December"];
//         const timeStamp = await date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear() + " | " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        
//         // if(message ===  "") {
//         //     alert("Please enter message.");
//         //     return
//         // }
//         await contract.methods.alertProductOwners(product.batchID, message, timeStamp).send({ from: accounts[0] });
//         setForm(false);
//         myRef.current.classList.add('d-flex');
//         myRef.current.classList.add('justify-content-between');
//     };

//     const handleMessage = event => {
//         setMessage(event.target.value);
//     };

//     // console.log(message);

//     function MessageOwners() {
//         if(composer.current !== null) {
//             composer.current.classList.remove('d-flex');
//             composer.current.classList.remove('justify-content-between');
//         }

//         return (
//             <div>
//                 <input type="text" value={message} onChange={handleMessage} />
//                 <button onClick={() => setForm(false)}>Cancel</button>
//             </div>
//         )

//         // return (
//         //     <div>
//         //         <form className="">
//         //             <div className="form-floating mx-3">
//         //                 <input type="text" className="form-control" placeholder="Leave a message here" value={message} onChange={handleMessage}/>
//         //                 <label style={label}>Message</label>
//         //             </div>
//         //         </form>
//         //         <div className="d-flex justify-content-around mt-3">
//         //             <button className="btn btn-outline-danger col-2 my-3 " onClick={() => {setForm(false); 
//         //                 composer.current.classList.add('d-flex'); composer.current.classList.add('justify-content-between');
//         //                 myRef.current.classList.add('d-flex'); myRef.current.classList.add('justify-content-between');}}>
//         //             Cancel</button>
//         //             <button className="btn btn-outline-success col-2 my-3 " onClick={sendMessage}>Send</button>
//         //         </div>
//         //     </div>
//         // )
//     }

//     console.log("Compose in CM => ", composer.current)

//     if(!compose) {
//         if(composer.current !== null) {
//             composer.current.classList.add('d-flex'); 
//             composer.current.classList.add('justify-content-between');
//         }
//     } else {
//         if(composer.current !== null) {
//             composer.current.classList.remove('d-flex'); 
//             composer.current.classList.remove('justify-content-between');
//         }
//     }

//     function MessageSupplers() {
//         return (
//             <div>
//                 <div class="form-floating mx-3">
//                     <textarea className="form-control" placeholder="Leave a message here" ></textarea>
//                     <label>Message</label>
//                 </div>
//             </div>
//         )
//     };

//     // return (
//     //     <div className="mt-3">
//     //         <div className="m-4 card">
//     //             <div ref={composer} className="d-flex justify-content-between card-body">
//     //                 <p className="m-3"> Product: <b>{product.productName}</b> </p>
//     //                 {
//     //                     compose ? <MessageOwners /> :
//     //                     <div className="d-flex justify-content-end">
//     //                         <button className="btn btn-dark m-2" onClick={() => setCompose(true)}>Message Owners</button>
//     //                         <button className="btn btn-dark m-2" onClick={() => setCompose(true)}>Message Suppliers</button>
//     //                     </div>
//     //                 }
//     //             </div>
//     //         </div>
//     //     </div>
//     // )

//     return (
//         <div>
//             <div>
//                  <form className="">
//                      <div className="form-floating mx-3">
//                          <input type="text" className="form-control" placeholder="Leave a message here" value={message} onChange={handleMessage}/>
//                          <label style={label}>Message</label>
//                      </div>
//                  </form>
//                  <div className="d-flex justify-content-around mt-3">
//                     <button className="btn btn-outline-danger col-2 my-3 " onClick={() => {setForm(false); setCompose(false);
//                         composer.current.classList.add('d-flex'); composer.current.classList.add('justify-content-between');
//                         myRef.current.classList.add('d-flex'); myRef.current.classList.add('justify-content-between');}}>
//                     Cancel</button>
//                     <button className="btn btn-outline-success col-2 my-3 " onClick={sendMessage}>Send</button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ComposeMessage;





// import useEth from "../../contexts/EthContext/useEth";
// import { useState, useRef } from "react";
// import ComposeMessage from "./ComposeMessage.jsx";

// function Messages() {

//     const { state: { contract, accounts } } = useEth();
//     const [pro, setPro] = useState();
//     const [form, setForm] = useState(false);
//     const myRef = useRef(null);
//     const [compose, setCompose] = useState(false);
//     const composer = useRef(null);



//     const getProducts = async () => {
//         const creations = await contract.methods.getCreatedProducts().call({ from: accounts[0] });
//         const user = await contract.methods.getUser().call({ from: accounts[0] });
//         setPro(creations);
//         console.log("User Belongings: ", user['totalBelongings'])
//         // console.log("Get Creations =>", creations, "\n" + typeof(creations), "\n", Object.keys(creations).length)
//     };

//     if(pro === undefined) {
//         getProducts();
//     }


//     function WriteMail() {
//         if(myRef.current !== null) {
//             myRef.current.classList.remove('d-flex');
//             myRef.current.classList.remove('justify-content-between');
//         }
//         return (
//             pro.map((product) =>
//                 <ComposeMessage setForm={setForm} product={product} key={product} myRef={myRef}/>
//             )
//         )
//     }

//     if(form) {
//         if(myRef.current !== null) {
//             myRef.current.classList.remove('d-flex');
//             myRef.current.classList.remove('justify-content-between');
//         }
//     } else {
//         if(myRef.current !== null) {
//             myRef.current.classList.add('d-flex');
//             myRef.current.classList.add('justify-content-between');
//         }
//     }

//     if(compose) {
//         if(composer.current !== null) {
//             composer.current.classList.remove('d-flex'); 
//             composer.current.classList.remove('justify-content-between');
//         }
//     }

//     return(
//     <div className="card mt-4 p-2">
//         <div className="card-body">
//             <div ref={myRef} className="d-flex justify-content-between">
//                 <h1>Messages</h1>
//                 {
//                     !form ? <button className="btn btn-light me-3" onClick={() => setForm(true)}>Compose Mail ✍️</button> :
//                         pro.map((product) =>
//                             <div ref={composer} className="d-flex justify-content-between card-body">
//                                 <p className="m-3"> Product: <b>{product.productName}</b> </p>
//                                 {
//                                     compose ? <ComposeMessage compose={compose} composer={composer} setCompose={setCompose} setForm={setForm} product={product} key={product} myRef={myRef}/> :
//                                     <div className="d-flex justify-content-end">
//                                         <button className="btn btn-dark m-2" onClick={() => setCompose(true)}>Message Owners</button>
//                                         <button className="btn btn-dark m-2" onClick={() => setCompose(true)}>Message Suppliers</button>
//                                     </div>
//                                 }
//                             </div>
//                         )
//                 }
//             </div>
            
//         </div>
//     </div>
//     );
// }

// export default Messages;