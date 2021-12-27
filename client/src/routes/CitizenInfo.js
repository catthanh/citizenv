import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const CitizenInfo = () => {
    let params = useParams();
    let auth = useAuth();
    const [citizen, setCitizen] = useState(null);
    useEffect(() => {
        async function fetchData() {
            setCitizen(await auth.getCitizenInfo({ id: params.id }));
        }
        fetchData();
    }, [auth, params]);
    return (
        <div>
            <p class="text-gray-800  text-xl font-medium mb-4">
                {citizen && citizen.fullname}
            </p>
            <p class="text-gray-700  text-md mt-4">
                CMND: {citizen && citizen.cmnd}
            </p>
            <p class="text-gray-700  text-md mt-4">
                Ngày sinh: {citizen && citizen.dateofbirth}
            </p>
            <p class="text-gray-700  text-md mt-4">
                Giới tính: {citizen && citizen.gender}
            </p>
            <p class="text-gray-700  text-md mt-4">
                Quê quán: {citizen && citizen.countryside}
            </p>
            <p class="text-gray-700  text-md mt-4">
                Hộ khẩu thường trú: {citizen && citizen.tempararyaddress}
            </p>
            <p class="text-gray-700  text-md mt-4">
                Hộ khẩu tạm trú: {citizen && citizen.birthday}
            </p>
            <p class="text-gray-700  text-md mt-4">
                Trình độ học vấn: {citizen && citizen.academiclevel}
            </p>
            <p class="text-gray-700  text-md mt-4">
                Tôn giáo: {citizen && citizen.religion}
            </p>
            <p class="text-gray-700  text-md mt-4">
                Nghề nghiệp: {citizen && citizen.job}
            </p>
        </div>
    );
};

export default CitizenInfo;
