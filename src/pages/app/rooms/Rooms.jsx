import { Helmet } from "react-helmet-async";
import NavbarAdmin from "../../../components/NavbarAdmin";

const Rooms = () => {
    return ( 
        <>
        <Helmet>
            <title>Rooms | Schedus</title>
        </Helmet>
    
        <NavbarAdmin/>
        
        <div className="layoutContainer">
            <h1 className="pageName">Rooms</h1>
        </div>
        </>
     );
}
 
export default Rooms;