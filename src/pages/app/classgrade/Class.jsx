import { Helmet } from "react-helmet-async";
import NavbarAdmin from "../../../components/NavbarAdmin";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useEffect, useMemo, useState } from "react";
import EmptyTable from "../../../components/EmptyTable";
import { useRecoilValue } from "recoil";
import { userState } from "../../../atoms/userAtom";
import { collection, getDocs, query } from "firebase/firestore";
import { firestoreDb } from "../../../../firebase";
import Table from "../../../components/Table";

const ClassGrade = () => {
    const user = useRecoilValue(userState);
    const [classD, setClassD] = useState([])
    const [filterChange, setFilterChange] = useState("")

    const getClassData = async () => {
        const q = query(collection(firestoreDb, 'classgrade'));
        const docSnap = await getDocs(q);
        const data = docSnap.docs
        console.log(data);
        const mapped = data.map(d => {
            let tmpGrade = d.data().grade
            return d.data().classname.map(c => {
                return { name: c, grade: tmpGrade }
            })
        }).reduce((a, e) => [...a, ...e], [])
        setClassD(mapped)
    }

    useEffect(() => {
        try {
            getClassData()
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
                    <p className={`max-w-[160px]`}>{value}</p>
                )
            },
            {
                Header: "Class",
                accessor: "name",
                Cell: ({ cell: { value } }) => (
                    <p className={`text-[13px]`}>{value}</p>
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
                <title>Class | Schedus</title>
            </Helmet>

            <NavbarAdmin user={user} />

            <div className="layoutContainer">
                <div className="flex items-center justify-between">
                    <h1 className="pageName">Class</h1>
                    <Link to="/app/class/new" className="addButton">
                        <Icon icon="akar-icons:plus" width="30" height="30" />
                        New Class
                    </Link>
                </div>

                <div className="contentContainer">
                    <div className="flex w-full my-2">
                        <input
                            type="text"
                            placeholder="Find Class"
                            className="w-full focus:border-blue-600 text-sm outline-none border-[1px] border-gray-300 transition-all duration-300 ease-out  rounded p-2"
                            onChange={handleFilterChange}
                        />
                    </div>

                    {!classD.length ? (
                        <EmptyTable columns={columns} />
                    ) : (
                        <Table columns={columns} data={classD} filterColumn="name" filterInput={filterChange} />
                    )}
                </div>
            </div>
        </>
    );
}

export default ClassGrade;
