import { Icon } from "@iconify/react";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { firestoreDb } from "../../../../firebase";
import { userState } from "../../../atoms/userAtom";
import EmptyTable from "../../../components/EmptyTable";
import NavbarAdmin from "../../../components/NavbarAdmin";
import Table from "../../../components/Table";
import mapToArray from "../../../helpers/mapToArray";

const Lesson = () => {
    const user = useRecoilValue(userState);
    const [lesson, setLesson] = useState([]);
    const [filterChange, setFilterChange] = useState("");

    const getLessonData = async () => {
        const q = query(collection(firestoreDb, "schedule"));
        const docSnap = await getDocs(q);
        const data = docSnap.docs;
        setLesson(mapToArray(data));
    }

    useEffect(() => {
        try {
            getLessonData()
        } catch (err) {
            console.error(err);
        }
    }, [])

    const columns = useMemo(
        () => [
            {
                Header: "Grade",
                accessor: "grade",
                Cell: ({ cell: { value } }) => (
                    <p className={`text-[13px]`}>{value}</p>
                )
            },
            {
                Header: "Subject",
                accessor: "subject",
                Cell: ({ cell: { value } }) => (
                    <p className={`max-w-[200px]`}>{value}</p>
                )
            },
            {
                Header: "Teacher",
                accessor: "teacherName",
                Cell: ({ cell: { value } }) => (
                    <p className={`max-w-100px`}>{value}</p>
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
                Lessons | Schedus
            </Helmet>

            <NavbarAdmin user={user} />

            <div className="layoutContainer">
                <div className="flex items-center justify-between">
                    <h1 className="pageName">Lessons</h1>
                    <Link to="/app/lesson/new" className="addButton">
                        <Icon icon="akar-icons:plus" width="30" height="30" />
                        New Lesson
                    </Link>
                </div>

                <div className="contentContainer">
                    <div className="flex w-full my-2">
                        <input
                            type="text"
                            placeholder="Find Lesson"
                            className="w-full focus:border-blue-600 text-sm outline-none border-[1px] border-gray-300 transition-all duration-300 ease-out  rounded p-2"
                            onChange={handleFilterChange}
                        />
                    </div>

                    {!lesson.length ? (
                        <EmptyTable columns={columns} />
                    ) : (
                        <Table columns={columns} data={lesson} filterColumn="subject" filterInput={filterChange} />
                    )}

                </div>
            </div>
        </>
    );
}

export default Lesson;