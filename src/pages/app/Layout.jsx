import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { auth, firestoreDb } from "../../../firebase";
import { useSetRecoilState } from "recoil";
import { userState } from "../../atoms/userAtom";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const Layout = () => {
    const navigate = useNavigate();
    const setUser = useSetRecoilState(userState);
    const [loading, setLoading] = useState(false);

    const fetchUser = (users) => {
        const q = query(collection(firestoreDb, "users"), where("uid", "==", users.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            if(!querySnapshot.empty){
                const data = querySnapshot.docs[0].data()
                
                if(data.role !== "admin") {
                    navigate('/');
                    return;
                }
                
                setUser({
                    uid: users.uid,
                    displayName: data.name,
                    profileImg: data.photoUrl,
                    email: users.email,
                    role: data.role
                })

            }            
        });
        return unsubscribe
    }

    useEffect(() => {
        setLoading(true);
        try {
            onAuthStateChanged(auth, (users) => {
                if (!users) {
                    navigate('/');
                    return;
                }

                fetchUser(users)

            })
        } catch (err) {
            console.error(err);
            navigate('/');
        } finally {
            setLoading(false);
        }
    }, [])

    return (
        <>
            <div className="flex flex-col md:grid md:grid-cols-11">
                <nav className="md:col-span-2 bg-white">
                    <Sidebar />
                </nav>
                <main className="md:col-span-9 mt-24 md:mt-0">
                    <Outlet />
                </main>
            </div>
        </>
    );
}

export default Layout;
