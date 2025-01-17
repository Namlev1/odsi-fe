import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { request } from '../../api/axios_helper.js'
import RegistrationForm from './RegistrationForm.jsx'
import QrForm from './QrForm.jsx'

const Registration = () => {
  const [username, setUsername] = useState('')
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
        password
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
      await request('POST', '/login', {
        username,
        password,
        tfaCode
      })
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
        />
      )}
    </>
  );
};

export default Registration