const TfaForm = ({ handleSubmit, tfaCode, handleTfaCodeChange, error }) => {
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
        <button type="submit">Log in</button>
      </form>
      {error && <p className="error">Invalid code</p>}
    </>
  )
}

export default TfaForm