/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Api } from "../service/api";
import { format } from "date-fns";
import { useAuth } from "../context/Authprovider";
import { toast } from "react-toastify";
import { calculatePastedTime } from "../utils";
import { CiCircleCheck } from "react-icons/ci";

export default function PostDetail() {
    const { id } = useParams();
    const { user } = useAuth();
    const [post, setPost] = useState<any>(null);
    const [content, setContent] = useState<string>("");
    const [comments, setComments] = useState<any>([]);
    const [openVote, setOpenVote] = useState<boolean>(false);
    const [percent, setPercent] = useState<{ yes: number; no: number; not: number }>({
        yes: 0,
        no: 0,
        not: 0,
    });
    const [selected, setSelected] = useState<{ yes: boolean; no: boolean; not: boolean }>({
        yes: false,
        no: false,
        not: false,
    });

    useEffect(() => {
        if (id) {
            getPost(id);
            getComments(id);
        }
    }, [id, user.isAuth]);

    const getPost = async (id: string) => {
        try {
            const { data } = await Api.get("/post/" + id);

            console.log(data);
            setPost(data.data);

            if (data.data.voteStatus) {
                if (
                    !data.data.vote.y_vote.includes(user.address) &&
                    !data.data.vote.n_vote.includes(user.address) &&
                    !data.data.vote.nt_vote.includes(user.address) &&
                    data.data.vote.status === "OPEN"
                ) {
                    setOpenVote(true);
                } else {
                    const totalSum =
                        data.data.vote.y_vote.length + data.data.vote.n_vote.length + data.data.vote.nt_vote.length;
                    setPercent({
                        yes: (data.data.vote.y_vote.length / totalSum) * 100,
                        no: (data.data.vote.n_vote.length / totalSum) * 100,
                        not: (data.data.vote.nt_vote.length / totalSum) * 100,
                    });
                    if (data.data.vote.y_vote.includes(user.address)) {
                        setSelected({
                            ...selected,
                            yes: true,
                        });
                    }
                    if (data.data.vote.n_vote.includes(user.address)) {
                        setSelected({
                            ...selected,
                            no: true,
                        });
                    }
                    if (data.data.vote.n_vote.includes(user.address)) {
                        setSelected({
                            ...selected,
                            not: true,
                        });
                    }
                    setOpenVote(false);
                }
            }
        } catch (err) {
            console.log(err);
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

    const handleSubmit = async (choose: number) => {
        try {
            if (!user.isAuth) {
                toast.warn("Please login");
                return;
            }

            const { data } = await Api.put(`/vote/choose/${post.vote.id}`, {
                choose: choose,
            });

            if (data && data.status) {
                setOpenVote(false);
                if (id) {
                    getPost(id);
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <section className="container mx-auto px-5 min-h-screen max-w-5xl">
            {post ? (
                <div className="transition-all duration-300 mx-auto p-5">
                    <p className="text-[#ef5455] text-sm font-bold uppercase py-3.5 mt-20">{post?.category?.name}</p>
                    <div className="py-2">
                        <h2 className="text-4xl font-medium">{post?.title}</h2>
                    </div>
                    <div className="flex items-center justify-start gap-2 py-3">
                        <img src="/image/user.jpg" alt="" className="w-10 h-10 rounded-full" />
                        <div className="flex flex-col items-center gap-1">
                            <p className="text-sm font-medium">Written by admin</p>
                            <p className="text-sm font-medium">{format(post?.created_at, "MMMM dd yyyy")}</p>
                        </div>
                    </div>

                    {post.voteStatus ? (
                        <div className="flex flex-col justify-center items-start my-16 gap-5">
                            <div className="">
                                <h4 className="text-xl font-bold">{post.vote.question}</h4>
                            </div>
                            <div className="flex flex-col items-start justify-center w-full gap-3">
                                {openVote ? (
                                    <button
                                        className="px-3 py-1 border-[1px] border-cyan-400 text-sm font-semibold hover:bg-cyan-400 hover:bg-opacity-30 rounded-full w-full transition-all duration-300 max-w-xl mx-auto"
                                        onClick={() => handleSubmit(1)}
                                    >
                                        Yes
                                    </button>
                                ) : (
                                    <div className="text-sm px-3 py-1 bg-zinc-300 w-full rounded-md border-[1px] border-zinc-300 flex items-center justify-between">
                                        <div className="flex items-center justify-center gap-1">
                                            <p>Yes</p>
                                            {selected.yes ? <CiCircleCheck className="text-lg" /> : null}
                                        </div>
                                        <p>{percent.yes}%</p>
                                    </div>
                                )}
                                {openVote ? (
                                    <button
                                        className="px-3 py-1 border-[1px] border-cyan-400 text-sm font-semibold hover:bg-cyan-400 hover:bg-opacity-30 rounded-full w-full transition-all duration-300 max-w-xl mx-auto"
                                        onClick={() => handleSubmit(0)}
                                    >
                                        No
                                    </button>
                                ) : (
                                    <div className="text-sm px-3 py-1 bg-zinc-300 w-full rounded-md border-[1px] border-zinc-300 flex items-center justify-between">
                                        <div className="flex items-center justify-center gap-1">
                                            <p>No</p>
                                            {selected.no ? <CiCircleCheck className="text-lg" /> : null}
                                        </div>
                                        <p>{percent.no}%</p>
                                    </div>
                                )}
                                {openVote ? (
                                    <button
                                        className="px-3 py-1 border-[1px] border-cyan-400 text-sm font-semibold hover:bg-cyan-400 hover:bg-opacity-30 rounded-full w-full transition-all duration-300 max-w-xl mx-auto"
                                        onClick={() => handleSubmit(2)}
                                    >
                                        Not Sure
                                    </button>
                                ) : (
                                    <div className="text-sm px-3 py-1 bg-zinc-300 w-full rounded-md border-[1px] border-zinc-300 flex items-center justify-between">
                                        <div className="flex items-center justify-center gap-1">
                                            <p className="">Not Sure</p>
                                            {selected.not ? <CiCircleCheck className="text-lg" /> : null}
                                        </div>
                                        <p className="">{percent.not}%</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : null}

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
                            Comment <b className="text-red-400">*</b>
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
    );
}
