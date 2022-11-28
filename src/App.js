import { useState } from 'react'
import BlogsList from './components/BlogsList'
import LoginForm from './components/LoginForm'
import login from "./services/login"

const App = () => {
  const [user, setUser] = useState(null)

  const handleLogin = async (username, password) => {
    const user = await login(username, password)
    setUser(user)
  }

  return <div>{user ? <BlogsList /> : <LoginForm onLogin={handleLogin} />}</div>
}

export default App
