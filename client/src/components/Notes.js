import React, { useContext, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/NoteContext'
import Addnote from './Addnote';
import NoteItem from './NoteItem';
import modeContext from '../context/notes/ModeContext';

function Notes() {
  let content2= useContext(modeContext);
  let {mode}=content2;
  const content = useContext(noteContext);
  let navigate = useNavigate();
  let { notes, getnotes, editnote } = content;
  const ref = useRef(null);
  const refClose = useRef(null);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getnotes();
      // eslint-disable-next-line
    }
    else {
      navigate("/login");
    }
  }, [])

  const [note, setNote] = useState({ id: "", etitle: "", ediscription: "", etag: "" });
  let changing = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }
  let submitting = (e) => {
    e.preventDefault();
    editnote(note.id, note.etitle, note.ediscription, note.etag);
    refClose.current.click();

  }

  let updatenote = (currentnote) => {
    ref.current.click(); //ref->reference to it current ->where it is referencing and click means on its click
    setNote({ id: currentnote._id, etitle: currentnote.title, ediscription: currentnote.discription, etag: currentnote.tag });
  }

  return (
    <>
      <Addnote />
      {/* going to use model */}

      <button type="button" style={{ display: "none" }} className="btn btn-primary " data-bs-toggle="modal" data-bs-target="#staticBackdrop" ref={ref}>
        Launch static backdrop modal
      </button>


      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true"  >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header" style={{backgroundColor: mode==='dark'?'#343a40':'white' , borderColor:mode==='dark'?'white':'black',color : mode==='dark'?'white':'black'}}>
              <h5 className="modal-title" id="staticBackdropLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body" style={{backgroundColor: mode==='dark'?'#343a40':'white' , borderColor:mode==='dark'?'white':'black',color : mode==='dark'?'white':'black'}}>
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" value={note.etitle} onChange={changing} />

                </div>
                <div className="mb-3">
                  <label htmlFor="ediscription" className="form-label">Discription</label>
                  <input type="text" className="form-control" id="ediscription" name='ediscription' value={note.ediscription} onChange={changing} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={changing} />
                </div>
              </form>
            </div>
            <div className="modal-footer" style={{backgroundColor: mode==='dark'?'#343a40':'white' , borderColor:mode==='dark'?'white':'black',color : mode==='dark'?'white':'black'}}>
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 3 || note.ediscription.length < 5} type="button" className="btn btn-primary" onClick={submitting}>Update</button>
            </div>
          </div>
        </div>
      </div>

      {/* // using row to make cards come in horizontal way */}
      <div className='row' style={{color : mode==='dark'?'white':'black'}}>
        <h2>My notes</h2>
        <div className='container '>
          <h3>{notes.length === 0 && "No notes to display"}</h3>
        </div>
        {notes.map((ele) => {
          return <NoteItem key={ele._id} updatenote={updatenote} note={ele} />
        })}
      </div>
    </>
  )
}

export default Notes
