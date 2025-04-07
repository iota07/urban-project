import React from "react";
import SideNav from "../../component/SideNav";
import { Outlet } from "react-router-dom";

function WorkSpace() {
  return (
    <>
      <div className="lg:flex lg:min-h-fit w-full">
        <SideNav />
        <Outlet />
      </div>
    </>
  );
}

export default WorkSpace;
