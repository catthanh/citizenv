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
                <Link
                    onClick={() => closeModal()}
                    className={`w-full text-gray-800 flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start ${
                        path === "/danhsach" &&
                        "border-l-4 border-purple-500 bg-purple-100"
                    }`}
                    to="/danhsach"
                >
                    <span className="text-left">
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
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                            />
                        </svg>
                    </span>
                    <span className="mx-2 text-sm font-normal">Danh sách</span>
                </Link>
                <Link
                    onClick={() => closeModal()}
                    className={`w-full text-gray-800 flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start ${
                        path === "/nhaplieu" &&
                        "border-l-4 border-purple-500 bg-purple-100"
                    }`}
                    to="/nhaplieu"
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
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                    </svg>
                    <span className="mx-2 text-sm font-normal">Nhập liệu</span>
                </Link>
            </div>
        </nav>
    );
};

export default Nav;
