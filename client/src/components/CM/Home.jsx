import Consumer from "./Consumer/Consumer";
import Manufacturer from "./Manufacturer/Manufacturer";
import Supplier from "./Supplier/Supplier";


function Home({role, user, fetchUser}) {

    function RoleBasedInterface() {
        if(role === "consumer") {
            return <Consumer user={user} fetchUser={fetchUser}/> 
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