import { useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import { Editor } from './Editor.jsx'
import Header from '../header/Header.jsx'

const CreatePost = () => {
  const [editorValue, setEditorValue] = useState('')
  console.log(editorValue)

  return (
    <>
      <Header />
      <div>
        <Editor value={editorValue} onValueChange={setEditorValue} />
      </div>
    </>
  )
}

export default CreatePost