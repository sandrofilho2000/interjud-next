import React from 'react'
import Accordion from '../../Accordion'
import LineTitle from '../../LineTitle'

const Duvidas = () => {
    const faq = [
        {
            "id": 0,
            "head": "É possível vender um processo judicial?",
            "content": "A resposta é SIM.  Você não precisa aguardar anos para receber o crédito de um processo judicial. A venda é realizada por um instituto denominado cessão de direitos creditórios, que está previsto nos arts. 286 a 298 do Código Civil. A transação é totalmente legal e lícita."
        },
        {
            "id": 1,
            "head": "O que é cessão de direitos creditórios?",
            "content": "A cessão de direitos nada mais é do que um contrato por meio do qual o detentor do processo judicial transfere ao  interessado os direitos e obrigações daquele crédito judicial."
        },
        {
            "id": 2,
            "head": "Como fica meu advogado na venda do processo judicial?",
            "content": "Geralmente em um processo judicial o advogado detém parte do crédito obtido na justiça. Ao negociar o seu crédito o advogado pode incluir a parte que lhe corresponde e já antecipar seus honorários ou pode continuar no processo até o final, sem que isso interfira na venda do seu crédito judicial."
        },
        {
            "id": 3,
            "head": "Em que momento posso oferecer meu processo judicial para venda?",
            "content": "Em tese, o processo judicial pode ser negociado em qualquer fase processual. Entretanto, os processos que já contenham sentença favorável e os que já superaram a parte recursal são mais atraentes para os investidores."
        },
        {
            "id": 4,
            "head": "Qual o custo de vender meu processo na InterJud?",
            "content": "Anunciar e vender seus processos na InterJud é gratuito! Ao aceitar uma proposta feita por um dos investidores cadastrados na plataforma você recebe o valor integral acordado. A InterJud cobra apenas uma comissão de 5% do investidor interessado."
        },
        {
            "id": 5,
            "head": "Qual o risco de comprar um processo judicial?",
            "content": "O valor da compra de um crédito judicial apenas é transferido ao vendedor após a decisão judicial que homologa a transferência de titularidade do crédito. O risco assumido pelo devedor é inerente à solidez do devedor no processo judicial. Nesse aspecto, a InterJud oferece gratuitamente a avaliação de risco que auxilia na tomada de decisão."
        },
        {
            "id": 6,
            "head": "Quais as vantagens de vender meu processo judicial?",
            "content": "Negociar seu processo na InterJud permite receber em pouco tempo valores que ficam anos aguardando o término de um processo judicial. Assim, você consegue antecipar valores que podem ser empregados para quitar dívidas, adquirir a casa própria, um veículo ou mesmo custear a faculdade de seus filhos."
        }
    ]

    return (
        <section className='duvidas' id="duvidas">
            <div className='container'>
                <LineTitle text="Dúvidas Frequentes" />
                <Accordion items={faq} />
            </div>
        </section>
    )
}

export default Duvidas