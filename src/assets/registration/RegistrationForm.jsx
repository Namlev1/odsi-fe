import { useState } from 'react'

const RegistrationForm = ({
                            handleSubmit,
                            setUsername,
                            setEmail,
                            setErrorMessage,
                            setPassword,
                            errorMessage,
                            username,
                            password,
                            email
                          }) => {
  const [nameError, setNameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [emailError, setEmailError] = useState(false)

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value
    setUsername(newUsername)

    if (!/^[a-zA-Z][a-zA-Z0-9]{3,19}$/.test(newUsername)) {
      setNameError(true)
    } else {
      setNameError(false)
    }

    setErrorMessage('')
  }

  const isValidPassword = (password) => {
    if (password.length < 8 || password.length > 32) {
      return false
    }
    let hasUppercase = false
    let hasLowercase = false
    let hasDigit = false
    let hasSpecialChar = false
    for (const c of password) {
      if (/[A-Z]/.test(c)) {
        hasUppercase = true
      } else if (/[a-z]/.test(c)) {
        hasLowercase = true
      } else if (/\d/.test(c)) {
        hasDigit = true
      } else if (/[^a-zA-Z0-9]/.test(c)) {
        hasSpecialChar = true
      }
    }
    return hasUppercase && hasLowercase && hasDigit && hasSpecialChar
  }

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value
    setPassword(newPassword)

    if (!isValidPassword(newPassword)) {
      setPasswordError(true)
    } else {
      setPasswordError(false)
    }

    setErrorMessage('')
  }

  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/

    // Check if the email is not empty and matches the regex pattern
    return email && emailRegex.test(email)
  }

  const handleEmailChange = (e) => {
    const newEmail = e.target.value
    setEmail(newEmail)

    if (!isEmailValid(newEmail)) {
      setEmailError(true)
    } else {
      setEmailError(false)
    }
    
    setErrorMessage('')
  }

  return (
    <>
      <h1>Please register</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
          <p className={'error' + (nameError ? '' : ' hidden')}>
            Invalid username: must be 4-20 characters or numbers (cannot start with a number)
          </p>
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <p className={'error' + (passwordError ? '' : ' hidden')}>
            Invalid password: must be 8-32 characters, include uppercase, lowercase, digit, special character
          </p>
        </div>
        <div>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <p className={'error' + (emailError ? '' : ' hidden')}>
            Invalid email format
          </p>
        </div>
        <button type="submit" disabled={nameError || passwordError || emailError}>Register</button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </>
  )
}

export default RegistrationForm