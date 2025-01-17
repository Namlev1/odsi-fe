import { useState } from 'react'
import './LoginPage.css'
import { request, setAuthToken } from '../../api/axios_helper.js'
import { useNavigate } from 'react-router-dom'
import TfaForm from './TfaForm.jsx'
import LoginForm from './LoginForm.jsx'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [tfaCode, setTfaCode] = useState('')
  const [showTfa, setShowTfa] = useState(false)
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleCredentialsSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await request('POST', '/login', { username, password })
      setShowTfa(true)
    } catch {
      setError(true)
    }
  }

  const handleTfaCodeSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await request('POST', '/login', {
        username,
        password,
        tfaCode
      })
      setAuthToken(response.data.token)
      navigate('/')
    } catch (e) {
      setError(e.response.data.message)
    }
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
    setError(false)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    setError(false)
  }

  const handleTfaCodeChange = (e) => {
    setTfaCode(e.target.value)
    setError(false)
  }

  return (
    <>
      {showTfa ? (
        <TfaForm
          handleSubmit={handleTfaCodeSubmit}
          tfaCode={tfaCode}
          handleTfaCodeChange={handleTfaCodeChange}
          error={error}
        />
      ) : (
        <LoginForm
          handleSubmit={handleCredentialsSubmit}
          username={username}
          handleUsernameChange={handleUsernameChange}
          password={password}
          handlePasswordChange={handlePasswordChange}
          error={error}
        />
      )}
    </>
  );
};

export default LoginPage