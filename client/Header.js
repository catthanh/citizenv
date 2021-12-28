import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { role } from "../helpers/role";

const Header = ({ showMenu }) => {
    const auth = useAuth();
    console.log(auth.addressCode);
    return (
        <header className="w-full h-16 z-40 flex items-center justify-between shadow-md p-2 bg-white">
            <div className="block lg:hidden ml-6">
                <button
                    className="flex p-2 items-center rounded-full bg-white shadow text-gray-500 text-md"
                    onClick={() => showMenu()}
                >
                    <svg
                        className="w-6 h-6 text-gray-400 hover:text-gray-700 "
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>
            <div className="relative z-20 flex  h-full px-3 w-full">
                <div className="relative p-1 flex items-center w-full space-x-4 justify-begin">
                    <h1 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
                        <span className="hidden sm:inline">
                            {role[auth.role]}
                        </span>
                        {auth.role === "A1" ? "" : auth.name}
                    </h1>
                </div>
                <div className="relative p-1 flex items-center md:w-full space-x-4 justify-end">
                    <h3 className="hidden md:flex items-center text-gray-500 dark:text-white text-md">
                        {auth.addressCode +
                            ",   " +
                            (auth.role === "A1" ? "" : auth.name)}
                    </h3>
                    <span className="w-1 h-8 rounded-lg bg-gray-200"></span>
                    <button
                        onClick={auth.logout}
                        className="flex p-2 items-center rounded-full bg-white shadow text-gray-400 hover:text-gray-700 text-md"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
