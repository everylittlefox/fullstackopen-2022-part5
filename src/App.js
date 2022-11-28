import { useEffect, useState } from 'react'
import BlogsList from './components/BlogsList'
import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'
import login from './services/login'
import * as storage from './services/storage'
import blogService, { setToken } from './services/blogs'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const user = storage.retrieveUser()
    if (user) {
      setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (username, password) => {
    const user = await login(username, password)
    setToken(user.token)
    setUser(user)
  }

  const handleLogout = () => {
    setUser(null)
    storage.resetUser()
  }

  const handleCreateBlog = async (blog) => {
    const createdBlog = await blogService.createBlog(blog)
    setBlogs(blogs.concat(createdBlog))
  }

  if (!user) return <LoginForm onLogin={handleLogin} />

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <CreateBlogForm onCreateBlog={handleCreateBlog} />
      <BlogsList blogs={blogs} />
    </div>
  )
}

export default App
