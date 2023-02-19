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

    const roleValue = [
        { value: "admin", label: "admin"},
        { value: "student", label: "student"},
    ];

    const [selectedRole, setSelectedRole] = useState(roleValue[0]);
    const [selectedClass, setSelectedClass] = useState([]);
    const [selectedClassOptions, setSelectedClassOptions] = useState([]);

    const getUser = async () => {
        //For User
        const docRef = doc(firestoreDb, 'users', id);
        const docSnap = await getDoc(docRef);
        let obj1 = roleValue.find(o => o.value === docSnap.data().role);
        setSelectedRole(obj1);

        //For Class
        const docClass = query(collection(firestoreDb, 'classgrade'));
        const docClassRef = await getDocs(docClass);
        const data = docClassRef.docs
        const mapped = data.map(d => {
            return d.data().classname.map(c => {
                return { value: c, label: c }
            })
        }).reduce((a, e) => [...a, ...e], [])

        let obj2 = mapped.find(o => o.value === docSnap.data().grade); 
        setSelectedClassOptions(mapped);
        setSelectedClass(obj2);

        return { ...docSnap.data(), id: docSnap.id }
    }

    useEffect(() => {
        setFirstLoading(true);
        try {
            getUser().then((data) => {
                setUserD(data);
                // console.log(data);
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
        const id = toast.loading("Edit user...")
        try {
            await updateDoc(doc(firestoreDb, "users", userD.id), {
                email: data.email,
                name: data.name,
                nis: data.nis,
                grade: selectedClass.value,
                role: selectedRole.value,
            })
            toast.update(id, { render: "Edit user success", type: "success", isLoading: false, autoClose: 200 })
        } catch (err) {
            toast.update(id, { render: "Error!", type: "error", isLoading: false, autoClose: 200 })
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const deleteData = async () => {
        const id = toast.loading("Delete user...")
        try {
            await deleteDoc(doc(firestoreDb, "users", userD.id))

            toast.update(id, { render: "Delete data success", type: "success" , isLoading: false, autoClose: 200})
            navigate('/app/user')
        } catch (err) {
            toast.update(id, { render: "Error!", type: "error" , isLoading: false, autoClose: 200})
            console.error(err)
        }
    } 

    return (
        <>
            <Helmet>
                <title>Edit User | Schedus</title>
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
                            <div className="flex flex-row justify-between">
                                <h1 className="pageName mb-6">Edit User</h1>

                                <Menu className="relative" as="div">
                                    <Menu.Button className="flex hover:scale-105 transition-all ease-out duration-100 p-[2px] items-center gap-2 cursor-pointer w-full">
                                       <Icon icon="material-symbols:more-vert" width="30" height="30"/>
                                    </Menu.Button>
                                    <Menu.Items className="absolute right-0 flex flex-col py-2 rounded bg-white gap-[2px] mt-1 w-36 shadowProfile text-sm font-medium z-10">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    className={` px-3 py-[6px] flex gap-2  ${active && "bg-gray-100 text-red-500"
                                                        }`}
                                                    onClick={deleteData}
                                                >
                                                    <Icon icon="mdi:trash-can-outline" width="18" />
                                                    <p className="font-medium">Delete User</p>
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Menu>
                            </div>

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
                                        {...register("email", { required: true })} />
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
                                        {...register("name", { required: true })} />
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
                                        {...register("nis", { required: true })} />
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
                                    <label htmlFor="role" className="font-medium">
                                        Role<span className="text-red-600">*</span>
                                    </label>
                                    <Select
                                        options={roleValue}
                                        placeholder="Select block schedule"
                                        className="text-sm"
                                        defaultValue={selectedRole}
                                        value={selectedRole}
                                        onChange={setSelectedRole}
                                        required
                                    />
                                </div>

                                <div className="my-1 justify-end flex gap-3 md:">
                                    <button
                                        disabled={loading}
                                        onClick={() => navigate('/app/user')}
                                        className={`cancelBtn ${loading && "opacity-75 hover:bg-white"}`}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        disabled={loading}
                                        type="submit"
                                        className={`createBtn ${loading && "opacity-75 hover:bg-blue-600"}`}
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