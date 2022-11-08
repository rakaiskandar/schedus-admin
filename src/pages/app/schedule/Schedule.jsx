import { Helmet } from "react-helmet-async";
import NavbarAdmin from "../../../components/NavbarAdmin";

const Schedule = () => {
    return ( 
        <>
        <Helmet>
            <title>Schedule | Schedus</title>
        </Helmet>
        
        <NavbarAdmin/>
    
        <div className="layoutContainer">
           <h1 className="pageName">Schedule</h1>
        </div>
        </>
    );
}
 
export default Schedule;