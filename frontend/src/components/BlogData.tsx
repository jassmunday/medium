import { AppBar } from "./AppBar";
import { Blog } from "../hooks/index";
import { Avatar } from "./BlogCard";

export const BlogData = ({ blog }: { blog: Blog }) => {
  return (
    <div className="">
      <div className="flex justify-center pt-12">
        <div className="grid grid-cols-12 px-10 w-full max-w-screen-xl ">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="pt-2 text-slate-500">Published on 28 Jan 2025</div>
            <div className="pt-2">{blog.content}</div>
          </div>
          <div className="col-span-4">
            <div className="text-slate-500">Author</div>
            <div className="flex">
              <div className="pr-6 flex flex-col justify-center">
                <Avatar size="big" name={blog.author.name || "Anonymous"} />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-2  text-slate-500">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
