"use client";

import IconeAutor from "../../assets/icon-author.png";
import { formatDate } from "@/hooks/dateBlog";
import { useEffect } from "react";

import "./style.css";

// Definindo a interface para tags
interface Tag {
  id: string;
  name: string;
}

// Definindo a interface para categorias
interface Category {
  id: string;
  name: string;
}

// Definindo a interface para o artigo
interface ArticleProps {
  id: string;
  title: string;
  author: string;
  thumbnail: string;
  resume_content: string;
  content: string;
  tags: Tag[];
  categories: Category[];
  created_at: string; // Você pode usar Date se preferir converter para Date em vez de string
  updated_at: string; // Idem para Date
}

const PostContent = (content: string) => {
  useEffect(() => {
    const section = document.querySelector("section");
    if (section) {
      const h1s = section.querySelectorAll("h1");
      const h2s = section.querySelectorAll("h2");

      h1s.forEach((h1) => (h1.style.fontSize = "2em")); // Ajuste o tamanho conforme necessário
      h2s.forEach((h2) => (h2.style.fontSize = "1.5em")); // Ajuste o tamanho conforme necessário
    }
  }, [content]);

  return <section dangerouslySetInnerHTML={{ __html: content }} />;
};

export default function SinglePost({ ...post }: any) {
  console.log("post", post);
  // Converter created_at para Date se ainda não for um
  const createdAtDate = new Date(post.created_at);

  // Verificar se a data é válida
  const isValidDate = !isNaN(createdAtDate.getTime());

  return (
    <div className="py-6 px-4 max-w-[1000px]">
      <section className="flex mb-2 gap-2">
        {post.tags &&
          post.tags.map((tag: { id: string; name: string }) => (
            <span
              className="px-2 bg-green-50 text-green-600 text-sm font-normal py-1 rounded-sm cursor-pointer hover:bg-green-100 hover:text-green-900"
              key={tag.id}
            >
              {tag.name}
            </span>
          ))}
      </section>
      <h1 className="font-semibold text-3xl mb-2 cursor-pointer hover:text-shadow">
        {post.title}
      </h1>
      <section className="flex gap-1 items-center mb-7">
        <img alt="icone autor" src={IconeAutor.src} className="h-5 w-5" />
        <section className="flex items-center gap-6">
          <span className="font-medium text-base ">{post.author}</span>
          <span className="font-normal text-base">
            {isValidDate ? formatDate(createdAtDate) : "Data inválida"}
          </span>
        </section>
      </section>

      <img
        alt="thumbnail"
        src={post.thumbnail}
        className="rounded-xl max-h-[482px] w-full object-cover mb-10"
      />

      <div className="flex flex-col px-2">
        <section>{post.resume_content}</section>

        {PostContent(post.content)}
      </div>
    </div>
  );
}
