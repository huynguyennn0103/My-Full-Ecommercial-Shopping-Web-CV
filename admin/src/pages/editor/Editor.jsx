import React from 'react'
import { useState } from 'react'
import './editor.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const Editor = () => {
     const [value, setValue] = useState('');
     console.log(value)
     const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
      }
    
      const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
      ]
  return (
    <div className='editor'>
        <div className="editor-container">
            <ReactQuill theme="snow" modules={modules} formats={formats} value={value} onChange={setValue} />;
        </div>
    </div>
  )
}

export default Editor
