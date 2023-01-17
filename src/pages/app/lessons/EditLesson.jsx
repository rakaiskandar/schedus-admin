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

const EditLesson = () => {
    let { id } = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const user = useRecoilValue(userState);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [lesson, setLesson] = useState(null);
    const [firstLoading, setFirstLoading] = useState(true);

    const getLesson = async (data) => {
        const docRef = doc(firestoreDb, "schedule", id);
        const docSnap = await getDoc(docRef);

        return { ...docSnap.data(), id: docSnap.id };
    }

    useEffect(() => {
        setFirstLoading(true);
        try {
            getLesson().then((data) => {
                setLesson(data);
                setFirstLoading(false);
            })
        } catch (err) {
            console.error(err);
        } finally {
            setFirstLoading(false);
        }
    }, [])

    const submitHandler = async(data) => {
        setLoading(true)
        const id = toast.loading("Edit lesson...")
        try{
            await updateDoc(doc(firestoreDb, "schedule", lesson.id), {
                grade: data.grade,
                subject: data.subject,
                teacherName: data.teacherName,
            })
            toast.update(id, { render: "Edit lesson success", type: "success", isLoading: false, autoClose: 200 })
        }catch(err){
            toast.update(id, { render: "Error!", type: "error", isLoading: false, autoClose: 200 })
            console.error(err);
        }finally{
            setLoading(false)
        }
    }
    return (
        <>
            <Helmet>
                <title>Edit Lesson | Schedus</title>
            </Helmet>

            <NavbarAdmin user={user} />

            <div className="layoutContainer min-h-screen">
                <Link
                    to="/app/lesson"
                    className="py-1 px-3 text-sm my-3 bg-white border-[1px] border-gray-300 hover:bg-gray-50 rounded font-medium flex items-center w-fit gap-1">
                    <Icon icon="akar-icons:chevron-left" className="inline" />
                    Back
                </Link>

                <div className="contentContainer">
                    {!firstLoading && lesson ? (
                        <>
                            <h1 className="pageName mb-6">Edit Lesson</h1>

                            <form className="flex flex-col gap-4" onSubmit={handleSubmit(submitHandler)}>
                                <div>
                                    <label htmlFor="grade" className="font-medium">
                                        Grade<span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="grade"
                                        className="addInput"
                                        placeholder="Grade name"
                                        defaultValue={lesson?.grade}
                                        {...register("grade", { required: true })} />
                                    {errors.grade && (
                                        <span className="text-[13px] ml-1 text-red-500">
                                            grade required fill
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="subject" className="font-medium">
                                        Subject<span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        className="addInput"
                                        placeholder="Subject name"
                                        defaultValue={lesson?.subject}
                                        {...register("subject", { required: true })} />
                                    {errors.subject && (
                                        <span className="text-[13px] ml-1 text-red-500">
                                            subject required fill
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="teacherName" className="font-medium">
                                        Teacher Name<span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="teacherName"
                                        className="addInput"
                                        placeholder="Teacher name"
                                        defaultValue={lesson?.teacherName}
                                        {...register("teacherName", { required: true })} />
                                    {errors.teacherName && (
                                        <span className="text-[13px] ml-1 text-red-500">
                                            teacher name required fill
                                        </span>
                                    )}
                                </div>

                                <div className="my-1 justify-end flex gap-3 md:">
                                    <button
                                        onClick={() => navigate('/app/lesson')}
                                        className={`cancelBtn`}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className={`createBtn`}
                                    >
                                        Edit Lesson
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

export default EditLesson;