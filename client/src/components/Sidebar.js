import React from "react";
import Nav from "./Nav";

const Sidebar = () => {
    return (
        <div className="h-screen hidden lg:block shadow-lg relative w-80">
            <div className="bg-white h-full dark:bg-gray-700">
                <div className="flex items-center justify-start pt-6 ml-8">
                    <p className="font-bold dark:text-white text-xl">
                        CitizenV
                    </p>
                </div>
                <Nav closeModal={() => {}} />
            </div>
        </div>
    );
};

export default Sidebar;
