import React, { useEffect } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useAuth } from '../../../context/AuthContext'

const FilterSearch = () => {
    const {searchContext, setSearchContext} = useAuth()

    useEffect(()=>{
        console.log(searchContext.rating)
    }, [])

    return (
        <div className="filterFields">
            {
                searchContext.name && 
                <div className="filterFieldSingle filterReu">
                    Réu:<span className="filterReuValue">{searchContext.name}</span> <span> <AiFillCloseCircle onClick={()=>{setSearchContext({...searchContext, name: ''})}} /> </span>
                </div>
            }
            {
                searchContext.classe && 
                <div className="filterFieldSingle filterClasse">
                    Classe:<span className="filterClasseValue">{searchContext.classe}</span> <span> <AiFillCloseCircle onClick={()=>{setSearchContext({...searchContext, classe: null})}} /> </span>
                </div>
            }
            {
                searchContext.min &&
                <div className="filterFieldSingle filterMinValue">
                    Mín:<span className="filterMinValue">{searchContext.min}</span> <span> <AiFillCloseCircle onClick={()=>{setSearchContext({...searchContext, min: null})}} /> </span>
                </div>
            }
            {
                searchContext.max &&
                <div className="filterFieldSingle filterMinValue">
                    Max:<span className="filterMinValue">{searchContext.max}</span> <span> <AiFillCloseCircle onClick={()=>{setSearchContext({...searchContext, max: null})}} /> </span>
                </div>
            }
            {
                searchContext.rating && searchContext.rating != 0 &&
                <div className="filterFieldSingle filterRating">
                Rating:<span className="filterRating">{searchContext.rating}</span> <span> <AiFillCloseCircle onClick={()=>{setSearchContext({...searchContext, rating: null})}} /> </span>
            </div>
            }

        </div>
    )
}

export default FilterSearch