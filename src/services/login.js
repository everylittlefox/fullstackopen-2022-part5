import axios from 'axios'

const baseUrl = '/api/login'

export default async function login(username, password) {
  await axios.post(baseUrl, { username, password })
}
