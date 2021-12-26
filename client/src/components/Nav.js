import React from "react";
import { Link, useLocation } from "react-router-dom";

const Nav = ({ closeModal }) => {
    const location = useLocation();
    const path = location.pathname;
    console.log(path);
    return (
        <nav className="mt-6">
            <div>
                <Link
                    onClick={() => closeModal()}
                    className={`w-full text-gray-800 flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start ${
                        path === "/tiendo" &&
                        "border-l-4 border-purple-500 bg-purple-100"
                    }`}
                    to="/tiendo"
                >
                    <span className="text-left">
                        <svg
                            width={20}
                            height={20}
                            fill="currentColor"
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M1472 992v480q0 26-19 45t-45 19h-384v-384h-256v384h-384q-26 0-45-19t-19-45v-480q0-1 .5-3t.5-3l575-474 575 474q1 2 1 6zm223-69l-62 74q-8 9-21 11h-3q-13 0-21-7l-692-577-692 577q-12 8-24 7-13-2-21-11l-62-74q-8-10-7-23.5t11-21.5l719-599q32-26 76-26t76 26l244 204v-195q0-14 9-23t23-9h192q14 0 23 9t9 23v408l219 182q10 8 11 21.5t-7 23.5z"></path>
                        </svg>
                    </span>
                    <span className="mx-2 text-sm font-normal">Tiến độ</span>
                </Link>
                <Link
                    onClick={() => closeModal()}
                    className={`w-full text-gray-800 flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start ${
                        path === "/quanly" &&
                        "border-l-4 border-purple-500 bg-purple-100"
                    }`}
                    to="/quanly"
                >
                    <span className="text-left">
                        <svg
                            width={20}
                            height={20}
                            fill="currentColor"
                            viewBox="0 0 2048 1792"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
                        </svg>
                    </span>
                    <span className="mx-2 text-sm font-normal">Quản lý</span>
                </Link>
            </div>
        </nav>
    );
};

export default Nav;
