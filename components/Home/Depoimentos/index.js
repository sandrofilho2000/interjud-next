import Image from 'next/image'
import React from 'react'
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'
import LineTitle from '../../LineTitle'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

SwiperCore.use([Navigation, Pagination]);

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
            id: 1,
            author: "Julia",
            quote: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
            img: "julia.webp"
        }
        ,
        {
            id: 2,
            author: "André",
            quote: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
            img: "andre.webp"
        }
        ,
        {
            id: 3,
            author: "André",
            quote: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
            img: "andre.webp"
        }
        ,
    ]


    return (
        <section id='depoimentos' className='depoimentos'>
            <div className='container'>
                <LineTitle text="Depoimentos" />
                <Swiper
                    className="depoimentos-wrapper"
                    slidesPerView={1}
                    spaceBetween= {20}
                    breakpoints={{
                        640: {
                            slidesPerView: 1
                        },
                        768: {
                            slidesPerView: 2
                        },
                        1024: {
                            slidesPerView: 3
                        },
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    scrollbar={{ draggable: true }}
                >
                    {
                        quotes.map((item, index) => {
                            return (
                                <SwiperSlide key={index} className='single-depoimentos'>
                                    <div className='quote-depoimento'>
                                        <FaQuoteLeft />
                                        <p>
                                            {item.quote}
                                        </p>
                                        <FaQuoteRight />
                                    </div>
                                    <div className='author-depoimento'>
                                        <Image alt={`Depoimento de ${item.author} à InterJud`} title={`Depoimento de ${item.author} à InterJud`} width={50} height={50} src={`/../public/assets/images/Depoimentos/${item.img}`} />
                                        <p className='author-name'>
                                            {item.author}
                                        </p>
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }

                </Swiper>

            </div>
        </section>
    )
}

export default Depoimentos