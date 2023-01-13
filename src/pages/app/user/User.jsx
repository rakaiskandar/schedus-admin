import { Helmet } from "react-helmet-async";
import NavbarAdmin from "../../../components/NavbarAdmin";
import { useMemo, useState } from "react";
import EmptyTable from "../../../components/EmptyTable";
import { useRecoilValue } from "recoil";
import { userState } from "../../../atoms/userAtom";
import { useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { firestoreDb } from "../../../../firebase";
import mapToArray from "../../../helpers/mapToArray";
import Table from "../../../components/Table";

const User = () => {
    const user = useRecoilValue(userState);
    const [userD, setUserD] = useState([])
    const [filterChange, setFilterChange] = useState("")

    const getUserData = async () => {
        const q = query(collection(firestoreDb, 'users'));
        const docSnap = await getDocs(q);
        const data = docSnap.docs
        setUserD(mapToArray(data))
    }

    useEffect(() => {
        try {
            getUserData()
        } catch (err) {
            console.error(err);
        }
    }, [])

    const columns = useMemo(
        () => [
            {
                Header: "Email",
                accessor: "email",
                Cell: ({ cell: { value } }) => (
                    <p className={`text-[13px]`}>{value}</p>
                )
            },
            {
                Header: "Name",
                accessor: "name",
                Cell: ({ cell: { value } }) => (
                    <p className={`max-w-[160px]`}>{value}</p>
                )
            },
            {
                Header: "NIS",
                accessor: "nis",
                Cell: ({ cell: { value } }) => (
                    <p className={`text-[13px]`}>{value}</p>
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
                Header: "Role",
                accessor: "role",
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
                <title>User | Schedus</title>
            </Helmet>

            <NavbarAdmin user={user} />

            <div className="layoutContainer">
                <div className="flex items-center justify-between">
                    <h1 className="pageName">User</h1>
                </div>

                <div className="contentContainer">
                    <div className="flex w-full my-2">
                        <input
                            type="text"
                            placeholder="Find User"
                            className="w-full focus:border-blue-600 text-sm outline-none border-[1px] border-gray-300 transition-all duration-300 ease-out  rounded p-2"
                            onChange={handleFilterChange}
                        />
                    </div>
                    
                    {!userD.length ? (
                        <EmptyTable columns={columns} />
                    ) : (
                        <Table columns={columns} data={userD} filterColumn="name" filterInput={filterChange} />
                    )}
                </div>
            </div>
        </>
    );
}

export default User;