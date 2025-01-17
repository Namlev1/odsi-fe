const QrForm = ({ qrUrl, tfaCode, setTfaCode, handleSubmit, errorMessage }) => {
  const handleTfaCodeChange = (event) => {
    setTfaCode(event.target.value)
  }

  return (
    <>
      <h1>Scan QR and enter 6 digit code</h1>
      <img src={qrUrl} alt="QR Code" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={tfaCode}
          onChange={handleTfaCodeChange}
          placeholder="Enter 6 digit code"
        />
        <button type="submit">Submit</button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </>
  )
}

export default QrForm