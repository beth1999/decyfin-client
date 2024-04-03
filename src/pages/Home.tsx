import { Link } from "react-router-dom";
// import { useWeb3ModalAccount } from "@web3modal/ethers5/react";

function Home() {
    // const { address, isConnected } = useWeb3ModalAccount();

    return (
        <section className="2xl:container mx-auto px-5 xl:px-40 min-h-screen">
            <div className="flex justify-center gap-10 py-10 px-2 max-lg:flex-col">
                <div className="max-w-4xl">
                    <h5 className="text-lg font-medium text-[#111111] font-sans">
                        Please check your <i className="underline font-bold">SPAM FOLDER</i> after you register. Make
                        sure you white list us. The confirmation email may end up into your{" "}
                        <i className="underline font-bold">SPAM FOLDER</i>
                    </h5>
                    <div className="h-12"></div>
                    <h4 className="text-[20px] font-bold text-[#111111] font-sans">
                        The Future of Stability with Asset-Backed Cryptocurrency
                    </h4>
                    <p className="py-2 text-[#817272] font-normal">
                        In today’s fast-evolving financial landscape, the need for stability and trust in digital
                        investments has never been greater. Introducing a game-changing solution: Asset-Backed
                        Cryptocurrency. Our platform offers a unique blend of digital innovation and tangible security,
                        anchoring your investments in real-world assets like precious metals and fiat currencies.
                    </p>
                    <p className="py-2 text-[#817272] font-normal">
                        Why settle for the unpredictability of traditional cryptocurrencies when you can opt for the
                        assurance of assets with intrinsic value? Imagine the peace of mind that comes from knowing your
                        digital currency is backed by the enduring stability of gold, silver, or the strength of major
                        fiat currencies. This is not just a cryptocurrency; it is a promise of reliability and growth.
                    </p>
                    <p className="py-2 text-[#817272] font-normal">
                        We understand the importance of security in your digital transactions. That is why our platform
                        is equipped with state-of-the-art online vaults, ensuring the utmost protection for your assets.
                        Our robust security measures, coupled with strict compliance protocols, set new standards in
                        digital asset safety. Your investments are not only backed by tangible assets but also
                        safeguarded by the latest in cybersecurity technology.
                    </p>
                    <p className="py-2 text-[#817272] font-normal">
                        Furthermore, our commitment to transparency and strength is demonstrated through rigorous stress
                        testing. We continuously evaluate our platform’s liquidity and resilience, ensuring it can
                        withstand market fluctuations and unexpected events. This proactive approach guarantees that
                        your investments are managed on a platform that is not just secure but also robust and reliable.
                    </p>
                    <p className="py-2 text-[#817272] font-normal">
                        Join us on this journey towards a new era of cryptocurrency. With our asset-backed approach,
                        you’re not just investing in digital currency; you’re investing in a future where stability,
                        security, and compliance are not just ideals but realities. Experience the difference with our
                        asset-backed cryptocurrency platform – where your digital investments are as solid as the assets
                        they represent.
                    </p>
                </div>
                <div className="flex-1 flex flex-col gap-5">
                    <div className="p-4 bg-white border-[1px] border-zinc-200 rounded-lg">
                        <p>Search</p>
                        <div className="flex items-center justify-center gap-2">
                            <input
                                type=""
                                className="border-[1px] border-zinc-500 py-1.5 px-1 sm:px-3 w-full sm:min-w-[150px]"
                            />
                            <button className="px-5 py-2 bg-[#ef5455] text-white font-semibold rounded-md">
                                Search
                            </button>
                        </div>
                    </div>
                    <div className="p-4 bg-white border-[1px] border-zinc-200 rounded-lg">
                        <h4 className="text-2xl font-bold pb-2">Recent Posts</h4>
                        <div className="flex flex-col gap-2">
                            <Link to="/" className="hover:text-red-500 text-md font-medium">
                                Check Spam Folder
                            </Link>
                            <Link to="/" className="hover:text-red-500 text-md font-medium">
                                Pre-Sale of our coin will start soon.
                            </Link>
                        </div>
                    </div>
                    <div className="p-4 bg-white border-[1px] border-zinc-200 rounded-lg">
                        <h4 className="text-2xl font-bold pb-2">Recent Comments</h4>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm text-zinc-600 font-medium">No comments to show.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Home;
