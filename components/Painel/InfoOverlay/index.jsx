import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { FaStar, FaStarHalf } from 'react-icons/fa'
import { AiFillCloseCircle, AiOutlineWhatsApp } from 'react-icons/ai'
import { MdAttachMoney } from 'react-icons/md'
import { BsGraphUp } from 'react-icons/bs'
import { ImHammer2 } from 'react-icons/im'
import { BiTimeFive } from 'react-icons/Bi'
import { GoLaw } from 'react-icons/go'
import Image from 'next/image'
import Link from 'next/link'

const InfoOverlay = () => {
    const { infoOverlayActive, setInfoOverlayActive, setOfferOverlayActive, setCurrCreditOffer } = useAuth()
    const [filterRatingValue, setFilterRatingValue] = useState('')




    !isNaN(filterRatingValue) ? Math.floor(filterRatingValue) : 0

    let isEmpty = (obj) => {
        if (!obj) {
            return false
        } else {
            return Object.values(obj).every(x => x === null || x === '');
        }
    }

    let credit = infoOverlayActive ? infoOverlayActive : { rating: 0 }
    let halfStar = Number.isInteger(credit.rating)
    let fullStars = Math.floor(credit.rating)
    let stars = Array.from(Array(fullStars).keys())

    if (infoOverlayActive) {
        stars = Array.from(Array(fullStars).keys())
        halfStar = Number.isInteger(infoOverlayActive.rating)
        fullStars = !isNaN(infoOverlayActive.rating) ? Math.floor(infoOverlayActive.rating) : 0
    }

    let handleOfferActive = (e) => {

        e.stopPropagation()
        setOfferOverlayActive(true)
        setCurrCreditOffer(credit)

    }


    if (infoOverlayActive) {
        return (
            <div className={`overlay infoOverlay ${infoOverlayActive ? 'active' : ''}`}>
                <div className="infoContainer">
                    <AiFillCloseCircle onClick={() => setInfoOverlayActive(false)} className="infoOverlayClose" />

                    <div className="infoTop">
                        <div className="infoImage">
                            <Image src={credit.img} alt="logo" height={120} width={120} />
                        </div>
                        <div className="infoRating">
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
                        <div className="infoName">
                            <div className="name">
                                <span>Via Varejo</span>
                            </div>
                            <div className="numProcesso">
                                <span>Nº Processo: <span>1045539-86.2021.8.26.0114</span></span>
                            </div>
                            <div className="obs">
                                <span>
                                    Obs: <span>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className="infoObs">
                        </div>
                    </div>

                    <div className="infoMiddle">
                        <div className="value">
                            <div className="symbol">
                                <MdAttachMoney />
                            </div>
                            <div>
                                <p>
                                    Valor Estimado:
                                </p>
                                <p>
                                    R$ 12.000,00
                                </p>

                            </div>
                        </div>
                        <div className="classe">
                            <div className="symbol">
                                <ImHammer2 />
                            </div>
                            <div>
                                <p>
                                    Classe Judicial:
                                </p>
                                <p>
                                    {credit.class}
                                </p>
                            </div>
                        </div>
                        <div className="time">
                            <div className="symbol">
                                <BiTimeFive />
                            </div>
                            <div>
                                <p>
                                    Tempo até recebimento:
                                </p>
                                <p>
                                    12 Meses (Aprox.)
                                </p>
                            </div>
                        </div>
                        <div className="fase">
                            <div className="symbol">
                                <GoLaw />
                            </div>
                            <div>
                                <p>
                                    Fase Processual:
                                </p>
                                <p>
                                    Inicial
                                </p>
                            </div>
                        </div>
                        <div className="protecao">
                            <div className="symbol">
                                <BsGraphUp />
                            </div>
                            <div>
                                <p>
                                    Proteção do investimento:
                                </p>
                                <p>
                                    Taxa de correção
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="infoBottom">
                        <div onClick={(e) => handleOfferActive(e, credit)} className="button">
                            <Link href="#">FAZER OFERTA</Link>
                        </div>
                        <div className="button">
                            <Link href="#">
                                <span>
                                    FALAR C/ ESPECIALISTA
                                </span>
                                <AiOutlineWhatsApp />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default InfoOverlay