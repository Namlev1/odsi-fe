import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { request, setAuthToken } from '../../api/axios_helper.js'

const Registration = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    // // todo remove exception in logs
    request('POST', '/api/registration', {
      username: username,
      password: password
    })
      .then(response => {
        // After successful registration, log in the user
        request('POST', '/login', {
          username: username,
          password: password
        })
          .then(response => {
            setAuthToken(response.data.token)
            navigate('/')
          })
          .catch((e) => navigate('/login'))
      })
      .catch((e) => setErrorMessage(e.response.data))
  }

  return (
    <>
      <h1>Please register</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
            setErrorMessage('')
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setErrorMessage('')
          }
          }
        />
        <button type="submit">Register</button>
      </form>
      {errorMessage &&
        <p className={'error'}>
          {errorMessage}
        </p>}
    </>
  )
}

export default Registration