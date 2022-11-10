import { Icon } from "@iconify/react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import NavbarAdmin from "../../../components/NavbarAdmin";

const NewClass = () => {
    return ( 
        <>
            <Helmet>
                <title>Create Class | Schedus</title>
            </Helmet>

            <NavbarAdmin/>

            <div className="layoutContainer min-h-screen">
                <Link 
                    to="/app/class" 
                    className="py-1 px-3 text-sm my-3 bg-white border-[1px] border-gray-300 hover:bg-gray-50 rounded font-medium flex items-center w-fit gap-1"
                >
                 <Icon icon="akar-icons:chevron-left" className="inline"/>   
                </Link>
            </div>
        </>
     );
}
 
export default NewClass;