import noteContext from "./NoteContext";
import { useState, useContext } from "react";
import alertContext from "./AlertContext";

const NoteState = (props) => {
  let context = useContext(alertContext);
  let { showalert } = context;
  let notesInitial = [];
  const [notes, setNote] = useState(notesInitial);

  
  let localhost = "http://localhost:5000";

  //a fecth function to get the initial notes
  let getnotes = async () => {
    let response = await fetch(`${localhost}/api/notes/getnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    setNote(await response.json());

  }


  //Add a note
  let addnote = async (title, discription, tag) => {

    //add to backend :api call
    if (tag === "")
      tag = "general";
    let response = await fetch(`${localhost}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title: title, discription: discription, tag: tag })
    });
    let json = await response.json();


    showalert("sucessfully addded note","success");
    let note = json;

    setNote(notes.concat(note));  //concat returns an array

  }

  //Delete a note
  let deletenote = async (id) => {
    //delete in  backend :api call
    // console.log("Note is being deleted"+id);

    let newnote = notes.filter((ele) => {
      return ele._id !== id             //return all the notes whose id is not equal to {id}
    })
    setNote(newnote);
    let response = await fetch(`${localhost}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    // console.log(response);
    showalert("sucessfully deleted a note","success");
  }

  //Edit a note
  let editnote = async (id, title, discription, tag) => {
    // edit logic
    //add this to api call
    let newnotes = JSON.parse(JSON.stringify(notes));
    let response = await fetch(`${localhost}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title: title, discription: discription, tag: tag })
    });
    console.log(response.json());

    for (let index = 0; index < newnotes.length; index++) {
      const element = newnotes[index];
      if (element._id === id) {
        newnotes[index].title = title;
        newnotes[index].discription = discription;
        newnotes[index].tag = tag;
        break;
      }
    }
    setNote(newnotes);
    showalert("sucessfully edited a note","success")
  }

  //read a note is already displaying
  return (
    <noteContext.Provider value={{ notes, addnote, deletenote, editnote, getnotes }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;