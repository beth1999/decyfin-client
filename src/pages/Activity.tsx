import React from "react";
import { Link } from "react-router-dom";
import { Api } from "../service/api";
import { format } from "date-fns";

export default function Activity() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [posts, setPosts] = React.useState<any>([]);

    React.useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {
        try {
            const { data } = await Api.get("/post/all");

            if (data) setPosts(data.data);
        } catch (err) {
            setPosts([]);
        }
    };

    return (
        <div className="flex flex-col flex-1">
            <h2 className="text-4xl font-medium py-10">Activity</h2>
            <div className="max-w-4xl flex flex-col gap-5 w-full">
                {posts.length > 0 ? (
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    posts.map((post: any) => (
                        <div
                            className="p-4 border-[1px] border-zinc-300 rounded-lg bg-white transition-all duration-300 hover:shadow-lg"
                            key={post.id}
                        >
                            <p className="text-[#ef5455] text-sm font-bold uppercase pb-3.5">{post.category.name}</p>
                            <div className="pb-3.5">
                                <Link to={"/post/" + post.id} className="text-2xl font-medium hover:text-red-500">
                                    {post.title}
                                </Link>
                            </div>
                            <div className="flex items-center justify-start gap-2 pb-3.5">
                                <img src="/image/user.jpg" alt="" className="w-10 h-10 rounded-full" />
                                <div className="flex flex-col items-center gap-1">
                                    <p className="text-sm font-medium">Written by admin</p>
                                    <p className="text-sm font-medium">{format(post.created_at, "MMMM dd yyyy")}</p>
                                </div>
                            </div>
                            <p className="text-zinc-600 text-sm font-semibold">{post.content}</p>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center">No Data1</div>
                )}
            </div>
        </div>
    );
}
