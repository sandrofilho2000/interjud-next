import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { FaStar, FaStarHalf } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'

const FilterOverlay = () => {
    const { filterOverlayActive, setFilterOverlayActive } = useAuth()
    const [filterRatingValue, setFilterRatingValue] = useState('')
    const [halfStar, setHalfStar] = useState(false)
    const [fullStars, setFullStars] = useState(0)

    !isNaN(filterRatingValue) ? Math.floor(filterRatingValue) : 0
    let stars = Array.from(Array(fullStars).keys())

    useEffect(()=>{
        setHalfStar(Number.isInteger(Number(filterRatingValue)))
        setFullStars(!isNaN(filterRatingValue) ? Math.floor(filterRatingValue) : 0)
        console.log(fullStars, halfStar)
    }, [filterRatingValue])

    return (
        <div className={`filterOverlay ${filterOverlayActive ? 'active' : ''}`}>
            <form className='searchFilter'>
                <AiFillCloseCircle onClick={() => setFilterOverlayActive(false)} className="filterOverlayClose"/>

                <select name="filter_classe" id="filter_classe">
                    <option selected disabled>Classe Judicial - Todas</option>
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
                        <input type="number" className='filterValueMin' id="filterValueMin" placeholder='Mínimo: R$' />
                        <input type="number" className='filterValueMax' id="filterValueMax" placeholder='Máximo: R$' />
                    </div>
                </div>
                <div className="filterRatingContainer">
                    <p>
                        Rating: 
                    </p>
                    <div className="inputRating">
                        <input type="range" onChange={(e)=>{setFilterRatingValue(e.target.value)}} name="filterRating" className="filterRating" id="filterRating" defaultValue={0} min={0} max={5} step={0.5} />
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