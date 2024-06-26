/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Api } from "../../service/api";

export default function MainNav() {
    const [recentPosts, setRecentPosts] = useState<any>([]);
    const [recentComments, setRecentComments] = useState<any>([]);
    const [categories, setCategories] = useState<any>([]);
    const [isEmptyVote, setIsEmptyVote] = useState<boolean>(false);
    const [isEmptySurvey, setIsEmptySurvey] = useState<boolean>(false);

    useEffect(() => {
        getRecents();
        getComments();
        getCategory();
        getSurvey();
        getVote();

        const interval = setInterval(() => {
            getSurvey();
            getVote();
        }, 5000);

        return () => clearInterval(interval);
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

            setRecentComments(data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getCategory = async () => {
        try {
            const { data } = await Api.get("/category/all");

            setCategories(data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getSurvey = async () => {
        try {
            const { data } = await Api.get("/survey/all");

            if (data.data.length > 0) {
                setIsEmptySurvey(true);
            } else {
                setIsEmptySurvey(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getVote = async () => {
        try {
            const { data } = await Api.get("/vote/all");

            if (data.data.length > 0) {
                setIsEmptyVote(true);
            } else {
                setIsEmptyVote(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <section className="2xl:container mx-auto px-5 xl:px-40 min-h-screen">
            <div className="flex justify-center gap-10 py-10 px-2 max-lg:flex-col">
                <Outlet />
                <div className="max-w-[350px]">
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
                                {recentComments.length > 0 ? (
                                    recentComments.map((recentComment: any) => (
                                        <Link
                                            to={`/post/${recentComment.post.id}`}
                                            className="hover:text-red-500 text-md font-medium"
                                            key={recentComment.id}
                                        >
                                            {recentComment.content.length > 10
                                                ? recentComment.content.slice(0, 9) + "..."
                                                : recentComment.content}
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-sm text-zinc-600 font-medium">No comments to show.</p>
                                )}
                            </div>
                        </div>
                        <div className="p-4 bg-white border-[1px] border-zinc-200 rounded-lg">
                            <h4 className="text-2xl font-bold pb-2">Categories</h4>
                            <div className="flex flex-col gap-2">
                                {categories.length > 0 ? (
                                    categories.map((category: any) => (
                                        <Link
                                            to={`/category/${category.id}`}
                                            className="hover:text-red-500 text-md font-medium"
                                            key={category.id}
                                        >
                                            {category.name.length > 10
                                                ? category.name.slice(0, 9) + "..."
                                                : category.name}
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-sm text-zinc-600 font-medium">No category to show.</p>
                                )}
                            </div>
                        </div>
                        {isEmptySurvey ? (
                            <div className="p-4 bg-black flex flex-col items-center justify-center gap-3 rounded-lg">
                                <div className="flex items-center justify-center gap-4">
                                    <img src="/image/ring.png" alt="" className="w-10" />
                                    <p className="text-white text-sm">
                                        Survey is now open. We have an exciting opportunity for you to share your
                                        thoughts and opinions.
                                    </p>
                                </div>
                                <div className="flex items-center justify-end gap-2 w-full">
                                    <Link to={"/survey"}>
                                        <button className="rounded-md bg-[#3941FF] px-5 py-1.5 text-white font-medium">
                                            Survey Now
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="p-4 bg-black flex flex-col items-center justify-center gap-3 rounded-lg">
                                <div className="flex items-center justify-center gap-4">
                                    <img src="/image/ring.png" alt="" className="w-10" />
                                    <div className="text-white text-sm font-medium text-md">
                                        <b className="text-green-500">SURVEY CLOSED</b>, Thank you for your feedback!
                                        check results.
                                    </div>
                                </div>
                                <div className="flex items-center justify-end gap-2 w-full">
                                    <Link to={"/survey"}>
                                        <button className="rounded-md bg-[#3941FF] px-5 py-1.5 text-white font-medium">
                                            Check Results
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )}

                        {isEmptyVote ? (
                            <div className="p-4 bg-black flex flex-col items-center justify-center gap-3 rounded-lg">
                                <div className="flex items-center justify-center gap-4">
                                    <img src="/image/ring.png" alt="" className="w-10" />
                                    <p className="text-white text-sm">
                                        Voting is now open. Take this opportunity to have your say and make a difference
                                    </p>
                                </div>
                                <div className="flex items-center justify-end gap-2 w-full">
                                    <Link to={"/activity"}>
                                        <button className="rounded-md bg-[#3941FF] px-5 py-1.5 text-white font-medium">
                                            Vote Now
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="p-4 bg-black flex flex-col items-center justify-center gap-3 rounded-lg">
                                <div className="flex items-center justify-center gap-4">
                                    <img src="/image/ring.png" alt="" className="w-10" />
                                    <div className="text-white text-sm font-medium text-md">
                                        <b className="text-red-500">VOTING CLOSED</b>, Thanks to all who participated!
                                        Check results now.
                                    </div>
                                </div>
                                <div className="flex items-center justify-end gap-2 w-full">
                                    <Link to={"/activity"}>
                                        <button className="rounded-md bg-[#3941FF] px-5 py-1.5 text-white font-medium">
                                            View Vote
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
