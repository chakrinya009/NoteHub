import React , {useContext} from 'react'
import noteContext from '../context/noteContext';


const NoteItem = (props) => {

    
    const { note , updateNote} = props;
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const handleDelete = ()=>{
        deleteNote(note._id);
    };
    const handleEdit = ()=>{
        updateNote(note);
    };
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <span className='position-absolute top-0 translate-middle badge rounded-pill bg-success' style={{left:'90%',zIndex:'1'}}>{note.tag!==""?(note.tag.length>15?note.tag.substring(0,15)+'...':note.tag):""}</span>
                    <p className="card-title"><strong>{note.title}</strong></p>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-sharp fa-solid fa-trash mx-2" onClick={handleDelete}></i>
                    <i className="fa-solid fa-file-pen mx-2" onClick={handleEdit}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
