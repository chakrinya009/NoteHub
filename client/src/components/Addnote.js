import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext'
import modeContext from '../context/notes/ModeContext';

function Addnote() {
  let content2= useContext(modeContext);
  let {mode}=content2;
  const content = useContext(noteContext);
  let { addnote } = content;
  const [note, setNote] = useState({ title: "", discription: "", tag: "" });
  let changing = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }
  let submitting = (e) => {
    e.preventDefault();
    addnote(note.title,note.discription,note.tag);
    setNote({ title: "", discription: "", tag: "" });
  }

  return (

    <div className="container" style={{color : mode==='dark'?'white':'black'}}>
      <h2>Add a note</h2>
      <form className='my-3'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={changing} placeholder="min length=3" value={note.title} />

        </div>
        <div className="mb-3">
          <label htmlFor="discription" className="form-label">Discription</label>
          <input type="text" className="form-control" id="discription" name='discription' onChange={changing}  placeholder="min length=5" value={note.discription}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag">Tag</label>
          <input type="text" className="form-control" id="tag" name='tag'  onChange={changing} value={note.tag}/>
        </div>
        <button disabled={note.title.length<3 || note.discription.length<5} type="submit" className="btn btn-primary " onClick={submitting}>Add note</button>
      </form>
    </div>

  )
}

export default Addnote
