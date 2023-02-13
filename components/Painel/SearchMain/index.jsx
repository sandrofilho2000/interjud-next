import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { AiFillCloseCircle } from 'react-icons/ai'
import Credit from '../../Credit'
import FilterSearch from '../FilterSearch'

const SearchMain = ({credits}) => {
    const { sideMenuOpen, searchMainActive, setSearchMainActive, searchContext  } = useAuth()
    const [searchedCredits, setSearchedCredits] = useState([])

    let handleSearchMainActive = () => {
        setSearchMainActive(!searchMainActive)
    }

        let isEmpty = (obj) => {
        if(!obj){
            return false
        }else{
            return Object.values(obj).every(x => x === null || x === '');
        }
    }

    useEffect(() => {
        var list = [...credits];

        if(!isEmpty(list[0])){
            list.filter((item) => {
                if (searchContext.name) {
                    list = list.filter((item) => {
                        return item.name.toLowerCase().includes(searchContext.name.toLowerCase())
                    })
                }
                if (searchContext.classe) {
                    list = list.filter((item) => {
                        return item.class.toLowerCase().includes(searchContext.classe.toLowerCase())
                    })
                }
                if (searchContext.min) {
                    list = list.filter((item) => {
                        return Number(item.valor_negociar) >= Number(searchContext.min)
                    })
                }
                if (searchContext.max) {
                    list = list.filter((item) => {
                        return Number(item.valor_negociar) <= Number(searchContext.max)
                    })
                }
                if (searchContext.rating) {
                    list = list.filter((item) => {
                        return Number(item.rating) >= Number(searchContext.rating)
                    })
                }
            })
            setSearchedCredits(list)
        }

    }, [searchContext, credits])

    return (
        <main className={`searchMain ${sideMenuOpen ? 'active' : ''}`}>
            <AiFillCloseCircle onClick={() => { handleSearchMainActive() }} className='searchMainClose' />
            <div className="creditsWrapper">
            <FilterSearch/>

                {
                    searchedCredits.length ?
                        searchedCredits.map((item) => {
                            return (
                                <Credit key={item.id} credit={item} />
                            )
                        })
                        :
                        <h4>
                            CRÉDITO NÃO ENCONTRADO
                        </h4>
                }
            </div>
        </main>
    )



}

export default SearchMain