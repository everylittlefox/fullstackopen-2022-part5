import { useEffect, useState } from 'react'
import BlogsList from './components/BlogsList'
import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'
import login from './services/login'
import * as storage from './services/storage'
import blogService, { setToken } from './services/blogs'
import Message, { success, error } from './components/Message'
import Togglable from './components/Togglable'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)

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
    try {
      const user = await login(username, password)
      setToken(user.token)
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
      <BlogsList blogs={blogs} />
    </div>
  )
}

export default App
