import React from "react";
import { CalendarIcon, ChartBarSquareIcon, CogIcon, ServerIcon, UserGroupIcon } from "@heroicons/react/24/outline";

const SideBar = () => {
  return (
    <div className="fixed inset-y-16 left-0 bg-white w-40 h-full">
      {/* <div className="flex flex-col items-center justify-center rounded-md">
                    /
                    <div className=" text-sm italic "> Never miss a deadline</div>
                </div> */}

      <ul className="flex flex-col text-lg h-full">
        <li
          className="flex justify-center items-center flex-col
                    py-7 text-gray-500"
        >
          <UserGroupIcon className="w-7 h-7" />
          Manage
        </li>
        <li
          className="flex justify-center items-center flex-col
                    py-7 text-gray-500"
        >
          <ServerIcon className="w-7 h-7" />
          Boards
        </li>
        <li
          className="flex justify-center items-center flex-col
                    py-7 text-gray-500"
        >
          <CalendarIcon className="w-7 h-7" />
          Schedule
        </li>
        <li
          className="flex justify-center items-center flex-col
                    py-7 text-gray-500"
        >
          <ChartBarSquareIcon className="w-7 h-7" />
          Report
        </li>

        <li
          className="flex justify-center items-center flex-col
                    py-7 text-gray-500"
        >
          <CogIcon className="w-7 h-7" />
          Settings
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
