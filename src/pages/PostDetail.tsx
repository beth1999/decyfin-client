/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Api } from "../service/api";
import { format } from "date-fns";
import { useAuth } from "../context/Authprovider";
import { toast } from "react-toastify";
import { calculatePastedTime } from "../utils";

export default function PostDetail() {
    const { id } = useParams();
    const { user } = useAuth();
    const [post, setPost] = useState<any>(null);
    const [content, setContent] = useState<string>("");
    const [comments, setComments] = useState<any>([]);
    const [openVote, setOpenVote] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (openVote) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [openVote]);

    useEffect(() => {
        if (id) {
            getPost(id);
            getComments(id);
        }
    }, [id]);

    const getPost = async (id: string) => {
        try {
            const { data } = await Api.get("/post/" + id);

            setPost(data.data);

            if (
                user.isAuth &&
                !data.data.vote.y_vote.includes(user.address) &&
                !data.data.vote.n_vote.includes(user.address) &&
                data.data.vote.status === "OPEN"
            ) {
                setOpenVote(true);
            }
        } catch (err) {
            setPost(null);
        }
    };

    const getComments = async (id: string) => {
        try {
            const { data } = await Api.get("/comment/" + id);

            setComments(data.data);
        } catch (err) {
            setComments([]);
        }
    };

    const handleComment = async () => {
        if (!user.isAuth) {
            toast.warn("Please log in");
            return;
        }

        try {
            const { data } = await Api.post("/comment", {
                content: content,
                id: id,
            });

            if (data && data.status) {
                toast.success("Successfully comment");
                setContent("");
                if (id) {
                    getComments(id);
                }
            }
        } catch (err) {
            toast.error("Something went wrong!");
        }
    };

    const handleSubmit = async (choose: boolean) => {
        try {
            setLoading(true);
            const { data } = await Api.put(`/vote/choose/${post.vote.id}`, {
                choose: choose,
            });

            if (data && data.status) {
                setOpenVote(false);
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    return (
        <>
            <section className="container mx-auto px-5 min-h-screen max-w-5xl">
                {post ? (
                    <div className="transition-all duration-300 mx-auto p-5">
                        <p className="text-[#ef5455] text-sm font-bold uppercase py-3.5 mt-20">
                            {post?.category?.name}
                        </p>
                        <div className="py-2">
                            <h2 className="text-4xl font-medium">{post?.title}</h2>
                        </div>
                        <div className="flex items-center justify-start gap-2 py-3 mb-20">
                            <img src="/image/user.jpg" alt="" className="w-10 h-10 rounded-full" />
                            <div className="flex flex-col items-center gap-1">
                                <p className="text-sm font-medium">Written by admin</p>
                                <p className="text-sm font-medium">{format(post?.created_at, "MMMM dd yyyy")}</p>
                            </div>
                        </div>
                        <p className="text-zinc-600 text-sm font-semibold">{post?.content}</p>
                    </div>
                ) : null}

                <div className="px-5">
                    <hr />
                </div>

                <div className="p-5 flex flex-col items-start justify-center gap-3">
                    <h3 className="text-3xl font-medium">Leave a Reply</h3>
                    <p className="italic text-zinc-500">
                        Your email address will not be published. Required fields are marked{" "}
                        <b className="text-red-400">*</b>
                    </p>
                    <div className="w-full flex flex-col justify-center gap-5">
                        <div className="flex flex-col">
                            <label className="text-sm text-zinc-500" htmlFor="comment">
                                Commnet <b className="text-red-400">*</b>
                            </label>
                            <textarea
                                id="comment"
                                rows={5}
                                className="rounded-md p-2 w-full border-[1px] border-zinc-500 resize-y"
                                value={content}
                                onChange={e => setContent(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="flex justify-end items-center">
                            <button
                                className="bg-red-500 text-white font-medium px-6 py-2 rounded-md"
                                onClick={handleComment}
                            >
                                Post Comment
                            </button>
                        </div>
                    </div>
                </div>

                <div className="px-5">
                    <hr />
                </div>

                <div className="flex flex-col items-start justify-center gap-5 p-5">
                    {comments.map((item: any) => (
                        <div className="flex items-center justify-start gap-2" key={item.id}>
                            <img src="/image/user.jpg" alt="comment user" className="w-10 h-10 rounded-full" />
                            <div className="flex flex-col items-start justify-center gap-1">
                                <div className="flex justify-start items-center gap-3">
                                    <h5 className="text-sm font-bold">{item.user.username}</h5>
                                    <p className="text-sm text-zinc-500">{calculatePastedTime(item.created_at)}</p>
                                </div>
                                <p className="text-sm">{item.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {openVote ? (
                <div
                    className="absolute p-2 top-0 left-0 right-0 bottom-0 z-40 bg-black bg-opacity-80 flex items-center justify-center overflow-hidden"
                    onClick={() => setOpenVote(false)}
                >
                    <div
                        className="bg-white rounded-md flex flex-col justify-start items-center w-full max-w-xl"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="bg-blue-700 text-white w-full text-center font-bold text-3xl p-5 rounded-t-md">
                            Post-event Survey
                        </div>
                        <h2 className="text-xl font-bold p-10">{post.vote.question}</h2>

                        <div className="flex items-center justify-start gap-3 px-10 py-5 w-full">
                            <div className="inline-flex items-center">
                                <label
                                    className="relative flex items-center p-3 rounded-full cursor-pointer"
                                    htmlFor="html"
                                >
                                    <input
                                        name="type"
                                        type="radio"
                                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                                        id="html"
                                        onClick={() => handleSubmit(true)}
                                        disabled={loading}
                                    />
                                    <span className="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3.5 w-3.5"
                                            viewBox="0 0 16 16"
                                            fill="currentColor"
                                        >
                                            <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                                        </svg>
                                    </span>
                                </label>
                                <label
                                    className="mt-px font-light text-gray-700 cursor-pointer select-none"
                                    htmlFor="html"
                                >
                                    Yes
                                </label>
                            </div>
                            <div className="inline-flex items-center">
                                <label
                                    className="relative flex items-center p-3 rounded-full cursor-pointer"
                                    htmlFor="react"
                                >
                                    <input
                                        name="type"
                                        type="radio"
                                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                                        id="react"
                                        onClick={() => handleSubmit(false)}
                                        disabled={loading}
                                    />
                                    <span className="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3.5 w-3.5"
                                            viewBox="0 0 16 16"
                                            fill="currentColor"
                                        >
                                            <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                                        </svg>
                                    </span>
                                </label>
                                <label
                                    className="mt-px font-light text-gray-700 cursor-pointer select-none"
                                    htmlFor="react"
                                >
                                    No
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}
