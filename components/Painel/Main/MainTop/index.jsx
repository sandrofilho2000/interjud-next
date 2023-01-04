import React, { useEffect, useRef, useState } from 'react'
import { BiMenuAltLeft } from 'react-icons/bi'
import { BsSearch } from 'react-icons/bs'
import { AiFillNotification, AiFillFilter } from 'react-icons/ai'
import { FaFilter } from 'react-icons/fa'
import { useAuth } from '../../../../context/AuthContext'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../../firebase'

const MainTop = () => {
    const { sideMenuOpen, setSideMenuOpen, searchMainActive, setSearchMainActive, searchedCredits, setSearchedCredits } = useAuth()
    const [credits, setCredits] = useState([{}])
    const inputSearch = useRef()
    const creditsCollectionRef = collection(db, "creditos")

    let handleSideMenuOpen = () => {
        setSideMenuOpen(!sideMenuOpen)
    }

    const getCredits = async () => {
        const data = await getDocs(creditsCollectionRef)
        let cre = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        setCredits(cre)
    }

    useEffect(() => {
        getCredits()
    }, [])


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
            </div>
            <div className="notificationWrapper">
                <AiFillNotification />
            </div>
        </div>
    )
}

export default MainTop