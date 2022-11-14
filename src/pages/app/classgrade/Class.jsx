import { Helmet } from "react-helmet-async";
import NavbarAdmin from "../../../components/NavbarAdmin";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useMemo, useState } from "react";
import EmptyTable from "../../../components/EmptyTable";
import { useRecoilValue } from "recoil";
import { userState } from "../../../atoms/userAtom";

const ClassGrade = () => {
    const user = useRecoilValue(userState);

    const columns = useMemo(
       () => [
        {
            Header: "Grade",
            accessor: "grade",
            Cell: ({ cell: {value} }) => (
                <p className={`max-w-[160px]`}>{value}</p>
            )
        },
        {
            Header: "Class",
            accessor: "classname",
            Cell: ({ cell: {value} }) => (
                <p className={`text-[13px]`}>{value}</p>
            )
        },
       ]
    )
    return ( 
        <>
        <Helmet>
            <title>Class | Schedus</title>
        </Helmet>
        
        <NavbarAdmin user={user}/>
        
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
                    />
                </div>

                <EmptyTable columns={columns}/>
            </div>
        </div>
        </>
     );
}
 
export default ClassGrade;
