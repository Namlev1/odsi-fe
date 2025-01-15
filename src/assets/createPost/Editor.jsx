import React, { lazy, Suspense, useMemo, useRef } from 'react'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = lazy(() => import('react-quill'))

export const Editor = ({ value, onValueChange, title, onTitleChange }) => {
  const quillRef = useRef(null)
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ['image']
        ],
        handlers: {
          image: imageHandler
        }
      }
    }),
    []
  )

  function imageHandler() {
    if (!quillRef.current) return

    const editor = quillRef.current.getEditor()
    const range = editor.getSelection()
    const value = prompt('Please enter the image URL')

    if (value && range) {
      editor.insertEmbed(range.index, 'image', value, 'user')
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        style={{
          width: '100%',
          padding: '8px',
          marginBottom: '10px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}
      />
      <Suspense fallback={<div>Loading editor...</div>}>
        <ReactQuill
          ref={quillRef}
          theme="snow"
          defaultValue={value}
          onChange={onValueChange}
          modules={modules}
        />
      </Suspense>
    </div>
  )
}
