import Link from 'next/link'
import React, { useEffect } from 'react'
import Button from '../../Button'
import LineTitle from '../../LineTitle'
import Accordion from '../../Accordion'

const ComoFunciona = () => {

  const faq = [
    {
      id: 1,
      head: "1º CADASTRO",
      content: "Preencha seus dados pessoais e os dados do processo a ser negociado, com as informações mais fiéis possíveis. Se necessário, contate seu advogado. Você pode optar por aderir GRATUITAMENTE ao serviço de avaliação de risco",
    }
    ,
    {
      id: 2,
      head: "2º CRÉDITO DISPONIVEL NO MARKETPLACE",
      content: "Pronto! Seu crédito já está disponível no PRIMEIRO marketplace de crédito judiciais do Brasil. Agora é só aguardar o contato com a melhor proposta."
    }
    ,
    {
      id: 3,
      head: "3º NEGOCIAÇÃO",
      content: "Interessados entrarão em contato por meio da plataforma. Disponibilizamos um chat interno para vocês negociarem de forma livre e direta o valor e as condições do negócio, desde que dentro dos parâmetros legais e dos termos e condições da INTERJUD."
    }
    ,
    {
      id: 4,
      head: "4º CESSÃO DE DIREITOS",
      content: "Após aceitar a proposta, a equipe da INTERJUD elaborará um contrato de cessão de direitos inteiramente digital, no qual as parte e o advogado do vendedor devem assinar de forma eletrônica, inclusive pelo próprio celular."
    }
    ,
    {
      id: 5,
      head: "5º HOMOLOGAÇÃO E PAGAMENTO",
      content: "Após a homologação, o dinheiro é liberado ao vendedor. Porém, caso a transação não ocorra por algum motivo, o negócio é desfeito sem qualquer ônus para as partes."
    }
    ,
  ]

  return (
    <section className='comoFunciona' id='comoFunciona'>
      <div className='container'>
        <LineTitle text="Como Funciona" />
        <div className="wrapper-funciona">

          <div className="video-wraper box">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/op_JGEk1oro" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe> 
          </div>

          <Accordion items={faq} />

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