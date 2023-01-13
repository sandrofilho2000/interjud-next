import React, { useRef, useState } from 'react'
import { FaStar, FaStarHalf, FaInfoCircle } from 'react-icons/fa'
import { FiSend } from 'react-icons/fi'
import { AiFillCloseCircle } from 'react-icons/ai'
import logo_j from '../../public/assets/images/logo_j.png'
import Image from 'next/image'
import { useAuth } from '../../context/AuthContext'

const FilterOverlay = () => {

    const { filterOverlayActive, setFilterOverlayActive } = useAuth()

    let handleFilterSumit = () => {

    }

    let handleFilterActive = () => {
        setFilterOverlayActive(false)
    }


    return (
        <div className={`${filterOverlayActive ? 'FilterOverlay active' : 'FilterOverlay'}`}>

                <AiFillCloseCircle onClick={() => handleFilterActive()} className="closeFilterOverlay" />

                <form onSubmit={(e) => { handleFilterSumit(e) }} className='filterContainer'>


                </form>
        </div>
    )
}



export default FilterOverlay