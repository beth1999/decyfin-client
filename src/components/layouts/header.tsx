import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useWeb3Modal, useWeb3ModalAccount, useWeb3ModalProvider, useDisconnect } from "@web3modal/ethers5/react";
import { ethers } from "ethers";
import { FaBars, FaBarsStaggered } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { GrLogin } from "react-icons/gr";

import { menu } from "./config";
import { useAuth } from "../../context/Authprovider";
import { Api } from "../../service/api";
import { toast } from "react-toastify";

function Header() {
    const { updateAuth, user, removeAuth } = useAuth();
    const [navOpen, setNavOpen] = useState<boolean>(false);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const { open } = useWeb3Modal();
    const { isConnected } = useWeb3ModalAccount();
    const { disconnect } = useDisconnect();
    const { walletProvider } = useWeb3ModalProvider();

    useEffect(() => {
        if (walletProvider) {
            handleSubmit(walletProvider);
        }
    }, [isConnected, walletProvider]);

    const handleSubmit = async (wProvider: ethers.providers.ExternalProvider) => {
        try {
            const provider = new ethers.providers.Web3Provider(wProvider);
            const signer = provider.getSigner();

            const id = Date.now();
            const message: string = "wallet_login_" + id * 3;
            const signature: string = await signer.signMessage(message);

            const { data } = await Api.post("/auth/login", { signature, message });

            if (data && data.status) {
                updateAuth(data.token);
            } else {
                throw new Error("Something went wrong!");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            disconnect();
            if (err.response?.data) {
                toast.error(err.response.data);
            } else {
                toast.error("something went wrong!");
            }
        }
    };

    const logOut = async () => {
        disconnect();
        removeAuth();
        setMenuOpen(false);
    };

    return (
        <header className="bg-white shadow-md">
            <div className="2xl:container mx-auto px-5 xl:px-40 md:px-10 py-2">
                <div className="relative flex justify-between items-center flex-wrap">
                    <div className="flex items-center justify-center gap-[3vw] sm:gap-5">
                        <img src="/image/logo.jpg" alt="" className="w-20 md:w-32" />
                        <div className="flex flex-col gap-[0.2vw] sm:gap-1">
                            <Link
                                to={"/"}
                                className="text-[4vw] sm:text-2xl md:text-4xl font-semibold hover:text-red-500"
                            >
                                Decyfin community
                            </Link>
                            <p className="max-sm:text-[2.5vw] max-md:text-sm font-semibold text-zinc-500">
                                Join Decyfin Community
                            </p>
                        </div>
                    </div>
                    <div className="hidden md:flex justify-center items-center gap-10 py-5">
                        <ul className="flex items-center justify-center gap-7 text-sm font-semibold">
                            {menu.map((item: MenuListInterface, index: number) => (
                                <li key={"menu-item-" + index}>
                                    <Link to={item.href} className="hover:text-red-500">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div>
                            {user.isAuth ? (
                                <div
                                    className="flex items-center justify-center gap-2 cursor-pointer"
                                    onClick={() => setMenuOpen(!menuOpen)}
                                >
                                    <img src={user.avatar} alt="" className="w-8 h-8" />
                                    <p className="text-sm font-bold flex items-center justify-center gap-2 whitespace-nowrap select-none">
                                        {user.username}
                                    </p>
                                </div>
                            ) : (
                                <button
                                    className="text-sm font-bold flex items-center justify-center gap-2 hover:text-red-600 whitespace-nowrap"
                                    onClick={() => open()}
                                >
                                    <GrLogin />
                                    Log in
                                </button>
                            )}
                        </div>
                    </div>
                    <button className="md:hidden text-xl" onClick={() => setNavOpen(!navOpen)}>
                        {!navOpen ? <FaBars /> : <FaBarsStaggered />}
                    </button>

                    {menuOpen ? (
                        <div className="absolute right-0 top-[100%] bg-white flex flex-col items-start justify-center px-8 py-5 rounded-sm shadow-md shadow-zinc-300">
                            <div className="flex">
                                <p>{user.address.slice(0, 4) + "..." + user.address.slice(-5)}</p>
                            </div>
                            <button
                                className="text-sm font-bold flex items-center justify-center gap-2 hover:text-red-600 whitespace-nowrap"
                                onClick={logOut}
                            >
                                Log out
                            </button>
                        </div>
                    ) : null}
                </div>
            </div>

            <div
                className={
                    "fixed left-0 right-0 top-0 bottom-0 bg-black bg-opacity-70 z-50 flex justify-end transition-all duration-500 " +
                    (navOpen ? "visible" : "invisible")
                }
                onClick={() => setNavOpen(false)}
            >
                <div
                    className={
                        "h-full flex flex-col transition-all duration-500 overflow-hidden " +
                        (navOpen ? "w-[280px]" : "w-0")
                    }
                    onClick={e => e.stopPropagation()}
                >
                    <div className="bg-black flex items-center justify-between w-full text-white p-5">
                        <h4 className="text-2xl font-bold">Menu</h4>
                        <button
                            className="text-xs hover:text-red-500 flex items-center justify-center gap-2"
                            onClick={() => setNavOpen(false)}
                        >
                            CLOSE
                            <MdClose />
                        </button>
                    </div>
                    <div className="bg-white h-full p-8">
                        <ul className="text-md font-semibold flex flex-col gap-2 select-none">
                            {menu.map((item: MenuListInterface, index: number) => (
                                <li key={"menu-item-" + index}>
                                    <Link to={item.href} className="hover:text-red-500">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="w-full h-[1px] bg-zinc-300 my-3"></div>

                        {user.isAuth ? (
                            <div
                                className="flex items-center justify-center gap-2 cursor-pointer"
                                onClick={() => logOut()}
                            >
                                <img src={user.avatar} alt="" className="w-8 h-8" />
                                <p className="text-sm font-bold flex items-center justify-center gap-2 whitespace-nowrap">
                                    {user.username}
                                </p>
                            </div>
                        ) : (
                            <button
                                className="text-sm font-bold flex items-center justify-center gap-2 hover:text-red-600 whitespace-nowrap"
                                onClick={() => open()}
                            >
                                <GrLogin />
                                Log in
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
