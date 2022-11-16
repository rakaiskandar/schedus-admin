import { useState, useEffect } from "react";
import profile from "../assets/bear.png";
import NavbarProfile from "./NavbarProfile";

const NavbarAdmin = ({user}) => {
    const [greeting, setGreeting] = useState("");

    useEffect(() => {
        const now = new Date().getHours();
        if (4 <= now && now <= 11) {
            setGreeting({
              emoji: "🌄",
              greet: "Good Morning, ",
            });
          } else if (12 <= now && now <= 14) {
            setGreeting({
              emoji: "🌞",
              greet: "Good Afternoon, ",
            });
          } else if (15 <= now && now <= 18) {
            setGreeting({
              emoji: "🌆",
              greet: "Good Evening, ",
            });
          } else {
            setGreeting({
              emoji: "🌃",
              greet: "Good Night, ",
            });
        }
    }, [])

    // console.log(user);

    return ( 
        <nav className="hidden md:flex shadow-sm bg-white py-3 px-5 border-b-[1px] border-b-gray-300 items-center sticky top-0 z-30 justify-between">
            <h5 className="text-lg font-semibold">
                <span className="text-3xl">{greeting.emoji}</span>{greeting.greet} 
                <span>{`${user.displayName ? user.displayName : "..."}`}</span>
            </h5>
            <div className="flex items-center gap-6">
              <NavbarProfile img={`${user.profileImg ? user.profileImg : profile}`} />
            </div>
        </nav>
     );
}
 
export default NavbarAdmin;