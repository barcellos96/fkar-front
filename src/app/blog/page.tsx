"use client";

import HeaderBlog from "@/components/blog/header";
import ListPosts from "@/components/blog/lsitPosts";

export default function Blog() {
  return (
    <div className="bg-white h-full min-h-screen">
      <HeaderBlog />
      <section className="flex justify-center items-start ">
        <ListPosts />
      </section>
    </div>
  );
}
