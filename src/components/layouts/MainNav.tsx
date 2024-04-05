/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Api } from "../../service/api";

export default function MainNav() {
    const [recentPosts, setRecentPosts] = useState<any>([]);
    const [recentComments, setRecentComments] = useState<any>([]);

    useEffect(() => {
        getRecents();
        getComments();
    }, []);

    const getRecents = async () => {
        try {
            const { data } = await Api.get("/post/recent");

            setRecentPosts(data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getComments = async () => {
        try {
            const { data } = await Api.get("/comment/recent");

            console.log(data);

            setRecentComments(data.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <section className="2xl:container mx-auto px-5 xl:px-40 min-h-screen">
            <div className="flex justify-center gap-10 py-10 px-2 max-lg:flex-col">
                <Outlet />
                <div className="">
                    <div className="flex-1 flex flex-col gap-5 sticky top-5">
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
                                {recentPosts.map((recentPost: any) => (
                                    <Link
                                        key={recentPost.id}
                                        to={`/post/${recentPost.id}`}
                                        className="hover:text-red-500 text-md font-medium"
                                    >
                                        {recentPost.title}
                                    </Link>
                                ))}
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
            </div>
        </section>
    );
}
