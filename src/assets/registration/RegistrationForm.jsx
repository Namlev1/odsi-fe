const RegistrationForm = ({
                            handleSubmit,
                            setUsername,
                            setErrorMessage,
                            setPassword,
                            errorMessage,
                            username,
                            password
                          }) => {
  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
    setErrorMessage('')
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    setErrorMessage('')
  }

  return (
    <>
      <h1>Please register</h1>
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
        <button type="submit">Register</button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </>
  )
}

export default RegistrationForm