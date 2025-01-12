import { useState } from 'react'
import './LoginPage.css'
import { request, setAuthToken } from '../../api/axios_helper.js'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    // todo remove exception in logs
    request('POST', '/login', {
      username: username,
      password: password
    })
      .then(response => {
        setAuthToken(response.data.token)
        navigate('/')
      })
      .catch(() => setError(true))
  }

  return (
    <>
      <h1>Please sign in</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
            setError(false)
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setError(false)
          }
          }
        />
        <button type="submit">Sign in</button>
      </form>
      {error &&
        <p className={'error'}>
          Invalid credentials
        </p>}
    </>
  )
}

export default LoginPage