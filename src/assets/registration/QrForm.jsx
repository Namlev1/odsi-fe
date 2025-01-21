import { useState } from 'react'

const QrForm = ({ qrUrl, tfaCode, setTfaCode, handleSubmit, errorMessage, setErrorMessage }) => {
  const [tfaError, setTfaError] = useState('')
  const handleTfaCodeChange = (event) => {
    const newTfaCode = event.target.value
    setTfaCode(event.target.value)
    if (!/^\d{6}$/.test(newTfaCode)) {
      setTfaError('Invalid code format')
    } else {
      setTfaError('')
    }
    setErrorMessage('')
  }

  return (
    <div className={'qr'}>
      <h1>Scan QR and enter 6 digit code</h1>
      <img src={qrUrl} alt="QR Code" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={tfaCode}
          onChange={handleTfaCodeChange}
          placeholder="Enter 6 digit code"
        />
        <p className={'error' + (tfaError ? '' : ' hidden')}>
          Invalid code format
        </p>
        <button type="submit">Submit</button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  )
}

export default QrForm