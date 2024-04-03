import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PostDetail() {
    const { id } = useParams();

    useEffect(() => {
        console.log(id);
    }, []);

    return <section className="2xl:container mx-auto px-5 xl:px-40 min-h-screen"></section>;
}
