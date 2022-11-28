import axios from 'axios'
import { persistUser } from './storage'

const baseUrl = '/api/login'

export default async function login(username, password) {
  const user = (await axios.post(baseUrl, { username, password })).data
  persistUser(user)
  return user
}
