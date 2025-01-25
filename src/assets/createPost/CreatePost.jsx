import { useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import { Editor } from './Editor.jsx'
import Header from '../header/Header.jsx'
import { request } from '../../api/axios_helper.js'
import { useNavigate } from 'react-router-dom'
import { Buffer } from 'buffer'

const CreatePost = () => {
  const [editorValue, setEditorValue] = useState('')
  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [valueError, setValueError] = useState(false)
  const [error, setError] = useState('')
  const [signPost, setSignPost] = useState(false)
  const [privateKey, setPrivateKey] = useState('')
  const navigate = useNavigate()

  // Handle private key file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => setPrivateKey(reader.result)
    reader.onerror = () => setError('Error reading the private key file.')
    reader.readAsText(file)
  }

  const handleTitleChange = (e) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    if (newTitle.length < 1 || newTitle.length >= 100) {
      setTitleError(true)
    } else {
      setTitleError(false)
    }
    setError('')
  }

  const handleValueChange = (e) => {
    const newValue = e
    setEditorValue(newValue)
    if (newValue.length < 1 || newValue.length >= 5000) {
      setValueError(true)
    } else {
      setValueError(false)
    }
    setError('')
  }

  const convertPEMToBinary = (pem) => {
    const base64 = pem
      .replace(/-----BEGIN PRIVATE KEY-----/, '')
      .replace(/-----END PRIVATE KEY-----/, '')
      .replace(/\n/g, '')
      .trim()
    return Uint8Array.from(atob(base64), c => c.charCodeAt(0))
  }

  const normalizeContent = (content) => {
    return content
      .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
      .replace(/>\s+</g, '><') // Remove spaces between tags
      .trim() // Trim leading and trailing spaces
  }
  const signContent = async (content, key) => {
    const normalizedContent = normalizeContent(content) // Normalize content
    const encoder = new TextEncoder()
    const encodedContent = encoder.encode(normalizedContent)
    const binaryKey = convertPEMToBinary(key)

    const importedKey = await window.crypto.subtle.importKey(
      'pkcs8',
      binaryKey.buffer,
      {
        name: 'RSASSA-PKCS1-v1_5',
        hash: { name: 'SHA-256' }
      },
      false,
      ['sign']
    );
    return window.crypto.subtle.sign('RSASSA-PKCS1-v1_5', importedKey, encodedContent)
      .then(signature => Buffer.from(new Uint8Array(signature)).toString('base64'));
  };
  
  const onPostSubmit = async () => {
    try {
      let signature = null
      if (signPost && privateKey) {
        signature = await signContent(editorValue, privateKey)
      }

      request('POST', '/api/post', {
        title: title,
        content: editorValue,
        signature: signPost ? signature : null
      })
        .then(() => navigate('/'))
        .catch(e => {
          setError(e.response?.data || 'An error occurred')
        })
    } catch (e) {
      setError('Error signing the post.')
    }
  }

  return (
    <>
      <Header />
      <h1>Create new post</h1>
      <div className={'new-post'}>
        <Editor value={editorValue} onValueChange={handleValueChange} title={title} onTitleChange={handleTitleChange}
                titleError={titleError} valueError={valueError} />
        <div>
          <label>
            <input
              type="checkbox"
              checked={signPost}
              onChange={() => setSignPost(!signPost)}
            />
            Sign the post
          </label>
          {signPost && (
            <div>
              <input type="file" accept=".pem,.key" onChange={handleFileChange} />
              {privateKey && <p>Private key loaded.</p>}
            </div>
          )}
        </div>
      </div>
      <button onClick={onPostSubmit} disabled={titleError || valueError}>Submit</button>
      {error && <p className={'error'}>{error}</p>}
    </>
  )
}

export default CreatePost
