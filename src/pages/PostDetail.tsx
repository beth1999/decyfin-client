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

    useEffect(() => {
        if (id) {
            getPost(id);
            getComments(id);
        }
    }, []);

    const getPost = async (id: string) => {
        try {
            const { data } = await Api.get("/post/" + id);

            setPost(data.data);
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

    return (
        <section className="container mx-auto px-5 min-h-screen max-w-5xl">
            {post ? (
                <div className="transition-all duration-300 mx-auto p-5">
                    <p className="text-[#ef5455] text-sm font-bold uppercase py-3.5 mt-20">{post.category.name}</p>
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
                    {/* <div className="flex flex-col">
                        <label className="text-sm text-zinc-500" htmlFor="name">
                            Name <b className="text-red-400">*</b>
                        </label>
                        <input
                            id="name"
                            type="text"
                            className="rounded-md p-2 w-full border-[1px] border-zinc-500 max-w-60"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm text-zinc-500" htmlFor="email">
                            Email <b className="text-red-400">*</b>
                        </label>
                        <input
                            id="email"
                            type="text"
                            className="rounded-md p-2 w-full border-[1px] border-zinc-500 max-w-60"
                        />
                    </div> */}
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
    );
}
