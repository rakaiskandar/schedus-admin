import { Link } from "react-router-dom";
import React from "react";
import { Icon } from "@iconify/react";

const SidebarItem = ({ locationNow, itemPath, itemName, icon }) => {
    return (
        <Link
            to={itemPath}
            className={`sidebarItem ${locationNow.pathname.includes(itemPath) && "sidebarActive"
        } `}>
            <Icon icon={icon} width="22" />
            <p className="font-medium text-[15px] transition-all duration-300 ease-out">{itemName}</p>
        </Link>
    );
}

export default SidebarItem;