import React, { useEffect, useState } from 'react'
import Credit from '../../Credit'
import LineTitle from '../../LineTitle'

const PortalCreditos = () => {
    const [credits, setCredits] = useState([{}])
    let cre = [
        {
            id: 1,
            name: "Banco do Brasil",
            value: 627.500,
            class: "Trabalhista",
            img: ''
        }
        ,
        {
            id: 2,
            name: "Banco do Brasil",
            value: 627.500,
            class: "Trabalhista",
            img: ''
        }
        ,
        {
            id: 3,
            name: "Banco do Brasil",
            value: 627.500,
            class: "Trabalhista",
            img: ''
        }
        ,
        {
            id: 4,
            name: "Banco do Brasil",
            value: 627.500,
            class: "Trabalhista",
            img: ''
        }
        ,
    ]

    useEffect(() => {
        setCredits(cre)
        document.querySelectorAll(".portalCreditos .rec-dot").forEach((item, index)=>{
            item.setAttribute("aria-label", "navigation button")
        })
    }, [])


    const breakPoints = [
        {width: 1, itemsToShow: 1},
        {width: 540, itemsToShow: 2},
        {width: 768, itemsToShow: 3}
    ]


    return (
        <section className='portalCreditos' id='portalCreditos'>
            <div className='container'>
                <LineTitle text="Portal de Créditos" />
                <div className='creditsList'>
        
                        {credits.map((item, index) => {
                            return (
                                <Credit key={index} credit={item} />
                            )
                        })}
                </div>
            </div>
        </section>
    )
}

export default PortalCreditos