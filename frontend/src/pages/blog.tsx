import { useBlog } from "../hooks"
import { BlogData } from '../components/BlogData';
import { useParams } from "react-router-dom";
import { Spinner } from "../components/Spinner";
import { AppBar } from "../components/AppBar";

export const Blog = () => {
  
  const {id} = useParams();
  const { loading, blog } = useBlog({id: id || ''});
 
  if (loading || !blog) {
    return (
    <div className="h-screen flex flex-col justify-center">
      <div className="flex justify-center">
         <Spinner/>
      </div>
    </div>
    )
  }
    return<>
      <AppBar id={id} />
      <BlogData blog={blog} ></BlogData>
    </>
}