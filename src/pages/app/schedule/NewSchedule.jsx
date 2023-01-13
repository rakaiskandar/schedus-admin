import { Icon } from "@iconify/react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../../atoms/userAtom";
import NavbarAdmin from "../../../components/NavbarAdmin";

const NewSchedule = () => {
    const user = useRecoilValue(userState);
    const navigate = useNavigate();

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
                 Back  
                </Link>

                <div className="contentContainer">
                    <h1 className="pageName mb-6">New Schedule</h1>
                    
                    <form className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="block" className="font-medium">
                                Block<span className="text-red-600">*</span>
                            </label>
                            <input 
                            type="text"
                            id="block" 
                            className="addInput"
                            placeholder="Block schedule"/>
                        </div>
                        
                        <div>
                            <label htmlFor="day" className="font-medium">
                                Day<span className="text-red-600">*</span>
                            </label>
                            <input 
                            type="text"
                            id="day" 
                            className="addInput"
                            placeholder="Day schedule"/>
                        </div>

                        <div>
                            <label htmlFor="grade" className="font-medium">
                                Grade<span className="text-red-600">*</span>
                            </label>
                            <input 
                            type="text"
                            id="grade" 
                            className="addInput"
                            placeholder="Grade name"/>
                        </div>

                        <div>
                            <label htmlFor="subjectHour1til2" className="font-medium">
                                Subject Hour 1 until 2<span className="text-red-600">*</span>
                            </label>
                            <input 
                            type="text"
                            id="subjectHour1til2" 
                            className="addInput"
                            placeholder="Subject name in Hour 1 until 2"/>
                        </div>

                        <div>
                            <label htmlFor="subjectHour3til4" className="font-medium">
                                Subject Hour 3 until 4<span className="text-red-600">*</span>
                            </label>
                            <input 
                            type="text"
                            id="subjectHour3til4" 
                            className="addInput"
                            placeholder="Subject name in Hour 3 until 4"/>
                        </div>

                        <div>
                            <label htmlFor="subjectHour5til5" className="font-medium">
                                Subject Hour 5 until 6<span className="text-red-600">*</span>
                            </label>
                            <input 
                            type="text"
                            id="subjectHour5til6" 
                            className="addInput"
                            placeholder="Subject name in Hour 5 until 6"/>
                        </div>

                        <div>
                            <label htmlFor="subjectHour7til8" className="font-medium">
                                Subject Hour 7 until 8<span className="text-red-600">*</span>
                            </label>
                            <input 
                            type="text"
                            id="subjectHour7til8" 
                            className="addInput"
                            placeholder="Subject name in Hour 7 until 8"/>
                        </div>

                        <div>
                            <label htmlFor="subjectHour9til10" className="font-medium">
                                Subject Hour 9 until 10<span className="text-red-600">*</span>
                            </label>
                            <input 
                            type="text"
                            id="subjectHour9til10" 
                            className="addInput"
                            placeholder="Subject name in Hour 9 until 10"/>
                        </div>

                        <div className="my-1 justify-end flex gap-3 md:">
                            <button
                                onClick={()=>navigate('/app/schedule')}
                                className={`cancelBtn`}
                                >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className={`createBtn`}
                                >
                                Create Schedule
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </>
     );
}
 
export default NewSchedule;