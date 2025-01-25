import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {
  const [showSubmitted, setShowSubmitted] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const navigate = useNavigate()

  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/
    return email && emailRegex.test(email)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowSubmitted(true)
    setTimeout(() => navigate('/login'),
      2000)
  }

  const handleEmailChange = (e) => {
    if (showSubmitted) {
      return
    }
    const newEmail = e.target.value
    setEmail(newEmail)

    if (!isEmailValid(newEmail)) {
      setEmailError(true)
    } else {
      setEmailError(false)
    }
  }

  return <>
    <h1>Reset password</h1>
    <form onSubmit={handleSubmit} className={'login-form'}>
      <label htmlFor={'email'}>Email:</label>
      <input
        id={'email'}
        type="text"
        name={'email'}
        onChange={handleEmailChange} />
      {emailError && <p className={'error'}>Invalid email format.</p>}
      <button disabled={emailError}>Submit</button>
    </form>
    {showSubmitted && <p>Reset code was sent to {email}.</p>
    }
  </>

}

export default ResetPassword