import { Helmet } from "react-helmet-async";
import NavbarAdmin from "../../components/NavbarAdmin";
import icon1 from '../../assets/user.png';
import icon2 from '../../assets/class.png';
import icon3 from '../../assets/rooms.png';
import icon4 from '../../assets/building.png';
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/userAtom";
import { useEffect } from "react";

const Dashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = useRecoilValue(userState);

    const cardItem = [
        {
            image: icon1,
            title: "Total User:",
            total: 100
        },
        {
            image: icon2,
            title: "Total Class:",
            total: 100
        },
        {
            image: icon3,
            title: "Total Rooms:",
            total: 100
        },
        {
            image: icon4,
            title: "Total Building:",
            total: 100
        },
        
    ];

    return ( 
        <>
            <Helmet>
                <title>Home | Schedus</title>
            </Helmet>
            
            <NavbarAdmin user={user}/>
            
            <div className="layoutContainer">
                <h1 className="pageName">Home</h1>
                
                <div className="flex flex-col md:grid md:grid-cols-4 gap-3">
                    {cardItem.map((item, i) => (
                    <div key={i} className="bg-white my-3 rounded-md p-6 shadow">
                        <div className="flex flex-row justify-start gap-4">
                            <img src={item.image} alt="card image" className="h-14"/>
                            <div className="flex flex-col">
                                <p className="text-md text-gray-400 font-medium">{item.title}</p>
                                <h3 className="text-4xl font-semibold pt-1">{item.total}</h3>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </>
     );
}
 
export default Dashboard;