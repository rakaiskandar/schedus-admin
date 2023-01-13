import { Icon } from "@iconify/react";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { firestoreDb } from "../../../../firebase";
import { userState } from "../../../atoms/userAtom";
import NavbarAdmin from "../../../components/NavbarAdmin";

const EditUser = () => {
    let { id } = useParams();

    const user = useRecoilValue(userState);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [userD, setUserD] = useState(null);
    const [firstLoading, setFirstLoading] = useState(true);

    const getUser = async () => {
        const docRef = doc(firestoreDb, 'users', id);
        const docSnap = await getDoc(docRef);

        return { ...docSnap.data(), id: docSnap.id }
    }

    useEffect(() => {
        setFirstLoading(true);
        try {
            getUser().then((data) => {
                setUserD(data);
                setFirstLoading(false);
            });
        } catch (err) {
            console.error(err);
        } finally {
            setFirstLoading(false);
        }
    }, [])

    return (
        <>
            <Helmet>
                Edit User | Schedus
            </Helmet>

            <NavbarAdmin user={user} />

            <div className="layoutContainer min-h-screen">
                <Link
                    to="/app/user"
                    className="py-1 px-3 text-sm my-3 bg-white border-[1px] border-gray-300 hover:bg-gray-50 rounded font-medium flex items-center w-fit gap-1">
                    <Icon icon="akar-icons:chevron-left" className="inline" />
                    Back
                </Link>

                <div className="contentContainer">
                    {!firstLoading && userD ? (
                        <>
                            <h1 className="pageName mb-6">Edit User</h1>

                            <form className="flex flex-col gap-4">
                                <div>
                                    <label htmlFor="email" className="font-medium">
                                        Email<span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="email"
                                        className="addInput"
                                        placeholder="Email" 
                                        defaultValue={userD?.email}/>
                                </div>

                                <div>
                                    <label htmlFor="name" className="font-medium">
                                        Name<span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="addInput"
                                        placeholder="Name" 
                                        defaultValue={userD?.name}/>
                                </div>

                                <div>
                                    <label htmlFor="nis" className="font-medium">
                                        NIS<span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="nis"
                                        className="addInput"
                                        placeholder="NIS" 
                                        defaultValue={userD?.nis}/>
                                </div>

                                <div>
                                    <label htmlFor="grade" className="font-medium">
                                        Grade<span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="grade"
                                        className="addInput"
                                        placeholder="Grade name" 
                                        defaultValue={userD?.grade}/>
                                </div>

                                <div>
                                    <label htmlFor="role" className="font-medium">
                                        Role<span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="role"
                                        className="addInput"
                                        placeholder="Role" 
                                        defaultValue={userD?.role}/>
                                </div>

                                <div className="my-1 justify-end flex gap-3 md:">
                                    <button
                                        onClick={() => navigate('/app/user')}
                                        className={`cancelBtn`}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className={`createBtn`}
                                    >
                                        Create Class
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

export default EditUser;