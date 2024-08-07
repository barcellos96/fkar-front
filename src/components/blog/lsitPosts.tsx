"use client";

import { useContext, useEffect } from "react";
import ArticleViewer from "./articleViewer";
import { BlogContext } from "@/providers/blog";

export default function ListPosts() {
  const { Posts, posts, value } = useContext(BlogContext);

  useEffect(() => {
    Posts();
  }, [value]);

  return (
    <div className="flex flex-col">
      <section className="mb-6">
        <h1 className="flex justify-start text-2xl font-semibold ms-10 mt-6">
          Ultimas notícias
        </h1>
      </section>

      <section className="flex flex-col slg:grid slg:grid-cols-2 lg:grid-cols-3 gap-3 items-start">
        {posts.map((post) => (
          <div className="max-w-[380px] w-full mx-auto" key={post.id}>
            <ArticleViewer
              key={post.id}
              id={post.id}
              author={post.author}
              thumbnail={post.thumbnail}
              categories={post.categories}
              resume_content={post.resume_content}
              content={post.content}
              tags={post.tags}
              title={post.title}
            />
          </div>
        ))}
      </section>
    </div>
  );
}
