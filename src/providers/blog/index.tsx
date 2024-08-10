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
  Posts: (tagId?: string, categorieId?: string) => Promise<void>;
  posts: IArticleProps[];
  Post: (articleId: string) => Promise<void>;
  post: IArticleProps | null;
  AllTags: (tagId?: string) => Promise<ICategoriesAndTagsProps[]>;
  tags: ICategoriesAndTagsProps[];
  SingleTag: (tagId: string) => Promise<ICategoriesAndTagsProps>;
  singleTag: ICategoriesAndTagsProps;
  AllCategories: () => Promise<void>;
  categories: ICategoriesAndTagsProps[];
  SingleCategorie: (categorieId: string) => Promise<void>;
  singleCategorie: ICategoriesAndTagsProps;
  setCategorieId: React.Dispatch<React.SetStateAction<string>>;
  categorieId: string;

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
        setValue(res.data);
      })
      .catch((err) => {
        console.log("err", err);
        return err;
      });

    return response;
  };

  const [posts, setPosts] = useState<IArticleProps[]>([]);
  const Posts = async (tagId?: string, categorieId?: string) => {
    const config = {
      params: { tagId, categorieId },
    };

    const response = await api
      .get("/blog/article", config)
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
  const AllTags = async () => {
    const response = await api
      .get("/blog/tag")
      .then((res) => {
        setTags(res.data.response);
      })
      .catch((err) => {
        console.log("err", err);
        return err;
      });

    return response;
  };

  const [singleTag, setSingleTag] = useState<ICategoriesAndTagsProps>({
    id: "",
    name: "",
  });
  const SingleTag = async (tagId: string) => {
    const response = await api
      .get(`/blog/tag/${tagId}`)
      .then((res) => {
        setSingleTag(res.data.response);
      })
      .catch((err) => {
        console.log("err", err);
        return err;
      });

    return response;
  };

  const [categories, setCategories] = useState([]);
  const AllCategories = async () => {
    const response = await api
      .get("/blog/category")
      .then((res) => {
        setCategories(res.data.response);
      })
      .catch((err) => {
        console.log("err", err);
        return err;
      });

    return response;
  };

  const [singleCategorie, setSingleCategorie] =
    useState<ICategoriesAndTagsProps>({
      id: "",
      name: "",
    });
  const [categorieId, setCategorieId] = useState<string>("");
  const SingleCategorie = async (categoryId: string) => {
    const response = await api
      .get(`/blog/category/${categoryId}`)
      .then((res) => {
        setSingleCategorie(res.data.response);
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
        AllTags,
        tags,
        SingleTag,
        singleTag,
        AllCategories,
        categories,
        SingleCategorie,
        singleCategorie,
        value,
        categorieId,
        setCategorieId,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
