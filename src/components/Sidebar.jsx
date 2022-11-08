import React from "react";
import SidebarItem from "./SidebarItem";
import { useLocation } from "react-router-dom";
import logo from '../assets/app_logo.png';

const Sidebar = () => {
    const locationNow = useLocation();

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
        {
            itemName: "Class",
            itemPath: "/app/class",
            icon: "fluent:class-20-regular",
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
    ];

    return (
        <nav className="pl-6 pr-2 py-7 justify-center h-screen border-r-[1px] w-full sidebarSticky border-r-gray-300 flex">
            <div className="w-full my-5 gap-3 flex flex-col">
                <div className="mb-4 -mt-8">
                    <img src={logo} alt="logo" className="w-11/12"/>
                </div>
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
    );
}

export default Sidebar;