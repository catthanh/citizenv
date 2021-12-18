import React from "react";
import hero from "../assets/hero.jpg";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <header className="relative  overflow-hidden min-h-screen">
                <div className="px-4 sm:px-6 md:px-8">
                    <div className="absolute inset-0 bottom-0 bg-gray-50">
                        <img
                            src={hero}
                            alt=""
                            className="absolute bottom-0 left-1/2 w-[150rem] ml-[-75rem] max-w-none h-[100rem]"
                        />
                    </div>
                    <div className="relative pt-6 lg:pt-8 flex items-center justify-between text-gray-700 font-semibold text-sm leading-6">
                        <div className="font-bold text-black text-3xl">
                            CitizenV
                        </div>
                        <div className="flex items-center">
                            <nav className="">
                                <ul className="flex items-center space-x-8">
                                    <li>
                                        <a
                                            href="https://github.com/catthanh/citizenv"
                                            className="block w-6 h-6 text-gray-400 hover:text-gray-500"
                                        >
                                            <span className="sr-only">
                                                Tailwind CSS on GitHub
                                            </span>
                                            <svg
                                                viewBox="0 0 16 16"
                                                width={24}
                                                height={24}
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
                        <h1 className="text-gray-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center">
                            Hệ thống điều tra dân số toàn quốc
                        </h1>
                        <p className="mt-6 text-lg text-gray-600 text-center max-w-3xl mx-auto">
                            Ứng dụng điều tra dân số với nhiều tính năng như{" "}
                            <span className="font-medium text-sky-500">
                                khai báo
                            </span>
                            ,{" "}
                            <span className="font-medium text-sky-500">
                                quản lý
                            </span>{" "}
                            và {/* */}{" "}
                            <span className=" font-medium text-sky-500">
                                phân tích số liệu
                            </span>{" "}
                            phục vụ công tác điều tra dân số trên toàn quốc
                        </p>
                        <div className="mt-6 sm:mt-10 flex justify-center space-x-6 text-sm">
                            <Link
                                className="bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 text-white font-semibold h-12 px-6 rounded-lg flex items-center justify-center w-full max-w-xl"
                                to="/dangnhap"
                            >
                                Bắt đầu
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Home;
