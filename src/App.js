import { useEffect, useState } from 'react'
import BlogsList from './components/BlogsList'
import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'
import login from './services/login'
import * as storage from './services/storage'
import blogService from './services/blogs'
import Message, { success, error } from './components/Message'
import Togglable from './components/Togglable'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)

  const sortedBlogs = [...blogs]
  sortedBlogs.sort((a, b) => a.likes - b.likes)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const user = storage.retrieveUser()
    if (user) {
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await login(username, password)
      blogService.setToken(user.token)
      setUser(user)
    } catch (e) {
      if (e.response.status === 401)
        setMessage(error('wrong username or password'))
    }
  }

  const handleLogout = () => {
    setUser(null)
    storage.resetUser()
  }

  const handleCreateBlog = async (blog) => {
    try {
      const createdBlog = await blogService.createBlog(blog)
      setBlogs(blogs.concat(createdBlog))
      setMessage(success(`new blog: "${blog.title}" by ${blog.author}`))
    } catch (e) {
      if (e.response.status === 400) setMessage(error(e.response.data.error))
    }
  }

  const handleLikeBlog = async (blog) => {
    setBlogs((bs) =>
      bs.map((b) => (b.id === blog.id ? { ...b, likes: b.likes + 1 } : b))
    )
    try {
      await blogService.likeBlog(blog)
    } catch (e) {
      setMessage(error('an error occured'))
      setBlogs((bs) =>
        bs.map((b) => (b.id === blog.id ? { ...b, likes: b.likes - 1 } : b))
      )
    }
  }

  const handleDeleteBlog = async (id) => {
    const idx = blogs.findIndex(b => b.id === id)
    const blogBackup = blogs[idx]

    setBlogs(bs => bs.filter(b => b.id !== id))

    try {
      await blogService.deleteBlog(id)
    } catch (e) {
      setMessage(error('an error occured'))
      setBlogs(s => [...s.slice(0, idx), blogBackup, ...s.slice(idx)])
    }
  }

  const clearMessage = () => setMessage(null)

  if (!user)
    return (
      <div>
        {message && <Message onTimedOut={clearMessage} {...message} />}
        <LoginForm onLogin={handleLogin} />
      </div>
    )

  return (
    <div>
      <h2>blogs</h2>
      {message && <Message onTimedOut={clearMessage} {...message} />}
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="new blog">
        <CreateBlogForm onCreateBlog={handleCreateBlog} />
      </Togglable>
      <BlogsList onDelete={handleDeleteBlog} onLike={handleLikeBlog} blogs={sortedBlogs} />
    </div>
  )
}

export default App
