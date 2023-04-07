import Consumer from "./Consumer";
import Manufacturer from "./Manufacturer";
import Supplier from "./Supplier";


function Home({role}) {

    function RoleBasedInterface() {
        if(role === "consumer") {
            return <Consumer /> 
        } else if (role === "manufacturer") {
            return <Manufacturer />
        } else if (role === "supplier") {
            return <Supplier />
        } else if (role === "admin") {
            return(
                <>
                    <Consumer /> 
                    <hr />
                    <Manufacturer />
                    <hr />
                    <Supplier />
                </>
            )
        }
    }

    return(
        <div>
            <RoleBasedInterface/>
        </div>
    )
}

export default Home;