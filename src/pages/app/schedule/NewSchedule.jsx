import { Icon } from "@iconify/react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { userState } from "../../../atoms/userAtom";
import NavbarAdmin from "../../../components/NavbarAdmin";

const NewSchedule = () => {
    const user = useRecoilValue(userState);
    
    return ( 
        <>
            <Helmet>
                <title>Create Schedule | Schedus</title>
            </Helmet>

            <NavbarAdmin user={user}/>

            <div className="layoutContainer min-h-screen">
                <Link 
                    to="/app/schedule" 
                    className="py-1 px-3 text-sm my-3 bg-white border-[1px] border-gray-300 hover:bg-gray-50 rounded font-medium flex items-center w-fit gap-1"
                >
                 <Icon icon="akar-icons:chevron-left" className="inline"/>   
                </Link>

                <div className="contentContainer">
                    <h1 className="pageName mb-6">New Schedule</h1>
                </div>

            </div>
        </>
     );
}
 
export default NewSchedule;