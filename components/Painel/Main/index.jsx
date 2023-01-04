import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { useAuth } from '../../../context/AuthContext'
import { db, storage } from '../../../firebase';
import Credit from '../../Credit';
import CreditsSlider from './CreditsSlider';
import useCredits from '../../hooks/useCredits';


const Main = () => {
    const { sideMenuOpen, setSideMenuOpen } = useAuth()

    const { credits } = useCredits()

    return (
        <main className={`main ${sideMenuOpen ? 'active' : ''}`}>
            <h1>
                HOME
            </h1>
            <div className='creditsWrapper'>
                <CreditsSlider credits={credits} text="MAIS RECENTES"/>
                <CreditsSlider credits={credits} text="5 ESTRELAS"/>
                <CreditsSlider credits={credits} text="RECEBA EM ATÉ 1 ANO"/>
                <CreditsSlider credits={credits} text="FAVORITOS"/>
                <CreditsSlider credits={credits} text="MAIS POPULARES"/>
            </div>
        </main>
    )
}

export default Main