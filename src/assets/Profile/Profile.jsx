import { useEffect, useState } from 'react'
import { request } from '../../api/axios_helper.js'
import DOMPurify from 'quill/formats/link.js'
import Header from '../header/Header.jsx'

const Profile = () => {
  const [pubKey, setPubKey] = useState('')
  const [newPubKey, setNewPubKey] = useState('')
  const [error, setError] = useState('')
  const [posts, setPosts] = useState([])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => setNewPubKey(reader.result)
    reader.onerror = () => setError('Error reading the private key file.')
    reader.readAsText(file)
  }

  const sanitizeContent = (content) => {
    return DOMPurify.sanitize(content, {
      ALLOWED_TAGS: ['b', 'i', 'u', 'em', 'strong', 'p', 'a', 'img'],  // Allowing common formatting tags + <img>
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title'],  // Allowing href (for links), src (for images), alt, and title attributes
      ALLOWED_PROTOCOLS: ['http', 'https', 'ftp', 'mailto']  // Allowing HTTP/HTTPS protocols for links and images
    })
  }

  const printPost = (post) => {
    const content = sanitizeContent(post.content)
    return (
      <div key={post.id} className={'post-card'}>
        <h2>{post.title}</h2>
        <span className={'separator'}></span>
        <p dangerouslySetInnerHTML={{ __html: content }}></p>
      </div>
    )
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
    const fetchPosts = async () => {
      try {
        const response = await request(
          'GET',
          '/api/post/me'
        )
        setPosts(response.data)
      } catch (e) {
        setError('Failed to fetch posts')
        console.error('Error: ', e)
      }
    }

    fetchPubKey()
    fetchPosts()
  }, [])

  return (
    <>
      <Header />
      <div className={'profile'}>
        <h1>Your profile</h1>
        <h2>Public key:</h2>
        {pubKey ?
          <>
            <p>
              <pre>{pubKey}</pre>
            </p>
          </>
          :
          <div>
            <p>
              You do not have a public key.
            </p>
            <input type="file" accept=".pem,.key" onChange={handleFileChange} />
            {newPubKey && <p>Public key loaded.</p>}
            <button onClick={handleUpdateKey}>Send</button>
          </div>
        }
        <h2>Posts:</h2>
        <div className={'posts'}>
          {posts.length !== 0 && posts.map(printPost)}
        </div>
      </div>
    </>
  )
}

export default Profile