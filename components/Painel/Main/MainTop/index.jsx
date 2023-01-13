import React, { useEffect, useRef, useState } from 'react'
import { BiMenuAltLeft } from 'react-icons/bi'
import { BsSearch } from 'react-icons/bs'
import { AiFillNotification, AiFillFilter } from 'react-icons/ai'
import { FaFilter } from 'react-icons/fa'
import { useAuth } from '../../../../context/AuthContext'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../../firebase'
import Notifications from '../../Notifications'
import useCredits from '../../../hooks/useCredits'

const MainTop = () => {
    const { sideMenuOpen, setSideMenuOpen, searchMainActive, setSearchMainActive, searchedCredits, setSearchedCredits } = useAuth()
    const [notificationActive, setNotificationActive] = useState(false)
    const inputSearch = useRef()
    const creditsCollectionRef = collection(db, "creditos")
    const { credits } = useCredits()

    let handleSideMenuOpen = () => {
        setSideMenuOpen(!sideMenuOpen)
    }

    let handleNotificationActive = () =>{
        setNotificationActive(!notificationActive)
    }

    let handleSearchMainActive = (e) => {
        if (inputSearch.current.value) {
            setSearchMainActive(true)
        } else {
            setSearchMainActive(false)
        }


        let filteredCredits = []
        credits.filter((item) => {
            if(item.name.toLowerCase().includes(inputSearch.current.value.toLowerCase())){
                filteredCredits.push(item)
            }
        })

        setSearchedCredits(filteredCredits)
    }

    return (
        <div className={`mainTop ${sideMenuOpen ? 'active' : ''}`}>
            <div className='menuToggle'>
                <BiMenuAltLeft onClick={() => { handleSideMenuOpen() }} />
            </div>
            <div className='searchField'>
                <BsSearch />
                <input type="search" ref={inputSearch} onChange={(e) => { handleSearchMainActive(e) }} id='searchItems' className='searchItems' placeholder='Pesquisar' />
                <FaFilter />
                <div className="searchFilter">
                    
                </div>
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