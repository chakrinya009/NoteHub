import React from 'react'
import alertContext from '../context/notes/AlertContext';
import { useContext } from 'react';

const  Alert=()=>{
    let context=useContext(alertContext);
    let {alert}=context;
    return (
        
        <div style={{height:'75px'}}>
        {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
            <strong>{alert.type}</strong><div>{alert.msg}</div>
        </div>}
        </div>
        
    )
}

export default Alert
