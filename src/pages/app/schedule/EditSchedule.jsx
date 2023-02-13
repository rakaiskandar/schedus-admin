import { Icon } from "@iconify/react";
import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc } from "firebase/firestore";
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
import { Menu } from "@headlessui/react";
import Select from "react-select";

const EditSchedule = () => {
    let { id } = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const user = useRecoilValue(userState);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [schedule, setSchedule] = useState(null);
    const [firstLoading, setFirstLoading] = useState(true);

    const blockValue = [
        { value: "A", label: "Block A" },
        { value: "B", label: "Block B" }
    ];

    const dayValue = [
        { value: "Monday", label: "Monday" },
        { value: "Tuesday", label: "Tuesday" },
        { value: "Wednesday", label: "Wednesday" },
        { value: "Thursday", label: "Thursday" },
        { value: "Friday", label: "Friday" }
    ];

    const [selectedBlock, setSelectedBlock] = useState(blockValue[0]);
    const [selectedDay, setSelectedDay] = useState(dayValue[0]);
    const [selectedClass, setSelectedClass] = useState([]);
    const [selectedClassOptions, setSelectedClassOptions] = useState([]);

    const getSchedule = async () => {
        //For Schedule
        const docRef = doc(firestoreDb, 'yourschedule', id);
        const docSnap = await getDoc(docRef);
        let obj1 = blockValue.find(o => o.value === docSnap.data().block);
        let obj2 = dayValue.find(o => o.value === docSnap.data().day);
        setSelectedBlock(obj1);
        setSelectedDay(obj2);

        //For Class
        const docClass = query(collection(firestoreDb, 'classgrade'));
        const docClassRef = await getDocs(docClass);
        const data = docClassRef.docs
        const mapped = data.map(d => {
            return d.data().classname.map(c => {
                return { value: c, label: c }
            })
        }).reduce((a, e) => [...a, ...e], [])

        let obj3 = mapped.find(o => o.value === docSnap.data().grade); 
        setSelectedClassOptions(mapped);
        setSelectedClass(obj3);
        
        return { ...docSnap.data(), id: docSnap.id };
    }

    useEffect(() => {
        setFirstLoading(true);
        try {
            getSchedule().then((data) => {
                setSchedule(data);
                setFirstLoading(false);
            });
        } catch (err) {
            console.error(err);
        } finally {
            setFirstLoading(false);
        }
    }, [])

    const submitHandler = async (data) => {
        setLoading(true)
        const id = toast.loading("Edit schedule...")
        try {
            await updateDoc(doc(firestoreDb, 'yourschedule', schedule.id), {
                block: selectedBlock.value,
                day: selectedDay.value,
                grade: selectedClass.value,
                subjectHour1til2: data.hour1til2,
                subjectHour3til4: data.hour3til4,
                subjectHour5til6: data.hour5til6,
                subjectHour7til8: data.hour7til8,
                subjectHour9til10: data.hour9til10,
            })
            toast.update(id, { render: "Edit schedule success", type: "success", isLoading: false, autoClose: 200 })
        } catch (err) {
            toast.update(id, { render: "Error!", type: "error", isLoading: false, autoClose: 200 })
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const deleteData = async () => {
        const id = toast.loading("Delete schedule...")
        try {
            await deleteDoc(doc(firestoreDb, "yourschedule", schedule.id))
            toast.update(id, { render: "Delete schedule success", type: "success", isLoading: false, autoClose: 200 })
            navigate('/app/schedule')
        } catch (err) {
            toast.update(id, { render: "Error!", type: "error", isLoading: false, autoClose: 200 })
            console.error(err)
        }
    }

    return (
        <>
            <Helmet>
                <title>Edit Schedule | Schedus</title>
            </Helmet>

            <NavbarAdmin user={user} />

            <div className="layoutContainer min-h-screen">
                <Link
                    to="/app/schedule"
                    className="py-1 px-3 text-sm my-3 bg-white border-[1px] border-gray-300 hover:bg-gray-50 rounded font-medium flex items-center w-fit gap-1">
                    <Icon icon="akar-icons:chevron-left" className="inline" />
                    Back
                </Link>

                <div className="contentContainer">
                    {!firstLoading && schedule ? (
                        <>
                            <div className="flex flex-row justify-between">
                                <h1 className="pageName mb-6">Edit Schedule</h1>

                                <Menu className="relative" as="div">
                                    <Menu.Button className="flex hover:scale-105 transition-all ease-out duration-100 p-[2px] items-center gap-2 cursor-pointer w-full">
                                        <Icon icon="material-symbols:more-vert" width="30" height="30" />
                                    </Menu.Button>
                                    <Menu.Items className="absolute right-0 flex flex-col py-2 rounded bg-white gap-[2px] mt-1 w-48 shadowProfile text-sm font-medium z-10">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    className={` px-3 py-[6px] flex gap-2  ${active && "bg-gray-100 text-red-500"
                                                        }`}
                                                    onClick={deleteData}
                                                >
                                                    <Icon icon="mdi:trash-can-outline" width="18" />
                                                    <p className="font-medium">Delete Schedule</p>
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Menu>
                            </div>

                            <form className="flex flex-col gap-4" onSubmit={handleSubmit(submitHandler)}>
                                <div>
                                    <label htmlFor="block" className="font-medium">
                                        Block<span className="text-red-600">*</span>
                                    </label>
                                    <Select
                                        options={blockValue}
                                        placeholder="Select block schedule"
                                        className="text-sm"
                                        defaultValue={selectedBlock}
                                        value={selectedBlock}
                                        onChange={setSelectedBlock}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="day" className="font-medium">
                                        Day<span className="text-red-600">*</span>
                                    </label>
                                    <Select
                                        options={dayValue}
                                        placeholder="Select block schedule"
                                        className="text-sm"
                                        defaultValue={selectedDay}
                                        value={selectedDay}
                                        onChange={setSelectedDay}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="grade" className="font-medium">
                                        Grade<span className="text-red-600">*</span>
                                    </label>
                                    <Select
                                        options={selectedClassOptions}
                                        placeholder="Select day schedule"
                                        className="text-sm"
                                        value={selectedClass}
                                        defaultValue={selectedClass}
                                        onChange={setSelectedClass}
                                        required
                                    />
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
                                        defaultValue={schedule?.subjectHour1til2}
                                        {...register("hour1til2", { required: true })} />
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
                                        defaultValue={schedule?.subjectHour3til4}
                                        {...register("hour3til4", { required: true })} />
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
                                        defaultValue={schedule?.subjectHour5til6}
                                        {...register("hour5til6", { required: true })} />
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
                                        defaultValue={schedule?.subjectHour7til8}
                                        {...register("hour7til8", { required: true })} />
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
                                        defaultValue={schedule?.subjectHour9til10}
                                        {...register("hour9til10", { required: true })} />
                                    {errors.hour9til10 && (
                                        <span className="text-[13px] ml-1 text-red-500">
                                            subject required fill
                                        </span>
                                    )}
                                </div>

                                <div className="my-1 justify-end flex gap-3 md:">
                                    <button
                                        disabled={loading}
                                        onClick={() => navigate('/app/schedule')}
                                        className={`cancelBtn ${loading && "opacity-75 hover:bg-white"}`}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        disabled={loading}
                                        type="submit"
                                        className={`createBtn ${loading && "opacity-75 hover:bg-blue-600"}`}
                                    >
                                        Edit Schedule
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

export default EditSchedule;