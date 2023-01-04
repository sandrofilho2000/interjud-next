import Link from 'next/link'
import React from 'react'
import heroBg from '../../../public/assets/images/heroBG.webp'
import Button from '../../Button'

const Hero = () => {
    var heroBG = {
        backgroundImage: `url('${heroBg.src}')`,
    }
    return (
        <section className="hero" id="hero" style={heroBG}>
            <div className="overlay"></div>
            <div className="container">
                <div className="hero-center">
                    <div className="hero-text">
                        <h1>NEGOCIE SEU PROCESSO JUDICIAL</h1>
                    </div>
                    <div className="hero-btn">
                        <Button text="VENDA SEU CRÉDITO" link="https://www.interjud.com.br/cadastrar-se-vendedor"/>
                        <Button text="COMPRE UM CRÉDITO" link="https://www.interjud.com.br/cadastrar-se-investidor"/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero