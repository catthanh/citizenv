import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { createChild } from "../helpers/role";
import { useForm } from "react-hook-form";

const FillData = () => {
    const auth = useAuth();
    //const child = auth.child;
    const [message, setMessage] = useState(null);
    const [status, setStatus] = useState(null);
    const { register, handleSubmit, watch, getValues, setValue } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        const response = auth.filldata(data);
        setMessage(response.message);
        setStatus(response.status);
    };

    return (
        <div className="container mx-auto col-span-full flex justify-center">
            <div className="">
                <div className="-mx-4 sm:-mx-8 px-4 max-w-3xl  overflow-x-auto">
                    <div className="flex justify-center  bg-white p-4 shadow rounded-lg overflow-hidden">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col mb-2">
                                <div className=" relative ">
                                    <label
                                        htmlFor="fullname"
                                        className="text-gray-900"
                                    >
                                        Họ Tên
                                    </label>
                                    <input
                                        type="text"
                                        id="fullname"
                                        className="mx-1 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                        name="email"
                                        {...register("ten", {
                                            required: true,
                                        })}
                                    />
                                </div>
                                <div className=" relative ">
                                    <label
                                        htmlFor="birthday"
                                        className="text-gray-900"
                                    >
                                        Ngày sinh
                                    </label>
                                    <input
                                        type="date"
                                        id="birthday"
                                        className="mx-1 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                        name="birthday"
                                        {...register("ngaysinh", {
                                            required: true,
                                        })}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col mb-2">
                                <label
                                    htmlFor="birthday"
                                    className="text-gray-900"
                                >
                                    Giới tính
                                </label>
                                <div className="flex justify-center">
                                    <div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                type="radio"
                                                name="gioitinh"
                                                id="nam"
                                                value="Nam"
                                                {...register("gioitinh", {})}
                                            />
                                            <label
                                                className="form-check-label inline-block text-gray-800"
                                                htmlFor="flexRadioDefault1"
                                            >
                                                Nam
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                type="radio"
                                                name="gioitinh"
                                                id="nu"
                                                defaultChecked
                                                value="Nữ"
                                                {...register("gioitinh", {})}
                                            />
                                            <label
                                                className="form-check-label inline-block text-gray-800"
                                                htmlFor="flexRadioDefault2"
                                            >
                                                Nữ
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" relative ">
                                <label
                                    htmlFor="fullname"
                                    className="text-gray-900"
                                >
                                    Số CMND/CCCD
                                </label>
                                <input
                                    type="text"
                                    id="cmnd"
                                    className="mx-1 mb-2 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    name="CCCD"
                                    {...register("CCCD", {
                                        required: true,
                                    })}
                                />
                            </div>
                            <div className=" relative ">
                                <label
                                    htmlFor="fullname"
                                    className="text-gray-900"
                                >
                                    Quê quán
                                </label>
                                <input
                                    type="text"
                                    id="quequan"
                                    className="mx-1 mb-2 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    name="quequan"
                                    {...register("quequan", {
                                        required: true,
                                    })}
                                />
                            </div>
                            <div className=" relative ">
                                <label
                                    htmlFor="fullname"
                                    className="text-gray-900"
                                >
                                    Hộ khẩu thường trú
                                </label>
                                <input
                                    type="text"
                                    id="hktt"
                                    className="mx-1 mb-2 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    name="dcthuongtru"
                                    {...register("dcthuongtru", {
                                        required: true,
                                    })}
                                />
                            </div>
                            <div className=" relative ">
                                <label
                                    htmlFor="fullname"
                                    className="text-gray-900"
                                >
                                    Hộ khẩu tạm trú
                                </label>
                                <input
                                    type="text"
                                    id="hktt"
                                    className="mx-1 mb-2 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    name="hktt"
                                    {...register("dctamtru", {})}
                                />
                            </div>
                            <div className=" relative ">
                                <label
                                    htmlFor="fullname"
                                    className="text-gray-900"
                                >
                                    Tôn giáo
                                </label>
                                <input
                                    type="text"
                                    id="tdvh"
                                    className="mx-1 mb-2 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    name="tongiao"
                                    {...register("tongiao", {
                                        required: true,
                                    })}
                                />
                            </div>
                            <div className=" relative ">
                                <label
                                    htmlFor="fullname"
                                    className="text-gray-900"
                                >
                                    Trình độ văn hoá
                                </label>
                                <input
                                    type="text"
                                    id="tdvh"
                                    className="mx-1 mb-2 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    name="trinhdovh"
                                    {...register("trinhdovh", {
                                        required: true,
                                    })}
                                />
                            </div>
                            <div className=" relative ">
                                <label
                                    htmlFor="fullname"
                                    className="text-gray-900"
                                >
                                    Nghề nghiệp
                                </label>
                                <input
                                    type="text"
                                    id="job"
                                    className="mx-1 mb-2 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    name="nghe"
                                    {...register("nghe", {
                                        required: true,
                                    })}
                                />
                            </div>

                            <div className="flex w-full justify-center my-4">
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
                            <div className="flex w-full justify-center my-4">
                                <button
                                    type="submit"
                                    className="w-auto  py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                >
                                    Nhập dữ liệu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FillData;
