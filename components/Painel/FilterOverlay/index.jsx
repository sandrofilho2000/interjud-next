import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { FaStar, FaStarHalf } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'

const FilterOverlay = () => {
    const { filterOverlayActive, setFilterOverlayActive, searchContext, setSearchContext } = useAuth()
    const [filterRatingValue, setFilterRatingValue] = useState('')
    const [halfStar, setHalfStar] = useState(false)
    const [fullStars, setFullStars] = useState(0)

    let filterClasse = useRef()
    let filterValueMin = useRef()
    let filterValueMax = useRef()
    let filterRating = useRef() 

    !isNaN(filterRatingValue) ? Math.floor(filterRatingValue) : 0
    let stars = Array.from(Array(fullStars).keys())

    useEffect(()=>{
        setHalfStar(Number.isInteger(Number(filterRatingValue)))
        setFullStars(!isNaN(filterRatingValue) ? Math.floor(filterRatingValue) : 0)
    }, [filterRatingValue])

    let handleSearchContext = (e) =>{
        e.preventDefault()
        var obj = {
            name: searchContext.name,
            classe: filterClasse.current.value,
            min: filterValueMin.current.value,
            max: filterValueMax.current.value,
            rating: filterRating.current.value
        }
        setSearchContext('{classe: filterClasse.current.value, active: true}')
    }

    return (
        <div className={`filterOverlay ${filterOverlayActive ? 'active' : ''}`}>
            <form onSubmit={(e)=>{handleSearchContext(e)}} className='searchFilter'>
                <AiFillCloseCircle onClick={() => setFilterOverlayActive(false)} className="filterOverlayClose"/>

                <select onChange={(e)=>setSearchContext({classe: e.target.defaultValue})} name="filterClasse" ref={filterClasse} id="filterClasse">
                    <option selected value="">Classe Judicial - Todas</option>
                    <option value="Trabalhista">Trabalhista</option>
                    <option value="Cívil">Cívil</option>
                    <option value="Precatório">Precatório</option>
                    <option value="Consumidor">Consumidor</option>
                </select>
                <div className="valueMinMax">
                    <p>
                        Valor: 
                    </p>
                    <div className="inputsMinMax">
                        <input type="number" className='filterValueMin' ref={filterValueMin} id="filterValueMin" placeholder='Mínimo: R$' />
                        <input type="number" className='filterValueMax' ref={filterValueMax} id="filterValueMax" placeholder='Máximo: R$' />
                    </div>
                </div>
                <div className="filterRatingContainer">
                    <p>
                        Rating: 
                    </p>
                    <div className="inputRating">
                        <input type="range" onChange={(e)=>{setFilterRatingValue(e.target.value)}} name="filterRating" className="filterRating" ref={filterRating} id="filterRating" defaultValue={0} min={0} max={5} step={0.5} />
                        <div className="stars">
                        {
                            stars.map((item, index) => {
                                return <FaStar key={index} />
                            })
                        }

                        {
                            !halfStar &&
                            <FaStarHalf />
                        }
                        </div>
                    </div>
                </div>
                <div className="searchClear">
                    <input type="reset" value="Limpar" />
                    <input type="submit" value="Filtrar" />
                </div>
            </form>
        </div>
    )
}

export default FilterOverlay