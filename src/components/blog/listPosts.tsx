"use client";

import { useContext, useEffect, useRef, useState } from "react";
import ArticleViewer from "./articleViewer";
import { BlogContext } from "@/providers/blog";

export default function ListPosts() {
  const {
    Posts,
    posts,
    value,
    SingleTag,
    singleTag,
    SingleCategorie,
    categorieId,
    singleCategorie,
    setCategorieId,
  } = useContext(BlogContext);

  const [tagId, setTagId] = useState("");

  useEffect(() => {
    Posts(tagId, categorieId);

    if (tagId) SingleTag(tagId);

    if (categorieId) {
      setTagId("");
      SingleCategorie(categorieId);
    }
  }, [value, tagId, categorieId]);

  if (!posts) return <div>Loading...</div>;

  const handleTagClick = (id: string) => {
    setTagId(id); // Atualiza o estado com o id da tag clicada
    setCategorieId("");
  };

  return (
    <div className="flex flex-col">
      <section className="mb-4">
        <h1 className="flex justify-start text-2xl font-semibold ms-10 md:ms-0 mt-6">
          {tagId === "" && categorieId === "" && "Ultimas notícias"}
          {categorieId !== "" && "Notícias filtradas por categoria"}
          {tagId !== "" && "Notícias filtradas por tag"}
        </h1>
        {tagId !== "" && (
          <span className="px-2 bg-green-50 text-green-600 text-sm font-normal py-1 rounded-sm  ">
            {singleTag.name}
            <span
              className="pl-1 text-zinc-400 cursor-pointer"
              onClick={() => setTagId("")}
            >
              X
            </span>
          </span>
        )}

        {categorieId !== "" && (
          <span className="px-2 bg-green-50 text-green-600 text-sm font-normal py-1 rounded-sm  ">
            {singleCategorie.name}
            <span
              className="pl-1 text-zinc-400 cursor-pointer"
              onClick={() => setCategorieId("")}
            >
              X
            </span>
          </span>
        )}
        {/* Exibe o nome da primeira tag */}
      </section>

      <section className="flex flex-col slg:grid slg:grid-cols-2 lg:grid-cols-3 gap-3 items-start">
        {posts.map((post) => (
          <div
            className="min-w-[310px] lg:min-w-[320px] max-w-[380px] w-full mx-auto"
            key={post.id}
          >
            <ArticleViewer
              key={post.id}
              id={post.id}
              thumbnail={post.thumbnail}
              categories={post.categories}
              resume_content={post.resume_content}
              tags={post.tags}
              title={post.title}
              onTagClick={handleTagClick}
            />
          </div>
        ))}
      </section>
    </div>
  );
}
