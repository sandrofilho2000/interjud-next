import React from 'react'
import { BiMenuAltLeft } from 'react-icons/bi'
import { BsSearch } from 'react-icons/bs'
import { AiFillNotification, AiFillFilter } from 'react-icons/ai'
import { FaFilter } from 'react-icons/fa'
import { useAuth } from '../../../../context/AuthContext'

const MainTop = () => {
    const {sideMenuOpen, setSideMenuOpen} = useAuth()
    
    let handleSideMenuOpen = () =>{
        setSideMenuOpen(!sideMenuOpen)
    }

    return (
        <div className='mainTop'>
            <div className='menuToggle'>
                <BiMenuAltLeft onClick={()=>{handleSideMenuOpen()}} />
            </div>
            <div className='searchField'>
                <BsSearch />
                <input type="search" id='searchItems' className='searchItems' placeholder='Pesquisar'/>
                <FaFilter/>
            </div>
            <div className="notificationWrapper">
                <AiFillNotification/>
            </div>
        </div>
    )
}

export default MainTop