import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { AiFillCloseCircle } from 'react-icons/ai'
import { db } from '../../../firebase'
import Credit from '../../Credit'
import useCredits from '../../hooks/useCredits'

const SearchMain = ({credits}) => {
    const { sideMenuOpen, searchMainActive, setSearchMainActive, searchContext } = useAuth()
    const [searchedCredits, setSearchedCredits] = useState([])

    let handleSearchMainActive = () => {
        setSearchMainActive(!searchMainActive)
    }

    useEffect(() => {
        var list = [];

         credits.filter((item) => {
 
            if(item.name.toLowerCase().includes(searchContext.name.toLowerCase())){
                list.push(item)
            }
            if(searchContext.class){
                if(item.class.toLowerCase().includes(searchContext.class.toLowerCase())){
                    list.push(item)
                }
            }
        })

        setSearchedCredits(list)
    }, [searchContext])

    return (
        <main className={`searchMain ${sideMenuOpen ? 'active' : ''}`}>
            <AiFillCloseCircle onClick={() => { handleSearchMainActive() }} className='searchMainClose' />
            <div className="creditsWrapper">

                {
                    searchedCredits ?

                        searchedCredits.map((item) => {
                            return (
                                <Credit key={item.id} credit={item} />
                            )
                        })
                        :
                        <h1>
                            Sem créditos disponíveis
                        </h1>
                }



            </div>
        </main>
    )
}

export default SearchMain