import Header from './header/Header.jsx'
import { useState } from 'react'
import { request } from '../api/axios_helper.js'
import { useNavigate } from 'react-router-dom'
import TfaForm from './loginPage/TfaForm.jsx'

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [newPasswordError, setNewPasswordError] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)
  const [responseError, setResponseError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showTfa, setShowTfa] = useState(false)
  const [tfaCode, setTfaCode] = useState(null)
  const navigate = useNavigate()

  const handleCredentialsSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await request(
        'POST',
        '/api/v1/change-pass',
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
          tfaCode: tfaCode
        }
      )
      setShowTfa(true)
    } catch (e) {
      console.log(e)
      setResponseError(e.response.data)
    }
  }


  const handleTfaCodeSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await request(
        'POST',
        '/api/v1/change-pass',
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
          tfaCode: tfaCode
        }
      )
      if (response.status === 200) {
        setSuccess(true)
        setResponseError(false)
        setTimeout(() => {
          navigate('/')
        }, 2000)
      }
    } catch (e) {
      console.log(e)
      setResponseError(e.response.data)
    }
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

  const handleNewPasswordChange = (e) => {
    const newPassword = e.target.value
    setNewPassword(newPassword)

    if (!isValidPassword(newPassword)) {
      setNewPasswordError(true)
    } else {
      setNewPasswordError(false)
    }
  }

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value
    setConfirmPassword(confirmPassword)
    setConfirmPasswordError(confirmPassword !== newPassword)

  }

  return <>
    {showTfa ? (<>
        <TfaForm
          handleSubmit={handleTfaCodeSubmit}
          tfaCode={tfaCode}
          setTfaCode={setTfaCode}
          error={responseError}
          setError={setResponseError}
        />
        {success && <p>Password changed successfully</p>}
      </>
    ) : (
      <>
        <Header />
        <div>
          <h1>Change password</h1>
          <form onSubmit={handleCredentialsSubmit} className={'login-form change-password'}>
            <input type="password" placeholder={'Password'} value={oldPassword}
                   onChange={(e) => setOldPassword(e.target.value)} />
            <div>
              <input type="password" placeholder={'New password'} value={newPassword}
                     onChange={handleNewPasswordChange} />
              <p className={'error' + (newPasswordError ? '' : ' hidden')}>
                Invalid password: must be 8-32 characters, include uppercase, lowercase, digit, special character.
              </p>
            </div>
            <div>
              <input type="password" placeholder={'Confirm password'} value={confirmPassword}
                     onChange={handleConfirmPasswordChange} />
              <p className={'error' + (confirmPasswordError ? '' : ' hidden')}>
                Passwords do not match.
              </p>
            </div>
            <button type={'submit'} disabled={newPasswordError || confirmPasswordError}>Change password</button>
          </form>
          {
            responseError && <p className="error">{responseError}</p>
          }
        </div>
      </>
    )}
  </>
}

export default ChangePassword