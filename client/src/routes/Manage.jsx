import React from "react";
import CreateArea from "../components/CreateArea";
import OpenDelaration from "../components/OpenDelaration";

const Manage = () => {
    return (
        <>
            <div className="w-full">
                <CreateArea />
            </div>
            <div className="w-full">
                <OpenDelaration />
            </div>
        </>
    );
};

export default Manage;
