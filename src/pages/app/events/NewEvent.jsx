import { Icon } from "@iconify/react";
import { addDoc, collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { firestoreDb } from "../../../../firebase";
import { userState } from "../../../atoms/userAtom";
import NavbarAdmin from "../../../components/NavbarAdmin";

const NewEvent = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const user = useRecoilValue(userState);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
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

    const [selectedLocation, setSelectedLocation] = useState(locationValue[0]);
    const [selectedRooms, setSelectedRooms] = useState();
    const [selectedRoomOptions, setSelectedRoomOptions] = useState();

    const getDataRooms = async () => {
        const q = query(collection(firestoreDb, "rooms"));
        const docSnap = await getDocs(q);
        const data = docSnap.docs;
        const mapped = data.map((d,i)=>{
            return{
                value: d.data().rid,
                label: d.data().room,
            }
        })
        setSelectedRoomOptions(mapped);
        setSelectedRooms(mapped[0]);
    }

    useEffect(() => {
        try{
            getDataRooms();
        }catch(err){
            console.error(err);
        }
    }, [])

    const submitHandler = async (data) => {
        setLoading(true);
        const id = toast.loading("Add event...");
        try {
            const docRef = await addDoc(collection(firestoreDb, "events"), {
                event: data.event,
                event_desc: data.event_desc,
                from: data.from,
                on_building: selectedLocation.value,
                on_rooms: selectedRooms.value,
                until: data.until,
            })
            await updateDoc(doc(firestoreDb, "events", docRef.id), {
                eid: docRef.id
            })
            toast.update(id ,{render: "Add events success!", type: "success", isLoading: false, autoClose: 200})
            navigate("/app/event")
        } catch (err) {
            toast.update(id ,{render: "Error!", type: "error", isLoading: false, autoClose: 200})
            console.error(err);
        } finally{
            setLoading(false);
        }
    }

    return ( 
        <>
            <Helmet>
                <title>Create Event - Schedus</title>
            </Helmet>

            <NavbarAdmin user={user}/>

            <div className="layoutContainer min-h-screen">
                <Link
                    to="/app/event"
                    className="py-1 px-3 text-sm my-3 bg-white border-[1px] border-gray-300 hover:bg-gray-50 rounded font-medium flex items-center w-fit gap-1"
                >
                    <Icon icon="akar-icons:chevron-left" className="inline" />
                    Back
                </Link>

                <div className="contentContainer">
                    <h1 className="pageName mb-6">New Events</h1>

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(submitHandler)}>
                        <div>
                            <label htmlFor="event" className="font-medium">
                                Event<span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                id="event"
                                className="addInput"
                                placeholder="Event name"
                                {...register("event", { required: true })} />
                            {errors.event && (
                                <span className="text-[13px] ml-1 text-red-500">
                                    event required fill
                                </span>
                            )}
                        </div>

                        <div>
                            <label htmlFor="event_desc" className="font-medium">
                                Event Description<span className="text-red-600">*</span>
                            </label>
                            <textarea
                                id="desc"
                                className="addInput"
                                placeholder="Event description"
                                cols="30"
                                {...register("event_desc", { required: true })} />
                            {errors.event_desc && (
                                <span className="text-[13px] ml-1 text-red-500">
                                    event desc required fill
                                </span>
                            )}
                        </div>
                        
                        <div>
                            <label htmlFor="building" className="font-medium">
                                Location Building<span className="text-red-600">*</span>
                            </label>
                            <Select
                                options={locationValue}
                                placeholder="Select building event"
                                className="text-sm"
                                value={selectedLocation}
                                onChange={setSelectedLocation}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="room" className="font-medium">
                                Location Rooms<span className="text-red-600">*</span>
                            </label>
                            <Select
                                options={selectedRoomOptions}
                                placeholder="Select building event"
                                className="text-sm"
                                value={selectedRooms}
                                onChange={setSelectedRooms}
                                required
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="from" className="font-medium">
                                From<span className="text-red-600">*</span>
                            </label>
                            <input
                                type="datetime-local"
                                id="from"
                                className="addInput"
                                placeholder="Event date from"
                                {...register("from", { required: true })} />
                            {errors.from && (
                                <span className="text-[13px] ml-1 text-red-500">
                                    event from date required fill
                                </span>
                            )}
                        </div>

                        <div>
                            <label htmlFor="until" className="font-medium">
                                Until<span className="text-red-600">*</span>
                            </label>
                            <input
                                type="datetime-local"
                                id="until"
                                className="addInput"
                                placeholder="Event date until"
                                {...register("until", { required: true })} />
                            {errors.until && (
                                <span className="text-[13px] ml-1 text-red-500">
                                    event until date required fill
                                </span>
                            )}
                        </div>

                        <div className="my-1 justify-end flex gap-3 md:">
                            <button
                                disabled={loading}
                                onClick={() => navigate('/app/event')}
                                className={`cancelBtn ${loading && "opacity-75 hover:bg-white"}`}
                            >
                                Cancel
                            </button>
                            <button
                                disabled={loading}
                                type="submit"
                                className={`createBtn ${loading && "opacity-75 hover:bg-blue-600"}`}
                            >
                                Create Events
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
     );
}
 
export default NewEvent;