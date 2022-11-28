import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

export const setToken = (t) => {
  token = t
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createBlog = async blog => {
  if (!token) throw new Error('user token not set')

  return (await axios.post(baseUrl, blog, { headers: {
    Authorization: `bearer ${token}`
  }})).data
}

const services = { getAll, createBlog }
export default services