import { Helmet } from "react-helmet-async";
import NavbarAdmin from "../../components/NavbarAdmin";


const Dashboard = () => {

    return ( 
        <>
            <Helmet>
                <title>Home | Schedus</title>
            </Helmet>
            
            <NavbarAdmin/>
            
            <div className="layoutContainer">
                <h1 className="pageName">Home</h1>
            </div>
        </>
     );
}
 
export default Dashboard;