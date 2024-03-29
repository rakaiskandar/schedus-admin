import { Menu } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { firestoreDb, storage } from "../../../../firebase";
import { userState } from "../../../atoms/userAtom";
import NavbarAdmin from "../../../components/NavbarAdmin";
import setFirestoreStorage from "../../../helpers/setFirestoreStorage";

const EditRooms = () => {
    let { id } = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const user = useRecoilValue(userState);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(null);
    const imgRef1 = useRef("");
    const imgRef2 = useRef("");
    const [selectedImage1, setSelectedImage1] = useState();
    const [selectedImage2, setSelectedImage2] = useState();
    const [rooms, setRooms] = useState(null);
    const [firstLoading, setFirstLoading] = useState(true);
    const [isChange, setIsChange] = useState(false);

    const locationValue = [
        { value: "1CL7qg9a2esnpyk3bo35", label: "Gedung A" },
        { value: "IfyA8KCxTBqcRZauNBi2", label: "Gedung B" },
        { value: "VlqWDbOccVYmsFXpKBQR", label: "Gedung C" },
        { value: "W8L6JBBgmMVgwYlXfAlb", label: "Gedung D" },
        { value: "nHdDReoulrOwjRWfIQ8d", label: "Gedung E" },
        { value: "vZ63vaVqCcEH2mV1xhq5", label: "Gedung F" },
        { value: "vjGqQsNX4sZflu88ty4J", label: "Gedung G" },
        { value: "vjGqQsNX4sZflu88ty4O", label: "Gedung H" },
        { value: "vjGqQsNX4sZflu88ty4P", label: "Struktur Lainnya"}
    ];

    const [gedung, setGedung] = useState(locationValue[0]);

    const getRooms = async () => {
        const docRef = doc(firestoreDb, "rooms", id);
        const docSnap = await getDoc(docRef);
        let obj = locationValue.find(o => o.value === docSnap.data().located_at);
        setGedung(obj);

        return { ...docSnap.data(), id: docSnap.id };
    };

    const changeHandler = () => {
        if (isChange === true) return;
        setIsChange(true);
    };

    useEffect(() => {
        setFirstLoading(true);
        try {
            getRooms().then((data) => {
                setRooms(data);
                setFirstLoading(false);
            })
        } catch (err) {
            console.error(err);
        } finally {
            setFirstLoading(false);
        }
    }, [])

    const imageChange1 = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage1(e.target.files[0]);
        }
    };

    const imageChange2 = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage2(e.target.files[0]);
        }
    };

    const submitHandler = async (data) => {
        setLoading(true);
        let newImgUrl = rooms.imgUrl
        let newImgThumb = rooms.imgThumb
        const id = toast.loading("Edit rooms...");
        try {
            if (selectedImage1) {
                const imgRef = ref(storage, `roomspicture/${rooms.id}`);
                await deleteObject(imgRef);
                const newUrl = await setFirestoreStorage(selectedImage1, rooms.id, "roomspicture");
                newImgUrl = newUrl
            }

            if(selectedImage2) {
                const imgRef = ref(storage, `buildingpicture/${rooms.id}`);
                await deleteObject(imgRef);
                const newUrl = await setFirestoreStorage(selectedImage2, rooms.id, "buildingpicture");
                newImgThumb = newUrl
            }
            
            await updateDoc(doc(firestoreDb, "rooms", rooms.id), {
                desc: data.desc,
                imgThumb: newImgThumb,
                located_at: gedung.value,
                room: data.room,
                imgUrl: newImgUrl,
            })

            toast.update(id, { render: "Edit rooms success!", type: "success", isLoading: false, autoClose: 200 });
        } catch (err) {
            toast.update(id, { render: "Error!", type: "error", isLoading: false, autoClose: 200 })
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteData = async () => {
        const id = toast.loading("Delete rooms...")
        try {
            await deleteDoc(doc(firestoreDb, "rooms", rooms.id))
            toast.update(id, { render: "Delete rooms success", type: "success", isLoading: false, autoClose: 200 })
            navigate('/app/room')
        } catch (err) {
            toast.update(id, { render: "Error!", type: "error", isLoading: false, autoClose: 200 })
            console.error(err)
        }
    }

    return (
        <>
            <Helmet>
                <title>Edit Rooms | Schedus</title>
            </Helmet>

            <NavbarAdmin user={user} />

            <div className="layoutContainer min-h-screen">
                <Link
                    to="/app/room"
                    className="py-1 px-3 text-sm my-3 bg-white border-[1px] border-gray-300 hover:bg-gray-50 rounded font-medium flex items-center w-fit gap-1">
                    <Icon icon="akar-icons:chevron-left" className="inline" />
                    Back
                </Link>

                <div className="contentContainer">
                    {!firstLoading && rooms ? (
                        <>
                            <div className="flex flex-row justify-between">
                                <h1 className="pageName mb-6">Edit Rooms</h1>

                                <Menu className="relative" as="div">
                                    <Menu.Button className="flex hover:scale-105 transition-all ease-out duration-100 p-[2px] items-center gap-2 cursor-pointer w-full">
                                       <Icon icon="material-symbols:more-vert" width="30" height="30"/>
                                    </Menu.Button>
                                    <Menu.Items className="absolute right-0 flex flex-col py-2 rounded bg-white gap-[2px] mt-1 w-40 shadowProfile text-sm font-medium z-10">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    className={` px-3 py-[6px] flex gap-2  ${active && "bg-gray-100 text-red-500"
                                                        }`}
                                                    onClick={deleteData}
                                                >
                                                    <Icon icon="mdi:trash-can-outline" width="18" />
                                                    <p className="font-medium">Delete Rooms</p>
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Menu>
                            </div>

                            <form className="flex flex-col gap-4" onSubmit={handleSubmit(submitHandler)} onChange={changeHandler}>
                                <div>
                                    <label htmlFor="room" className="font-medium">
                                        Room<span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="room"
                                        className="addInput"
                                        placeholder="Room name"
                                        defaultValue={rooms?.room}
                                        {...register("room", { required: true })} />
                                    {errors.room && (
                                        <span className="text-[13px] ml-1 text-red-500">
                                            room required fill
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="room" className="font-medium">
                                        Located Room<span className="text-red-600">*</span>
                                    </label>
                                    <Select
                                        options={locationValue}
                                        placeholder="Select location rooms"
                                        className="text-sm"
                                        defaultValue={gedung}
                                        value={gedung}
                                        onChange={setGedung}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="desc" className="font-medium">
                                        Description<span className="text-red-600">*</span>
                                    </label>
                                    <textarea
                                        id="desc"
                                        className="addInput"
                                        placeholder="Description room"
                                        cols="30"
                                        defaultValue={rooms?.desc}
                                        {...register("desc", { required: true })} />
                                    {errors.desc && (
                                        <span className="text-[13px] ml-1 text-red-500">
                                            desc required fill
                                        </span>
                                    )}
                                </div>
                                
                                <div>
                                    <label htmlFor="teacherName" className="font-medium">
                                        Image Thumb<span className="text-red-600">*</span>
                                    </label>
                                    <div
                                        className="border-gray-300 border-[1px] w-fit hover:border-blue-600 p-4 items-center my-2 rounded flex flex-col gap-4 cursor-pointer"
                                        onClick={() => imgRef2.current.click()}
                                    >
                                        {selectedImage2 ? (
                                            <img
                                                src={URL.createObjectURL(selectedImage2)}
                                                className="w-56 h-56 object-cover"
                                                alt="Thumb"
                                            />
                                        ) : (
                                            <>
                                                <img
                                                    src={rooms?.imgThumb}
                                                    alt="img placeholder"
                                                    className="w-32"
                                                />
                                                <h5 className="text-sm font-medium">Add Image</h5>
                                            </>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        name="gambar"
                                        accept="buildingpicture/*"
                                        className="opacity-0"
                                        ref={imgRef2}
                                        onChange={imageChange2}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="teacherName" className="font-medium">
                                        Room Image<span className="text-red-600">*</span>
                                    </label>
                                    <div
                                        className="border-gray-300 border-[1px] w-fit hover:border-blue-600 p-4 items-center my-2 rounded flex flex-col gap-4 cursor-pointer"
                                        onClick={() => imgRef1.current.click()}
                                    >
                                        {selectedImage1 ? (
                                            <img
                                                src={URL.createObjectURL(selectedImage1)}
                                                className="w-56 h-56 object-cover"
                                                alt="Thumb"
                                            />
                                        ) : (
                                            <>
                                                <img
                                                    src={rooms?.imgUrl}
                                                    alt="img placeholder"
                                                    className="w-32"
                                                />
                                                <h5 className="text-sm font-medium">Add Image</h5>
                                            </>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        name="gambar"
                                        accept="roomspicture/*"
                                        className="opacity-0"
                                        ref={imgRef1}
                                        onChange={imageChange1}
                                    />
                                </div>

                                <div className="my-1 justify-end flex gap-3 md:">
                                    <button
                                        disabled={loading}
                                        onClick={() => navigate('/app/room')}
                                        className={`cancelBtn ${loading && "opacity-75 hover:bg-white"}`}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        disabled={loading}
                                        type="submit"
                                        className={`createBtn ${loading && "opacity-75 hover:bg-blue-600"}`}
                                    >
                                        Edit Rooms
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

export default EditRooms;