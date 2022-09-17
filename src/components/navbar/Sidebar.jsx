import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { BiLeftArrowCircle } from "react-icons/bi";
import { BsBook } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { CgUserList } from "react-icons/cg";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const Menus = [
    { title: "Dashboard", path: "/dashboard", src: <MdDashboard /> },
    { title: "Listado Socios", path: "/member-list", src: <CgUserList /> },
    {
      title: "Book Animales",
      path: "/book-animales",
      src: <BsBook />,
      gap: true,
    },
  ];

  return (
    <>
      <div className={`${open ? "w-60" : "w-fit"} relative hidden h-screen border-r border-gray-200 bg-gray-100 p-5 duration-300 dark:border-gray-600 dark:bg-slate-800 sm:block`}>
        <BiLeftArrowCircle className={`${!open && "rotate-180"} absolute top-9 -right-4 cursor-pointer  rounded-full bg-white fill-battery-charged-blue text-3xl dark:bg-gray-800 dark:fill-battery-charged-blue`} onClick={() => setOpen(!open)} />

        <div className={`flex ${open && "gap-x-4"} items-center`}>{/* logo */}</div>

        <ul className="pt-6">
          {Menus.map((menu, index) => (
            <Link to={menu.path} key={index}>
              <li
                className={`flex cursor-pointer items-center gap-x-6 rounded-lg p-3 text-base font-bold text-battery-charged-blue hover:bg-gray-200 dark:text-battery-charged-blue dark:hover:bg-gray-700
                        ${menu.gap ? "mt-6" : "mt-2"} ${location.pathname === menu.path && "bg-gray-200 dark:bg-gray-700"}`}
              >
                <span className="text-2xl">{menu.src}</span>
                <span className={`${!open && "hidden"} origin-left duration-300 hover:block`}>{menu.title}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
