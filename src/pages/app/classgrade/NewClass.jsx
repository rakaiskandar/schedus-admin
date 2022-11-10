import { Icon } from "@iconify/react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import NavbarAdmin from "../../../components/NavbarAdmin";

const NewClass = () => {
    const navigate = useNavigate();

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

                <div className="contentContainer">
                    <h1 className="pageName mb-6">New Class</h1>
                    
                    <form className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="grade" className="font-medium">
                                Grade Name<span className="text-red-600">*</span>
                            </label>
                            <input 
                            type="text"
                            id="grade" 
                            className="addInput"
                            placeholder="Grade name"/>
                        </div>
                        
                        <div>
                            <label htmlFor="classname" className="font-medium">
                                Class Name<span className="text-red-600">*</span>
                            </label>
                            <input 
                            type="text"
                            id="classname" 
                            className="addInput"
                            placeholder="Class name"/>
                        </div>

                        <div className="my-1 justify-end flex gap-3 md:">
                            <button
                                onClick={()=>navigate('/app/class')}
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
 
export default NewClass;