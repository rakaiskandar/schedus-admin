import React from "react";
import { Menu } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const NavbarProfile = ({img}) => {

    const logoutHandler = async () =>{
        try{
            signOut(auth);
        }catch(err){
            console.error(err); 
        }
    }

    return ( 
        <Menu className="relative" as="div">
            <Menu.Button className="flex rounded-full hover:scale-105 transition-all ease-out duration-100 p-[2px] border-2 items-center gap-2 cursor-pointer w-full">
                <img src={img} alt="profile img" width="50" height="50" className="rounded-full"/>
            </Menu.Button>
            <Menu.Items className="absolute right-0 flex flex-col py-2 rounded bg-white gap-[2px] mt-1 w-36 shadowProfile text-sm font-medium z-10">
                <Menu.Item>
                {({ active }) => (
                    <button
                        className={` px-3 py-[6px] flex gap-2  ${
                            active && "bg-gray-100 text-red-500"
                        }`}
                        onClick={logoutHandler}
                        >
                        <Icon icon="carbon:logout" width="18" />
                        <p className="font-medium">Logout</p>
                    </button>
                )}
                </Menu.Item>
            </Menu.Items>
        </Menu>
     );
}
 
export default NavbarProfile;