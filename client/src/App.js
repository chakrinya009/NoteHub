import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import AlertState from './context/notes/AlertState';
import ModeState from './context/notes/ModeState';

function App() {
  
  return (
    <>
    <ModeState>
    <AlertState>
    <NoteState>
      <BrowserRouter>
        <Navbar/>
        <Alert/>
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/about" element={<About/>}></Route>
          <Route exact path="/login" element={<Login/>}></Route>
          <Route exact path="/signup" element={<Signup/>}></Route>
        </Routes>
      </BrowserRouter>
      </NoteState>
      </AlertState>
      </ModeState>
    </>
  );
}

export default App;
