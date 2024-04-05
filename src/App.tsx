import { Routes, Route } from "react-router-dom";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";
import { ToastContainer, Flip } from "react-toastify";
import { AuthProvider } from "./context/Authprovider";

import Home from "./pages/Home";
import Header from "./components/layouts/header";
import Footer from "./components/layouts/footer";
import Activity from "./pages/Activity";

import "react-toastify/dist/ReactToastify.css";
import PostDetail from "./pages/PostDetail";
import MainNav from "./components/layouts/MainNav";

const projectId = "faf641330f6b3ce2811bb5eb411267df";

// Set chains
const chains = [
    {
        chainId: 56,
        name: "BNB Smart Chain Mainnet",
        currency: "BNB",
        explorerUrl: "https://bscscan.com",
        rpcUrl: "https://bsc-dataseed1.binance.org/",
    },
];

const ethersConfig = defaultConfig({
    metadata: {
        name: "Web3Modal",
        description: "Web3Modal Laboratory",
        url: "https://web3modal.com",
        icons: ["https://avatars.githubusercontent.com/u/37784886"],
    },
    defaultChainId: 1,
    rpcUrl: "https://cloudflare-eth.com",
});

// Create modal
createWeb3Modal({
    ethersConfig,
    chains,
    projectId,
    enableAnalytics: true,
    themeMode: "dark",
});

function App() {
    return (
        <AuthProvider>
            <Header />
            <Routes>
                <Route element={<MainNav />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/activity" element={<Activity />} />
                </Route>
                <Route path="/post/:id" element={<PostDetail />} />
            </Routes>
            <Footer />

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Flip}
            />
        </AuthProvider>
    );
}

export default App;
