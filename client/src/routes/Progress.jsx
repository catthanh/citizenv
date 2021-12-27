import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { createChild } from "../helpers/role";

const Progress = () => {
    const auth = useAuth();
    //const child = auth.child;
    const [child, setChild] = useState([]);
    const [haspermission, setHaspermission] = useState(0);
    const [declaring, setDeclaring] = useState(0);
    const [done, setDone] = useState(0);
    const [people, setPeople] = useState(0);
    useEffect(() => {
        async function fetchData() {
            setChild(
                await auth.getChildData({ addressCode: auth.addressCode })
            );
            const pp = await auth.getCitizenNumber({
                addressCode: auth.addressCode,
            });

            setPeople(pp.citizenv);
        }
        fetchData();
    }, [auth]);
    useEffect(() => {
        setHaspermission(0);
        setDeclaring(0);
        setDone(0);
        for (const v of child) {
            if (v.time_begin) {
                console.log(v);
                setHaspermission((haspermission) => haspermission + 1);
            }
            if (v.time_end && new Date(v.time_end) > new Date()) {
                setDeclaring((declaring) => declaring + 1);
            }
            if (v.time_done) {
                setDone((done) => done + 1);
            }
        }
    }, [child]);
    console.log(child);
    console.log(auth.addressCode);
    return (
        <>
            <div className="col-span-full">
                <div className="shadow-lg rounded-xl w-full lg:w-1/2 p-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100 relative overflow-hidden">
                    <Link to={"/"} className="w-full h-full block">
                        <div className="w-full">
                            <h2 className="text-gray-700   text-2xl font-semibold mb-4">
                                Tiến độ nhập liệu
                            </h2>
                            <div className="flex items-center justify-between text-gray-700 text-sm">
                                <p>
                                    Số {`${createChild[auth.role]}`} đã được cấp
                                    quyền khai báo
                                </p>
                                <p>{haspermission + "/" + child.length}</p>
                            </div>
                            <div className="w-full h-2 bg-green-100 rounded-full mb-4">
                                <div
                                    className={` h-full text-center text-xs text-white bg-green-400 rounded-full`}
                                    style={{
                                        width:
                                            (haspermission / child.length) *
                                                100 +
                                            "%",
                                    }}
                                ></div>
                            </div>
                            <div className="flex items-center justify-between text-gray-700 text-sm">
                                <p>
                                    Số {`${createChild[auth.role]}`} đang trong
                                    thời gian khai báo
                                </p>
                                <p>{declaring + "/" + child.length}</p>
                            </div>
                            <div className="w-full h-2 bg-indigo-100 rounded-full mb-4">
                                <div
                                    className={` h-full text-center text-xs text-white bg-indigo-400 rounded-full`}
                                    style={{
                                        width:
                                            (declaring / child.length) * 100 +
                                            "%",
                                    }}
                                ></div>
                            </div>
                            <div className="flex items-center justify-between text-gray-700 text-sm">
                                <p>
                                    Số {`${createChild[auth.role]}`} đã khai báo
                                    xong
                                </p>
                                <p>{done + "/" + child.length}</p>
                            </div>
                            <div className="w-full h-2 bg-blue-100 rounded-full mb-4">
                                <div
                                    className={` h-full text-center text-xs text-white bg-blue-400 rounded-full`}
                                    style={{
                                        width:
                                            (done / child.length) * 100 + "%",
                                    }}
                                ></div>
                            </div>
                            <div className="flex items-center justify-between text-gray-700 text-sm">
                                <p>Số lượng công dân đã khai báo</p>
                                <p>{people}</p>
                            </div>
                            <div className="w-full h-2 bg-pink-100 rounded-full">
                                <div className="w-full h-full text-center text-xs text-white bg-pink-400 rounded-full"></div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
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
                                        <tr key={childArea.addressCode}>
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
                                                    {childArea.time_begin
                                                        ? new Date(
                                                              childArea.time_begin
                                                          )
                                                              .toISOString()
                                                              .split("T")[0]
                                                        : "chưa cấp quyền"}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {childArea.time_begin
                                                        ? new Date(
                                                              childArea.time_end
                                                          )
                                                              .toISOString()
                                                              .split("T")[0]
                                                        : "chưa cấp quyền"}
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
                                                <Link
                                                    as="button"
                                                    to="/quanly"
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    Cấp quyền
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Progress;
