import { Helmet } from "react-helmet-async";
import NavbarAdmin from "../../../components/NavbarAdmin";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useMemo } from "react";
import EmptyTable from "../../../components/EmptyTable";
import { useRecoilValue } from "recoil";
import { userState } from "../../../atoms/userAtom";
import { useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { firestoreDb } from "../../../../firebase";
import mapToArray from "../../../helpers/mapToArray";
import { useEffect } from "react";
import Table from "../../../components/Table";

const Rooms = () => {
    const user = useRecoilValue(userState);
    const [rooms, setRooms] = useState([]);
    const [filterChange, setFilterChange] = useState("");

    const getRoomsData = async () => {
        const q = query(collection(firestoreDb, "rooms"));
        const docSnap = await getDocs(q);
        const data = docSnap.docs;
        setRooms(mapToArray(data));
    }

    useEffect(() => {
        try {
            getRoomsData();
        } catch (err) {
            console.error(err);
        }
    }, [])

    const columns = useMemo(
        () => [
            {
                Header: "Image",
                accessor: "imgUrl",
                Cell: ({ cell: {value} }) => (
                    <img src={value} alt="imgRoom" className={`h-20 w-20 object-cover`} />
                )
            },
            {
                Header: "Room",
                accessor: "room",
                Cell: ({ cell: {value} }) => (
                    <p className={`text-[13px]`}>{value}</p>
                )
            },
            {
                Header: "Desc",
                accessor: "desc",
                Cell: ({ cell: {value} }) => (
                    <p className={`max-w-[200px]`}>{value}</p>
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
            <title>Rooms | Schedus</title>
        </Helmet>
    
        <NavbarAdmin user={user}/>
        
        <div className="layoutContainer">
            <div className="flex items-center justify-between">
                <h1 className="pageName">Rooms</h1>
                <Link to="/app/room/new" className="addButton">
                    <Icon icon="akar-icons:plus" width="30" height="30" />
                    New Rooms
                </Link>
            </div>

            <div className="contentContainer">
                <div className="flex w-full my-2">
                    <input
                        type="text"
                        placeholder="Find Rooms"
                        className="w-full focus:border-blue-600 text-sm outline-none border-[1px] border-gray-300 transition-all duration-300 ease-out  rounded p-2"
                        onChange={handleFilterChange}
                    />
                </div>

                {!rooms.length ? (
                    <EmptyTable columns={columns}/>
                ) : (
                    <Table columns={columns} data={rooms} filterColumn="room" filterInput={filterChange}/>
                )}
            
            </div>
        </div>
        </>
     );
}
 
export default Rooms;