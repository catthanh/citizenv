import { Dialog } from "@headlessui/react";

import Nav from "./Nav";

const ModalSidebar = ({ open, close }) => {
    return (
        <Dialog
            as="div"
            open={open}
            onClose={() => close()}
            className="fixed z-40 inset-0 overflow-y-auto"
        >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            <div className="z-40 shadow-lg fixed inset-0 overflow-y-auto w-80 min-h-screen">
                <div className="bg-white h-full dark:bg-gray-700">
                    <div className="flex items-center justify-between  pt-6 mx-8">
                        <Dialog.Title
                            as="h1"
                            className="font-bold dark:text-white text-xl"
                        >
                            CitizenV
                        </Dialog.Title>
                        <button className="" onClick={() => close()}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <Nav closeModal={close} />
                </div>
            </div>
        </Dialog>
    );
};

export default ModalSidebar;
