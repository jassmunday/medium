import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id:string;
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
    <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-lg cursor-pointer">
      <div className="flex">
        <Avatar name={authorName} />

        <div className="font-extralight pl-2 flex justify-center flex-col">
          {authorName}
        </div>
        <div className="flex justify-center flex-col pl-2">
          <Circle />
        </div>
        <div className="font-thin pl-2 text-slate-400 flex justify-center flex-col">
          {publishedDate}
        </div>
      </div>
      <div className="text-xl font-semibold pt-2">
        {title}
      </div>
      <div className="text-md font-thin">
        {content.length > 100 ? content.slice(0, 100) + "..." : content}
      </div>
      <div className="text-sm font-thin text-slate-400 pt-2">
        {`${Math.ceil(content.length / 100)} Mintue(s) Read`}
      </div>
      {/* <div className="w-full h-1 bg-slate-400"></div> */}
    </div>
    </Link>
  );
};

function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-200"></div>;
}
export function Avatar({ name, size = "small"}: { name: string , size?: "small" | "big"}) {
  let LastName: string = "";
  let avatar: string = "";

  // Check if the name has two parts
  if (name.trim().includes(" ")) {
    const parts = name.trim().split(" ");
    LastName = parts[1];
    avatar = name.slice(0, 1) + LastName.slice(0, 1);
  } else {
    avatar = name.slice(0, 2).toUpperCase();
  }
  return (
    <>
      <div className={`relative inline-flex items-center justify-center ${size === "small" ? 'w-6 h-6' : 'w-10 h-10' } overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className={`${size === "small" ? 'text-xs' : 'text-md' } text-gray-600 dark:text-gray-300`}>
          {avatar}
        </span>
      </div>
    </>
  );
}
