import { Icon } from "@iconify/react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../../atoms/userAtom";
import NavbarAdmin from "../../../components/NavbarAdmin";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { firestoreDb } from "../../../../firebase";

const NewSchedule = () => {
    const {
        register,
        handleSubmit,
        formState : { errors }
    } = useForm();
    const user = useRecoilValue(userState);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const submitHandler = async(data) => {
        setLoading(true)
        const id = toast.loading("Add schedule...")
        try{
            await addDoc(collection(firestoreDb, "yourschedule"), {
                block: data.block,
                day: data.day,
                grade: data.grade,
                subjectHour1til2: data.hour1til2,
                subjectHour3til4: data.hour3til4,
                subjectHour5til6: data.hour5til6,
                subjectHour7til8: data.hour7til8,
                subjectHour9til10: data.hour9til10,
            })
            toast.update(id, {render: "Add schedule success!", type: "success", isLoading: false, autoClose: 200})
            navigate("/app/schedule")
        }catch(err){
            toast.update(id, {render: "Error!", type: "error", isLoading: false, autoClose: 200})
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

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
                    
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(submitHandler)}>
                        <div>
                            <label htmlFor="block" className="font-medium">
                                Block<span className="text-red-600">*</span>
                            </label>
                            <input 
                            type="text"
                            id="block" 
                            className="addInput"
                            placeholder="Block schedule"
                            {...register("block", {required: true})}/>
                            {errors.block && (
                                <span className="text-[13px] ml-1 text-red-500">
                                    block required fill
                                </span>
                            )}
                        </div>
                        
                        <div>
                            <label htmlFor="day" className="font-medium">
                                Day<span className="text-red-600">*</span>
                            </label>
                            <input 
                            type="text"
                            id="day" 
                            className="addInput"
                            placeholder="Day schedule"
                            {...register("day", {required: true})}/>
                            {errors.day && (
                                <span className="text-[13px] ml-1 text-red-500">
                                    day required fill
                                </span>
                            )}
                        </div>

                        <div>
                            <label htmlFor="grade" className="font-medium">
                                Grade<span className="text-red-600">*</span>
                            </label>
                            <input 
                            type="text"
                            id="grade" 
                            className="addInput"
                            placeholder="Grade name"
                            {...register("grade", {required: true})}/>
                            {errors.grade && (
                                <span className="text-[13px] ml-1 text-red-500">
                                    grade required fill
                                </span>
                            )}
                        </div>

                        <div>
                            <label htmlFor="subjectHour1til2" className="font-medium">
                                Subject Hour 1 until 2<span className="text-red-600">*</span>
                            </label>
                            <input 
                            type="text"
                            id="subjectHour1til2" 
                            className="addInput"
                            placeholder="Subject name in Hour 1 until 2"
                            {...register("hour1til2", {required: true})}/>
                            {errors.hour1til2 && (
                                <span className="text-[13px] ml-1 text-red-500">
                                    subject required fill
                                </span>
                            )}
                        </div>

                        <div>
                            <label htmlFor="subjectHour3til4" className="font-medium">
                                Subject Hour 3 until 4<span className="text-red-600">*</span>
                            </label>
                            <input 
                            type="text"
                            id="subjectHour3til4" 
                            className="addInput"
                            placeholder="Subject name in Hour 3 until 4"
                            {...register("hour3til4", {required: true})}/>
                            {errors.hour3til4 && (
                                <span className="text-[13px] ml-1 text-red-500">
                                    subject required fill
                                </span>
                            )}
                        </div>

                        <div>
                            <label htmlFor="subjectHour5til5" className="font-medium">
                                Subject Hour 5 until 6<span className="text-red-600">*</span>
                            </label>
                            <input 
                            type="text"
                            id="subjectHour5til6" 
                            className="addInput"
                            placeholder="Subject name in Hour 5 until 6"
                            {...register("hour5til6", {required: true})}/>
                            {errors.hour5til6 && (
                                <span className="text-[13px] ml-1 text-red-500">
                                    subject required fill
                                </span>
                            )}
                        </div>

                        <div>
                            <label htmlFor="subjectHour7til8" className="font-medium">
                                Subject Hour 7 until 8<span className="text-red-600">*</span>
                            </label>
                            <input 
                            type="text"
                            id="subjectHour7til8" 
                            className="addInput"
                            placeholder="Subject name in Hour 7 until 8"
                            {...register("hour7til8", {required: true})}/>
                            {errors.hour7til8 && (
                                <span className="text-[13px] ml-1 text-red-500">
                                    subject required fill
                                </span>
                            )}
                        </div>

                        <div>
                            <label htmlFor="subjectHour9til10" className="font-medium">
                                Subject Hour 9 until 10<span className="text-red-600">*</span>
                            </label>
                            <input 
                            type="text"
                            id="subjectHour9til10" 
                            className="addInput"
                            placeholder="Subject name in Hour 9 until 10"
                            {...register("hour9til10", {required: true})}/>
                            {errors.hour9til10 && (
                                <span className="text-[13px] ml-1 text-red-500">
                                    subject required fill
                                </span>
                            )}
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