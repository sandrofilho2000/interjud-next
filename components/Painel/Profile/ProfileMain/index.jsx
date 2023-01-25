import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../../context/AuthContext'
import Credit from '../../../Credit'
import CreditsSlider from '../../CreditsSlider'

const Favorites = () => {
    const { sideMenuOpen, searchContext, credits, favoritesCredits } = useAuth()

    return (
        <main className={`main ${sideMenuOpen ? 'active' : ''}`}>
            <h1>
                PERFIL
            </h1>

        </main>
    )

}

export default Favorites