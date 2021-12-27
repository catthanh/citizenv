import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { childCodeLength, createChild } from "../helpers/role";
function CreateArea() {
    const [message, setMessage] = useState(null);
    const [status, setStatus] = useState(null);
    const auth = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
        const response = await auth.createArea(data);
        console.log(response);
        setMessage(response.message);
        setStatus(response.status);
    };

    return (
        <div className="rounded-lg flex flex-col w-full px-4 py-8 bg-white shadow-lg dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
            <div className="self-center mb-2 text-xl font-bold text-gray-800 sm:text-2xl dark:text-white">
                Khai báo cấp mã {` ${createChild[auth.role]}`}
            </div>
            <span className="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
                Lưu ý: mã khu vực chính là tên tài khoản quản lý khu vực đó
            </span>
            <div className="p-6 mt-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col mb-2">
                        <div className=" relative ">
                            <label
                                htmlFor="username"
                                className="font-medium text-gray-700"
                            >
                                Mã {` ${createChild[auth.role]}:`}
                            </label>
                            <input
                                type="text"
                                id="addresscode"
                                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                name="addresscode"
                                placeholder={`Mã ${createChild[auth.role]}`}
                                defaultValue={auth.addressCode}
                                {...register("addressCode", {
                                    required: true,
                                    validate: {
                                        length: (v) =>
                                            v.length ===
                                            childCodeLength[auth.role],
                                        number: (v) => {
                                            const regex = new RegExp(
                                                "^[0-9]*$"
                                            );
                                            return regex.test(v);
                                        },
                                    },
                                })}
                            />
                            <div className="text-red-600">
                                {errors.addressCode?.type === "length" &&
                                    `Mã ${createChild[auth.role]} thuộc ${
                                        auth.name
                                    } phải có độ dài là ${
                                        childCodeLength[auth.role]
                                    } và bắt đầu bằng ${auth.addressCode}`}
                                {errors.addressCode?.type === "number" &&
                                    `Mã ${
                                        createChild[auth.role]
                                    } chỉ bao gồm số`}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col mb-2">
                        <div className=" relative ">
                            <label
                                htmlFor="username"
                                className="font-medium text-gray-700"
                            >
                                Tên {` ${createChild[auth.role]}:`}
                            </label>
                            <input
                                type="text"
                                id="areaname"
                                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                name="areaname"
                                placeholder={`Tên ${createChild[auth.role]}`}
                                {...register("name", {
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
                                Mật khẩu:
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                placeholder="Mật khẩu"
                                {...register("password", { required: true })}
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
                            Khai báo/ cấp tài khoản
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateArea;
