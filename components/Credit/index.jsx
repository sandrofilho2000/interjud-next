import React, { memo, useEffect, useState } from 'react'
import { FaStar, FaStarHalf, FaInfoCircle } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'
import logo_j from '../../public/assets/images/logo_j.png'
import Tilt from 'react-parallax-tilt'
import Button from '../Button'
import Image from 'next/image'
import { useAuth } from '../../context/AuthContext'
import Link from 'next/link'
import creditPlaceholder from '../../public/assets/images/credit_placeholder.png'
import { db } from '../../firebase'

const CreditContainer = ({ credit }) => {

    let { userInfo, user, favoritesCredits, setFavoritesCredits, setInfoOverlayActive } = useAuth()

    const [infoActive, setInfoActive] = useState(false)
    const [animationLoad, setAnimationLoad] = useState('')
    const [favToggle, setFavToggle] = useState()
    const { setOfferOverlayActive, setCurrCreditOffer, currCreditOffer } = useAuth()

    let halfStar = Number.isInteger(credit.rating)
    let fullStars = !isNaN(credit.rating) ? Math.floor(credit.rating) : 0
    let stars = Array.from(Array(fullStars).keys())
    let value = credit.valor_negociar && !isNaN(credit.valor_negociar) ? Number(credit.valor_negociar) : ''
    
    value = value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })


    useEffect(()=>{
        setFavToggle(favoritesCredits.includes(credit))
    }, [userInfo, favoritesCredits])


    let handleInfoActive = (credit) => {
        setInfoOverlayActive(credit)
    }

    var infoBG = {
        backgroundImage: `url('${logo_j.src}')`,
    }

    let handleFavToggle = async (e) => {
        e.stopPropagation()

        var new_list = favoritesCredits
        let toggle = favToggle
        

        if (toggle) {
            toggle = false
            new_list = new_list.filter((item) => {
                return item.id !== credit.id
            })
        } else {
            toggle = true
            if (!new_list.includes(credit)) {
                new_list.push(credit)
            }
        }


        var favoritesId = []
        new_list.forEach((item)=>{
            favoritesId.push(item.id)
        })
        

        const userRef = db.collection('users').doc(user.uid);
        const res = await userRef.update({favorites: favoritesId})
        setFavoritesCredits(new_list)
        setFavToggle(toggle)
    }

    let handleOfferActive = (e) => {

        e.stopPropagation()
        setOfferOverlayActive(true)
        setCurrCreditOffer(credit)
        
    }

    let img = credit.img ? credit.img : creditPlaceholder

    return (

        <article onClick={(e) => handleInfoActive(credit)} title={credit.name} className='credit_single'>
            <Image placeholder="empty" width={240} height={330} src={img} loading="lazy" alt="Banco do brasil" />

            <div className='credit_content'>
                <div onClick={(e) => { handleFavToggle(e); setAnimationLoad('animate') }} className={`wishlist_icon ${favToggle ? 'active' : ''} ${animationLoad}`}>
                    <svg className="heart-main" viewBox="0 0 512 512" width="200" title="heart">
                        <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
                    </svg>
                    <svg className="heart-background" viewBox="0 0 512 512" width="200" title="heart">
                        <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
                    </svg>
                </div>

                <div className='rating'>
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

                <p className='name'>
                    {credit.name}
                </p>
                <p className='value'>
                    {value}
                </p>

                <div onClick={(e) => handleOfferActive(e, credit)} className="button">
                    <Link href="#">FAZER OFERTA</Link>
                </div>

                <FaInfoCircle className='infoBtn' />
            </div>
        </article>

    )
}

const Credit = memo(CreditContainer)

export default Credit