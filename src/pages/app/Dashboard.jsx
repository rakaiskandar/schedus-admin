import { Helmet } from "react-helmet-async";
import NavbarAdmin from "../../components/NavbarAdmin";
import icon1 from '../../assets/user.png';
import icon2 from '../../assets/class.png';
import icon3 from '../../assets/rooms.png';
import icon4 from '../../assets/building.png';

const Dashboard = () => {

    return ( 
        <>
            <Helmet>
                <title>Home | Schedus</title>
            </Helmet>
            
            <NavbarAdmin/>
            
            <div className="layoutContainer">
                <h1 className="pageName">Home</h1>
                
                <div className="flex flex-col md:grid md:grid-cols-4 gap-3">
                    <div className="bg-white my-3 rounded-md p-6 shadow">
                        <div className="flex flex-row justify-start gap-4">
                            <img src={icon1} alt="icon 1" className="h-14"/>
                            <div className="flex flex-col">
                                <p className="text-md text-gray-400 font-medium">Total User:</p>
                                <h3 className="text-4xl font-semibold pt-1">100</h3>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white my-3 rounded-md p-6 shadow">
                        <div className="flex flex-row justify-start gap-4">
                            <img src={icon2} alt="icon 1" className="h-14"/>
                            <div className="flex flex-col">
                                <p className="text-md text-gray-400 font-medium">Total Class:</p>
                                <h3 className="text-4xl font-semibold pt-1">100</h3>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white my-3 rounded-md p-6 shadow">
                        <div className="flex flex-row justify-start gap-4">
                            <img src={icon3} alt="icon 1" className="h-14"/>
                            <div className="flex flex-col">
                                <p className="text-md text-gray-400 font-medium">Total Rooms:</p>
                                <h3 className="text-4xl font-semibold pt-1">100</h3>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white my-3 rounded-md p-6 shadow">
                        <div className="flex flex-row justify-start gap-4">
                            <img src={icon4} alt="icon 1" className="h-14"/>
                            <div className="flex flex-col">
                                <p className="text-md text-gray-400 font-medium">Total Building:</p>
                                <h3 className="text-4xl font-semibold pt-1">100</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Dashboard;