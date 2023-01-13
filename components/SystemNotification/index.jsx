import React from 'react'
import { useAuth } from '../../context/AuthContext'

const SystemNotification = () => {
    const {systemNotificationActive, setSystemNotificationActive} = useAuth()
    const { active, status, message } = systemNotificationActive

    let handleCloseNotification = () =>{
        setSystemNotificationActive({...systemNotificationActive, active: false})
    }

    return (
        <div className={`SystemNotification ${ active ? 'active' : '' } ${ status }`}>
            <span>
                {message}
            </span>

            <span className="closeNoti" onClick={()=>{handleCloseNotification()}}>
                +
            </span>
        </div>
    )
}

export default SystemNotification