"use client";

import HeaderBlog from "@/components/blog/header";
import SinglePost from "@/components/blog/singlePost";
import Loading from "@/components/loading";
import { BlogContext } from "@/providers/blog";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState, Suspense } from "react";

function PostContent({ id }: { id: string }) {
  const { Post, post } = useContext(BlogContext);

  useEffect(() => {
    Post(id);
  }, [id, Post]);

  if (!post) return <Loading />;

  return <SinglePost {...post} />;
}

export default function Post() {
  const searchParams = useSearchParams();
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setId(id);
    }
  }, [searchParams]);

  return (
    <div className="bg-white h-full min-h-screen">
      <HeaderBlog />
      <section className="flex justify-center items-start p-4">
        {id ? (
          <Suspense fallback={<Loading />}>
            <PostContent id={id} />
          </Suspense>
        ) : (
          <Loading />
        )}
      </section>
    </div>
  );
}
