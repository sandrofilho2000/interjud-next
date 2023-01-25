import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../../context/AuthContext'
import Credit from '../../../Credit'
import CreditsSlider from '../../CreditsSlider'

const Favorites = () => {
    const { sideMenuOpen, searchContext, credits, favoritesCredits } = useAuth()

    return (
        <main className={`main ${sideMenuOpen ? 'active' : ''}`}>
            <h1>
                FAVORITOS
            </h1>

            <div className='creditsWrapper favorites'>
                {
                    favoritesCredits.length ?
                    favoritesCredits.map((item) => {
                        return (
                            <Credit key={item.id} credit={item} />
                        )
                    })

                    : (

                        <h4>
                            VOCÊ NÃO POSSUI CRÉDITOS FAVORITOS
                        </h4>
                    )
                }
            </div>
        </main>
    )

}

export default Favorites