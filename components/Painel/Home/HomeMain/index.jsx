import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../../context/AuthContext'
import CreditsSlider from '../../CreditsSlider'

const HomeMain = () => {
    const { sideMenuOpen, searchContext, credits, favoritesCredits } = useAuth()

    useEffect(()=>{
        
    }, [favoritesCredits])

    return (
        <main className={`main ${sideMenuOpen ? 'active' : ''}`}>
            <h1>
                HOME
            </h1>

            <div className='creditsWrapper'>
                <CreditsSlider credits={credits} text="MAIS RECENTES" />
                <CreditsSlider credits={credits} text="5 ESTRELAS" />
                <CreditsSlider credits={credits} text="RECEBA EM ATÉ 1 ANO" />
                <CreditsSlider credits={favoritesCredits} text="FAVORITOS" />
                <CreditsSlider credits={credits} text="MAIS POPULARES" />
            </div>
        </main>
    )

}

export default HomeMain