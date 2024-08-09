import FooterBlog from "@/components/blog/footer";
import HeaderBlog from "@/components/blog/header";
import ListPosts from "@/components/blog/lsitPosts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fkar Blog",
  description:
    "As noticias mais atualizadas e as melhores dicas sobre o mundo dos veículos",
};

export default function Blog() {
  return (
    <div className="bg-white h-full min-h-screen">
      <HeaderBlog />
      <section className="flex justify-center items-start ">
        <ListPosts />
      </section>
      <FooterBlog />
    </div>
  );
}
