import { useEffect, useState } from 'react'
import { request } from '../../api/axios_helper.js'

// todo show your posts
const Profile = () => {
  const [pubKey, setPubKey] = useState('')
  const [newPubKey, setNewPubKey] = useState('')
  const [error, setError] = useState('')

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => setNewPubKey(reader.result)
    reader.onerror = () => setError('Error reading the private key file.')
    reader.readAsText(file)
  }

  const handleUpdateKey = async () => {
    try {
      await request(
        'POST',
        '/api/v1/pubkey/me',
        {
          pubKey: newPubKey
        }
      )
      window.location.reload()
    } catch (e) {
      console.log('Error during key update')
      console.log(e)
    }
  }

  useEffect(() => {
    const fetchPubKey = async () => {
      try {
        const response = await request('GET', '/api/v1/pubkey/me', {})
        setPubKey(response.data)
      } catch (e) {
        setError('Failed to fetch public key')
        console.error('Error:', e)
      }
    }

    fetchPubKey()
  }, [])

  return (
    <div className={'profile'}>
      <h1>Your profile</h1>
      <h2>Public key:</h2>
      {pubKey &&
        <>
          <p>
            <pre>{pubKey}</pre>
          </p>
          <div>
            <input type="file" accept=".pem,.key" onChange={handleFileChange} />
            {newPubKey && <p>Public key loaded.</p>}
            <button onClick={handleUpdateKey}>Update</button>
          </div>
        </>
      }
    </div>
  )
}

export default Profile