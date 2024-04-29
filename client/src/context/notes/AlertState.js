import { useState } from "react";
import alertContext from "./AlertContext";

const AlertState = (props) => {
  const [alert, setalert] = useState(null);
  let showalert = (messsage, type) => {
    setalert({
      msg: messsage,
      type: type
    
    })
    setTimeout(() => {
      setalert(null);
    }, 1000);
  }

  return (
    
    <alertContext.Provider value={{alert,showalert}}>
      {props.children}
    </alertContext.Provider>
  )
}

export default AlertState;
