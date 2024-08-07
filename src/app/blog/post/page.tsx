"use client";

import HeaderBlog from "@/components/blog/header";
import SinglePost from "@/components/blog/singlePost";
import { BlogContext, IArticleProps } from "@/providers/blog";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Post() {
  const searchParams = useSearchParams();
  const { Post, post } = useContext(BlogContext);

  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      Post(id);
      setId(id);
    }
  }, [searchParams, id]);

  return (
    <div className="bg-white h-full min-h-screen">
      <HeaderBlog />

      <section className="flex justify-center items-start ">
        {post ? <SinglePost {...post} /> : <p>Loading...</p>}
      </section>
    </div>
  );
}
