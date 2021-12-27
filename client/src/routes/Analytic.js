import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
const Analytic = () => {
    const auth = useAuth();
    const [male, setMale] = useState(0);
    const [female, setFemale] = useState(0);
    const [total, setTotal] = useState(0);
    const [age, setAge] = useState(null);
    const [aca, setAca] = useState(null);
    useEffect(() => {
        async function fetchData() {
            const pp = await auth.getCitizenNumber({
                addressCode: auth.addressCode,
            });
            const gender = await auth.getGender({
                addressCode: auth.addressCode,
            });
            const age = await auth.getAge({ addressCode: auth.addressCode });
            setMale(gender.citizenv[0].Male);
            setFemale(gender.citizenv[0].Female);
            setAge(age.citizenv[0]);
            const aca = await auth.getAca({ addressCode: auth.addressCode });

            setAca(aca.citizenv[0]);
            setTotal(pp.citizenv);
        }
        fetchData();
    }, [auth]);
    return (
        <div>
            <div className="shadow-lg px-4 py-6 w-full bg-white dark:bg-gray-800 relative">
                <p className="text-sm w-max text-gray-700 dark:text-white font-semibold border-b border-gray-200"></p>
                <div className="flex items-end space-x-2 my-6">
                    <p className="text-xl text-black dark:text-white font-bold">
                        Dân số trên địa bàn:
                    </p>
                    <span className="text-gray-600 text-xl font-bold flex items-center">
                        {total}
                    </span>
                </div>
                <div className="flex items-end space-x-2 my-6">
                    <p className="text-md text-black dark:text-white font-bold">
                        Giới tính:
                    </p>
                </div>
                <div className="dark:text-white">
                    <div className="flex items-center pb-2 mb-2 text-sm space-x-12 md:space-x-24 justify-between border-b border-gray-200">
                        <p>Nam giới</p>
                        <div className="flex items-end text-xs">{male}</div>
                    </div>
                    <div className="flex items-center mb-2 pb-2 text-sm space-x-12 md:space-x-24 justify-between border-b border-gray-200">
                        <p>Nữ giới</p>
                        <div className="flex items-end text-xs">{female}</div>
                    </div>
                </div>
                <div className="flex items-end space-x-2 my-6">
                    <p className="text-md text-black dark:text-white font-bold">
                        Độ tuổi:
                    </p>
                </div>
                <div className="dark:text-white">
                    <div className="flex items-center mb-2 pb-2 text-sm space-x-12 md:space-x-24 justify-between border-b border-gray-200">
                        <p>Trẻ em dưới 12 tuổi</p>
                        <div className="flex items-end text-xs">
                            {age && age.child}
                        </div>
                    </div>
                    <div className="flex items-center mb-2 pb-2 text-sm space-x-12 md:space-x-24 justify-between border-b border-gray-200">
                        <p>Thiếu niên từ 13 đến 18</p>
                        <div className="flex items-end text-xs">
                            {age && age.teenager}
                        </div>
                    </div>
                    <div className="flex items-center mb-2 pb-2 text-sm space-x-12 md:space-x-24 justify-between border-b border-gray-200">
                        <p>Thanh niên từ 19 đến 25</p>
                        <div className="flex items-end text-xs">
                            {age && age.pre_adult}
                        </div>
                    </div>
                    <div className="flex items-center mb-2 pb-2 text-sm space-x-12 md:space-x-24 justify-between border-b border-gray-200">
                        <p>Người lớn từ 26 đến 40</p>
                        <div className="flex items-end text-xs">
                            {age && age.pre_old}
                        </div>
                    </div>
                    <div className="flex items-center mb-2 pb-2 text-sm space-x-12 md:space-x-24 justify-between border-b border-gray-200">
                        <p>Trung niên từ 41 đến 60</p>
                        <div className="flex items-end text-xs">
                            {age && age.pre_old}
                        </div>
                    </div>
                    <div className="flex items-center mb-2 pb-2 text-sm space-x-12 md:space-x-24 justify-between border-b border-gray-200">
                        <p>Người già trên 60</p>
                        <div className="flex items-end text-xs">
                            {age && age.old_age}
                        </div>
                    </div>
                </div>
                <div className="flex items-end space-x-2 my-6">
                    <p className="text-md text-black dark:text-white font-bold">
                        Trình độ học vấn:
                    </p>
                </div>
                <div className="dark:text-white">
                    <div className="flex items-center pb-2 mb-2 text-sm space-x-12 md:space-x-24 justify-between border-b border-gray-200">
                        <p>dưới THCS</p>
                        <div className="flex items-end text-xs">
                            {aca && aca.notGra}
                        </div>
                    </div>
                    <div className="flex items-center mb-2 pb-2 text-sm space-x-12 md:space-x-24 justify-between border-b border-gray-200">
                        <p>THCS</p>
                        <div className="flex items-end text-xs">
                            {aca && aca.secondGra}
                        </div>
                    </div>
                    <div className="flex items-center mb-2 pb-2 text-sm space-x-12 md:space-x-24 justify-between border-b border-gray-200">
                        <p>THPT</p>
                        <div className="flex items-end text-xs">
                            {aca && aca.thirdGra}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytic;
