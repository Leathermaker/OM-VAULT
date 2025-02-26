import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components";

const UserLayout: React.FC = () => {
  return (
    <div className="h-screen  w-full flex ">
        <Sidebar/>
      <Outlet />
    </div>
  );
};

export default UserLayout;
