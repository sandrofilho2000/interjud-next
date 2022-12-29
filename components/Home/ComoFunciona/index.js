import Link from 'next/link'
import React, { useEffect } from 'react'
import Button from '../../Button'
import LineTitle from '../../LineTitle'
import FaqSingle from './FaqSingle'

const ComoFunciona = () => {


  return (
    <section className='comoFunciona' id='comoFunciona'>
      <div className='container'>
        <LineTitle text="Como Funciona" />
        <div className="wrapper-funciona">

          <div className="video-wraper box">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/op_JGEk1oro" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe> 
          </div>
          <div className="faq-video">
            <FaqSingle />
            <FaqSingle />
            <FaqSingle />
            <FaqSingle />
            <FaqSingle />
          </div>

        </div>

          <div className="mosaico-title">
            <h2>GARANTA AGORA SEU DIREITO E ANTECIPE SEUS SONHOS COM A INTERJUD </h2>
          </div>

          <Button text="CADASTRE SEU CRÉDITO" link="#"/>

      </div>
    </section>
  )
}

export default ComoFunciona