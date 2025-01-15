import { useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import { Editor } from './Editor.jsx'
import Header from '../header/Header.jsx'
import { request } from '../../api/axios_helper.js'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
  const [editorValue, setEditorValue] = useState('')
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // todo add data validation, min, max, etc.

  const onPostSubmit = () => {
    try {
      request('POST', '/api/post',
        {
          title: title,
          content: editorValue
        })
        .then(() => navigate('/'))
        .catch(e => {
            console.log(e)
            setError(e.response.data)
          }
        )
    } catch (e) {
      console.log(e)
      setError(e.data)
    }
  }

  return (
    <>
      <Header />
      <div>
        <Editor value={editorValue} onValueChange={setEditorValue} title={title} onTitleChange={setTitle} />
      </div>
      <button onClick={onPostSubmit}>Submit</button>
      {error && <p className={'error'}>{error}</p>}
    </>
  )
}

export default CreatePost