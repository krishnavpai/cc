import React from "react";
// import { SearchIcon, AtSymbolIcon, BellIcon } from "@heroicons/react/24/outline";
import { AtSymbolIcon, BellAlertIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

function TopBar(props) {
  return (
    <div
      className="h-16 pl-8 fixed bg-gradient-to-r from-green-500
        to-blue-500 w-full flex items-center justify-between pr-5 z-10"
    >
      <div className="flex items-center gap-4">
        <h1
          className="flex items-center justify-center text-2xl
            h-16 text-white font-bold"
        >
          TaskPro
        </h1>
        <div className="italic text-white flex items-baseline">
          Never miss a deadline
        </div>
      </div>

      <div className="flex px-5 items-center">
        <MagnifyingGlassIcon className="w-5 h-5 text-white" />
        <input
          type="text"
          placeholder="Search for tasks ..."
          className=" bg-transparent border-0 text-white placeholder-gray-200
                outline-none focus:ring-0 text-lg"
        />
      </div>
      <div className="flex space-x-6">
        <AtSymbolIcon className="w-7 h-7 text-white" />
        <h3 className="text-white">{props.email}</h3>
        <BellAlertIcon className="w-7 h-7 text-white" />
        <div className="flex items-center text-white">
          <h3 className="font-bold mr-3">{props.name}</h3>
          <Image
            src="https://randomuser.me/api/portraits/men/75.jpg"
            width="36"
            height="36"
            objectFit="cover"
            className=" rounded-full "
          />
        </div>
      </div>
    </div>
  );
}

export default TopBar;
