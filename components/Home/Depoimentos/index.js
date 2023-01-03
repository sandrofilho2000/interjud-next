import Image from 'next/image'
import React from 'react'
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'
import LineTitle from '../../LineTitle'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import img from '../../../public/assets/images/Depoimentos/foto1.jpg'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

SwiperCore.use([Navigation, Pagination]);

const Depoimentos = () => {

    return (
        <section id='depoimentos' className='depoimentos'>
            <div className='container'>
                <LineTitle text="Depoimentos" />
                <Swiper
                    className="depoimentos-wrapper"
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
                    <SwiperSlide className='single-depoimentos'>
                        <div className='quote-depoimento'>
                            <FaQuoteLeft />
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                            </p>
                            <FaQuoteRight />
                        </div>
                        <div className='author-depoimento'>
                            <Image alt={`Depoimento de Sandro à InterJud`} title={`Depoimento de Sandro à InterJud`} width={50} height={50} src={img} />
                            <p className='author-name'>
                                Sandro
                            </p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='single-depoimentos'>
                        <div className='quote-depoimento'>
                            <FaQuoteLeft />
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                            </p>
                            <FaQuoteRight />
                        </div>
                        <div className='author-depoimento'>
                            <Image alt={`Depoimento de Sandro à InterJud`} title={`Depoimento de Sandro à InterJud`} width={50} height={50} src={img} />
                            <p className='author-name'>
                                Sandro
                            </p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='single-depoimentos'>
                        <div className='quote-depoimento'>
                            <FaQuoteLeft />
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                            </p>
                            <FaQuoteRight />
                        </div>
                        <div className='author-depoimento'>
                            <Image alt={`Depoimento de Sandro à InterJud`} title={`Depoimento de Sandro à InterJud`} width={50} height={50} src={img} />
                            <p className='author-name'>
                                Sandro
                            </p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='single-depoimentos'>
                        <div className='quote-depoimento'>
                            <FaQuoteLeft />
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                            </p>
                            <FaQuoteRight />
                        </div>
                        <div className='author-depoimento'>
                            <Image alt={`Depoimento de Sandro à InterJud`} title={`Depoimento de Sandro à InterJud`} width={50} height={50} src={img} />
                            <p className='author-name'>
                                Sandro
                            </p>
                        </div>
                    </SwiperSlide>

                </Swiper>

            </div>
        </section>
    )
}

export default Depoimentos