import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { AiFillCloseCircle, AiFillInfoCircle, AiOutlineClose } from 'react-icons/ai'
import { FaCheck, FaStar, FaStarHalf } from 'react-icons/fa'
import { FcPrevious, FcNext } from 'react-icons/fc'
import { useAuth } from '../../../context/AuthContext'
import logo from '../../../public/assets/images/logo_j.webp'
import AOS from 'aos';
import 'aos/dist/aos.css';

const WelcomeOverlay = () => {

    const { systemNotificationActive, setSystemNotificationActive } = useAuth()

    const [ newUserInfo, setNewUserInfo] = useState({})
    const [ userFirstName, setUserFirstName ] = useState()
    const [ userLastName, setUserLastName ] = useState()

    const [ sliderLeft, setSliderLeft ] = useState(0)


    let handleSecondSliderOk = () =>{

    }

    let handleSliderLeft = (num) => {
        const maxLeft = sliderLeft === 2 && num === 1
        const minLeft = sliderLeft === 0 && num === -1

        const notification = {}

        
        if (!maxLeft && !minLeft) {
            if(num === 1){
                if(sliderLeft === 0){
                    if(userFirstName && userLastName){
                        setSliderLeft(sliderLeft + num)
                    }else{
                        notification.message = "Revise todos os campos antes de prosseguir"
                        notification.status = 'error'
                        notification.active = true
                        setSystemNotificationActive(notification)
                    }
                }if(sliderLeft === 1){
                    if(secondSlideOk){
                        setSliderLeft(sliderLeft + num)
                    }else{
                        notification.message = "Insira um valor à ser negociádo valido!"
                        notification.status = 'error'
                        notification.active = true
                        setSystemNotificationActive(notification)
                    }
                }
            }else{
                setSliderLeft(sliderLeft + num)
            }
        }
    }

    useEffect(()=>{
        AOS.init();
    }, [])

    return (
        <div className={`welcomeOverlay overlay active`}>

            <div className="welcomeContainer">
                <Image src={logo} width={520} height={530} alt="Novo crédito" />
                <div className="welcomeSlider" style={{ left: -(520 * sliderLeft) }}>
                    <div className="welcomeSingle">
                        <h2 data-aos='fade-up' data-aos-delay="700" data-aos-duration="1200">Bem-vindo à InterJud!</h2>
                        <h3 data-aos='fade-up' data-aos-delay="1900" data-aos-duration="1200">Antes de mais nada, qual é o seu nome?</h3>
                        <form data-aos='fade-up' data-aos-delay="2300" data-aos-duration="1200" className='firstForm'>
                            <input type="text" placeholder='Nome...' onChange={(e)=>{setUserFirstName(e.currentTarget.value)}} />
                            <input type="text" placeholder='Sobrenome...' onChange={(e)=>{setUserLastName(e.currentTarget.value)}} />
                        </form>
                    </div>

                    <div className="welcomeSingle">
                        Olá, {userFirstName}!
                        <form>
                            <input type="date" name="birth" id="birth" />
                        </form>
                    </div>

                    <div className={`welcomeSingle`}>

                    </div>

                </div>
                <div className="welcomeArrows">
                    {
                        sliderLeft !== 0 && (
                            <div className="arrowPrev arrow" onClick={() => { handleSliderLeft(-1) }}>
                                <FcPrevious />
                            </div>
                        )
                    }

                    {
                        sliderLeft !== 2 && (
                            <div className="arrowNext arrow" onClick={() => { handleSliderLeft(1) }}>
                                <FcNext />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default WelcomeOverlay