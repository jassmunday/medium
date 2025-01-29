import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import { Blog } from './pages/blog.tsx';
import { SignIn } from './pages/signin.tsx';
import { SignUp } from './pages/signup.tsx';
import { Blogs } from './pages/blogs.tsx';
import { Publish } from './pages/publish.tsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
         <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/publish/:id" element={<Publish />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
