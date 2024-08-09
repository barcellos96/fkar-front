import Post from "@/components/blog/post";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fkar Blog - Notícias",
  description:
    "As noticias mais atualizadas e as melhores dicas sobre o mundo dos veículos",
};

export default function PostPage() {
  return <Post />;
}
