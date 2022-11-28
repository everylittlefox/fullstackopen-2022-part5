import { useEffect, useState } from 'react'
import BlogsList from './components/BlogsList'
import LoginForm from './components/LoginForm'
import login from './services/login'
import * as storage from './services/storage'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userJson = storage.retrieveUser()
    if (userJson) setUser(JSON.parse(userJson))
  }, [])

  const handleLogin = async (username, password) => {
    const user = await login(username, password)
    setUser(user)
  }

  const handleLogout = () => {
    setUser(null)
    storage.resetUser()
  }

  if (!user) return <LoginForm onLogin={handleLogin} />

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <BlogsList />
    </div>
  )
}

export default App
