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

  const convertPEMToBinary = (pem) => {
    const base64 = pem
      .replace(/-----BEGIN PRIVATE KEY-----/, '')
      .replace(/-----END PRIVATE KEY-----/, '')
      .replace(/\n/g, '')
      .trim()
    return Uint8Array.from(atob(base64), c => c.charCodeAt(0))
  }

  // Generate the signature using the private key
  const signContent = async (content, key) => {
    const encoder = new TextEncoder()
    const encodedContent = encoder.encode(content)
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
    )
    return window.crypto.subtle.sign('RSASSA-PKCS1-v1_5', importedKey, encodedContent)
      .then(signature => Buffer.from(new Uint8Array(signature)).toString('base64'))
  }

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
          console.log(e)
          setError(e.response?.data || 'An error occurred')
        })
    } catch (e) {
      console.log(e)
      setError('Error signing the post.')
    }
  }

  return (
    <>
      <Header />
      <h1>Create new post</h1>
      <div className={'new-post'}>
        <Editor value={editorValue} onValueChange={setEditorValue} title={title} onTitleChange={setTitle} />
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
      <button onClick={onPostSubmit}>Submit</button>
      {error && <p className={'error'}>{error}</p>}
    </>
  )
}

export default CreatePost
