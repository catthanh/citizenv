import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { createChild } from "../helpers/role";

const CitizenList = () => {
    const auth = useAuth();
    //const child = auth.child;
    const [child, setChild] = useState([]);
    useEffect(() => {
        async function fetchData() {
            setChild(
                await auth.getChildData({ addressCode: auth.addressCode })
            );
        }
        fetchData();
    }, [auth]);
    return (
        <div className="container mx-auto lg:col-span-full">
            <div className="py-8">
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                                    >
                                        {createChild[auth.role]}
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                                    >
                                        Thời gian bắt đầu:
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                                    >
                                        Thời gian kết thúc
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                                    >
                                        Đã hoàn thành:
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                                    ></th>
                                </tr>
                            </thead>
                            <tbody>
                                {child.map((childArea) => (
                                    <tr>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0"></div>
                                                <div className="ml-3">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {childArea.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {new Date(
                                                    childArea.time_begin
                                                ).toISOString()}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                12/09/2020
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                <span
                                                    aria-hidden="true"
                                                    className={`absolute inset-0 ${
                                                        childArea.time_done
                                                            ? "bg-green-200"
                                                            : "bg-red-200"
                                                    } opacity-50 rounded-full`}
                                                ></span>
                                                <span className="relative">
                                                    {childArea.time_done
                                                        ? "đã hoàn thành"
                                                        : "chưa hoàn thành"}
                                                </span>
                                            </span>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <button
                                                href="#"
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Cấp quyền
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CitizenList;
