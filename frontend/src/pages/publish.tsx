import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { AppBar } from "../components/AppBar";
import { Avatar } from "../components/BlogCard";
import { BACKEND_URL } from "../config";
import { useNavigate, useParams } from "react-router-dom";
import { UpdateBlog } from "../types";
import { useBlog } from "../hooks";

export const Publish = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { blog: fetchedBlog } = useBlog({ id: id || "" });

  const [blog, setBlog] = useState<UpdateBlog>({
    title: "",
    content: "",
  });

  // ✅ Update state when fetchedBlog is available
  useEffect(() => {
    if (fetchedBlog) {
      setBlog({
        title: fetchedBlog.title,
        content: fetchedBlog.content,
      });
    }
  }, [fetchedBlog]); // Run only when fetchedBlog changes

  const Save = async () => {
    if (!id) {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title: blog.title,
          content: blog.content,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
    } else {
      const response = await axios.put(
        `${BACKEND_URL}/api/v1/blog`,
        {
          id: id,
          title: blog.title,
          content: blog.content,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
    }
    navigate(`/blogs`);
  };
  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div className="max-w-screen-lg w-full pt-8">
          <input
            type="text"
            value={blog.title}
            onChange={(e) => {
              setBlog({
                ...blog,
                title: e.target.value,
              });
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Title..."
          />
          <TextEditor
            value={blog.content}
            onChange={(e) => {
              setBlog({
                ...blog,
                content: e.target.value,
              });
            }}
          />
          <button
            type="submit"
            onClick={Save}
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
          >
            {id ? "Edit Post" : "Publish Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

function TextEditor({
  onChange, value
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void, value: string
}) {
  return (
    <div>
      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 mt-2">
        <div className="px-4 py-2 bg-white rounded-b-lg">
          <label className="sr-only">Description</label>
          <textarea
            id="editor"
            rows={8}
            value={value}
            onChange={onChange}
            className="block focus: outline-none w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0"
            placeholder="Write Description..."
            required
          ></textarea>
        </div>
      </div>
    </div>
  );
}
