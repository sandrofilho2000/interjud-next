import React, { useEffect, useState } from 'react'
import MainTop from './MainTop'
import { collection, getDocs } from 'firebase/firestore'
import { useAuth } from '../../../context/AuthContext'
import { db, storage } from '../../../firebase';
import Credit from '../../Credit';
import CreditsSlider from './CreditsSlider';


const Main = () => {
    const { sideMenuOpen, setSideMenuOpen } = useAuth()
    const [credits, setCredits] = useState([{}])
    const creditsCollectionRef = collection(db, "creditos")

    const getCredits = async () => {
        const data = await getDocs(creditsCollectionRef)
        let cre = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        setCredits(cre)
    }



    useEffect(() => {
        getCredits()
    }, [])


    return (
        <main className={`main ${sideMenuOpen ? 'active' : ''}`}>
            <MainTop />
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