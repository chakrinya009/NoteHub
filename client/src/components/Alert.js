import React , { useContext } from 'react';
import noteContext from '../context/noteContext';

const Alert = () => {
    const context = useContext(noteContext);
    const {alert} = context ;
    return (
        <div>
            {
                alert!==null && 
                <div className={`alert alert-${alert.type}`} role="alert">
                    {alert.msg}
                </div>
            }
        </div>
    )
}
export default Alert