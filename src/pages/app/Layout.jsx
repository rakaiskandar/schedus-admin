import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const Layout = () => {
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
