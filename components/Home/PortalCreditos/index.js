import React, { useEffect, useState } from 'react'
import Credit from '../../Credit'
import LineTitle from '../../LineTitle'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { collection, getDocs } from 'firebase/firestore'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { db, storage } from '../../../firebase';
import { useAuth } from '../../../context/AuthContext';

SwiperCore.use([Navigation, Pagination]);


const PortalCreditos = () => {
    const [credits, setCredits] = useState([{}])
    const creditsCollectionRef = collection(db, "creditos")



    const getCredits = async () => {
        const data = await getDocs(creditsCollectionRef)
        let cre = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        setCredits(cre)
    }

    useEffect(() => {
        document.querySelectorAll(".portalCreditos .rec-dot").forEach((item, index) => {
            item.setAttribute("aria-label", "navigation button")
        })
        getCredits()
    }, [])



    return (
        <section className='portalCreditos' id='portalCreditos'>
            <div className='container'>
                <LineTitle text="Portal de Créditos" />
                <Swiper
                    className='creditsList'
                    slidesPerView={1}
                    spaceBetween={20}
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
                                    <Credit credit={item} tilt={true} />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </section>
    )
}

export default PortalCreditos