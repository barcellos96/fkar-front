"use client";

import HeaderBlog from "@/components/blog/header";
import SinglePost from "@/components/blog/singlePost";
import Loading from "@/components/loading";
import { BlogContext } from "@/providers/blog";
import { useContext, useEffect, useState } from "react";
import FooterBlog from "./footer";

export default function Post() {
  const { Post, post } = useContext(BlogContext);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Captura o parâmetro da URL usando window.location
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    if (id) {
      Post(id)
        .then(() => setLoading(false))
        .catch((err) => {
          console.error(err);
          setError("Falha ao buscar o post");
          setLoading(false);
        });
    }
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;
  if (!post) return <div>Nenhum conteúdo encontrado</div>;

  return (
    <div className="bg-white h-full min-h-screen">
      <HeaderBlog />

      <section className="flex justify-center items-start">
        <SinglePost {...post} />
      </section>

      <FooterBlog />
    </div>
  );
}
