import { useActionData } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks/index";
import { Spinner } from "../components/Spinner";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
    <div className="h-screen flex flex-col justify-center">
      <div className="flex justify-center">
         <Spinner/>
      </div>
    </div>
    )
  }
  return (
    <>
      <AppBar/>
      <div className="flex justify-center mt-5">
        <div className="">
          {blogs.map((blog) => (
            <BlogCard key={blog.id}
              id = {blog.id}
              authorName={blog.author.name || 'Anonymous'}
              title={blog.title}
              content={blog.content}
              publishedDate={"18 JAN 2025"}
            />
          ))}
        </div>
      </div>
    </>
  );
};
