"use client";

import { useContext, useEffect } from "react";
import { BlogContext } from "../../providers/blog";
import { Search } from "lucide-react";

export default function PostsData() {
  const { Posts, posts, value } = useContext(BlogContext);

  useEffect(() => {
    Posts();
  }, [value]);

  // Função para truncar o conteúdo
  const truncateContent = (content: string, maxLength: number) => {
    return content.length > maxLength
      ? content.substring(0, maxLength) + "..."
      : content;
  };

  return (
    <div className="pt-4 mx-10">
      <span className="flex items-center border border-zinc-200 px-2 mb-4">
        <Search size={20} />
        <input
          placeholder="Pesquisar..."
          className="bg-transparent px-2 py-3 w-full outline-none"
        />
      </span>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="hidden slg:table-cell px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Author
            </th>
            <th className="hidden slg:table-cell px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Resume
            </th>
            <th className="hidden md:table-cell px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Content
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tags
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Categories
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500">
                {post.title}
              </td>
              <td className="hidden slg:table-cell px-6 py-4 whitespace-nowrap text-md text-gray-500">
                {post.author}
              </td>
              <td className="hidden slg:table-cell px-6 py-4 whitespace-nowrap text-md text-gray-500">
                {truncateContent(post.resume_content, 20)}
              </td>
              <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-md text-gray-500">
                {truncateContent(post.content, 20)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {post.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="flex w-20 mb-1 gap-2 font-semibold bg-zinc-200 rounded-sm px-2 py-1"
                  >
                    {tag.name}
                  </span>
                ))}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {post.categories.map((category) => (
                  <span
                    key={category.id}
                    className="flex w-32 mb-1 gap-2 font-semibold bg-zinc-200 rounded-sm px-2 py-1"
                  >
                    {category.name}
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
