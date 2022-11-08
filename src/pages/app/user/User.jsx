import { Helmet } from "react-helmet-async";
import NavbarAdmin from "../../../components/NavbarAdmin";

const User = () => {
    return ( 
        <>
        <Helmet>
            <title>User | Schedus</title>
        </Helmet>
        
        <NavbarAdmin/>
        
        <div className="layoutContainer">
            <h1 className="pageName">User</h1>
        </div>
        </>
     );
}
 
export default User;