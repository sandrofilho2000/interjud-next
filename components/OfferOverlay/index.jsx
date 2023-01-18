import React, { useRef, useState } from 'react'
import { FaStar, FaStarHalf, FaInfoCircle } from 'react-icons/fa'
import { FiSend } from 'react-icons/fi'
import { AiFillCloseCircle } from 'react-icons/ai'
import logo_j from '../../public/assets/images/logo_j.png'
import Image from 'next/image'
import { useAuth } from '../../context/AuthContext'

const OfferOverlay = () => {
    const [favToggle, setFavToggle] = useState(false)
    const [infoActive, setInfoActive] = useState(false)
    const [offerValue, setOfferValue] = useState(null)
    const { offerOverlayActive, setOfferOverlayActive, currCreditOffer, systemNotificationActive, setSystemNotificationActive} = useAuth()
    const {} = useAuth()
    

    let [tiltOptions, setTiltOptions] = useState({
        perspective: 500,
        tiltEnable: false,
        glareEnable: false,
        glareMaxOpacity: 1,
        scale: 1,
        max: 3,
        tiltMaxAngleX: 3,
        tiltMaxAngleY: 3,
        glarePosition: "all",
    })

    let credit = currCreditOffer

    let halfStar = Number.isInteger(credit.rating)
    let fullStars = !isNaN(credit.rating) ? Math.floor(credit.rating) : 0
    let stars = Array.from(Array(fullStars).keys())
    let value = credit.value && !isNaN(credit.value) ? Number(credit.value) : ''
    
    value = value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })

    var infoBG = {
        backgroundImage: `url('${logo_j.src}')`,
    }

    let handleOfferCurrency = (e) => {
        let valor = e.currentTarget.value
        valor = valor.replaceAll(".", "")
        valor = valor.replaceAll(",", ".")
        valor = Number(valor)
        let newValor = valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })

        newValor = newValor.replaceAll('R$', '').trim()
        e.currentTarget.value = newValor
    }

    let handleInfoActive = () => {

        setInfoActive(!infoActive)
        if (infoActive) {
            tiltOptions.max = 3,
                tiltOptions.tiltMaxAngleX = 3,
                tiltOptions.tiltMaxAngleY = 3
        } else {
            tiltOptions.max = 0,
                tiltOptions.tiltMaxAngleX = 0,
                tiltOptions.tiltMaxAngleY = 0
        }

        setTiltOptions(tiltOptions)
    }

    let handleFavToggle = () => {
        setFavToggle(!favToggle)
    }

    let handleOfferActive = (e) => {
        setOfferOverlayActive(false)
        setInfoActive(false)
        setOfferValue(null)
    }

    let handleOfferSubmit = (e) =>{
        e.preventDefault()
        
        let valor = offerValue
        valor = valor.replaceAll(".", "")
        valor = valor.replaceAll(",", ".")
        valor = Number(valor)

        const notification = {}
        
        if(valor !== NaN && valor !== 0 && valor ){
            notification.message = "Proposta enviada com sucesso!"
            notification.status = 'success'
            handleOfferActive()
        }else{
            notification.message = "Erro ao enviar a proposta!"
            notification.status = 'error'
        }

        notification.active = true

        setSystemNotificationActive(notification)
    }

    if(currCreditOffer.name){
        return (
            <div className={`${offerOverlayActive ? 'OfferOverlay overlay active' : 'OfferOverlay overlay'}`}>
                <article title={credit.name} className='credit_single'>
                    <AiFillCloseCircle onClick={() => handleOfferActive()} className="closeOfferOverlay"/>
                    <Image width={240} height={330} src={credit.img} loading="lazy" alt="Banco do brasil" />
    
                    <form onSubmit={(e)=>{handleOfferSubmit(e)}} className='credit_content'>
                        <div onClick={() => { handleFavToggle() }} class={`wishlist_icon ${favToggle ? 'active' : ''}`}>
                            <svg class="heart-main" viewBox="0 0 512 512" width="200" title="heart">
                                <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
                            </svg>
                            <svg class="heart-background" viewBox="0 0 512 512" width="200" title="heart">
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
    
                        <FaInfoCircle onClick={() => handleInfoActive()} className='infoBtn' />
    
                        <div className="offerInput">
                            <span>R$</span>
                            <input type="text" onChange={(e)=>{setOfferValue(e.target.value)}} onBlur={(e) => { handleOfferCurrency(e) }} placeholder='Sua Oferta' name="offer" id="offer" />
                            <label>
                                <input style={{display: 'none'}} type="submit" value="" />
                                <FiSend />
                            </label>
                        </div>
    
                    </form>
    
                    <div className={`info ${infoActive ? 'active' : ''}`} style={infoBG}>
                        <AiFillCloseCircle onClick={() => handleInfoActive()} />
                        <p className="name">
                            {credit.name}
                        </p>
                        <p className='tempo_recebimento'>
                            Tempo estimado recebimento: 6 meses
                        </p>
                        <p className='honorarios_sucubenciais'>
                            Honorários sucubenciais: 0%
                        </p>
                        <p className='materia'>
                            Matéria: PIX
                        </p>
                        <p className='observacoes'>
                            Observações: Possível ED, condenação honorários
                        </p>
                    </div>
                </article>
            </div>
        )
    }
    
}

export default OfferOverlay