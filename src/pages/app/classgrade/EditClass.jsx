import { Icon } from "@iconify/react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../../atoms/userAtom";
import NavbarAdmin from "../../../components/NavbarAdmin";

const EditClass = () => {
    let { id } = useParams();

    const user = useRecoilValue(userState);
    const navigate = useNavigate();

    return ( 
        <>
            <Helmet>
                Edit Class | Schedus
            </Helmet>

            <NavbarAdmin user={user}/>

            <div className="layoutContainer min-h-screen">
                <Link 
                to="/app/class"
                className="py-1 px-3 text-sm my-3 bg-white border-[1px] border-gray-300 hover:bg-gray-50 rounded font-medium flex items-center w-fit gap-1">
                    <Icon icon="akar-icons:chevron-left" className="inline"/>
                    Back
                </Link>
            </div>
        </>
     );
}
 
export default EditClass;