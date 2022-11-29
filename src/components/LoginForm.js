import { useState } from 'react'

const LoginForm = ({ onLogin }) => {
  const [{ username, password }, setCredentials] = useState({
    username: '',
    password: ''
  })

  const handleUsernameChange = (e) =>
    setCredentials((c) => ({ ...c, username: e.target.value }))

  const handlePasswordChange = (e) =>
    setCredentials((c) => ({ ...c, password: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin(username, password)
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form>
        <div>
          <label>
            username{' '}
            <input
              name="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </label>
        </div>
        <div>
          <label>
            password{' '}
            <input
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
        </div>
        <button onClick={handleSubmit} type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
