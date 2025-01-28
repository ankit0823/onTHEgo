import React, { useState, useEffect, useRef, useContext } from "react";
import { FaHome, FaWallet, FaHistory, FaBell, FaUserFriends, FaCog, FaSignOutAlt, FaBars } from "react-icons/fa";
import { gsap } from "gsap";
import { UserDataContext } from "../context/UserContext";



const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const menuItemsRef = useRef([]);
  const {user} = useContext(UserDataContext)


  useEffect(() => {
    if (isOpen) {
      gsap.to(sidebarRef.current, { x: 0, duration: 0.5, ease: "power3.out" });
      gsap.fromTo(
        menuItemsRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" }
      );
    } else {
      gsap.to(sidebarRef.current, { x: "-100%", duration: 0.5, ease: "power3.in" });
    }
  }, [isOpen]);

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        className="absolute left-4 text-gray-200 text-2xl z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="fixed top-0 left-0 h-full w-72 bg-[#2585a8] shadow-lg transform -translate-x-full z-40"
      >
        {/* User Info */}
        <div className="flex flex-col items-center py-6 bg-[#2585a8]">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkxK_lrCEX3ErmxVWpB2Nc8E6vbocwfS54UQ&s"
            
            className="w-16 h-16 rounded-full border-2 border-white"
          />
          <h2 className="text-white font-semibold mt-2">{user.fullname.firstname + " " + user.fullname.lastname}</h2>
          <span className="text-sm text-white bg-[#2585a8] px-3 py-1 rounded-full mt-1">
            Member
          </span>
          <div className="flex justify-around w-full mt-4 text-white">
            <div className="text-center">
              <p className="font-bold">10 day ago</p>
              <p className="text-xs">Last Ride</p>
            </div>
            <div className="text-center">
              <p className="font-bold">30 KM</p>
              <p className="text-xs">Total Distance</p>
            </div>
            <div className="text-center">
              <p className="font-bold">20</p>
              <p className="text-xs">Total Ride</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="mt-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                icon={item.icon}
                text={item.text}
                ref={(el) => (menuItemsRef.current[index] = el)}
              />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

// Reusable Menu Item Component with GSAP Hover Effect
const MenuItem = React.forwardRef(({ icon, text }, ref) => {
  const handleMouseEnter = () => {
    gsap.to(ref, { scale: 1.1, duration: 0.2 });
  };
  const handleMouseLeave = () => {
    gsap.to(ref, { scale: 1, duration: 0.2 });
  };

  return (
    <li
      ref={ref}
      className="flex items-center space-x-3 px-6 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{text}</span>
    </li>
  );
});

// Menu Items Data
const menuItems = [
  { icon: <FaHome />, text: "Home" },
  { icon: <FaWallet />, text: "My Wallet" },
  { icon: <FaHistory />, text: "History" },
  { icon: <FaBell />, text: "Notifications" },
  { icon: <FaUserFriends />, text: "Invite Friends" },
  { icon: <FaCog />, text: "Settings" },
  { icon: <FaSignOutAlt />, text: "Logout" },
];

export default Sidebar;
