import { Icon } from "@iconify/react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { firestoreDb } from "../../../../firebase";
import { userState } from "../../../atoms/userAtom";
import NavbarAdmin from "../../../components/NavbarAdmin";

const EditClass = () => {
    let { id } = useParams();

    const {
        register, 
        handleSubmit,
        formState: { errors }
    } = useForm();
    const user = useRecoilValue(userState);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [classes, setClasses] = useState(null);
    const [firstLoading, setFirstLoading] = useState(true);

    const getClass = async () => {
        const docRef = doc(firestoreDb, 'classgrade', id);
        const docSnap = await getDoc(docRef);
        
        return { ...docSnap.data(), id: docSnap.id }
    }

    useEffect(() => {
        setFirstLoading(true);
        try {
            getClass().then((data) => {
                setClasses(data);
                setFirstLoading(false);
            });
        } catch (err) {
            console.error(err);
        } finally {
            setFirstLoading(false);
        }
    }, [])

    const submitHandler = async(data) => {
        setLoading(true)
        const id = toast.loading("Edit class...")
        try {
            await updateDoc(doc(firestoreDb, "classgrade", classes.id), {
                classname: data.classname,
                grade: data.grade
            })
            toast.update(id, { render: "Edit class success", type: "success", isLoading: false, autoClose: 200 })
        } catch (err) {
            toast.update(id, { render: "Error!", type: "error", isLoading: false, autoClose: 200 })
            console.error(err)
        }finally{
            setLoading(false)
        }
    }

    return (
        <>
            <Helmet>
                Edit Class | Schedus
            </Helmet>

            <NavbarAdmin user={user} />

            <div className="layoutContainer min-h-screen">
                <Link
                    to="/app/class"
                    className="py-1 px-3 text-sm my-3 bg-white border-[1px] border-gray-300 hover:bg-gray-50 rounded font-medium flex items-center w-fit gap-1">
                    <Icon icon="akar-icons:chevron-left" className="inline" />
                    Back
                </Link>

                <div className="contentContainer">
                    {!firstLoading && classes ? (
                        <>
                            <h1 className="pageName mb-6">Edit Class</h1>

                            <form className="flex flex-col gap-4" onSubmit={handleSubmit(submitHandler)}>
                                <div>
                                    <label htmlFor="grade" className="font-medium">
                                        Grade Name<span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="grade"
                                        className="addInput"
                                        placeholder="Grade name" 
                                        defaultValue={classes?.grade}
                                        {...register("grade", { required:true })}/>
                                        {errors.grade && (
                                            <span className="text-[13px] ml-1 text-red-500">
                                                grade required fill
                                            </span>
                                        )}
                                </div>

                                <div>
                                    <label htmlFor="classname" className="font-medium">
                                        Class Name<span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="classname"
                                        className="addInput"
                                        placeholder="Class name" 
                                        defaultValue={classes?.classname}
                                        {...register("classname", { required:true })}/>
                                        {errors.classname && (
                                            <span className="text-[13px] ml-1 text-red-500">
                                                grade required fill
                                            </span>
                                        )}
                                </div>

                                <div className="my-1 justify-end flex gap-3 md:">
                                    <button
                                        onClick={() => navigate('/app/class')}
                                        className={`cancelBtn`}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className={`createBtn`}
                                    >
                                        Edit Class
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            </div>
        </>
    );
}

export default EditClass;