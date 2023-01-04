import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { AiFillCloseCircle } from 'react-icons/ai'
import { db } from '../../../firebase'
import Credit from '../../Credit'
import MainTop from '../Main/MainTop'

const SearchMain = () => {
    const { sideMenuOpen, searchMainActive, setSearchMainActive, searchedCredits } = useAuth()

    let handleSearchMainActive = () =>{
        setSearchMainActive(!searchMainActive)
    }

    return (
        <main className={`searchMain ${sideMenuOpen ? 'active' : ''}`}>
            <AiFillCloseCircle onClick={()=>{handleSearchMainActive()}} className='searchMainClose'/>
            <div className="creditsWrapper">
                
                    {
                        searchedCredits ?
                        
                        searchedCredits.map((item)=>{
                        return (
                            <Credit key={item.id} credit={item} />
                        )
                        })

                        :
                        <h1>
                            Sem c´reditos disponíveis
                        </h1>

                        
                        
                    }
                    
                    
                
            </div>
        </main>
    )
}

export default SearchMain