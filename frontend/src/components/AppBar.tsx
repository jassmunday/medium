import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";
export const AppBar = ({id}: {id?: string}) => {
  return (
    <div className="border-b border-slate-200 px-10 flex justify-between py-5">
      <Link
        to={"/blogs"}
        className="font-semibold flex flex-col justify-center"
      >
        Medium
      </Link>
      <div className="flex">
        <Link to= {id ? `/publish/${id}`: "/publish"}>
          <button
            type="button"
            className="text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            {id ? "Edit": "Publish"}
          </button>
        </Link>
        <div>
          <Avatar name="Jass" size={"big"} />
        </div>
      </div>
    </div>
  );
};
