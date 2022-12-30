import React, { useEffect, useState } from 'react'
import Credit from '../../Credit'
import LineTitle from '../../LineTitle'
import Carousel from 'react-elastic-carousel'

const PortalCreditos = () => {
    const [credits, setCredits] = useState([{}])
    let cre = [
        {
            id: 1,
            name: "Banco do Brasil",
            value: 627500,
            rating: 3,
            class: "Trabalhista",
            img: 'banco_do_brasil.webp'
        }
        ,
        {
            id: 2,
            name: "Via Varejo",
            value: 45500,
            rating: 4.5,
            class: "Consumidor",
            img: 'via_varejo.png'
        }
        ,
        {
            id: 3,
            name: "Caixa Econômica Federal",
            value: 80500.50,
            rating: 5,
            class: "Trabalhista",
            img: 'caixa_federal.png'
        }
        ,
        {
            id: 4,
            name: "Pão de Açucar",
            value: 192500,
            rating: 1.5,
            class: "Trabalhista",
            img: 'pao_de_acucar.png'
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
                <Carousel breakPoints={breakPoints} className='creditsList'>

                        {credits.map((item, index) => {
                            return (
                                <Credit key={index} credit={item} />
                            )
                        })}
                </Carousel>
            </div>
        </section>
    )
}

export default PortalCreditos