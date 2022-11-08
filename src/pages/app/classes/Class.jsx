import { Helmet } from "react-helmet-async";
import NavbarAdmin from "../../../components/NavbarAdmin";

const Class = () => {
    return ( 
        <>
        <Helmet>
            <title>Home | Schedus</title>
        </Helmet>
        
        <NavbarAdmin/>
        
        <div className="layoutContainer">
            <h1 className="pageName">Class</h1>
        </div>
        </>
     );
}
 
export default Class;
