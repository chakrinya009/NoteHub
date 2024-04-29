import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'
import modeContext from '../context/notes/ModeContext';

function NoteItem(props) {
    let content2 = useContext(modeContext);
    let { mode } = content2;
    const content = useContext(noteContext);
    let { deletenote } = content;
    let { title, discription, tag, _id } = props.note;
    let deleteit = () => {
        // a.showalert(`Notes is successfully deleted`,"success");
        deletenote(_id);
    }
    return (
        //col-md-3 to place only 4 cards in row 
        <div className="col-md-3" style={{color : mode==='dark'?'white':'black'}}>
            <div className="card my-3" style={{backgroundColor: mode==='dark'?'#343a40':'white' , borderColor:mode==='dark'?'white':'black'}}>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>

                    {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>  we need to put tag in this */}
                    <p className="card-text">{discription}</p>
                    {/* <a href="#" className="card-link">Card link</a>
                <a href="#" className="card-link">Another link</a> */}
                    <div>
                        <button type="button" className="btn btn-primary btn-sm">{tag}</button>
                    </div>

                    <i className="fa-solid fa-trash mx-2 my-4" onClick={deleteit}></i>
                    <i className="fa-solid fa-pen mx-2" onClick={() => { props.updatenote(props.note) }}></i>  {/* updatenote need argument so we have pass it argument but not call it here */}
                </div>
            </div>
        </div>
    )
}

export default NoteItem
