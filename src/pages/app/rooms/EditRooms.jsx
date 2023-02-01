import { Icon } from "@iconify/react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
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
    const imgRef = useRef("");
    const [selectedImage, setSelectedImage] = useState();
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
    ];

    const [gedung, setGedung] = useState(locationValue[0]);

    const getRooms = async () => {
        const docRef = doc(firestoreDb, "rooms", id);
        const docSnap = await getDoc(docRef);
        let obj = locationValue.find(o => o.value === docSnap.data().located_at);
        setGedung(obj)

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

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const submitHandler = async (data) => {
        setLoading(true);
        let newImgUrl = rooms.imgUrl
        const id = toast.loading("Edit rooms...");
        try {
            if (selectedImage) {
                const imgRef = ref(storage, `roomspicture/${rooms.id}`);
                await deleteObject(imgRef);
                const newUrl = await setFirestoreStorage(selectedImage, rooms.id, "roomspicture");
                newImgUrl = newUrl
            }
            
            await updateDoc(doc(firestoreDb, "rooms", rooms.id), {
                desc: data.desc,
                imgThumb: "https://firebasestorage.googleapis.com/v0/b/schedus-storage.appspot.com/o/backup%2Frooms.jpg?alt=media&token=9dc3dee4-1c51-451d-9ab3-07a9c54aeed2",
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
                            <h1 className="pageName mb-6">Edit Rooms</h1>

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
                                    />
                                    {errors.located_at && (
                                        <span className="text-[13px] ml-1 text-red-500">
                                            location rooms required fill
                                        </span>
                                    )}
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
                                        Room Image<span className="text-red-600">*</span>
                                    </label>
                                    <div
                                        className="border-gray-300 border-[1px] w-fit hover:border-blue-600 p-4 items-center my-2 rounded flex flex-col gap-4 cursor-pointer"
                                        onClick={() => imgRef.current.click()}
                                    >
                                        {selectedImage ? (
                                            <img
                                                src={URL.createObjectURL(selectedImage)}
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
                                        ref={imgRef}
                                        onChange={imageChange}
                                    />
                                </div>

                                <div className="my-1 justify-end flex gap-3 md:">
                                    <button
                                        onClick={() => navigate('/app/room')}
                                        className={`cancelBtn`}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className={`createBtn`}
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