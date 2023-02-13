import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { firestoreDb } from "../../../../firebase";
import { userState } from "../../../atoms/userAtom";
import EmptyTable from "../../../components/EmptyTable";
import NavbarAdmin from "../../../components/NavbarAdmin";
import Table from "../../../components/Table";
import mapToArray from "../../../helpers/mapToArray";

const Event = () => {
    const user = useRecoilValue(userState);
    const [event, setEvent] = useState([]);
    const [filterChange, setFilterChange] = useState("");
    
    const getEventsData = async () => {
        const q = query(collection(firestoreDb, "events"));
        const docSnap = await getDocs(q);
        const data = docSnap.docs;
        setEvent(mapToArray(data));
    }

    useEffect(() => {
        try {
            getEventsData();
        } catch (err) {
            console.error(err);
        }
    }, [])

    const columns = useMemo(
        () => [
            {
                Header: "Event",
                accessor: "event",
                Cell: ({ cell: {value} }) => (
                    <p className={`text-[13px]`}>{value}</p>
                )
            },
            {
                Header: "Event Desc",
                accessor: "event_desc",
                Cell: ({ cell: {value} }) => (
                    <p className={`text-[13px]`}>{value}</p>
                )
            },
            {
                Header: "From",
                accessor: "from",
                Cell: ({ cell: {value} }) => (
                    <p className={`text-[13px]`}>{typeof(value) == "object" ? dayjs(value.toDate()).format('D MMMM YYYY h:mm A') : dayjs(value).format('D MMMM YYYY h:mm A')}</p>
                )
            },
            {
                Header: "Until",
                accessor: "until",
                Cell: ({ cell: {value} }) => (
                    <p className={`text-[13px]`}>{typeof(value) == "object" ? dayjs(value.toDate()).format('D MMMM YYYY h:mm A') : dayjs(value).format('D MMMM YYYY h:mm A')}</p>
                )
            },
        ]
    )

    const handleFilterChange = (e) => {
        const value = e.target.value || "";
        setFilterChange(value);
    }

    return ( 
        <>
            <Helmet>
                <title>Events - Schedus</title>
            </Helmet>

            <NavbarAdmin user={user}/>

            <div className="layoutContainer">
                <div className="flex items-center justify-between">
                    <h1 className="pageName">Events</h1>
                    <Link to="/app/event/new" className="addButton">
                        <Icon icon="akar-icons:plus" width="30" height="30" />
                        New Events
                    </Link>
                </div>

                <div className="contentContainer">
                    <div className="flex w-full my-2">
                        <input
                            type="text"
                            placeholder="Find Events"
                            className="w-full focus:border-blue-600 text-sm outline-none border-[1px] border-gray-300 transition-all duration-300 ease-out  rounded p-2"
                            onChange={handleFilterChange}
                        />
                    </div>

                    {!event.length ? (
                        <EmptyTable columns={columns}/>
                    ) : (
                        <Table columns={columns} data={event} filterColumn="event" filterInput={filterChange}/>
                        // <div>Tes</div>
                    )
                    }
                </div>
            </div>
        </>
     );
}
 
export default Event;