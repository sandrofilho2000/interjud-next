import React from 'react'
import { AiFillCheckCircle, AiFillCloseCircle, AiFillWarning } from 'react-icons/ai'
import { useAuth } from '../../context/AuthContext'

const SystemNotification = () => {
    const {systemNotificationActive, setSystemNotificationActive} = useAuth()
    const { active, status, message, link } = systemNotificationActive

    let handleCloseNotification = (e) =>{
        e.preventDefault()
        setSystemNotificationActive({...systemNotificationActive, active: false})
    }

    return (
        <a href={link} className={`SystemNotification ${ active ? 'active' : '' } ${ status }`}>
            {
                status == 'success' &&
                <AiFillCheckCircle/>
            }
            {
                status == 'warning' &&
                <AiFillWarning/>
            }
            {
                status == 'error' &&
                <AiFillCloseCircle/>
            }
            <span>
                {message}
            </span>

            <span className="closeNoti" onClick={(e)=>{handleCloseNotification(e)}}>
                +
            </span>
        </a>
    )
}

export default SystemNotification