import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { auth } from "../../../firebase";
import { useSetRecoilState } from "recoil";
import { userState } from "../../atoms/userAtom";

const Layout = () => {
    const navigate = useNavigate();
    const setUser = useSetRecoilState(userState);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        try{
            onAuthStateChanged(auth, (user) => {
                if(!user){
                    navigate('/');
                    return;
                }

                setUser({
                    uid: user.uid,
                    displayName: user.name,
                    profileImg: user.photoUrl,
                    email: user.email,
                    role: user.role
                });

            })
        }catch(err){
            console.error(err);
            navigate('/');
        }finally{
            setLoading(false);
        }
    }, [])

    return ( 
        <>
            <div className="flex flex-col md:grid md:grid-cols-11">
                <nav className="md:col-span-2 bg-white">
                    <Sidebar/>
                </nav>
                <main className="md:col-span-9 mt-24 md:mt-0">
                    <Outlet/>
                </main>
            </div>
        </>
    );
}
 
export default Layout;
