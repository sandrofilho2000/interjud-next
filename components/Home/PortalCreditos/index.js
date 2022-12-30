import React, { useEffect, useState } from 'react'
import Credit from '../../Credit'
import LineTitle from '../../LineTitle'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

SwiperCore.use([Navigation, Pagination]);


const PortalCreditos = () => {
    const [credits, setCredits] = useState([{}])
    let cre = [
        {
            id: 1,
            name: "Banco do Brasil",
            value: 627500,
            rating: 3,
            class: "Trabalhista",
            img: 'banco_do_brasil.png'
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
        document.querySelectorAll(".portalCreditos .rec-dot").forEach((item, index) => {
            item.setAttribute("aria-label", "navigation button")
        })
    }, [])



    return (
        <section className='portalCreditos' id='portalCreditos'>
            <div className='container'>
                <LineTitle text="Portal de Créditos" />
                <Swiper
                    className='creditsList'
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

                    {credits.map((item, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <Credit credit={item} />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>


            </div>
        </section>
    )
}

export default PortalCreditos