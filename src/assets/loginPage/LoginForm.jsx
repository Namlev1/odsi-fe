import { useNavigate } from 'react-router-dom'

const LoginForm = ({ handleSubmit, username, handleUsernameChange, password, handlePasswordChange, error }) => {
  const navigate = useNavigate()
  return (
    <>
      <h1>Please log in</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Log in</button>
        <button type="button" onClick={() => navigate('/register')}>Or register</button>
      </form>
      {error && <p className="error">Invalid credentials</p>}
    </>
  )
}

export default LoginForm