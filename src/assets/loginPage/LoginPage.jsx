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
  const [nameError, setNameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
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
      setError(e.response.data)
    }
  }

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value
    setUsername(newUsername)

    if (newUsername.length < 4 || newUsername.length > 20) {
      setNameError(true)
    } else {
      setNameError(false)
    }
    
    setError(false)
  }

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value
    setPassword(newPassword)

    if (newPassword.length < 8 || newPassword.length > 32) {
      setPasswordError(true)
    } else {
      setPasswordError(false)
    }

    setError(false)
  }

  return (
    <>
      {showTfa ? (
        <TfaForm
          handleSubmit={handleTfaCodeSubmit}
          tfaCode={tfaCode}
          setTfaCode={setTfaCode}
          error={error}
          setError={setError}
        />
      ) : (
        <LoginForm
          handleSubmit={handleCredentialsSubmit}
          username={username}
          handleUsernameChange={handleUsernameChange}
          password={password}
          handlePasswordChange={handlePasswordChange}
          error={error}
          nameError={nameError}
          passwordError={passwordError}
        />
      )}
    </>
  );
};

export default LoginPage