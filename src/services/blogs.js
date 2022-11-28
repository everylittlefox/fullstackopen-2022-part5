import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (t) => {
  token = t
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createBlog = async (blog) => {
  if (!token) throw new Error('user token not set')

  return (
    await axios.post(baseUrl, blog, {
      headers: {
        Authorization: `bearer ${token}`
      }
    })
  ).data
}

const likeBlog = async (blog) => {
  if (!token) throw new Error('user token not set')

  return (
    await axios.put(
      `${baseUrl}/${blog.id}`,
      { ...blog, likes: blog.likes + 1 },
      {
        headers: {
          Authorization: `bearer ${token}`
        }
      }
    )
  ).data
}

const deleteBlog = async (id) => {
  if (!token) throw new Error('user token not set')

  return await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `bearer ${token}`
    }
  })
}

const services = { getAll, createBlog, setToken, likeBlog, deleteBlog }
export default services
