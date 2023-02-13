import React from "react";
import SidebarItem from "./SidebarItem";
import { Link ,useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import logo from '../assets/app_logo.png';
import { useSetRecoilState } from "recoil";
import { navbarAdmin } from "../atoms/navbarAdmin";

const Sidebar = () => {
    const locationNow = useLocation();
    const setIsOpen = useSetRecoilState(navbarAdmin);

    const sidebarItems = [
        {
            itemName: "Home",
            itemPath: "/app/home",
            icon: "carbon:home",
        },
        {
            itemName: "User",
            itemPath: "/app/user",
            icon: "bi:people",
        },
        // {
        //     itemName: "Class",
        //     itemPath: "/app/class",
        //     icon: "fluent:class-20-regular",
        // },
        {
            itemName: "Lessons",
            itemPath: "/app/lesson",
            icon: "mdi:learn-outline"
        },
        {
            itemName: "Schedule",
            itemPath: "/app/schedule",
            icon: "ant-design:schedule-outlined",
        },
        {
            itemName: "Rooms",
            itemPath: "/app/room",
            icon: "cil:room",
        },
        {
            itemName: "Events",
            itemPath: "/app/event",
            icon: "material-symbols:event-available-outline-sharp"
        },
    ];

    return (
        <>
       { /* Sidebar for desktop */}

        <nav className="pl-6 pr-2 py-6 justify-center h-screen border-r-[1px] w-full sidebarSticky border-r-gray-300 hidden md:flex">
            <div className="w-full my-5 gap-3 flex flex-col">
                <div className="mb-4 -mt-8">
                    <img src={logo} alt="logo" className="w-11/12"/>
                </div>
                
                <h3 className="font-medium text-gray-400">Menu</h3>
                
                {sidebarItems.map((item, i) => (
                    <SidebarItem
                    key={i}
                    locationNow={locationNow}
                    itemPath={item.itemPath}
                    itemName={item.itemName}
                    icon={item.icon}/>
                ))}
            </div>
        </nav>

        {/* Sidebar for mobile */}
        <nav className="flex md:hidden z-50 bg-white p-5 border-b-[1px] border-gray-300 items-center justify-between shadow fixed top-0 w-screen overflow-hidden">
            <Link to="/app/home">
                <img src={logo} alt="logo" className="w-11/12"/>
            </Link>
            <div className="flex items-center gap-8">
            {/* <Notification /> */}
                <Icon
                    icon="charm:menu-hamburger"
                    width="32"
                    className="opacity-80"
                    onClick={() => setIsOpen(true)}
                />
            </div>
        </nav>
        </>
    );
}

export default Sidebar;