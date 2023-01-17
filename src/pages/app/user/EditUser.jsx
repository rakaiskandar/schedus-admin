import { Icon } from "@iconify/react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { firestoreDb } from "../../../../firebase";
import { userState } from "../../../atoms/userAtom";
import NavbarAdmin from "../../../components/NavbarAdmin";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const EditUser = () => {
    let { id } = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const user = useRecoilValue(userState);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [userD, setUserD] = useState(null);
    const [firstLoading, setFirstLoading] = useState(true);

    const getUser = async () => {
        const docRef = doc(firestoreDb, 'users', id);
        const docSnap = await getDoc(docRef);

        return { ...docSnap.data(), id: docSnap.id }
    }

    useEffect(() => {
        setFirstLoading(true);
        try {
            getUser().then((data) => {
                setUserD(data);
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
        const id = toast.loading("Edit user...")
        try{
            await updateDoc(doc(firestoreDb, "users", userD.id), {
                email: data.email,
                name: data.name,
                nis: data.nis,
                grade: data.grade,
                role: data.role,
            })
            toast.update(id, { render: "Edit user success", type: "success", isLoading: false, autoClose: 200 })
        }catch(err){
            toast.update(id, { render: "Error!", type: "error", isLoading: false, autoClose: 200 })
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    return (
        <>
            <Helmet>
                Edit User | Schedus
            </Helmet>

            <NavbarAdmin user={user} />

            <div className="layoutContainer min-h-screen">
                <Link
                    to="/app/user"
                    className="py-1 px-3 text-sm my-3 bg-white border-[1px] border-gray-300 hover:bg-gray-50 rounded font-medium flex items-center w-fit gap-1">
                    <Icon icon="akar-icons:chevron-left" className="inline" />
                    Back
                </Link>

                <div className="contentContainer">
                    {!firstLoading && userD ? (
                        <>
                            <h1 className="pageName mb-6">Edit User</h1>

                            <form className="flex flex-col gap-4" onSubmit={handleSubmit(submitHandler)}>
                                <div>
                                    <label htmlFor="email" className="font-medium">
                                        Email<span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="email"
                                        className="addInput"
                                        placeholder="Email" 
                                        defaultValue={userD?.email}
                                        {...register("email", { required: true })}/>
                                        {errors.email && (
                                            <span className="text-[13px] ml-1 text-red-500">
                                                email required fill
                                            </span>
                                        )}
                                </div>

                                <div>
                                    <label htmlFor="name" className="font-medium">
                                        Name<span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="addInput"
                                        placeholder="Name" 
                                        defaultValue={userD?.name}
                                        {...register("name", { required: true })}/>
                                        {errors.name && (
                                            <span className="text-[13px] ml-1 text-red-500">
                                                name required fill
                                            </span>
                                        )}
                                </div>

                                <div>
                                    <label htmlFor="nis" className="font-medium">
                                        NIS<span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="nis"
                                        className="addInput"
                                        placeholder="NIS" 
                                        defaultValue={userD?.nis}
                                        {...register("nis", { required: true })}/>
                                        {errors.nis && (
                                            <span className="text-[13px] ml-1 text-red-500">
                                                nis required fill
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
                                        defaultValue={userD?.grade}
                                        {...register("grade", { required: true })}/>
                                        {errors.grade && (
                                            <span className="text-[13px] ml-1 text-red-500">
                                                grade required fill
                                            </span>
                                        )}
                                </div>

                                <div>
                                    <label htmlFor="role" className="font-medium">
                                        Role<span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="role"
                                        className="addInput"
                                        placeholder="Role" 
                                        defaultValue={userD?.role}
                                        {...register("role", { required: true })}/>
                                        {errors.role && (
                                            <span className="text-[13px] ml-1 text-red-500">
                                                role required fill
                                            </span>
                                        )}
                                </div>

                                <div className="my-1 justify-end flex gap-3 md:">
                                    <button
                                        onClick={() => navigate('/app/user')}
                                        className={`cancelBtn`}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className={`createBtn`}
                                    >
                                        Edit User
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

export default EditUser;