import { useNavigate } from 'react-router-dom'

const LoginForm = ({
                     handleSubmit,
                     username,
                     handleUsernameChange,
                     password,
                     handlePasswordChange,
                     error,
                     nameError,
                     passwordError
                   }) => {
  const navigate = useNavigate()
  return (
    <>
      <h1>Please log in</h1>
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
            Username must be 4-20 characters long.
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
            Password must be 8-32 characters long.
          </p>
        </div>
        <button type="submit" disabled={nameError || passwordError}>Log in</button>
        <button type="button" onClick={() => navigate('/register')}>Or register
        </button>
      </form>
      {error && <p className="error">Invalid credentials</p>}
    </>
  )
}

export default LoginForm