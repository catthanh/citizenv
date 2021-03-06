import { LockClosedIcon, UserGroupIcon } from "@heroicons/react/solid";
import fingerprintimage from "../assets/fingerprintimage.svg";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

export default function Login() {
    const [message, setMessage] = useState(null);
    const [status, setStatus] = useState(null);
    let navigate = useNavigate();
    let location = useLocation();
    const auth = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    let from = location.state?.from?.pathname || "/";

    const onSubmit = async (data) => {
        const result = await auth.login(data.username, data.password);
        setStatus(result.status);
        setMessage(result.message);
        if (result.status === "ok") {
            navigate(from, { replace: true });
        }
    };

    return (
        <>
            <div className="flex justify-center py-10 lg:py-24 sm:px-6 lg:px-8">
                <div className="bg-white shadow-indigo-700/50 shadow-md rounded-xl min-h-full flex items-stretch">
                    <div className=" z-10  lg:flex items-center px-10 h-auto hidden  lg:w-md">
                        <img
                            src={fingerprintimage}
                            alt="fingerprint"
                            className="w-96"
                        />
                    </div>
                    <div className="   p-10 grow max-w-md w-full space-y-8 ">
                        <div>
                            <UserGroupIcon
                                className="h-10 w-10 mx-auto text-indigo-600 "
                                aria-hidden="true"
                            />
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                Đăng nhập vào tài khoản đã được cấp
                            </h2>
                        </div>
                        <form
                            className="mt-8 space-y-6"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="">
                                <div className="">
                                    <label
                                        htmlFor="username"
                                        className="font-medium text-gray-700"
                                    >
                                        Tên tài khoản
                                    </label>
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        autoComplete="username"
                                        className="my-4 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder=""
                                        {...register("username", {
                                            required: true,
                                        })}
                                    />
                                    {errors.username && (
                                        <div className="text-red-600 pb-2">
                                            Bạn phải điền tên tài khoản
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="font-medium text-gray-700"
                                    >
                                        Mật khẩu
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        className="my-4 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder=""
                                        {...register("password", {
                                            required: true,
                                        })}
                                    />
                                    {errors.password && (
                                        <div className="text-red-600 pb-2">
                                            Bạn phải điền mật khẩu
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded-sm"
                                    />
                                    <label
                                        htmlFor="remember-me"
                                        className="ml-2 block text-sm text-gray-900"
                                    >
                                        Duy trì trạng thái đăng nhập
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a
                                        href="#1"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                        Quên mật khẩu?
                                    </a>
                                </div>
                            </div> */}

                            <div>
                                <button
                                    type="submit"
                                    className=" relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                        <LockClosedIcon
                                            className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                            aria-hidden="true"
                                        />
                                    </span>
                                    Đăng nhập
                                </button>
                                {
                                    <div
                                        className={`${
                                            status === "error"
                                                ? "text-red-600"
                                                : "text-green-600"
                                        } py-2 flex justify-center`}
                                    >
                                        {message}
                                    </div>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
