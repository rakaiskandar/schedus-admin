import { Icon } from "@iconify/react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../../atoms/userAtom";
import NavbarAdmin from "../../../components/NavbarAdmin";

const NewUser = () => {
    const user = useRecoilValue(userState);
    const navigate = useNavigate();
    
    return ( 
        <>
            <Helmet>
                <title>Create User | Schedus</title>
            </Helmet>

            <NavbarAdmin user={user}/>

            <div className="layoutContainer min-h-screen">
                <Link 
                    to="/app/user" 
                    className="py-1 px-3 text-sm my-3 bg-white border-[1px] border-gray-300 hover:bg-gray-50 rounded font-medium flex items-center w-fit gap-1"
                >
                 <Icon icon="akar-icons:chevron-left" className="inline"/>   
                </Link>

                <div className="contentContainer">
                    <h1 className="pageName mb-6">New User</h1>

                    <form className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="email" className="font-medium">
                                Email<span className="text-red-600">*</span>
                            </label>
                            <input 
                            type="email"
                            id="email" 
                            className="addInput"
                            placeholder="Grade name"/>
                        </div>
                        
                        <div>
                            <label htmlFor="name" className="font-medium">
                                Name<span className="text-red-600">*</span>
                            </label>
                            <input 
                            type="text"
                            id="name" 
                            className="addInput"
                            placeholder="Class name"/>
                        </div>

                        <div>
                            <label htmlFor="grade" className="font-medium">
                                Grade<span className="text-red-600">*</span>
                            </label>
                            <input 
                            type="text"
                            id="grade" 
                            className="addInput"
                            placeholder="Class name"/>
                        </div>

                        <div>
                            <label htmlFor="role" className="font-medium">
                                Role<span className="text-red-600">*</span>
                            </label>
                            <input 
                            type="text"
                            id="role" 
                            className="addInput"
                            placeholder="Class name"/>
                        </div>

                        <div className="my-1 justify-end flex gap-3 md:">
                            <button
                                onClick={()=>navigate('/app/user')}
                                className={`cancelBtn`}
                                >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className={`createBtn`}
                                >
                                Create Class
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
     );
}
 
export default NewUser;