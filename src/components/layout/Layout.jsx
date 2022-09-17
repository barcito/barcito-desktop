import React from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../navbar/Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <div className="flex flex-auto">
        <div className="sticky top-0 h-screen">
          <Sidebar />
        </div>
        <div className="grow overscroll-contain">
          <Navbar />
          <div className="m-2">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
