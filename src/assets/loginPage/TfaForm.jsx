import { useState } from 'react'

const TfaForm = ({ handleSubmit, tfaCode, setTfaCode, error, setError }) => {
  const [tfaError, setTfaError] = useState('')

  const handleTfaCodeChange = (event) => {
    const newTfaCode = event.target.value
    setTfaCode(event.target.value)
    if (!/^\d{6}$/.test(newTfaCode)) {
      setTfaError('Invalid code format')
    } else {
      setTfaError('')
    }
    setError('')
  }

  return (
    <>
      <h1>Enter 6 digit code from your Authenticator mobile app.</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="tfaCode"
          placeholder="Enter code here"
          value={tfaCode}
          onChange={handleTfaCodeChange}
        />
        <p className={'error' + (tfaError ? '' : ' hidden')}>
          Invalid 2FA code format
        </p>
        <button type="submit" disabled={tfaError}>Log in</button>
      </form>
      {error && <p className="error">Invalid code</p>}
    </>
  )
}

export default TfaForm