import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface Blog{
  id:string,
  title: string,
  content: string,
  author: {
    name:string;
  }
  published?: string
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog []>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${BACKEND_URL}/api/v1/blog/all`,{headers:{Authorization: `Bearer ${token}`}})
    .then((response) => {
       setBlogs(response.data.blogs);
       console.log(response);
       setLoading(false);
    })
  },[])

  return{
    loading, blogs
  }
} 

export const useBlog = ({id} : {id: string}) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${BACKEND_URL}/api/v1/blog/get/${id}`,{headers:{Authorization: `Bearer ${token}`}})
    .then((response) => {
       setBlog(response.data.blog);
       console.log(response);
       setLoading(false);
    })
  },[])

  return{
    loading, blog
  }
} 