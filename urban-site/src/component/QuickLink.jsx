import React from "react";
import { Link } from "react-router-dom";

function QuickLink() {
  return (
    <nav>
      <ul className="flex justify-between text-primary text-sm sm:text-lg md:text-xl lg:text-2xl lg:py-14">
        <li>
          <Link
            to="/workspace/create-project"
            className="text-white text-nowrap bg-secondary p-2 md:px-4 border-primary border-4 border-r-2 hover:bg-tertiary  cursor-pointer select-none
                      active:translate-y-2  active:[box-shadow:0_5px_0_0_#acbac1,0_0px_0_0_#1b70f841]
                      active:border-b-[0px]
                      transition-all duration-150 [box-shadow:0_10px_0_0_#acbac1,0_15px_0_0_#1b70f841]
                      rounded-l-full"
          >
            New Project
          </Link>
        </li>
        <li>
          <Link
            to="/workspace/projects"
            className="text-white text-nowrap bg-secondary p-2 md:px-4 border-primary border-4 border-l-2 border-r-2 hover:bg-tertiary  cursor-pointer select-none
                      active:translate-y-2  active:[box-shadow:0_5px_0_0_#acbac1,0_0px_0_0_#1b70f841]
                      active:border-b-[0px]
                      transition-all duration-150 [box-shadow:0_10px_0_0_#acbac1,0_15px_0_0_#1b70f841]
                      "
          >
            My Projects
          </Link>
        </li>
        <li>
          <Link
            to="/workspace/dashboard"
            className="text-white text-nowrap bg-secondary p-2 md:px-4 border-primary border-4 border-l-2 border-r-2 hover:bg-tertiary  cursor-pointer select-none
                      active:translate-y-2  active:[box-shadow:0_5px_0_0_#acbac1,0_0px_0_0_#1b70f841]
                      active:border-b-[0px]
                      transition-all duration-150 [box-shadow:0_10px_0_0_#acbac1,0_15px_0_0_#1b70f841]
                      "
          >
            My Workspace
          </Link>
        </li>
        <li>
          <Link
            to="/account"
            className="text-white text-nowrap bg-secondary p-2 md:px-4 border-primary border-4 border-l-2 hover:bg-tertiary  cursor-pointer select-none
                      active:translate-y-2  active:[box-shadow:0_5px_0_0_#acbac1,0_0px_0_0_#1b70f841]
                      active:border-b-[0px]
                      transition-all duration-150 [box-shadow:0_10px_0_0_#acbac1,0_15px_0_0_#1b70f841]
                      rounded-r-full"
          >
            My Account
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default QuickLink;
