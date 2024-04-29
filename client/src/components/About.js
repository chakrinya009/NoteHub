import React,{useContext} from 'react'
import modeContext from '../context/notes/ModeContext'



const About = () => {

  let content2= useContext(modeContext);
  let {mode}=content2;


  return (
    <div className='container about' style={{color : mode==='dark'?'white':'black'}} >
      <h3>Hello,</h3>
      <p>This is a MERN project to store your notes in the cloud. You just have to create an account by using the "Sign up" page and you are good to go.
        In this app, you can create, edit or delete your notes with a few simple clicks. Since I am using jwt package, no one can see your notes (not even me) except you. Isn't it great!! It is responsive so you can use this on any device. Don't forget to log out before you close your browser.</p>


      <ul>The concept used:-
        <li>Mongo DB Atlas to store the user notes, and details</li>
        <li>JWT for password security and authentication </li>
        <li>Node Js web server with Express and Mongoose for the backend</li>
        <li>React for frontend</li>
        <li>Bootstrap for styling</li>

      </ul>

      <p>-Chakrinya Balabhadra</p>

    </div>
  )
}

export default About
