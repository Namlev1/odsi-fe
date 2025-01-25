import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { request, setAuthToken } from '../../api/axios_helper.js'
import RegistrationForm from './RegistrationForm.jsx'
import QrForm from './QrForm.jsx'

const Registration = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [tfaCode, setTfaCode] = useState('')
  const [qrUrl, setQrUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleCredentialsSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await request('POST', '/api/registration', {
        username,
        password,
        email
      })
      setQrUrl(response.data.qrUrl)
      setErrorMessage('')
    } catch (e) {
      setErrorMessage(e.response.data)
    }
  }

  const handleTfaCodeSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await request('POST', '/login', {
        username,
        password,
        email,
        tfaCode
      })
      setAuthToken(response.data.token)
      navigate('/')
    } catch (e) {
      setErrorMessage(e.response.data)
    }
  }

  return (
    <>
      {qrUrl ? (
        <QrForm
          qrUrl={qrUrl}
          tfaCode={tfaCode}
          setTfaCode={setTfaCode}
          errorMessage={errorMessage}
          handleSubmit={handleTfaCodeSubmit}
          setErrorMessage={setErrorMessage}
        />
      ) : (
        <RegistrationForm
          handleSubmit={handleCredentialsSubmit}
          setUsername={setUsername}
          setErrorMessage={setErrorMessage}
          setPassword={setPassword}
          errorMessage={errorMessage}
          username={username}
          password={password}
          email={email}
          setEmail={setEmail}
        />
      )}
    </>
  );
};

export default Registration