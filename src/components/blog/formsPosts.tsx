"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { useState, useEffect, useContext, ChangeEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import Quill CSS
import "./quill.css";
import { BlogContext } from "@/providers/blog";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const Select = dynamic(() => import("react-select"), { ssr: false });

type OptionType = { value: string; label: string };

interface QuillContext {
  quill: {
    getSelection: () => { index: number } | null;
    setSelection: (index: number) => void;
    insertEmbed: (index: number, type: string, value: string) => void;
  };
}

const handleImageUpload = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch("https://api.fkar.com.br/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error uploading image");
    }

    const data: { url: string } = await response.json();
    return data.url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

const quillModules = {
  toolbar: {
    container: [
      [{ header: "1" }, { header: "2" }, { font: [] }],

      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
    handlers: {
      image: function (this: QuillContext) {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
          const file = input.files![0];
          const range = this.quill.getSelection();
          this.quill.setSelection(range!.index + 1);

          try {
            const imageUrl = await handleImageUpload(file);
            this.quill.insertEmbed(range!.index, "image", imageUrl);
          } catch (error) {
            console.error("Error inserting image into editor:", error);
          }
        };
      },
    },
  },
};

export default function FormsPosts() {
  const { back } = useRouter();
  const { AllTags, tags, AllCategories, categories, CreatePost } =
    useContext(BlogContext);

  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const [modal, isModal] = useState(false);

  useEffect(() => {
    AllTags();
    AllCategories();
  }, []);

  useEffect(() => {
    setIsClient(true);
    isModal(false);
  }, []);

  const schema = z.object({
    title: z.string().min(1, "Título obrigatório"),
    resume_content: z.string().min(1, "Resumo obrigatório"),
    thumbnail: z.string().min(1, "Imagem de capa obrigatório"),
    content: z.string().min(1, "Conteúdo obrigatório"),
    author: z.string().min(1, "Autor obrigatório"),
    tagsIds: z.array(z.string()),
    categorysIds: z.array(z.string()),
  });

  type RegisterProps = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterProps>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterProps> = async (value) => {
    setLoading(true);

    try {
      // Upload thumbnail file if it exists
      if (thumbnailFile) {
        const thumbnailUrl = await handleImageUpload(thumbnailFile);
        value.thumbnail = thumbnailUrl;
      }

      await CreatePost(value);
      setLoading(false);
    } catch (error) {
      console.error("Error creating post:", error);
      setLoading(false);
    }
  };

  // Transform tags to be used in react-select
  const tagOptions: OptionType[] = tags.map((tag) => ({
    value: tag.id,
    label: tag.name,
  }));

  // Transform categories to be used in react-select
  const categoriesOptions: OptionType[] = categories.map((categories) => ({
    value: categories.id,
    label: categories.name,
  }));

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setThumbnailFile(file);

      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      setValue("thumbnail", file.name); // Set the thumbnail field value
    }
  };

  return (
    <div className="px-10">
      <section
        onClick={() => back()}
        className="flex w-16 gap-1 items-center mb-5 cursor-pointer hover:opacity-60"
      >
        <ArrowLeft size={17} />
        <span className="relative mb-1">voltar</span>
      </section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 bg-zinc-50 rounded-2xl shadow-sm px-10 py-12"
      >
        <h1 className="-mt-6 font-semibold text-lg mb-8">CRIAR POST</h1>

        <span className="flex flex-col gap-1 w-full">
          <label className="font-semibold text-base" id="title">
            TÍTULO:
          </label>
          <input
            id="title"
            type="text"
            className="py-2 px-4 rounded-md border border-zinc-200 bg-transparent"
            {...register("title", {
              required: "Título obrigatório",
            })}
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </span>

        <span className="flex flex-col gap-1 w-full">
          <label className="font-semibold text-base" id="author">
            AUTOR:
          </label>
          <input
            id="author"
            type="text"
            className="py-2 px-4 rounded-md border border-zinc-200 bg-transparent"
            {...register("author", {
              required: "Autor obrigatório",
            })}
          />
          {errors.author && (
            <p className="text-red-500">{errors.author.message}</p>
          )}
        </span>

        <span className="flex flex-col gap-1 w-full">
          <label className="font-semibold text-base" id="thumbnail">
            IMAGEM DE CAPA:
          </label>
          <input
            id="thumbnail"
            type="file"
            accept="image/*"
            className="py-2 px-4 rounded-md border border-zinc-200 bg-transparent"
            onChange={handleThumbnailChange}
          />
          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Prévia da imagem de capa"
              className="mt-2 max-w-[200px] border border-zinc-300 rounded"
            />
          )}
          {errors.thumbnail && (
            <p className="text-red-500">{errors.thumbnail.message}</p>
          )}
        </span>

        <span className="flex flex-col gap-1 w-full">
          <label className="font-semibold text-base" id="author">
            RESUMO:
          </label>
          <textarea
            id="resume_content"
            className="py-2 px-4 min-h-[125px] rounded-md border border-zinc-200 bg-transparent"
            {...register("resume_content", {
              required: "Resumo obrigatório",
            })}
          />
          {errors.resume_content && (
            <p className="text-red-500">{errors.resume_content.message}</p>
          )}
        </span>

        <span className="flex flex-col gap-1 w-full">
          <label className="font-semibold text-base" id="content">
            CONTEÚDO:
          </label>
          <div className="react-quill-wrapper">
            <ReactQuill
              theme="snow"
              onChange={(content) => setValue("content", content)}
              modules={quillModules}
            />
          </div>
          {errors.content && (
            <p className="text-red-500">{errors.content.message}</p>
          )}
        </span>

        {isClient && (
          <>
            <span className="flex flex-col gap-1 w-full">
              <label className="font-semibold text-base" id="categorys">
                CATEGORIA(s):
              </label>
              <Select
                id="categorys"
                options={categoriesOptions}
                isMulti
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(selectedOptions) =>
                  setValue(
                    "categorysIds",
                    selectedOptions
                      ? (selectedOptions as OptionType[]).map(
                          (option) => option.value
                        )
                      : []
                  )
                }
              />
              {errors.categorysIds && (
                <p className="text-red-500">{errors.categorysIds.message}</p>
              )}
            </span>
            <span className="flex flex-col gap-1 w-full">
              <label className="font-semibold text-base" id="tags">
                TAG(s):
              </label>
              <Select
                id="tags"
                options={tagOptions}
                isMulti
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(selectedOptions) =>
                  setValue(
                    "tagsIds",
                    selectedOptions
                      ? (selectedOptions as OptionType[]).map(
                          (option) => option.value
                        )
                      : []
                  )
                }
              />
              {errors.tagsIds && (
                <p className="text-red-500">{errors.tagsIds.message}</p>
              )}
            </span>
          </>
        )}

        <button className="bg-green-700 text-white px-3 py-2 max-w-[200px]">
          Cadastrar post
        </button>
      </form>

      {modal && <div>{/* <Modal.Root></Modal.Root> */}</div>}
    </div>
  );
}
