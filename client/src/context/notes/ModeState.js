import { useState} from "react";
import modeContext from "./ModeContext";


const ModeState = (props) => {
    const [mode, setmode] = useState('light');
        // const [mode, setMode] = useState(
        //   () => localStorage.getItem("theme") || "light");

    let toggleMode = () => {
        if (mode === 'dark') {
          document.body.style.backgroundColor = 'white';
          setmode('light');
      
        }
        else {
          document.body.style.backgroundColor = '#343a40';
          setmode('dark');
       
        }
      }
    return (
    
        <modeContext.Provider value={{mode,toggleMode}}>
            {props.children}
        </modeContext.Provider>
      )
}

export default ModeState;