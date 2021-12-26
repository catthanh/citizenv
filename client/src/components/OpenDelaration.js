import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { childCodeLength, createChild } from "../helpers/role";
const OpenDelaration = () => {
    const [message, setMessage] = useState(null);
    const [status, setStatus] = useState(null);
    const auth = useAuth();
    const child = auth.child;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
        const response = await auth.openDeclaration(data);
        console.log(response);
        // setMessage(response.message);
        // setStatus(response.status);
    };

    return (
        <div className="flex flex-col w-full px-4 py-8 bg-white shadow-lg dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
            <div className="self-center mb-2 text-xl font-bold text-gray-800 sm:text-2xl dark:text-white">
                Mở quyền khai báo
            </div>
            <span className="invisible justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
                s
            </span>
            <div className="p-6 mt-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col mb-2">
                        <div className=" relative ">
                            <label
                                htmlFor="username"
                                className="font-medium text-gray-700"
                            >
                                Chọn {` ${createChild[auth.role]}:`}
                            </label>
                            <select
                                type="text"
                                id="openaddresscode"
                                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
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
                    <div className="flex flex-col mb-2">
                        <div className=" relative ">
                            <label
                                htmlFor="time_begin"
                                className="font-medium text-gray-700"
                            >
                                Thời gian bắt đầu:
                            </label>
                            <input
                                type="date"
                                id="time_begin"
                                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                name="time_begin"
                                {...register("time_begin", {
                                    required: true,
                                })}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col mb-2">
                        <div className=" relative ">
                            <label
                                htmlFor="username"
                                className="font-medium text-gray-700"
                            >
                                Thời gian kết thúc:
                            </label>
                            <input
                                type="date"
                                id="time_end"
                                name="time_end"
                                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                {...register("time_end", { required: true })}
                            />
                            <div
                                className={
                                    status === "error"
                                        ? "text-red-600"
                                        : "text-green-600"
                                }
                            >
                                {message}
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full my-4">
                        <button
                            type="submit"
                            className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                        >
                            Mở quyền khai báo
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OpenDelaration;
