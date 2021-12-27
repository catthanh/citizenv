import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { createChild } from "../helpers/role";
import { useForm } from "react-hook-form";

const CitizenList = () => {
    const auth = useAuth();
    //const child = auth.child;
    const [child, setChild] = useState([]);
    const [citizens, setCitizens] = useState([]);
    const [message, setMessage] = useState(null);
    const [status, setStatus] = useState(null);
    const { register, handleSubmit } = useForm();
    useEffect(() => {
        async function fetchData() {
            setChild(
                await auth.getChildData({ addressCode: auth.addressCode })
            );
        }
        fetchData();
    }, [auth]);
    const onSubmit = async (data) => {
        console.log(data);
        const response = await auth.getCitizenList(data);
        setCitizens(response.citizen);
        console.log(response);
        setMessage(response.message);
        setStatus(response.status);
    };
    return (
        <div className="container mx-auto lg:col-span-full">
            <div className="py-8">
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col mb-2">
                                <div className=" relative ">
                                    <label className="font-medium text-gray-700">
                                        Chọn Tỉnh/ thành phố
                                    </label>
                                    <select
                                        id="openaddresscode"
                                        className="mx-1 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                        {...register("addressCode", {
                                            required: true,
                                            validate: {},
                                        })}
                                    >
                                        {(auth.addressCode + "").length == 0 ? (
                                            child.map((childArea) => (
                                                <option
                                                    key={childArea.addressCode}
                                                    value={
                                                        childArea.addressCode
                                                    }
                                                >
                                                    {childArea.name}
                                                </option>
                                            ))
                                        ) : (
                                            <option
                                                key={auth.addressCode}
                                                value={auth.addressCode}
                                            >
                                                {auth.name}
                                            </option>
                                        )}
                                    </select>
                                </div>
                                <div className=" relative ">
                                    <label className="font-medium text-gray-700">
                                        Chọn {` ${createChild[auth.role]}:`}
                                    </label>
                                    <select
                                        id="openaddresscode"
                                        className="mx-1 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                        {...register("addressCode", {
                                            required: true,
                                            validate: {},
                                        })}
                                    >
                                        {child.map((childArea) => (
                                            <option
                                                key={childArea.addressCode}
                                                value={childArea.addressCode}
                                            >
                                                {childArea.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex w-full my-4">
                                <button
                                    type="submit"
                                    className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                >
                                    Xem danh sách dân số
                                </button>
                            </div>
                        </form>
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
