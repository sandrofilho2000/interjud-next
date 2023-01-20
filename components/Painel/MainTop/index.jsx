import React, { useRef, useState } from 'react'
import { BiMenuAltLeft } from 'react-icons/bi'
import { BsSearch } from 'react-icons/bs'
import { AiFillNotification } from 'react-icons/ai'
import { FaFilter } from 'react-icons/fa'
import { useAuth } from '../../../context/AuthContext'
import Notifications from '../Notifications'
import useCredits from '../../hooks/useCredits'

const MainTop = () => {
    const { sideMenuOpen, setSideMenuOpen, searchMainActive, setSearchMainActive, searchContext, setSearchContext } = useAuth()
    const [notificationActive, setNotificationActive] = useState(false)
    const {filterOverlayActive, setFilterOverlayActive} = useAuth()
    const inputSearch = useRef()
    const { credits } = useCredits()

    let handleSideMenuOpen = () => {
        setSideMenuOpen(!sideMenuOpen)
    }

    let handleNotificationActive = () =>{
        setNotificationActive(!notificationActive)
    }

    let handleSearchMainActive = (e) => {

        setSearchContext({name: inputSearch.current.value})
        if(inputSearch.current.value){
            setSearchMainActive(true)
        }else{
            setSearchMainActive(false)
        }
    }

    return (
        <div className={`mainTop ${sideMenuOpen ? 'active' : ''}`}>
            <div className='menuToggle'>
                <BiMenuAltLeft onClick={() => { handleSideMenuOpen() }} />
            </div>
            <div className='searchField'>
                <BsSearch />
                <input type="search" ref={inputSearch} onChange={(e) => { handleSearchMainActive(e) }} id='searchItems' className='searchItems' placeholder='Pesquisar' />
                <FaFilter onClick={()=>{setFilterOverlayActive(!filterOverlayActive)}} />
            </div>
            <div className="notificationWrapper">
                <AiFillNotification onClick={()=>{handleNotificationActive()}} />
                <p className="notificationNumber">
                    1
                </p>
                <Notifications active={notificationActive}/>
            </div>
        </div>
    )
}

export default MainTop