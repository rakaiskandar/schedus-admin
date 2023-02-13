import { Menu } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { firestoreDb } from "../../../../firebase";
import { userState } from "../../../atoms/userAtom";
import NavbarAdmin from "../../../components/NavbarAdmin";

const EditEvent = () => {
    let { id } = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const user = useRecoilValue(userState);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(null);
    const [event, setEvent] = useState(null);
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

    const [selectedLocation, setSelectedLocation] = useState(locationValue[0]);
    const [selectedRooms, setSelectedRooms] = useState();
    const [selectedRoomOptions, setSelectedRoomOptions] = useState();

    const getEvents = async () => {
        //For events
        const docRef = doc(firestoreDb, "events", id);
        const docSnap = await getDoc(docRef);
        let obj1 = locationValue.find(o => o.value === docSnap.data().on_building);
        setSelectedLocation(obj1)

        //For rooms
        const docRooms = query(collection(firestoreDb, "rooms"));
        const docRoomsRef = await getDocs(docRooms);
        const data = docRoomsRef.docs;
        const mapped = data.map((d, i) => {
            return {
                value: d.data().rid,
                label: d.data().room
            }
        });

        let obj2 = mapped.find(o => o.value === docSnap.data().on_rooms);
        let options = mapped.map((d, i) => {
            return {
                value: d.value,
                label: d.label
            }
        })
        setSelectedRoomOptions(options);
        setSelectedRooms(obj2);
        
        return { ...docSnap.data(), id: docSnap.id };
    }

    const changeHandler = () => {
        if (isChange === true) return;
        setIsChange(true);
    }

    useEffect(() => {
        setFirstLoading(true);
        try {
            getEvents().then((data) => {
                setEvent(data);
                setFirstLoading(false);
            })
        } catch (err) {
            console.error(err);
        } finally {
            setFirstLoading(false);
        }
    }, [])

    const submitHandler = async (data) => {
        setLoading(true)
        const id = toast.loading("Edit events...")
        try {
            await updateDoc(doc(firestoreDb, "events", event.id), {
                event: data.event,
                event_desc: data.event_desc,
                from: data.from,
                on_building: selectedLocation.value,
                on_rooms: selectedRooms.value,
                until: data.until,
            });

            toast.update(id, { render: "Edit events success!", type: "success", isLoading: false, autoClose: 200 });
        } catch (err) {
            toast.update(id, { render: "Error!", type: "error", isLoading: false, autoClose: 200 });
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const deleteData = async () => {
        const id = toast.loading("Delete events...")
        try {
            await deleteDoc(doc(firestoreDb, "events", event.id))
            toast.update(id, { render: "Delete event success", type: "success", isLoading: false, autoClose: 200 })
            navigate('/app/event')
        } catch (err) {
            toast.update(id, { render: "Error!", type: "error", isLoading: false, autoClose: 200 })
            console.error(err)
        }
    }

    return (
        <>
            <Helmet>
                <title>Edit Event | Schedus</title>
            </Helmet>

            <NavbarAdmin user={user} />

            <div className="layoutContainer min-h-screen">
                <Link
                    to="/app/event"
                    className="py-1 px-3 text-sm my-3 bg-white border-[1px] border-gray-300 hover:bg-gray-50 rounded font-medium flex items-center w-fit gap-1">
                    <Icon icon="akar-icons:chevron-left" className="inline" />
                    Back
                </Link>

                <div className="contentContainer">
                    {!firstLoading && event ? (
                        <>
                            <div className="flex flex-row justify-between">
                                <h1 className="pageName mb-6">Edit Events</h1>

                                <Menu className="relative" as="div">
                                    <Menu.Button className="flex hover:scale-105 transition-all ease-out duration-100 p-[2px] items-center gap-2 cursor-pointer w-full">
                                        <Icon icon="material-symbols:more-vert" width="30" height="30" />
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
                                                    <p className="font-medium">Delete Events</p>
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Menu>
                            </div>

                            <form className="flex flex-col gap-4" onSubmit={handleSubmit(submitHandler)} onChange={changeHandler}>
                                <div>
                                    <label htmlFor="event" className="font-medium">
                                        Event<span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="event"
                                        className="addInput"
                                        placeholder="Event name"
                                        defaultValue={event?.event}
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
                                        defaultValue={event?.event_desc}
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
                                        defaultValue={selectedRooms}
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
                                        defaultValue={event?.from}
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
                                        defaultValue={event?.until}
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
                                        Edit Events
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

export default EditEvent;