import React from 'react'
import { GiInjustice } from 'react-icons/gi'
import { SiFastly } from 'react-icons/si'
import { FaStar } from 'react-icons/fa'
import { ImHammer2 } from 'react-icons/im'
import LineTitle from '../../LineTitle'
import Tilt from 'react-parallax-tilt'

const Vantagens = () => {

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
    return (
        <section className='vantagens' id="vantagens">
            <div className='container'>
                <LineTitle text="Vantagens de utilizar a interjud" />
                <div className="wrapper-vantagens">

                    <Tilt className="Tilt"
                        {...tiltOptions}
                    >
                        <div className="single-vantagens" >
                            <div className="vantagens-number">01</div>
                            <div className="vantagens-img">
                                <ImHammer2 />
                            </div>
                            <div className="vantagens-txt">
                                <h2> LEGAL </h2>
                                <p>A cessão de direitos creditórios é legal e encontra previsão nos artigos 286 a 298 do Código Civil.</p>
                            </div>

                        </div>
                    </Tilt>
                    <Tilt className="Tilt"
                        {...tiltOptions}
                    >
                        <div  className="single-vantagens" >
                            <div className="vantagens-number">02</div>
                            <div className="vantagens-img">
                                <GiInjustice />
                            </div>
                            <div className="vantagens-txt">
                                <h2>SIMPLES E SEM BUROCRACIA</h2>
                                <p>Cadastre seu crédito de forma objetiva e descomplicada, receba seu dinheiro e invista no seu futuro.</p>
                            </div>

                        </div>
                    </Tilt>
                    <Tilt className="Tilt"
                        {...tiltOptions}
                    >
                        <div  className="single-vantagens" >
                            <div className="vantagens-number">03</div>
                            <div className="vantagens-img">
                                <SiFastly />
                            </div>
                            <div className="vantagens-txt">
                                <h2>RAPIDEZ</h2>
                                <p>Comece a receber proposta hoje mesmo, cadastre seu crédito na INTERJUD</p>
                            </div>

                        </div>
                    </Tilt>
                    <Tilt className="Tilt"
                        {...tiltOptions}
                    >
                        <div  className="single-vantagens" >
                            <div className="vantagens-number">04</div>
                            <div className="vantagens-img">
                                <FaStar />
                            </div>
                            <div className="vantagens-txt">
                                <h2>AVALIAÇÃO DO RISCO</h2>
                                <p>A InterJud disponibiliza GRATUITAMENTE a avaliação de risco do seu crédito. Serão atribuídas de 1 a 5 estrelas que auxiliam na tomada de decisão do investidor.</p>
                            </div>

                        </div>
                    </Tilt>
                </div>
            </div>
        </section>
    )
}

export default Vantagens