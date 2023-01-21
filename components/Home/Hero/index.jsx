import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import heroBg from '../../../public/assets/images/heroBG.webp'
import Button from '../../Button'
import Typed from "typed.js";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Hero = () => {

    const el = useRef(null);

    useEffect(() => {
        AOS.init();
        const typed = new Typed(el.current, {
            strings: [ "NEGOCIE SEU PROCESSO JUDICIAL", "GARANTA AGORA SEUS DIREITOS", "ANTECIPE SEUS SONHOS COM A INTERJUD", "RECEBA PROPOSTAS HOJE MESMO"], // Strings to display
            // Speed settings, try diffrent values untill you get good results

            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 100,
            smartBackspace: true,
            loop: true,
            showCursor: false,
        });

        // Destropying
        return () => {
            typed.destroy();
        };
    }, [])


    var heroBG = {
        backgroundImage: `url('${heroBg.src}')`,
    }
    return (
        <section className="hero" id="hero" style={heroBG}>
            <div className="overlay"></div>
            <div className="container">
                <div className="hero-center">
                    <div className="hero-text">
                        <span ref={el}>NEGOCIE SEU PROCESSO JUDICIAL</span>
                    </div>
                    <div className="hero-btn">
                        <Button text="VENDA SEU CRÉDITO" aos={'fade-left'} link="https://www.interjud.com.br/cadastrar-se-vendedor" />
                        <Button text="COMPRE UM CRÉDITO" aos={'fade-right'} link="https://www.interjud.com.br/cadastrar-se-investidor" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero