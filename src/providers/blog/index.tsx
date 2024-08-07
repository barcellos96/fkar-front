"use client";

import { api } from "@/service/api";
import { parseCookies } from "nookies";
import { createContext, ReactNode, useState } from "react";

interface ICreateArticleProps {
  title: string;
  author: string;
  thumbnail: string;
  resume_content: string;
  content: string;
  tagsIds: string[];
  categorysIds: string[];
}

interface ICategoriesAndTagsProps {
  id: string;
  name: string;
}

export interface IArticleProps {
  id: string;
  title: string;
  author: string;
  thumbnail: string;
  resume_content: string;
  content: string;
  tags: ICategoriesAndTagsProps[];
  categories: ICategoriesAndTagsProps[];
  created_at: Date;
  updated_at: Date;
}

interface IBlogData {
  CreatePost: (data: ICreateArticleProps) => Promise<object>;
  Posts: () => Promise<void>;
  posts: IArticleProps[];
  Post: (articleId: string) => Promise<void>;
  post: IArticleProps | null;
  tags: ICategoriesAndTagsProps[];
  AllTags: (tagId?: string) => Promise<void>;
  categories: ICategoriesAndTagsProps[];
  AllCategories: (tagId?: string) => Promise<void>;
  value: any;
}

interface ICihldrenReact {
  children: ReactNode;
}

export const BlogContext = createContext<IBlogData>({} as IBlogData);

export const BlogProvider = ({ children }: ICihldrenReact) => {
  const [value, setValue] = useState();
  const CreatePost = async (data: ICreateArticleProps) => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };

    const response = await api
      .post("/blog/article", data, config)
      .then((res) => {
        console.log(res.data);
        setValue(res.data);
      })
      .catch((err) => {
        console.log("err", err);
        return err;
      });

    return response;
  };

  const [posts, setPosts] = useState<IArticleProps[]>([]);
  const Posts = async () => {
    const response = await api
      .get("/blog/article")
      .then((res) => {
        setPosts(res.data.response);
      })
      .catch((err) => {
        console.log("err", err);
        return err;
      });

    return response;
  };

  const [post, setPost] = useState<IArticleProps | null>(null);
  const Post = async (articleId: string) => {
    const response = await api
      .get(`/blog/article/${articleId}`)
      .then((res) => {
        setPost(res.data.response);
      })
      .catch((err) => {
        console.log("err", err);
        return err;
      });

    return response;
  };

  const [tags, setTags] = useState([] || "");
  const AllTags = async (tagId?: string) => {
    const endpoint = tagId ? `/blog/tag/${tagId}` : "/blog/tag";

    const response = await api
      .get(endpoint)
      .then((res) => {
        setTags(res.data.response);
      })
      .catch((err) => {
        console.log("err", err);
        return err;
      });

    return response;
  };

  const [categories, setCategories] = useState([] || "");
  const AllCategories = async (categoryId?: string) => {
    const endpoint = categoryId
      ? `/blog/category/${categoryId}`
      : "/blog/category";

    const response = await api
      .get(endpoint)
      .then((res) => {
        setCategories(res.data.response);
      })
      .catch((err) => {
        console.log("err", err);
        return err;
      });

    return response;
  };

  return (
    <BlogContext.Provider
      value={{
        CreatePost,
        Posts,
        posts,
        Post,
        post,
        tags,
        AllTags,
        categories,
        AllCategories,
        value,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
