import { Helmet } from "react-helmet-async";
import NavbarAdmin from "../../../components/NavbarAdmin";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import EmptyTable from "../../../components/EmptyTable";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../atoms/userAtom";
import { useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { firestoreDb } from "../../../../firebase";
import { useEffect } from "react";
import mapToArray from "../../../helpers/mapToArray";
import Table from "../../../components/Table";

const Schedule = () => {
    const user = useRecoilValue(userState);
    const [scheduleD, setscheduleD] = useState([]);
    const [filterChange, setFilterChange] = useState("");

    const getScheduleData = async () => {
        const q = query(collection(firestoreDb, 'yourschedule'));
        const docSnap = await getDocs(q);
        const data = docSnap.docs;
        setscheduleD(mapToArray(data));
    }

    useEffect(() => {
        try {
            getScheduleData()
        } catch (err) {
            console.log(err);
        }
    }, []);

    const columns = useMemo(
        () => [
            {
                Header: "Block",
                accessor: "block",
                Cell: ({ cell: { value } }) => (
                    <p className={`text-[13px]`}>{value}</p>
                )
            },
            {
                Header: "Day",
                accessor: "day",
                Cell: ({ cell: { value } }) => (
                    <p className={`max-w-[160px]`}>{value}</p>
                )
            },
            {
                Header: "Grade",
                accessor: "grade",
                Cell: ({ cell: { value } }) => (
                    <p className={`text-[13px]`}>{value}</p>
                )
            },
            {
                Header: "Subject Hour 1-2",
                accessor: "subjectHour1til2",
                Cell: ({ cell: { value } }) => (
                    <p className={`text-[13px]`}>{value}</p>
                )
            },
            {
                Header: "Subject Hour 3-4",
                accessor: "subjectHour3til4",
                Cell: ({ cell: { value } }) => (
                    <p className={`text-[13px]`}>{value}</p>
                )
            },
            {
                Header: "Subject Hour 5-6",
                accessor: "subjectHour5til6",
                Cell: ({ cell: { value } }) => (
                    <p className={`text-[13px]`}>{value}</p>
                )
            },
            {
                Header: "Subject Hour 7-8",
                accessor: "subjectHour7til8",
                Cell: ({ cell: { value } }) => (
                    <p className={`text-[13px]`}>{value}</p>
                )
            },
            {
                Header: "Subject Hour 9-10",
                accessor: "subjectHour9til10",
                Cell: ({ cell: { value } }) => (
                    <p className={`text-[13px]`}>{value}</p>
                )
            },
        ]
    );

    const handleFilterChange = (e) => {
        const value = e.target.value || "";
        setFilterChange(value);
    }

    return (
        <>
            <Helmet>
                <title>Schedule | Schedus</title>
            </Helmet>

            <NavbarAdmin user={user} />

            <div className="layoutContainer">
                <div className="flex items-center justify-between">
                    <h1 className="pageName">Schedule</h1>
                    <Link to="/app/schedule/new" className="addButton">
                        <Icon icon="akar-icons:plus" width="30" height="30" />
                        New Schedule
                    </Link>
                </div>

                <div className="contentContainer">
                    <div className="flex w-full my-2">
                        <input
                            type="text"
                            placeholder="Find Schedule"
                            className="w-full focus:border-blue-600 text-sm outline-none border-[1px] border-gray-300 transition-all duration-300 ease-out  rounded p-2"
                            onChange={handleFilterChange}
                        />
                    </div>

                    {!scheduleD.length ? (
                        <EmptyTable columns={columns} />
                    ) : (
                        <Table columns={columns} data={scheduleD} filterColumn="grade" filterInput={filterChange} />
                    )}
                </div>
            </div>
        </>
    );
}

export default Schedule;