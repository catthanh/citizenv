import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { screens } from "tailwindcss/defaultTheme";
import Header from "../components/Header";
import ModalSidebar from "../components/ModalSideBar";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../contexts/AuthContext";
import { useWindowDimensions } from "../helpers/breakpoint";
import { role } from "../helpers/role";

const Layout = () => {
    const auth = useAuth();
    const [openModalMenu, setOpenModalMenu] = useState(false);

    const toggleMenu = () => setOpenModalMenu((pre) => !pre);
    const currentWidth = useWindowDimensions().width;
    if (currentWidth > parseInt(screens.lg) && openModalMenu === true) {
        setOpenModalMenu(false);
    }
    return (
        <div className="bg-gray-100 dark:bg-gray-800 h-screen overflow-hidden relative">
            <div className="flex items-start justify-between">
                <ModalSidebar open={openModalMenu} close={toggleMenu} />
                <Sidebar />

                <div className="flex flex-col w-full md:space-y-4">
                    <Header showMenu={toggleMenu} />

                    <div className="overflow-auto h-screen pb-24 px-4 md:px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2  gap-4 my-4">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
