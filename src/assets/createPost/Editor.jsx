import React, { lazy, Suspense, useMemo, useRef } from 'react'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = lazy(() => import('react-quill'))

export const Editor = ({ value, onValueChange }) => {
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
    <Suspense fallback={<div>Loading editor...</div>}>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        defaultValue={value}
        onChange={onValueChange}
        modules={modules}
      />
    </Suspense>
  )
}
