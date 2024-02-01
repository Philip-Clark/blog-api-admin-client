import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const url = process.env.REACT_APP_API_URL;

export default function NewArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { authToken, userID } = useContext(AuthContext);
  const [status, setStatus] = useState('draft');

  const navigate = useNavigate();

  const save = async () => {
    handleSubmit();
    navigate(`/`);
  };

  const handleSubmit = () => {
    axios
      .post(
        `${url}/articles`,
        { title, content, author: userID, status },
        { headers: { Authorization: `Bearer ${authToken}` } }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const publish = () => {
    setStatus('published');
    handleSubmit();
  };

  return (
    <div>
      <button onClick={save} type="submit">
        Save Draft
      </button>
      <button onClick={publish} type="submit">
        Publish
      </button>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

      <ReactQuill
        value={content}
        onChange={setContent}
        theme="snow"
        modules={modules}
        formats={formats}
      />
    </div>
  );
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
const modules = {
  toolbar: [
    [{ size: [] }],
    [{ font: [] }],
    [{ color: [] }, { background: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ align: [] }],

    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header',
  'align',
  'color',
  'background',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];
