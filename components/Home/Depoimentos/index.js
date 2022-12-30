import Image from 'next/image'
import React from 'react'
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'
import LineTitle from '../../LineTitle'
import daniel from '../../../public/assets/images/Depoimentos/Daniel.webp'
import Carousel from 'react-elastic-carousel'

const Depoimentos = () => {

    const quotes = [
        {
            id: 0,
            author: "Daniel",
            quote: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
            img: "daniel.webp"
        }
        ,
        {
            id: 0,
            author: "Julia",
            quote: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
            img: "julia.webp"
        }
        ,
        {
            id: 0,
            author: "André",
            quote: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
            img: "andre.webp"
        }
        ,
    ]

    const breakPoints = [
        {width: 1, itemsToShow: 1},
        {width: 540, itemsToShow: 2},
        {width: 768, itemsToShow: 3}
    ]

    return (
        <section id='depoimentos' className='depoimentos'>
            <div className='container'>
                <LineTitle text="Depoimentos"/>
                <Carousel breakPoints={breakPoints} className='depoimentos-wrapper'>
                    {
                        quotes.map((item, index)=>{
                            return (
                                <div key={index} className='single-depoimentos'>
                                    <div className='quote-depoimento'>
                                        <FaQuoteLeft/>
                                        <p>
                                            {item.quote}
                                        </p>
                                        <FaQuoteRight/>
                                    </div>
                                    <div className='author-depoimento'>
                                        <Image alt={`Depoimento de ${item.author} à InterJud`} title={`Depoimento de ${item.author} à InterJud`} width={50} height={50} src={`/../public/assets/images/Depoimentos/${item.img}`}/>
                                        <p className='author-name'>
                                            {item.author}
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Carousel>
            </div>
        </section>
    )
}

export default Depoimentos