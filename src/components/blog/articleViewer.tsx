"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface Tag {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
}

interface ArticleProps {
  id: string;
  title: string;
  author: string;
  thumbnail: string;
  resume_content: string;
  content: string;
  tags: Tag[];
  categories: Category[];
}

const ArticleViewer: React.FC<ArticleProps> = ({
  id,
  title,
  author,
  thumbnail,
  resume_content,
  content,
  tags,
  categories,
}) => {
  const { push } = useRouter();

  const handleClick = () => {
    const query = new URLSearchParams({ title: title, id: id }).toString();
    push(`/blog/post?${query}`);
  };

  return (
    <div className="flex flex-col border border-zinc-200 rounded-lg p-3">
      <img
        alt="thumbnail"
        src={thumbnail}
        className="rounded-md w-full h-48 object-cover transition-transform duration-300 delay-100 hover:scale-95 cursor-pointer"
        onClick={handleClick}
      />
      <section className="flex flex-wrap ml-2 my-4 gap-2">
        {tags.map((tag) => (
          <span
            className="px-2 bg-green-50 text-green-600 text-sm font-normal py-1 rounded-sm cursor-pointer hover:bg-green-100 hover:text-green-900"
            key={tag.id}
          >
            {tag.name}
          </span>
        ))}
      </section>
      <section className="flex flex-col ms-3">
        <h2
          onClick={handleClick}
          className="font-bold text-lg mb-2 cursor-pointer hover:text-shadow"
        >
          {title}
        </h2>
        <span className="font-light text-lg mb-2">{resume_content}</span>

        {/* ALTERAR TITLE PARA SLUG FUTURAMENTE */}
        <Link
          href={{
            pathname: `/blog/post`,
            query: { title: title, id: id },
          }}
          className="flex items-center justify-center bg-green-700 text-base text-white rounded-md w-32 py-1 px-2 my-2 hover:bg-opacity-80"
        >
          Continuar lendo
        </Link>
      </section>
    </div>
  );
};

export default ArticleViewer;
