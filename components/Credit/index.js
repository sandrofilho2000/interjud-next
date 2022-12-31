import React, { useState } from 'react'
import { FaStar, FaStarHalf, FaInfoCircle } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'
import logo_j from '../../public/assets/images/logo_j.png'
import Tilt from 'react-parallax-tilt'
import Button from '../Button'
import Image from 'next/image'

const Credit = ({ credit }) => {

    const [infoActive, setInfoActive] = useState(false)

    let tiltOptions = {
        perspective: 500,
        glareEnable: true,
        glareMaxOpacity: 1,
        scale: 1,
        max: 3,
        tiltMaxAngleX: 3,
        tiltMaxAngleY: 3,
        glarePosition: "all",
    }

    let halfStar = Number.isInteger(credit.rating)
    let fullStars = !isNaN(credit.rating) ? Math.floor(credit.rating) : 0
    let stars = Array.from(Array(fullStars).keys())
    let value = credit.value && !isNaN(credit.value) ? Number(credit.value) : ''
    value = value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })


    if (infoActive) {
        tiltOptions.max = 0
        tiltOptions.max = 0
        tiltOptions.tiltMaxAngleX = 0
        tiltOptions.tiltMaxAngleY = 0
        tiltOptions.glareEnable = false
    }

    let handleInfoActive = () => {
        setInfoActive(!infoActive)
    }

    var infoBG = {
        backgroundImage: `url('${logo_j.src}')`,
    }

    return (
        <Tilt className="Tilt"
            {...tiltOptions}
        >
            <article className='credit_single'>
                {credit.img &&
                    <img width={240} height={330} src={credit.img} loading="lazy" alt="Banco do brasil" />
                }
                <div className='credit_content'>
                    <div className='rating'>
                        {
                            stars.map((item, index)=>{ 
                                return <FaStar key={index}/>
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

                    <Button text="Fazer oferta" link="#" />

                    <FaInfoCircle onClick={() => handleInfoActive()} className='infoBtn' />
                </div>
                <div className={`info ${infoActive ? 'active' : ''}`} style={infoBG}>
                    <AiFillCloseCircle onClick={() => handleInfoActive()} />
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
        </Tilt>
    )
}

export default Credit