import Consumer from "./Consumer";
import Manufacturer from "./Manufacturer";
import Supplier from "./Supplier";


function Home({role, user}) {

    function RoleBasedInterface() {
        if(role === "consumer") {
            return <Consumer user={user}/> 
        } else if (role === "manufacturer") {
            return <Manufacturer user={user}/>
        } else if (role === "supplier") {
            return <Supplier user={user}/>
        }
    }

    return(
        <div>
            <RoleBasedInterface/>
        </div>
    )
}

export default Home;