import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { createChild } from "../helpers/role";
import { useForm } from "react-hook-form";

const FillData = () => {
    const auth = useAuth();
    //const child = auth.child;
    const [data, setData] = useState([]);
    const [citizens, setCitizens] = useState([]);
    const [message, setMessage] = useState(null);
    const [status, setStatus] = useState(null);
    const { register, handleSubmit, watch, getValues, setValue } = useForm();

    useEffect(() => {
        async function fetchData() {
            setData(await auth.getChildData({ addressCode: "" }));
            (auth.addressCode + "").length === 2 &&
                setValue("addressCode1", (auth.addressCode + "").slice(0, 2));
            (auth.addressCode + "").length === 4 &&
                setValue("addressCode2", (auth.addressCode + "").slice(0, 4));
            (auth.addressCode + "").length === 6 &&
                setValue("addressCode3", (auth.addressCode + "").slice(0, 6));
        }
        fetchData();
    }, [auth, setValue]);

    const onSubmit = async (data) => {
        const addressCode =
            data.addressCode4 !== "disable"
                ? data.addressCode4
                : data.addressCode3 !== "disable"
                ? data.addressCode3
                : data.addressCode2 !== "disable"
                ? data.addressCode2
                : data.addressCode1 !== "disable"
                ? data.addressCode1
                : auth.addressCode;
        const response = await auth.getCitizenList({ addressCode });
        setCitizens(response.citizenv);
        setMessage(response.message);
        setStatus(response.status);
    };
    const parseData = (data, addressCode, matchLength = 0) => {
        let addressCodeString = addressCode + "";
        if (data) {
            if (matchLength === addressCodeString.length) return data;

            return parseData(
                data.find(
                    (area) =>
                        area.addressCode ===
                        addressCodeString.slice(0, matchLength + 2)
                ) &&
                    data.find(
                        (area) =>
                            area.addressCode ===
                            addressCodeString.slice(0, matchLength + 2)
                    ).child,
                addressCode,
                matchLength + 2
            );
        }
        return [];
    };

    return (
        <div className="container mx-auto col-span-full">
            <div className="">
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
                    <div className="inline-block  bg-white p-4 shadow rounded-lg overflow-hidden">
                        {data && auth && (
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex flex-col mb-2">
                                    <div className=" relative ">
                                        <label
                                            htmlFor="name-with-label"
                                            className="text-gray-700"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="text"
                                            id="name-with-label"
                                            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                            name="email"
                                            placeholder="Your name"
                                        />
                                    </div>
                                </div>
                                {
                                    <div className="flex flex-col mb-2">
                                        <div className=" relative ">
                                            <label className="font-medium text-gray-700">
                                                Chọn tỉnh/ thành phố
                                            </label>
                                            <select
                                                id="province"
                                                disabled={
                                                    (auth.addressCode + "")
                                                        .length >= 2
                                                }
                                                className="mx-1 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                                {...register("addressCode1", {
                                                    // validate: {
                                                    //     require: (v) =>
                                                    //         v !== "disable",
                                                    // },
                                                })}
                                            >
                                                <option
                                                    value={"disable"}
                                                    disabled
                                                >
                                                    Chọn tỉnh/ thành phố
                                                </option>
                                                {data.map((childArea) => (
                                                    <option
                                                        key={
                                                            childArea.addressCode
                                                        }
                                                        value={
                                                            childArea.addressCode
                                                        }
                                                    >
                                                        {childArea.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                }
                                {
                                    <div className="flex flex-col mb-2">
                                        <div className=" relative ">
                                            <label className="font-medium text-gray-700">
                                                Chọn quận/ huyện
                                            </label>
                                            <select
                                                id="district"
                                                disabled={
                                                    (auth.addressCode + "")
                                                        .length >= 4
                                                }
                                                defaultValue={"disable"}
                                                className="mx-1 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                                {...register("addressCode2", {
                                                    // validate: {
                                                    //     require: (v) =>
                                                    //         v !== "disable",
                                                    // },
                                                })}
                                            >
                                                <option
                                                    value={"disable"}
                                                    disabled
                                                >
                                                    Chọn quận/ huyện
                                                </option>
                                                {parseData(
                                                    data,
                                                    getValues("addressCode1") ||
                                                        (
                                                            auth.addressCode +
                                                            ""
                                                        ).slice(0, 2)
                                                ).map((area) => (
                                                    <option
                                                        key={area.addressCode}
                                                        value={area.addressCode}
                                                    >
                                                        {area.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                }
                                <div className="flex flex-col mb-2">
                                    <div className=" relative ">
                                        <label className="font-medium text-gray-700">
                                            Chọn phường/ xã
                                        </label>
                                        <select
                                            id="district"
                                            defaultValue={"disable"}
                                            className="mx-1 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                            {...register("addressCode3", {
                                                // validate: {
                                                //     require: (v) =>
                                                //         v !== "disable",
                                                // },
                                            })}
                                        >
                                            <option value={"disable"} disabled>
                                                Chọn phường/ xã
                                            </option>
                                            {parseData(
                                                data,
                                                watch("addressCode2")
                                            ).map((area) => (
                                                <option
                                                    key={area.addressCode}
                                                    value={area.addressCode}
                                                >
                                                    {area.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                {
                                    <div className="flex flex-col mb-2">
                                        <div className=" relative ">
                                            <label className="font-medium text-gray-700">
                                                Chọn thôn/ bản
                                            </label>
                                            <select
                                                id="district"
                                                defaultValue={"disable"}
                                                className="mx-1 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                                {...register("addressCode4", {
                                                    // validate: {
                                                    //     require: (v) =>
                                                    //         v !== "disable",
                                                    // },
                                                })}
                                            >
                                                <option
                                                    value={"disable"}
                                                    disabled
                                                >
                                                    Chọn thôn/ bản
                                                </option>
                                                {parseData(
                                                    data,
                                                    watch("addressCode3")
                                                ).map((area) => (
                                                    <option
                                                        key={area.addressCode}
                                                        value={area.addressCode}
                                                    >
                                                        {area.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                }

                                <div className="flex w-full justify-center my-4">
                                    <button
                                        type="submit"
                                        className="w-auto py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                    >
                                        Nhập dữ liệu
                                    </button>
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
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FillData;
