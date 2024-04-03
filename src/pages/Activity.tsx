import { Link } from "react-router-dom";

export default function Activity() {
    return (
        <section className="2xl:container mx-auto px-5 xl:px-40 min-h-screen">
            <h2 className="text-4xl font-medium py-10">Activity</h2>
            <div className="flex justify-center gap-10 py-10 max-lg:flex-col">
                <div className="max-w-4xl flex flex-col gap-5 flex-1">
                    <div className="p-4 border-[1px] border-zinc-300 rounded-lg bg-white transition-all duration-300 hover:shadow-lg">
                        <p className="text-[#ef5455] text-sm font-bold uppercase pb-3.5">Uncategorized</p>
                        <div className="pb-3.5">
                            <Link to="/" className="text-2xl font-medium hover:text-red-500">
                                Check Spam Folder
                            </Link>
                        </div>
                        <div className="flex items-center justify-start gap-2 pb-3.5">
                            <img src="/image/user.jpg" alt="" className="w-10 h-10 rounded-full" />
                            <div className="flex flex-col items-center gap-1">
                                <p className="text-sm font-medium">Written by admin</p>
                                <p className="text-sm font-medium">January 18, 2024</p>
                            </div>
                        </div>
                        <p className="text-zinc-600 text-sm font-semibold">
                            Please check your SPAM FOLDER after you register. Make sure you white list us. The
                            confirmation email may end up into your SPAM FOLDER.
                        </p>
                    </div>

                    <div className="p-4 border-[1px] border-zinc-300 rounded-lg bg-white transition-all duration-300 hover:shadow-lg">
                        <p className="text-[#ef5455] text-sm font-bold uppercase pb-3.5">Uncategorized</p>
                        <div className="pb-3.5">
                            <Link to="/" className="text-2xl font-medium hover:text-red-500">
                                Pre-Sale of our coin will start soon.
                            </Link>
                        </div>
                        <div className="flex items-center justify-start gap-2 pb-3.5">
                            <img src="/image/user.jpg" alt="" className="w-10 h-10 rounded-full" />
                            <div className="flex flex-col items-center gap-1">
                                <p className="text-sm font-medium">Written by admin</p>
                                <p className="text-sm font-medium">January 18, 2024</p>
                            </div>
                        </div>
                        <p className="text-zinc-600 text-sm font-semibold"></p>
                    </div>
                </div>
                <div className="flex flex-col gap-5">
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
