import { Icon } from "@iconify/react";
import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../../atoms/userAtom";
import NavbarAdmin from "../../../components/NavbarAdmin";
import imgPlaceholder from "../../../assets/image.png";
import Select from "react-select";
import { toast } from "react-toastify";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { firestoreDb } from "../../../../firebase";
import setFirestoreStorage from "../../../helpers/setFirestoreStorage";

const NewRooms = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const user = useRecoilValue(userState);
    const navigate = useNavigate();
    const imgRef = useRef("");
    const [selectedImage, setSelectedImage] = useState();
    const [loading, setLoading] = useState(false);

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

    const [selectedLocation, setSelectedLocation] = useState(locationValue[0]);

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const submitHandler = async(data) => {
        setLoading(true);
        const id = toast.loading("Add rooms...");
        try {
            const docRef = await addDoc(collection(firestoreDb, "rooms"), {
                desc: data.desc,
                imgThumb: "https://firebasestorage.googleapis.com/v0/b/schedus-storage.appspot.com/o/backup%2Frooms.jpg?alt=media&token=9dc3dee4-1c51-451d-9ab3-07a9c54aeed2",
                located_at: selectedLocation.value,
                room: data.room
            })
            const image = await setFirestoreStorage(selectedImage, docRef.id, "roomspicture");
            await updateDoc(doc(firestoreDb, "rooms", docRef.id), {
                rid: docRef.id,
                imgUrl: image
            })
            toast.update(id ,{render: "Add rooms success!", type: "success", isLoading: false, autoClose: 200})
            navigate("/app/room")
        } catch (err) {
            toast.update(id, {render: "Error!", type: "error", isLoading: false, autoClose: 200})
            console.error(err);
        }finally{
            setLoading(false)
        }
    }

    return (
        <>
            <Helmet>
                <title>Create Rooms | Schedus</title>
            </Helmet>

            <NavbarAdmin user={user} />

            <div className="layoutContainer min-h-screen">
                <Link
                    to="/app/room"
                    className="py-1 px-3 text-sm my-3 bg-white border-[1px] border-gray-300 hover:bg-gray-50 rounded font-medium flex items-center w-fit gap-1"
                >
                    <Icon icon="akar-icons:chevron-left" className="inline" />
                    Back
                </Link>

                <div className="contentContainer">
                    <h1 className="pageName mb-6">New Rooms</h1>

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(submitHandler)}>
                        <div>
                            <label htmlFor="room" className="font-medium">
                                Room<span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                id="room"
                                className="addInput"
                                placeholder="Room name"
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
                                value={selectedLocation}
                                onChange={setSelectedLocation}
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
                                            src={imgPlaceholder}
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
                                required
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
                                Create Rooms
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    );
}

export default NewRooms;